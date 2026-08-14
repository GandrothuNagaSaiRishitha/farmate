# FAR[M]ATE API Contract

Base URL (dev): `http://localhost:4000/api`

All endpoints return JSON. All mutating/inference endpoints have 400–900ms simulated latency.
Errors follow a single shape via centralized middleware:

```json
{ "error": true, "message": "Human-readable message", "status": 400 }
```

---

## GET /api/health
Returns `{ status: "ok", uptime: <seconds> }`. No auth, no delay.

---

## POST /api/advisory/query
Voice/text crop-problem advisory (AISlot: `advisory-query`).

**Request**
```json
{ "text": "my tomato leaves have yellow spots", "audioBase64": null, "lang": "en" }
```

**Response**
```json
{
  "detectedCrop": "Tomato",
  "detectedIssue": "Early Blight (suspected)",
  "confidence": 0.82,
  "recommendedProductIds": ["p-004", "p-011"],
  "advisoryText": "Symptoms match early blight. Remove affected leaves and consider a copper-based fungicide before spread worsens."
}
```

---

## POST /api/disease/detect
Crop disease detection from an uploaded photo (AISlot: `disease-detect`).

**Request**
```json
{ "imageBase64": "<base64>", "crop": "cotton" }
```

**Response**
```json
{
  "disease": "Cotton Leaf Curl Virus",
  "confidence": 0.77,
  "crop": "Cotton",
  "recommendation": "Isolate affected plants, control whitefly vectors, avoid overhead irrigation.",
  "recommendedProductIds": ["p-002"]
}
```

---

## GET /api/products
Filterable verified-product listing.

**Query params**: `crop`, `category` (Pesticide | Fungicide | Fertilizer | Seed), `region`, `registrationBody`

**Response**
```json
{
  "total": 18,
  "filters": { "crop": "cotton", "category": null, "region": null, "registrationBody": null },
  "results": [ { "id": "p-001", "name": "...", "category": "Pesticide", "crop": "Cotton", "manufacturer": "...", "registrationNumber": "CIB&RC-...", "verified": true } ]
}
```

---

## GET /api/products/:id
Full product detail including usage-guide steps.

**Response**
```json
{
  "id": "p-001",
  "name": "AgriSafe Cypermethrin 10% EC",
  "category": "Pesticide",
  "crop": "Cotton",
  "manufacturer": "AgriSafe Ltd.",
  "registrationNumber": "CIB&RC-11223",
  "region": "Tamil Nadu",
  "verified": true,
  "usageGuide": { "dosage": "2ml per liter of water", "ppe": ["Gloves", "Mask", "Goggles"], "timing": "Early morning, avoid before rain", "storage": "Cool, dry place, out of reach of children" }
}
```

---

## POST /api/counterfeit/verify
Verify a batch/QR code (AISlot: `counterfeit-verify`).

**Request**
```json
{ "code": "AGS-2024-88213" }
```

**Response**
```json
{ "verified": true, "productName": "AgriSafe Cypermethrin 10% EC", "reason": "Batch code matches manufacturer registry." }
```

---

## POST /api/counterfeit/report
Report a suspected counterfeit.

**Request**
```json
{ "productName": "AgriSafe Cypermethrin 10% EC", "location": "Coimbatore, TN", "description": "Seal looked tampered", "photoBase64": null }
```

**Response**
```json
{ "reportId": "RPT-10234", "status": "received" }
```

---

## GET /api/usage-guide/:productId
**Response**
```json
{ "dosage": "2ml per liter of water", "ppe": ["Gloves", "Mask", "Goggles"], "timing": "Early morning, avoid before rain", "storage": "Cool, dry place, out of reach of children" }
```

---

## POST /api/contact
**Request**: `{ "name": "...", "email": "...", "message": "..." }`
**Response**: `{ "received": true }`

---

## GET /api/stats
**Response**
```json
{ "totalProducts": 12480, "uniqueCrops": 24, "uniqueCategories": 4, "uniqueSuppliers": 63 }
```
