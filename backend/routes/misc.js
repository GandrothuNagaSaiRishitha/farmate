import { Router } from "express";
import { getUsageGuide, stats } from "../data/mockData.js";

const router = Router();

router.get("/usage-guide/:productId", (req, res) => {
  res.json(getUsageGuide(req.params.productId));
});

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: true, message: "`name`, `email`, and `message` are required.", status: 400 });
  }
  res.json({ received: true });
});

router.get("/stats", (req, res) => {
  res.json(stats);
});

export default router;
