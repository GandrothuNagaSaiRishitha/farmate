import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mic, PlayCircle, Sprout, ScanLine, ShieldCheck, MessageCircle, Camera, PackageCheck } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import StepCard from "../components/StepCard.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";

export default function Landing() {
  const { t } = useTranslation();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() =>
        setStats({ totalProducts: 12000, uniqueCrops: 24, uniqueCategories: 4, uniqueSuppliers: 63 })
      );
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-grain opacity-70"
          style={{ backgroundSize: "18px 18px" }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-soil sm:text-6xl">
            {t("hero.headline1")}
            <br />
            <span className="text-clay">{t("hero.headline2")}</span>
          </h1>
          <p className="max-w-lg text-lg text-muted">{t("hero.subhead")}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/advisory"
              className="inline-flex items-center gap-2 rounded-full bg-wheat px-6 py-3 font-semibold text-soil shadow-md hover:brightness-95"
            >
              <Mic className="h-5 w-5" />
              {t("hero.ctaTalk")}
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border-2 border-soil/20 px-6 py-3 font-semibold text-soil hover:bg-soil/5"
            >
              <PlayCircle className="h-5 w-5" />
              {t("hero.ctaHow")}
            </a>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard value={stats ? `${stats.totalProducts.toLocaleString()}+` : "…"} label={t("stats.products")} icon={PackageCheck} />
          <StatCard value="6" label={t("stats.languages")} icon={MessageCircle} />
          <StatCard value="48hr" label={t("stats.response")} icon={ShieldCheck} />
          <StatCard value="500+" label={t("stats.farmers")} icon={Sprout} />
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="mb-8 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("features.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard to="/advisory" icon={Mic} title={t("features.advisoryTitle")} desc={t("features.advisoryDesc")} />
          <FeatureCard to="/disease-detection" icon={Camera} title={t("features.diseaseTitle")} desc={t("features.diseaseDesc")} />
          <FeatureCard to="/products" icon={PackageCheck} title={t("features.productsTitle")} desc={t("features.productsDesc")} />
          <FeatureCard to="/counterfeit-check" icon={ScanLine} title={t("features.counterfeitTitle")} desc={t("features.counterfeitDesc")} />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <h2 className="mb-8 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("how.title")}</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard index={1} icon={Mic} title={t("how.step1Title")} description={t("how.step1Desc")} />
          <StepCard index={2} icon={ShieldCheck} title={t("how.step2Title")} description={t("how.step2Desc")} />
          <StepCard index={3} icon={PackageCheck} title={t("how.step3Title")} description={t("how.step3Desc")} />
        </div>
      </section>

      {/* Trust / index teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="rounded-card border border-soil/10 bg-white/70 p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-soil">{t("index.title")}</h2>
          <p className="mt-1 text-muted">{t("index.subtitle")}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-soil/10 text-xs uppercase tracking-wide text-muted">
                  <th className="py-2 pr-4">Product</th>
                  <th className="py-2 pr-4">Crop</th>
                  <th className="py-2 pr-4">Category</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {PREVIEW_ROWS.map((row) => (
                  <tr key={row.name} className="border-b border-soil/5">
                    <td className="py-2 pr-4 font-medium text-soil">{row.name}</td>
                    <td className="py-2 pr-4 text-muted">{row.crop}</td>
                    <td className="py-2 pr-4 text-muted">{row.category}</td>
                    <td className="py-2">
                      <VerifiedBadge verified={row.verified} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/products" className="mt-6 inline-block font-semibold text-clay hover:underline">
            {t("index.viewFull")} →
          </Link>
        </div>
      </section>
    </div>
  );
}

const PREVIEW_ROWS = [
  { name: "AgriSafe Cypermethrin 10% EC", crop: "Cotton", category: "Pesticide", verified: true },
  { name: "GreenGuard Copper Oxychloride", crop: "Tomato", category: "Fungicide", verified: true },
  { name: "NutriGrow NPK 19:19:19", crop: "Wheat", category: "Fertilizer", verified: true },
  { name: "QuickYield Booster (unregistered)", crop: "Tomato", category: "Fertilizer", verified: false },
];

function FeatureCard({ to, icon: Icon, title, desc }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-3 rounded-card border border-soil/10 bg-white/70 p-5 transition-shadow hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf/15 text-leaf">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-display font-semibold text-soil">{title}</h3>
      <p className="text-sm text-muted">{desc}</p>
    </Link>
  );
}
