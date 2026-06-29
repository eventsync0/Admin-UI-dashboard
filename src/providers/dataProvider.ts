// src/providers/dataProvider.ts
import { DataProvider, HttpError } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const token = () => localStorage.getItem("accessToken");

/**
 * Appel API unique
 */
const call = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token() ? { Authorization: `Bearer ${token()}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 204) return null;

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new HttpError(data.message || res.statusText, res.status, data);
  }

  return data;
};

/**
 * Extraction générique
 */
const extract = (data: any) => data?.data ?? data ?? [];

/**
 * Transforme pagination / filters react-admin
 */
const query = (params: any) => {
  const { page = 1, perPage = 10 } = params.pagination || {};
  const { field = "id", order = "ASC" } = params.sort || {};
  const filter = params.filter || {};

  const q = new URLSearchParams({
    page: String(page),
    limit: String(perPage),
    sort: field,
    order: order.toLowerCase(),
  });

  Object.entries(filter).forEach(([key, val]) => {
    if (val != null && val !== "") {
      q.set(key === "q" ? "search" : key, String(val));
    }
  });

  return q;
};

/**
 * Normalisation sécurisée
 */
const normalizeOne = (json: any): any => {
  if (!json || typeof json !== "object") return json;

  if (json.data && typeof json.data === "object") {
    return json.data;
  }

  if (json.id) return json;

  const keys = Object.keys(json).filter(
    (k) => json[k] && typeof json[k] === "object"
  );

  if (keys.length === 1) return json[keys[0]];

  const withId = keys.find((k) => json[k]?.id);
  if (withId) return json[withId];

  return json;
};

/**
 * Ensure ID (React Admin obligatoire)
 */
const ensureId = (raw: any): any => {
  if (!raw || typeof raw !== "object") return raw;
  if (raw.id) return raw;

  const id =
    raw.roomId ||
    raw.eventId ||
    raw.uuid ||
    raw._id ||
    null;

  return { ...raw, id };
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const result = await call(`/api/${resource}?${query(params)}`);
    const data = extract(result);

    return {
      data,
      total: result?.pagination?.total ?? data.length,
    };
  },

  getOne: async (resource, params) => {
    const result = await call(`/api/${resource}/${params.id}`);
    return {
      data: ensureId(normalizeOne(result)),
    };
  },

  create: async (resource, params) => {
    const result = await call(`/api/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });

    return {
      data: ensureId(normalizeOne(result)),
    };
  },

  update: async (resource, params) => {
    const result = await call(`/api/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });

    return {
      data: ensureId(normalizeOne(result)),
    };
  },

  delete: async (resource, params) => {
    await call(`/api/${resource}/${params.id}`, {
      method: "DELETE",
    });

    return { data: { id: params.id } };
  },

  getMany: async (resource, params) => {
    const result = await call(`/api/${resource}`);
    const data = extract(result);

    return {
      data: data.filter((item: any) => params.ids.includes(item.id)),
    };
  },

  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        call(`/api/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        })
      )
    );

    return { data: params.ids };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        call(`/api/${resource}/${id}`, {
          method: "DELETE",
        })
      )
    );

    return { data: params.ids };
  },

  getManyReference: async (resource, params) => {
    const q = query(params);
    q.set(params.target, String(params.id));

    const result = await call(`/api/${resource}?${q}`);
    const data = extract(result);

    return {
      data,
      total: result?.pagination?.total ?? data.length,
    };
  },
};