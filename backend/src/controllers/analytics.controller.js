import {
  createEvent,
  getAllSessions,
  getSessionEvents,
  getHeatmapData,
} from "../services/analytics.service.js";

export const trackEvent = async (req, res, next) => {
  try {
    const { sessionId, eventType, pageUrl } = req.body;

    if (!sessionId || !eventType || !pageUrl) {
      const error = new Error("Missing required fields");
      error.statusCode = 400;

      return next(error);
    }

    const event = await createEvent(req.body);

    res.status(201).json({
      success: true,
      message: "Event tracked successfully",
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSessions = async (req, res, next) => {
  try {
    const sessions = await getAllSessions();

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchSessionEvents = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const events = await getSessionEvents(sessionId);

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchHeatmapData = async (req, res, next) => {
  try {
    const { page } = req.query;
    if (!page) {
      const error = new Error("Page URL is required");
      error.statusCode = 400;

      return next(error);
    }

    const clicks = await getHeatmapData(page);

    res.status(200).json({
      success: true,
      count: clicks.length,
      data: clicks,
    });
  } catch (error) {
    next(error);
  }
};
