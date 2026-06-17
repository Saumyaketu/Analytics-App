import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },

    eventType: {
      type: String,
      enum: ["page_view", "click"],
      required: true,
    },

    pageUrl: {
      type: String,
      required: true,
      index: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },

    clickData: {
      x: {
        type: Number,
      },
      y: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
