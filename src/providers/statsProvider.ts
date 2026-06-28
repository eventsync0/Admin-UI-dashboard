// src/providers/statsProvider.ts
import { DataProvider } from "react-admin";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const createStatsProvider = (dataProvider: DataProvider) => {
  return {
    // Récupère les stats
    getStats: async () => {
      const res = await fetch(`${API_BASE_URL}/api/stats`);
      const json = await res.json();
      if (!json.success) throw new Error("Erreur stats");
      return json.data;
    },

    // Récupère les événements récents
    getRecentEvents: async () => {
      try {
        const res = await dataProvider.getList("events", {
          pagination: { page: 1, perPage: 100 },
          sort: { field: "createdAt", order: "DESC" },
          filter: {},
        });

        const events = res.data || [];

        // Compte les catégories
        const categories: Record<string, number> = {};
        events.forEach((e: any) => {
          const cat = e.category || "OTHER";
          categories[cat] = (categories[cat] || 0) + 1;
        });

        const categoryData = Object.entries(categories).map(
          ([name, value]) => ({
            name,
            value,
          }),
        );

        return {
          events: events.slice(0, 6),
          categoryData,
        };
      } catch (error) {
        console.error("Erreur events:", error);
        return { events: [], categoryData: [] };
      }
    },
  };
};
