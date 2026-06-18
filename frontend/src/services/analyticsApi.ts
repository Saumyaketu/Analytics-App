import axios from "axios";

import type {
  SessionsApiResponse,
  SessionEventsApiResponse,
  HeatmapApiResponse,
} from "../types/analytics.types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

export const getSessions = async (): Promise<SessionsApiResponse> => {
  const response = await api.get<SessionsApiResponse>("/sessions");

  return response.data;
};

export const getSessionEvents = async (
  sessionId: string,
): Promise<SessionEventsApiResponse> => {
  const response = await api.get<SessionEventsApiResponse>(
    `/sessions/${sessionId}`,
  );

  return response.data;
};

export const getHeatmapData = async (
  pageUrl: string,
): Promise<HeatmapApiResponse> => {
  const response = await api.get<HeatmapApiResponse>("/heatmap", {
    params: {
      page: pageUrl,
    },
  });

  return response.data;
};
