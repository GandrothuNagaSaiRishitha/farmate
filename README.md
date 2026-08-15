# FAR[M]ATE — Hackathon Scaffold (SH-AGR-002)

Multilingual, voice-enabled AI-agriculture-advisory platform. This is a **frontend + backend skeleton**
with every AI/ML call isolated behind a single `AISlot` component and stub Express routes, so the
AI/ML lead can drop in real models without touching UI code.

## Folder layout

```
farmate/
├── frontend/       React + Vite + Tailwind + React Router + i18next + Zustand
├── backend/        Express REST API, mock data, 400-900ms simulated latency
└── API_CONTRACT.md Full request/response shapes for every endpoint
```

## Running it locally (no network access was available to pre-install deps here — run these yourself)

```bash
# Terminal 1 — backend
cd backend
npm install
npm run dev        # http://localhost:4000

# Terminal 2 — frontend
cd frontend
npm install
npm run dev         # http://localhost:5173
```

The frontend's dev server proxies `/api/*` to `http://localhost:4000` (see `vite.config.js`),
so no CORS config is needed in dev beyond what's already in `backend/server.js`.

## Design tokens

| Role | Color | Hex |
|---|---|---|
| Primary (Wheat/Amber) | CTAs, highlights | `#E8A33D` |
| Secondary (Terracotta) | alerts, counterfeit warnings | `#C1502E` |
| Base/Trust (Soil Brown) | headers, footer, dark surfaces | `#3D2B1F` |
| Accent (Leaf Green) | success, "verified" | `#5B8C51` |
| Background | warm off-white | `#FBF6EE` |
| Text | near-black brown | `#2B2118` |
| Muted text | | `#6B5B4D` |

Headings: **Fraunces** (warm editorial serif). Body: **Inter**. Both loaded via Google Fonts in `index.html`.

## Non-negotiables baked into the scaffold

- Every AI touchpoint goes through `components/AISlot.jsx` — one place to swap mock → real inference.
- All copy is routed through `react-i18next` (`en`, `hi`, `ta` locale files started).
- Mobile-first Tailwind classes throughout.
- A visible "Prototype / Demo Data" banner lives in `Layout.jsx`.
- Backend responses are realistic mock JSON with artificial latency to simulate inference time.
