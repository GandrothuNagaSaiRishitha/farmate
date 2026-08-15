import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Thin wrapper around the Web Speech API's SpeechRecognition.
 * Falls back gracefully (isSupported: false) on browsers without it,
 * so callers must always render a text-input fallback.
 */
export function useSpeechRecognition(lang = "en") {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  const isSupported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!isSupported) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = langToBcp47(lang);

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ");
      setTranscript(text);
    };
    recognition.onerror = (event) => setError(event.error);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [lang, isSupported]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript("");
    setError(null);
    setIsListening(true);
    recognitionRef.current.start();
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isSupported, isListening, transcript, error, start, stop };
}

function langToBcp47(lang) {
  const map = { en: "en-IN", hi: "hi-IN", ta: "ta-IN" };
  return map[lang] || "en-IN";
}
