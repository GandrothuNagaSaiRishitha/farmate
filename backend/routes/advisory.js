import { Router } from "express";

const router = Router();

// AISlot: advisory-query — swap the mock block below for a real ASR + NLU call.
router.post("/query", (req, res) => {
  const { text, lang } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: true, message: "`text` (or transcribed audio) is required.", status: 400 });
  }

  // --- mock inference ---
  const lower = text.toLowerCase();
  let result;
  if (lower.includes("yellow") || lower.includes("tomato")) {
    result = {
      detectedCrop: "Tomato",
      detectedIssue: "Early Blight (suspected)",
      confidence: 0.82,
      recommendedProductIds: ["p-004", "p-011"],
      advisoryText:
        "Symptoms match early blight. Remove affected leaves and consider a copper-based fungicide before spread worsens.",
    };
  } else if (lower.includes("cotton") || lower.includes("whitefly") || lower.includes("curl")) {
    result = {
      detectedCrop: "Cotton",
      detectedIssue: "Leaf Curl Virus (suspected)",
      confidence: 0.77,
      recommendedProductIds: ["p-002"],
      advisoryText: "Whitefly-transmitted leaf curl is likely. Control the vector and isolate affected plants.",
    };
  } else {
    result = {
      detectedCrop: "Wheat",
      detectedIssue: "Nutrient Deficiency (suspected)",
      confidence: 0.68,
      recommendedProductIds: ["p-009", "p-018"],
      advisoryText: "Could be a nitrogen or zinc deficiency. A soil test would confirm before treating.",
    };
  }

  res.json(result);
});

export default router;
