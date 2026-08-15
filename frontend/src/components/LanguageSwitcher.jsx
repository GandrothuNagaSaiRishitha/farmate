import { useAppStore } from "../store/useAppStore.js";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "ta", label: "த" },
];

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useAppStore();

  return (
    <div className={`inline-flex items-center gap-1 rounded-full border border-soil/15 bg-white/70 p-1 ${className}`}>
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            lang === code ? "bg-soil text-cream" : "text-soil/70 hover:bg-soil/10"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
