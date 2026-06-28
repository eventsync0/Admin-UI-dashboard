// src/providers/dataProvider.ts
import { DataProvider, HttpError } from "react-admin";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

const token = () => localStorage.getItem("accessToken");

/**
 * Appel API unique
 */
const call = async (url: string, options: RequestInit = {}) => {
  const res = await fetch(`${API}${url}`, {
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
 * Extrait les données d'une réponse
 */
const extract = (data: any) => data?.data ?? data ?? [];

/**
 * Construit les paramètres de requête
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

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const result = await call(`/api/${resource}?${query(params)}`);
    const data = extract(result);
    return { data, total: result?.pagination?.total ?? data.length };
  },

  getOne: async (resource, params) => {
    const result = await call(`/api/${resource}/${params.id}`);
    return { data: result?.data ?? result };
  },

  create: async (resource, params) => {
    const result = await call(`/api/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: result?.data ?? result };
  },

  update: async (resource, params) => {
    const result = await call(`/api/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: result?.data ?? result };
  },

  delete: async (resource, params) => {
    await call(`/api/${resource}/${params.id}`, { method: "DELETE" });
    return { data: { id: params.id } };
  },

  getMany: async (resource, params) => {
    const result = await call(`/api/${resource}`);
    const data = extract(result);
    return { data: data.filter((item: any) => params.ids.includes(item.id)) };
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
        call(`/api/${resource}/${id}`, { method: "DELETE" })
      )
    );
    return { data: params.ids };
  },

  getManyReference: async (resource, params) => {
    const q = query(params);
    q.set(params.target, String(params.id));
    const result = await call(`/api/${resource}?${q}`);
    const data = extract(result);
    return { data, total: result?.pagination?.total ?? data.length };
  },
};