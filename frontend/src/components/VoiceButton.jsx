import { Mic, Square } from "lucide-react";

export default function VoiceButton({ isListening, onStart, onStop, size = "lg" }) {
  const dims = size === "lg" ? "h-24 w-24" : "h-12 w-12";
  const iconDims = size === "lg" ? "h-9 w-9" : "h-5 w-5";

  return (
    <button
      onClick={isListening ? onStop : onStart}
      aria-pressed={isListening}
      aria-label={isListening ? "Stop listening" : "Start speaking"}
      className={`relative flex ${dims} items-center justify-center rounded-full bg-wheat text-soil shadow-lg transition-transform hover:scale-105 active:scale-95`}
    >
      {isListening && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-wheat/50" />
          <span className="absolute -inset-2 animate-pulse rounded-full border-2 border-wheat/40" />
        </>
      )}
      {isListening ? <Square className={iconDims} /> : <Mic className={iconDims} />}
    </button>
  );
}
