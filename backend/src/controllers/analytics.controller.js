import {
  createEvent,
  getAllSessions,
  getSessionEvents,
  getHeatmapData,
} from "../services/analytics.service.js";

export const trackEvent = async (req, res) => {
  try {
    const { sessionId, eventType, pageUrl } = req.body;

    if (!sessionId || !eventType || !pageUrl) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const event = await createEvent(req.body);

    res.status(201).json({
      success: true,
      message: "Event tracked successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchSessions = async (req, res) => {
  try {
    const sessions = await getAllSessions();

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchSessionEvents = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const events = await getSessionEvents(sessionId);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const fetchHeatmapData = async (req, res) => {
  try {
    const { page } = req.query;
    if (!page) {
      return res.status(400).json({
        success: false,
        message: "Page URL is required",
      });
    }

    const clicks = await getHeatmapData(page);

    res.status(200).json({
      success: true,
      count: clicks.length,
      data: clicks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
