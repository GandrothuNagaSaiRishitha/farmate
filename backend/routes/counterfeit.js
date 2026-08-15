import { Router } from "express";
import { products } from "../data/mockData.js";

const router = Router();

let reportCounter = 10233;

// AISlot: counterfeit-verify — swap for a real registry/blockchain lookup.
router.post("/verify", (req, res) => {
  const { code } = req.body;
  if (!code || !code.trim()) {
    return res.status(400).json({ error: true, message: "`code` is required.", status: 400 });
  }

  // Demo heuristic: even-looking / registered-style codes verify true, others flip.
  const looksValid = /^[A-Z]{2,4}-\d{4}-\d{3,6}$/i.test(code.trim());
  if (looksValid) {
    const product = products[Math.floor(Math.random() * products.length)];
    res.json({ verified: true, productName: product.name, reason: "Batch code matches manufacturer registry." });
  } else {
    res.json({ verified: false, productName: null, reason: "No matching batch code found in the registry." });
  }
});

router.post("/report", (req, res) => {
  const { productName, location, description } = req.body;
  if (!productName || !location) {
    return res.status(400).json({ error: true, message: "`productName` and `location` are required.", status: 400 });
  }
  reportCounter += 1;
  res.json({ reportId: `RPT-${reportCounter}`, status: "received" });
});

export default router;
