import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import VoiceButton from "../components/VoiceButton.jsx";
import LanguageSwitcher from "../components/LanguageSwitcher.jsx";
import AISlot from "../components/AISlot.jsx";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition.js";
import { useAppStore } from "../store/useAppStore.js";

export default function VoiceAdvisory() {
  const { t } = useTranslation();
  const { lang } = useAppStore();
  const speech = useSpeechRecognition(lang);
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]); // { role: "user" | "farmate", text, resultData? }
  const [queryCount, setQueryCount] = useState(0);
  const [activeQuery, setActiveQuery] = useState("");

  const submit = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setActiveQuery(text);
    setQueryCount((c) => c + 1);
    setTextInput("");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-soil sm:text-3xl">{t("advisory.title")}</h1>
        <LanguageSwitcher />
      </div>

      <div className="flex flex-col items-center gap-4 rounded-card border border-soil/10 bg-white/70 p-8">
        <VoiceButton
          isListening={speech.isListening}
          onStart={speech.start}
          onStop={() => {
            speech.stop();
            if (speech.transcript) submit(speech.transcript);
          }}
        />
        <p className="text-sm text-muted">{speech.isListening ? t("advisory.listening") : t("advisory.tapToSpeak")}</p>
        {!speech.isSupported && (
          <p className="text-xs text-clay">Voice input isn't supported in this browser — use the text field below.</p>
        )}
        {speech.transcript && speech.isListening && (
          <p className="max-w-sm text-center text-sm italic text-soil/70">"{speech.transcript}"</p>
        )}

        <div className="mt-2 w-full">
          <label className="mb-1 block text-xs font-medium text-soil/70">{t("advisory.orType")}</label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(textInput);
            }}
            className="flex gap-2"
          >
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={t("advisory.placeholder")}
              className="flex-1 rounded-full border border-soil/15 bg-white px-4 py-2 text-sm"
            />
            <button
              type="submit"
              aria-label={t("advisory.send")}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-soil text-cream"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {messages.map((msg, i) => (
          <div key={i} className={`max-w-[85%] rounded-card p-4 text-sm ${msg.role === "user" ? "ml-auto bg-wheat/20 text-soil" : "bg-white/70 text-ink"}`}>
            <div className="mb-1 text-xs font-semibold text-soil/60">{msg.role === "user" ? t("advisory.you") : t("advisory.farmate")}</div>
            {msg.text}
          </div>
        ))}

        {queryCount > 0 && (
          <AISlot
            key={queryCount}
            endpoint="/api/advisory/query"
            payload={{ text: activeQuery, lang }}
            loadingText={t("advisory.analyzing")}
            trigger={queryCount}
            mockResponse={{
              detectedCrop: "Tomato",
              detectedIssue: "Early Blight (suspected)",
              confidence: 0.82,
              recommendedProductIds: ["p-004", "p-011"],
              advisoryText:
                "Symptoms match early blight. Remove affected leaves and consider a copper-based fungicide before spread worsens.",
            }}
            renderResult={(data) => (
              <div className="max-w-[85%] rounded-card bg-white/70 p-4 text-sm">
                <div className="mb-1 text-xs font-semibold text-soil/60">{t("advisory.farmate")}</div>
                <p className="text-ink">{data.advisoryText}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
                  <span className="rounded-full bg-leaf/15 px-2.5 py-1 text-leaf">{data.detectedCrop}</span>
                  <span className="rounded-full bg-clay/15 px-2.5 py-1 text-clay">{data.detectedIssue}</span>
                  <span className="rounded-full bg-soil/10 px-2.5 py-1">{Math.round(data.confidence * 100)}%</span>
                </div>
                <Link
                  to={`/products?crop=${encodeURIComponent(data.detectedCrop)}`}
                  className="mt-3 inline-block text-sm font-semibold text-clay hover:underline"
                >
                  {t("advisory.getRecommendations")} →
                </Link>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
}
