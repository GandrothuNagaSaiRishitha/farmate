import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Download, CheckCircle2 } from "lucide-react";

export default function UsageGuidance() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const [guide, setGuide] = useState(null);
  const [fieldSize, setFieldSize] = useState(1);
  const [unit, setUnit] = useState("acre");

  useEffect(() => {
    fetch(`/api/usage-guide/${productId || "p-001"}`)
      .then((r) => r.json())
      .then(setGuide)
      .catch(() =>
        setGuide({
          dosage: "2ml per liter of water",
          ppe: ["Gloves", "Mask", "Goggles"],
          timing: "Early morning, avoid before rain",
          storage: "Cool, dry place, out of reach of children",
        })
      );
  }, [productId]);

  const perUnitMl = 2; // demo constant matching "2ml per liter" style dosage, scaled per field unit
  const estimated = (fieldSize * perUnitMl * 20).toFixed(0); // 20L water per acre demo assumption

  if (!guide) return <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 text-muted">Loading...</div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("usage.title")}</h1>

      <section className="mb-6 rounded-card border border-soil/10 bg-white/70 p-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-soil">{t("usage.dosageCalc")}</h2>
        <p className="mb-4 text-sm text-muted">Base dosage: {guide.dosage}</p>
        <div className="flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-xs font-medium text-soil/70">
            {t("usage.fieldSize")}
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={fieldSize}
              onChange={(e) => setFieldSize(Number(e.target.value))}
              className="w-28 rounded-lg border border-soil/15 bg-white px-3 py-2 text-sm"
            />
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-lg border border-soil/15 bg-white px-3 py-2 text-sm"
          >
            <option value="acre">acre(s)</option>
            <option value="hectare">hectare(s)</option>
          </select>
          <div className="rounded-lg bg-wheat/20 px-4 py-2 text-sm font-semibold text-soil">
            ≈ {estimated} ml total
          </div>
        </div>
      </section>

      <section className="mb-6 rounded-card border border-soil/10 bg-white/70 p-6">
        <h2 className="mb-3 font-display text-lg font-semibold text-soil">{t("usage.ppe")}</h2>
        <ul className="flex flex-wrap gap-2">
          {guide.ppe.map((item) => (
            <li key={item} className="flex items-center gap-1 rounded-full bg-leaf/15 px-3 py-1.5 text-sm text-leaf">
              <CheckCircle2 className="h-4 w-4" /> {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6 rounded-card border border-soil/10 bg-white/70 p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-soil">{t("usage.timing")}</h2>
        <p className="text-sm text-muted">{guide.timing}</p>
      </section>

      <section className="mb-6 rounded-card border border-soil/10 bg-white/70 p-6">
        <h2 className="mb-2 font-display text-lg font-semibold text-soil">{t("usage.storage")}</h2>
        <p className="text-sm text-muted">{guide.storage}</p>
      </section>

      <button className="inline-flex items-center gap-2 rounded-full bg-soil px-6 py-3 font-semibold text-cream hover:brightness-110">
        <Download className="h-4 w-4" />
        {t("usage.download")}
      </button>
    </div>
  );
}
