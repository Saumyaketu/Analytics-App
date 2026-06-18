import express from "express";

import {
  trackEvent,
  fetchSessions,
  fetchSessionEvents,
  fetchHeatmapData,
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.post("/track", trackEvent);

router.get("/sessions", fetchSessions);
router.get("/sessions/:sessionId", fetchSessionEvents);
router.get("/heatmap", fetchHeatmapData);

export default router;
