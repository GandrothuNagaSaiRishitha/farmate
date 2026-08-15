import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Upload, Camera } from "lucide-react";
import AISlot from "../components/AISlot.jsx";

export default function DiseaseDetection() {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const [analyzeCount, setAnalyzeCount] = useState(0);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setAnalyzeCount((c) => c + 1);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-6 font-display text-2xl font-semibold text-soil sm:text-3xl">{t("disease.title")}</h1>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center gap-3 rounded-card border-2 border-dashed border-soil/25 bg-white/60 p-10 text-center hover:border-wheat"
      >
        {preview ? (
          <img src={preview} alt="Uploaded crop" className="max-h-56 rounded-lg object-cover" />
        ) : (
          <>
            <Upload className="h-8 w-8 text-soil/50" />
            <p className="text-sm text-muted">{t("disease.upload")}</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>

      <button
        onClick={() => fileInputRef.current?.setAttribute("capture", "environment") || fileInputRef.current?.click()}
        className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-soil/20 px-5 py-2.5 text-sm font-semibold text-soil hover:bg-soil/5"
      >
        <Camera className="h-4 w-4" />
        {t("disease.capture")}
      </button>

      {analyzeCount > 0 && (
        <div className="mt-8">
          <AISlot
            key={analyzeCount}
            endpoint="/api/disease/detect"
            payload={{ imageBase64: "stub", crop: "cotton" }}
            loadingText={t("disease.analyzing")}
            trigger={analyzeCount}
            mockResponse={{
              disease: "Cotton Leaf Curl Virus",
              confidence: 0.77,
              crop: "Cotton",
              recommendation: "Isolate affected plants, control whitefly vectors, avoid overhead irrigation.",
              recommendedProductIds: ["p-002"],
            }}
            renderResult={(data) => (
              <div className="rounded-card border border-soil/10 bg-white/70 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-soil">{data.disease}</h3>
                  <span className="rounded-full bg-clay/15 px-3 py-1 text-xs font-medium text-clay">
                    {t("disease.confidence")}: {Math.round(data.confidence * 100)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{data.crop}</p>
                <p className="mt-3 text-sm text-ink">
                  <span className="font-medium text-soil">{t("disease.recommendation")}:</span> {data.recommendation}
                </p>
                <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-clay hover:underline">
                  {t("disease.viewProducts")} →
                </Link>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
