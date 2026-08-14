import { BadgeCheck, ShieldAlert } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function VerifiedBadge({ verified = true, className = "" }) {
  const { t } = useTranslation();
  if (verified) {
    return (
      <span className={`inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2.5 py-1 text-xs font-medium text-leaf ${className}`}>
        <BadgeCheck className="h-3.5 w-3.5" />
        {t("products.verified")}
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-clay/15 px-2.5 py-1 text-xs font-medium text-clay ${className}`}>
      <ShieldAlert className="h-3.5 w-3.5" />
      {t("counterfeit.unverified")}
    </span>
  );
}
