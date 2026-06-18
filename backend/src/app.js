import express from "express";
import cors from "cors";

import analyticsRouter from "./routes/analytics.route.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    message: "Server is running properly",
  });
});

app.use("/api", analyticsRouter);
app.use(errorMiddleware);

export default app;
