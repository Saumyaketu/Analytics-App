export interface Session {
  _id: string;
  sessionId: string;
  startedAt: string;
  lastActivity: string;
  totalEvents: number;
  pagesVisited: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClickData {
  x: number;
  y: number;
}

export interface AnalyticsEvent {
  _id: string;
  sessionId: string;
  eventType: "page_view" | "click";
  pageUrl: string;
  timestamp: string;
  clickData?: ClickData;
  createdAt: string;
  updatedAt: string;
}

export interface HeatmapEvent {
  _id: string;
  clickData: ClickData;
}

export interface SessionsApiResponse {
  success: boolean;
  count: number;
  data: Session[];
}

export interface SessionEventsApiResponse {
  success: boolean;
  count: number;
  data: AnalyticsEvent[];
}

export interface HeatmapApiResponse {
  success: boolean;
  count: number;
  data: HeatmapEvent[];
}
