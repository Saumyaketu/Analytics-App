import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    lastActivity: {
      type: Date,
      default: Date.now,
    },

    totalEvents: {
      type: Number,
      default: 0,
    },

    pagesVisited: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
