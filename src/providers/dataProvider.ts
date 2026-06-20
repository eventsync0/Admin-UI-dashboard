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

  // ✅ Gérer le cas où la réponse est vide (DELETE par exemple)
  if (response.status === 204) {
    return { json: null, headers: response.headers };
  }

  const json = await response.json();
  return { json, headers: response.headers };
};

export const dataProvider: DataProvider = {
  // GET LIST
  getList: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url);

    // ✅ CORRECTION : Vérifier le format de la réponse
    let data = [];
    let total = 0;

    if (response.json && response.json.data) {
      // Si votre API retourne { data: [...], pagination: { total } }
      data = Array.isArray(response.json.data) ? response.json.data : [];
      total = response.json.pagination?.total || data.length;
    } else if (Array.isArray(response.json)) {
      // Si votre API retourne directement un tableau
      data = response.json;
      total = data.length;
    } else if (response.json && typeof response.json === 'object') {
      // Si votre API retourne un objet avec les données
      data = Object.values(response.json).filter(Array.isArray).flat() || [];
      total = data.length;
    }

    // ✅ Format attendu par React-Admin
    return {
      data: data,
      total: total,
    };
  },

  // GET ONE
  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url);

    // ✅ CORRECTION : Gérer les différents formats
    let data = response.json;
    if (response.json && response.json.data) {
      data = response.json.data;
    }

    return { data };
  },

  // CREATE
  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const response = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });

    // ✅ CORRECTION : Gérer les différents formats
    let data = response.json;
    if (response.json && response.json.data) {
      data = response.json.data;
    }

    return { data };
  },

  // UPDATE
  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });

    // ✅ CORRECTION : Gérer les différents formats
    let data = response.json;
    if (response.json && response.json.data) {
      data = response.json.data;
    }

    return { data };
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

    // ✅ CORRECTION : Extraire les données correctement
    let allData = [];
    if (response.json && response.json.data) {
      allData = Array.isArray(response.json.data) ? response.json.data : [];
    } else if (Array.isArray(response.json)) {
      allData = response.json;
    }

    // Filtrer par IDs
    const filtered = allData.filter((item: any) => params.ids.includes(item.id));
    return { data: filtered };
  },

  // UPDATE MANY (optionnel mais recommandé)
  updateMany: async (resource, params) => {
    const promises = params.ids.map((id: any) => {
      const url = `${API_URL}/api/${resource}/${id}`;
      return httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
    });
    const responses = await Promise.all(promises);
    return { data: params.ids };
  },

  // DELETE MANY (optionnel mais recommandé)
  deleteMany: async (resource, params) => {
    const promises = params.ids.map((id: any) => {
      const url = `${API_URL}/api/${resource}/${id}`;
      return httpClient(url, { method: "DELETE" });
    });
    await Promise.all(promises);
    return { data: params.ids };
  },

  // GET MANY REFERENCE (pour les relations)
  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination || { page: 1, perPage: 10 };
    const { field, order } = params.sort || { field: 'id', order: 'ASC' };
    
    const url = `${API_URL}/api/${resource}?${new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      sort: field,
      order: order.toLowerCase(),
      [params.target]: params.id,
    })}`;

    const response = await httpClient(url);

    let data = [];
    let total = 0;

    if (response.json && response.json.data) {
      data = Array.isArray(response.json.data) ? response.json.data : [];
      total = response.json.pagination?.total || data.length;
    } else if (Array.isArray(response.json)) {
      data = response.json;
      total = data.length;
    }

    return {
      data,
      total,
    };
  },
};