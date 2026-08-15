import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="mb-2 font-display text-3xl font-semibold text-soil">{t("about.title")}</h1>
      <p className="mb-6 inline-block rounded-full bg-wheat/20 px-3 py-1 text-xs font-medium text-soil">
        {t("about.challenge")}
      </p>
      <p className="text-muted leading-relaxed">{t("about.mission")}</p>
    </div>
  );
}
