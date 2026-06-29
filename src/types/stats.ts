// src/types/stats.ts
export interface ApiStats {
  totalEvents: number;
  totalCapacity: number;
  totalCities: number;
  totalSpeakers: number;
  upcomingEvents: number;
  liveEvents: number;
  totalQuestions: number;
}

export interface StatsState {
  totalEvents: number;
  upcomingEvents: number;
  liveEvents: number;
  totalCities: number;
  totalSpeakers: number;
  totalQuestions: number;
  totalCapacity: number;
}

export interface CategoryData {
  name: string;
  value: number;
}

export interface RecentEvent {
  id: string;
  title: string;
  category: string;
  location: string;
  startDate: string;
  createdAt: string;
}