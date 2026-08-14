// Demo dataset: ~18 products across the team's three demo crops (cotton, tomato, wheat).
// Swap this for a real DB or ICAR/CIB&RC feed later — nothing else in the backend needs to change
// as long as the shape of each product object stays the same.

export const products = [
  { id: "p-001", name: "AgriSafe Cypermethrin 10% EC", category: "Pesticide", crop: "Cotton", manufacturer: "AgriSafe Ltd.", registrationNumber: "CIB&RC-11223", region: "Tamil Nadu", verified: true },
  { id: "p-002", name: "WhiteFly-X Imidacloprid 17.8% SL", category: "Pesticide", crop: "Cotton", manufacturer: "CropShield Agro", registrationNumber: "CIB&RC-11987", region: "Maharashtra", verified: true },
  { id: "p-003", name: "BollGuard Bt Cotton Seed", category: "Seed", crop: "Cotton", manufacturer: "SeedCraft India", registrationNumber: "State Seed Certification-4471", region: "Punjab", verified: true },
  { id: "p-004", name: "GreenGuard Copper Oxychloride", category: "Fungicide", crop: "Tomato", manufacturer: "GreenGuard Agro", registrationNumber: "CIB&RC-44567", region: "Karnataka", verified: true },
  { id: "p-005", name: "TomaBoost Micronutrient Mix", category: "Fertilizer", crop: "Tomato", manufacturer: "NutriGrow Corp", registrationNumber: "FCO-88213", region: "Tamil Nadu", verified: true },
  { id: "p-006", name: "SafeTom Hybrid Tomato Seed", category: "Seed", crop: "Tomato", manufacturer: "SeedCraft India", registrationNumber: "State Seed Certification-4488", region: "Maharashtra", verified: true },
  { id: "p-007", name: "QuickYield Booster", category: "Fertilizer", crop: "Tomato", manufacturer: "Unregistered Traders Co.", registrationNumber: "N/A", region: "Tamil Nadu", verified: false },
  { id: "p-008", name: "WheatMax Mancozeb 75% WP", category: "Fungicide", crop: "Wheat", manufacturer: "CropShield Agro", registrationNumber: "CIB&RC-22910", region: "Punjab", verified: true },
  { id: "p-009", name: "NutriGrow NPK 19:19:19", category: "Fertilizer", crop: "Wheat", manufacturer: "NutriGrow Corp", registrationNumber: "FCO-88214", region: "Punjab", verified: true },
  { id: "p-010", name: "GoldenGrain Wheat Seed HD-3086", category: "Seed", crop: "Wheat", manufacturer: "SeedCraft India", registrationNumber: "State Seed Certification-4502", region: "Punjab", verified: true },
  { id: "p-011", name: "BlightStop Chlorothalonil 75% WP", category: "Fungicide", crop: "Tomato", manufacturer: "AgriSafe Ltd.", registrationNumber: "CIB&RC-11876", region: "Karnataka", verified: true },
  { id: "p-012", name: "CottonCare Urea Coated", category: "Fertilizer", crop: "Cotton", manufacturer: "NutriGrow Corp", registrationNumber: "FCO-88215", region: "Maharashtra", verified: true },
  { id: "p-013", name: "PestOff Malathion 50% EC", category: "Pesticide", crop: "Wheat", manufacturer: "GreenGuard Agro", registrationNumber: "CIB&RC-22945", region: "Karnataka", verified: true },
  { id: "p-014", name: "MiracleGro Ultra (unverified)", category: "Fertilizer", crop: "Cotton", manufacturer: "Unregistered Traders Co.", registrationNumber: "N/A", region: "Tamil Nadu", verified: false },
  { id: "p-015", name: "FieldFresh Azoxystrobin 23% SC", category: "Fungicide", crop: "Cotton", manufacturer: "CropShield Agro", registrationNumber: "CIB&RC-11999", region: "Punjab", verified: true },
  { id: "p-016", name: "TomaShield Seed Treatment", category: "Pesticide", crop: "Tomato", manufacturer: "AgriSafe Ltd.", registrationNumber: "CIB&RC-11902", region: "Maharashtra", verified: true },
  { id: "p-017", name: "WheatGuard Propiconazole 25% EC", category: "Fungicide", crop: "Wheat", manufacturer: "GreenGuard Agro", registrationNumber: "CIB&RC-22967", region: "Karnataka", verified: true },
  { id: "p-018", name: "SoilPlus Zinc Sulphate", category: "Fertilizer", crop: "Wheat", manufacturer: "NutriGrow Corp", registrationNumber: "FCO-88220", region: "Tamil Nadu", verified: true },
];

export const usageGuides = {
  "p-001": { dosage: "2ml per liter of water", ppe: ["Gloves", "Mask", "Goggles"], timing: "Early morning, avoid before rain", storage: "Cool, dry place, out of reach of children" },
  "p-004": { dosage: "3g per liter of water", ppe: ["Gloves", "Mask"], timing: "Evening application, avoid windy conditions", storage: "Store in original container, away from food" },
  "p-009": { dosage: "50kg per acre (broadcast)", ppe: ["Gloves"], timing: "Apply during active tillering stage", storage: "Keep bags sealed and dry, elevated off the floor" },
};

const DEFAULT_GUIDE = {
  dosage: "2ml per liter of water",
  ppe: ["Gloves", "Mask", "Goggles"],
  timing: "Early morning, avoid before rain",
  storage: "Cool, dry place, out of reach of children",
};

export function getUsageGuide(productId) {
  return usageGuides[productId] || DEFAULT_GUIDE;
}

export const stats = {
  totalProducts: 12480,
  uniqueCrops: 24,
  uniqueCategories: 4,
  uniqueSuppliers: 63,
};
