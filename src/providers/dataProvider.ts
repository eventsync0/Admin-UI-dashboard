import { DataProvider } from "react-admin";

// Pas de /api ici : il est ajouté dans chaque appel
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getToken = () => localStorage.getItem("accessToken");

interface ApiResponse {
  json: any;
  headers: Headers;
}

const httpClient = async (
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse> => {
  const token = getToken();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    throw new Error("Unauthorized");
  }

  if (response.status === 204) {
    return { json: null, headers: response.headers };
  }

  const json = await response.json();
  return { json, headers: response.headers };
};

const normalizeList = (json: any): { data: any[]; total: number } => {
  if (json?.data) {
    const data = Array.isArray(json.data) ? json.data : [];
    return { data, total: json.pagination?.total ?? data.length };
  }

  if (Array.isArray(json)) {
    return { data: json, total: json.length };
  }

  if (json && typeof json === "object") {
    const data = Object.values(json).filter(Array.isArray).flat();
    return { data, total: data.length };
  }

  return { data: [], total: 0 };
};

const normalizeOne = (json: any) => json?.data ?? json;

export const dataProvider: DataProvider = {
  getList: async (resource, _params) => {
    const url = `${API_URL}/api/${resource}`;
    const { json } = await httpClient(url);
    return normalizeList(json);
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: normalizeOne(json) };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: normalizeOne(json) };
  },

  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: normalizeOne(json) };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    await httpClient(url, { method: "DELETE" });
    return { data: { id: params.id } as any };
  },

  getMany: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const { json } = await httpClient(url);
    const { data } = normalizeList(json);

    const filtered = data.filter((item: any) => params.ids.includes(item.id));
    return { data: filtered };
  },

  updateMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/api/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: params.ids };
  },

  deleteMany: async (resource, params) => {
    await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/api/${resource}/${id}`, { method: "DELETE" }),
      ),
    );
    return { data: params.ids };
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination ?? { page: 1, perPage: 10 };
    const { field, order } = params.sort ?? { field: "id", order: "ASC" };

    const query = new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      sort: field,
      order: order.toLowerCase(),
      [params.target]: params.id,
    });

    const url = `${API_URL}/api/${resource}?${query}`;
    const { json } = await httpClient(url);
    return normalizeList(json);
  },
};
