import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VerifiedBadge from "./VerifiedBadge.jsx";

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-3 rounded-card border border-soil/10 bg-white/80 p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-base font-semibold text-soil">{product.name}</h3>
        <VerifiedBadge verified={product.verified} />
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted">
        <dt className="font-medium text-soil/70">{t("products.crop")}</dt>
        <dd>{product.crop}</dd>
        <dt className="font-medium text-soil/70">{t("products.category")}</dt>
        <dd>{product.category}</dd>
        <dt className="font-medium text-soil/70">Manufacturer</dt>
        <dd>{product.manufacturer}</dd>
      </dl>
      <span className="inline-block w-fit rounded-full bg-soil/5 px-2.5 py-1 font-mono text-[11px] text-soil/70">
        {product.registrationNumber}
      </span>
      <Link
        to={`/usage-guide/${product.id}`}
        className="mt-1 text-sm font-medium text-clay hover:underline"
      >
        {t("products.viewGuide")} →
      </Link>
    </div>
  );
}
