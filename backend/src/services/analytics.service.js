import Event from "../models/Event.js";
import Session from "../models/Session.js";

export const createEvent = async (eventData) => {
  const { sessionId, eventType, pageUrl, timestamp, clickData } = eventData;

  const event = await Event.create({
    sessionId,
    eventType,
    pageUrl,
    timestamp,
    ...(clickData && { clickData }),
  });

  const existingSession = await Session.findOne({ sessionId });

  if (!existingSession) {
    await Session.create({
      sessionId,
      startedAt: timestamp,
      lastActivity: timestamp,
      totalEvents: 1,
      pagesVisited: [pageUrl],
    });
  } else {
    await Session.findOneAndUpdate(
      { sessionId },
      {
        $inc: {
          totalEvents: 1,
        },

        $set: {
          lastActivity: timestamp,
        },

        $addToSet: {
          pagesVisited: pageUrl,
        },
      },
    );
  }

  return event;
};

export const getAllSessions = async () => {
  const sessions = await Session.find().sort({
    createdAt: -1,
  });

  return sessions;
};

export const getSessionEvents = async (sessionId) => {
  const events = await Event.find({
    sessionId,
  }).sort({
    timestamp: 1,
  });

  return events;
};

export const getHeatmapData = async (pageUrl) => {
  const clicks = await Event.find({
    pageUrl,
    eventType: "click",
  }).select("clickData");

  return clicks;
};
