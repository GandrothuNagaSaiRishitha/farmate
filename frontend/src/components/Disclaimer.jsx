import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

export default function Disclaimer({ className = "" }) {
  const { t } = useTranslation();
  return (
    <div
      role="note"
      className={`flex items-center gap-2 rounded-full bg-wheat/15 px-4 py-2 text-xs text-soil/80 ${className}`}
    >
      <Info className="h-3.5 w-3.5 shrink-0 text-clay" />
      <span>{t("nav.prototypeBanner")}</span>
    </div>
  );
}
