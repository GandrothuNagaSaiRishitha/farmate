import express from "express";
import cors from "cors";
import { simulateLatency, errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import advisoryRoutes from "./routes/advisory.js";
import diseaseRoutes from "./routes/disease.js";
import productsRoutes from "./routes/products.js";
import counterfeitRoutes from "./routes/counterfeit.js";
import miscRoutes from "./routes/misc.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" })); // generous limit for base64 image payloads

// Health check — no simulated latency, no auth.
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Everything else simulates real inference/network latency (400-900ms).
app.use("/api", simulateLatency);

app.use("/api/advisory", advisoryRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/counterfeit", counterfeitRoutes);
app.use("/api", miscRoutes); // /api/usage-guide/:id, /api/contact, /api/stats

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`FAR[M]ATE backend listening on http://localhost:${PORT}`);
});
