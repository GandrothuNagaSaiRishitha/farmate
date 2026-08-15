import { useTranslation } from "react-i18next";

const CATEGORIES = ["Pesticide", "Fungicide", "Fertilizer", "Seed"];
const CROPS = ["Cotton", "Tomato", "Wheat"];
const REGIONS = ["Tamil Nadu", "Maharashtra", "Punjab", "Karnataka"];
const BODIES = ["CIB&RC", "FCO", "State Seed Certification"];

export default function FilterBar({ filters, onChange }) {
  const { t } = useTranslation();

  const Select = ({ field, label, options }) => (
    <label className="flex flex-col gap-1 text-xs font-medium text-soil/70">
      {label}
      <select
        value={filters[field] || ""}
        onChange={(e) => onChange({ ...filters, [field]: e.target.value || undefined })}
        className="rounded-lg border border-soil/15 bg-white px-3 py-2 text-sm text-ink"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="flex flex-wrap gap-3 rounded-card border border-soil/10 bg-white/70 p-4">
      <Select field="crop" label={t("products.crop")} options={CROPS} />
      <Select field="category" label={t("products.category")} options={CATEGORIES} />
      <Select field="region" label={t("products.region")} options={REGIONS} />
      <Select field="registrationBody" label={t("products.registrationBody")} options={BODIES} />
    </div>
  );
}
