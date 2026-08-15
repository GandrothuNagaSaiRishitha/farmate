import { Router } from "express";

const router = Router();

const SAMPLE_RESULTS = [
  { disease: "Cotton Leaf Curl Virus", confidence: 0.77, crop: "Cotton", recommendation: "Isolate affected plants, control whitefly vectors, avoid overhead irrigation.", recommendedProductIds: ["p-002"] },
  { disease: "Tomato Early Blight", confidence: 0.85, crop: "Tomato", recommendation: "Remove infected foliage and apply a copper-based fungicide.", recommendedProductIds: ["p-004", "p-011"] },
  { disease: "Wheat Rust", confidence: 0.71, crop: "Wheat", recommendation: "Apply a triazole fungicide at first sign of pustules; monitor weekly.", recommendedProductIds: ["p-008", "p-017"] },
];

// AISlot: disease-detect — swap this for a real CNN classifier call.
router.post("/detect", (req, res) => {
  const { imageBase64, crop } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: true, message: "`imageBase64` is required.", status: 400 });
  }

  const match = SAMPLE_RESULTS.find((r) => r.crop.toLowerCase() === (crop || "").toLowerCase());
  res.json(match || SAMPLE_RESULTS[Math.floor(Math.random() * SAMPLE_RESULTS.length)]);
});

export default router;
