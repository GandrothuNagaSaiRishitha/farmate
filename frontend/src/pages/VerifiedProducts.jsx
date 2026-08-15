import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LayoutGrid, Table2 } from "lucide-react";
import FilterBar from "../components/FilterBar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import StatCard from "../components/StatCard.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";

export default function VerifiedProducts() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({ crop: searchParams.get("crop") || undefined });
  const [view, setView] = useState("grid");
  const [data, setData] = useState({ total: 0, results: [] });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats({ totalProducts: 18, uniqueCrops: 3, uniqueCategories: 4, uniqueSuppliers: 9 }));
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(Object.entries(filters).filter(([, v]) => v)).toString();
    fetch(`/api/products?${query}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(FALLBACK));
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("products.title")}</h1>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard value={stats?.totalProducts ?? "…"} label={t("products.totalProducts")} />
        <StatCard value={stats?.uniqueCrops ?? "…"} label={t("products.uniqueCrops")} />
        <StatCard value={stats?.uniqueCategories ?? "…"} label={t("products.categories")} />
        <StatCard value={stats?.uniqueSuppliers ?? "…"} label={t("products.suppliers")} />
      </div>

      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <FilterBar filters={filters} onChange={setFilters} />
        <div className="flex gap-1 self-start rounded-full border border-soil/15 bg-white p-1">
          <button
            onClick={() => setView("grid")}
            className={`rounded-full p-2 ${view === "grid" ? "bg-soil text-cream" : "text-soil/60"}`}
            aria-label={t("products.gridView")}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("table")}
            className={`rounded-full p-2 ${view === "table" ? "bg-soil text-cream" : "text-soil/60"}`}
            aria-label={t("products.tableView")}
          >
            <Table2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-card border border-soil/10 bg-white/70">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-soil/10 text-xs uppercase tracking-wide text-muted">
                <th className="p-3">Product</th>
                <th className="p-3">Crop</th>
                <th className="p-3">Category</th>
                <th className="p-3">Manufacturer</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.results.map((p) => (
                <tr key={p.id} className="border-b border-soil/5">
                  <td className="p-3 font-medium text-soil">{p.name}</td>
                  <td className="p-3 text-muted">{p.crop}</td>
                  <td className="p-3 text-muted">{p.category}</td>
                  <td className="p-3 text-muted">{p.manufacturer}</td>
                  <td className="p-3">
                    <VerifiedBadge verified={p.verified} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const FALLBACK = {
  total: 3,
  results: [
    { id: "p-001", name: "AgriSafe Cypermethrin 10% EC", category: "Pesticide", crop: "Cotton", manufacturer: "AgriSafe Ltd.", registrationNumber: "CIB&RC-11223", verified: true },
    { id: "p-004", name: "GreenGuard Copper Oxychloride", category: "Fungicide", crop: "Tomato", manufacturer: "GreenGuard Agro", registrationNumber: "CIB&RC-44567", verified: true },
    { id: "p-009", name: "NutriGrow NPK 19:19:19", category: "Fertilizer", crop: "Wheat", manufacturer: "NutriGrow Corp", registrationNumber: "FCO-88213", verified: true },
  ],
};
