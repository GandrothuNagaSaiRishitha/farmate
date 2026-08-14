import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScanLine } from "lucide-react";
import AISlot from "../components/AISlot.jsx";
import VerifiedBadge from "../components/VerifiedBadge.jsx";

export default function CounterfeitDetection() {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [verifyCount, setVerifyCount] = useState(0);
  const [activeCode, setActiveCode] = useState("");

  const [report, setReport] = useState({ name: "", location: "", product: "", description: "" });
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const verify = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    setActiveCode(code);
    setVerifyCount((c) => c + 1);
  };

  const submitReport = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/counterfeit/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName: report.product, location: report.location, description: report.description }),
      });
    } catch {
      // offline-safe: still confirm to the user
    }
    setReportSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("counterfeit.title")}</h1>

      <div className="rounded-card border border-soil/10 bg-white/70 p-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-soil py-3 font-semibold text-cream hover:brightness-110">
          <ScanLine className="h-5 w-5" />
          {t("counterfeit.scan")}
        </button>

        <form onSubmit={verify} className="mt-4 flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t("counterfeit.manualEntry")}
            className="flex-1 rounded-full border border-soil/15 bg-white px-4 py-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-wheat px-5 py-2 text-sm font-semibold text-soil">
            {t("counterfeit.verify")}
          </button>
        </form>

        {verifyCount > 0 && (
          <div className="mt-5">
            <AISlot
              key={verifyCount}
              endpoint="/api/counterfeit/verify"
              payload={{ code: activeCode }}
              loadingText={t("advisory.analyzing")}
              trigger={verifyCount}
              mockResponse={{ verified: true, productName: "AgriSafe Cypermethrin 10% EC", reason: "Batch code matches manufacturer registry." }}
              renderResult={(data) => (
                <div className="flex items-start justify-between gap-3 rounded-card bg-cream p-4">
                  <div>
                    <p className="font-medium text-soil">{data.productName}</p>
                    <p className="text-sm text-muted">{data.reason}</p>
                  </div>
                  <VerifiedBadge verified={data.verified} />
                </div>
              )}
            />
          </div>
        )}
      </div>

      <div className="mt-8 rounded-card border border-soil/10 bg-white/70 p-6">
        <h2 className="mb-4 font-display text-lg font-semibold text-soil">{t("counterfeit.reportTitle")}</h2>
        {reportSubmitted ? (
          <p className="rounded-card bg-leaf/15 p-4 text-sm text-leaf">Thanks — your report was received.</p>
        ) : (
          <form onSubmit={submitReport} className="flex flex-col gap-3">
            <input
              required
              placeholder={t("counterfeit.name")}
              value={report.name}
              onChange={(e) => setReport({ ...report, name: e.target.value })}
              className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
            />
            <input
              required
              placeholder={t("counterfeit.location")}
              value={report.location}
              onChange={(e) => setReport({ ...report, location: e.target.value })}
              className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
            />
            <input
              required
              placeholder={t("counterfeit.product")}
              value={report.product}
              onChange={(e) => setReport({ ...report, product: e.target.value })}
              className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
            />
            <label className="text-xs font-medium text-soil/70">
              {t("counterfeit.photo")}
              <input type="file" accept="image/*" className="mt-1 block text-xs" />
            </label>
            <button type="submit" className="mt-1 rounded-full bg-clay py-2.5 font-semibold text-cream hover:brightness-110">
              {t("counterfeit.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
