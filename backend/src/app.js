import express from "express";
import cors from "cors";

import analyticsRouter from "./routes/analytics.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", analyticsRouter);

export default app;
