import { useCallback } from "react";

const LANG_MAP = { en: "en-IN", hi: "hi-IN", ta: "ta-IN" };

export function useSpeechSynthesis() {
  const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = useCallback(
    (text, lang = "en") => {
      if (!isSupported || !text) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = LANG_MAP[lang] || "en-IN";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [isSupported]
  );

  const cancel = useCallback(() => {
    if (isSupported) window.speechSynthesis.cancel();
  }, [isSupported]);

  return { isSupported, speak, cancel };
}
