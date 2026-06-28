// src/hooks/useStats.ts
import { useState, useEffect } from "react";
import { useDataProvider, useNotify } from "react-admin";
import { createStatsProvider } from "../providers/statsProvider";

export const useStats = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const provider = createStatsProvider(dataProvider);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    liveEvents: 0,
    totalCities: 0,
    totalSpeakers: 0,
    totalQuestions: 0,
    totalCapacity: 0,
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  // Chargement des données
  const loadData = async () => {
    try {
      const statsData = await provider.getStats();
      const eventsData = await provider.getRecentEvents();

      setStats(statsData);
      setRecentEvents(eventsData.events);
      setCategoryData(eventsData.categoryData);
    } catch (error) {
      notify("Erreur chargement stats", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Fonctions utiles
  const formatNumber = (num: number) =>
    num >= 1000 ? (num / 1000).toFixed(1) + "k+" : num + "+";

  const pastEvents =
    stats.totalEvents - stats.upcomingEvents - stats.liveEvents;

  return {
    loading,
    stats,
    recentEvents,
    categoryData,
    formatNumber,
    pastEvents,
    refresh: loadData,
  };
};
