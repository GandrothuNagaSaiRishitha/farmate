import { Router } from "express";
import { products, getUsageGuide } from "../data/mockData.js";

const router = Router();

router.get("/", (req, res) => {
  const { crop, category, region, registrationBody } = req.query;

  let results = products;
  if (crop) results = results.filter((p) => p.crop.toLowerCase() === crop.toLowerCase());
  if (category) results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  if (region) results = results.filter((p) => p.region.toLowerCase() === region.toLowerCase());
  if (registrationBody) results = results.filter((p) => p.registrationNumber.startsWith(registrationBody));

  res.json({
    total: results.length,
    filters: { crop: crop || null, category: category || null, region: region || null, registrationBody: registrationBody || null },
    results,
  });
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: true, message: `Product ${req.params.id} not found.`, status: 404 });
  }
  res.json({ ...product, usageGuide: getUsageGuide(product.id) });
});

export default router;
