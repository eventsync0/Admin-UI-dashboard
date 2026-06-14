import { DataProvider } from "react-admin";

// Notez bien : pas de /api ici
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const getToken = () => localStorage.getItem("accessToken");

const httpClient = async (url: string, options: RequestInit = {}) => {
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

  const json = await response.json();
  return { json, headers: response.headers };
};

export const dataProvider: DataProvider = {
  // GET LIST
  getList: async (resource, params) => {
    // Attention : /api/events et non /events
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url);

    return {
      data: response.json,
      total: response.json.length,
    };
  },

  // GET ONE
  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url);
    return { data: response.json };
  },

  // CREATE
  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },

  // UPDATE
  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },

  // DELETE
  delete: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    await httpClient(url, { method: "DELETE" });
    return { data: { id: params.id } };
  },

  // GET MANY
  getMany: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url);
    const data = response.json;
    const filtered = data.filter((item: any) => params.ids.includes(item.id));
    return { data: filtered };
  },
};
