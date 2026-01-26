import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import ipinfoRoutes from "./routes/ipinfo.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true, message: "IP Geo API is running." });
});

// Routes
app.use("/api", authRoutes);
app.use("/api", ipinfoRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error." });
});

export default app;
