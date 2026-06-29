import { DataProvider } from "react-admin";

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

/**
 * Extrait l'objet métier depuis la réponse du backend.
 * Gère les formats :
 *   - { data: { ... } }           → standard
 *   - { room: { ... } }           → POST /rooms
 *   - { event: { ... } }          → POST /events
 *   - { user: { ... } }           → POST /users
 *   - { message: '...', room: {} } → backend avec message + entité
 *   - { id: ..., name: ... }      → objet direct
 */
const normalizeOne = (json: any): any => {
  if (!json || typeof json !== "object") return json;

  // Format standard react-admin { data: { ... } }
  if (json.data && typeof json.data === "object" && !Array.isArray(json.data)) {
    return json.data;
  }

  // Si l'objet a déjà un id, c'est l'entité directement
  if (json.id !== undefined) return json;

  // Cherche un sous-objet qui ressemble à l'entité métier
  // (on ignore les champs scalaires comme "message")
  const entityKeys = Object.keys(json).filter(
    (k) => json[k] && typeof json[k] === "object" && !Array.isArray(json[k]),
  );

  if (entityKeys.length === 1) {
    // { message: '...', room: { id, name } } → on prend room
    return json[entityKeys[0]];
  }

  // Plusieurs sous-objets : on cherche celui qui a un id
  const withId = entityKeys.find((k) => json[k]?.id !== undefined);
  if (withId) return json[withId];

  return json;
};

const ensureId = (raw: any): any => {
  if (!raw || typeof raw !== "object") return raw;
  if (raw.id !== undefined) return raw;

  const id =
    raw.roomId ??
    raw.room_id ??
    raw.eventId ??
    raw.event_id ??
    raw.uuid ??
    raw._id ??
    null;

  if (id === null) {
    console.warn("[dataProvider] ensureId: aucun champ id trouvé dans", raw);
  }

  return { ...raw, id };
};

export const dataProvider: DataProvider = {
  getList: async (resource, _params) => {
    const url = `${API_URL}/api/${resource}`;
    const { json } = await httpClient(url);
    return normalizeList(json);
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const { json } = await httpClient(url);
 return {
    data: json.data,
  };
  },

  create: async (resource, params) => {
    const url = `${API_URL}/api/${resource}`;
    const { json } = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
  return {
    data: json.data,
  };  
},

  update: async (resource, params) => {
    const url = `${API_URL}/api/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
     return {
    data: json.data,
  };
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