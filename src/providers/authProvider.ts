const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const authProvider = {
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    });

    if (!response.ok) {
      throw new Error("Identifiants invalides");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return Promise.resolve();
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("accessToken")
      ? Promise.resolve()
      : Promise.reject();
  },

  checkError: (error: any) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return Promise.reject();

    const response = await fetch(`${API_URL}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const user = await response.json();
    return { id: user.id, fullName: user.email };
  },

  getPermissions: () => Promise.resolve("admin"),
};
