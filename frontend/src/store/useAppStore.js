import { create } from "zustand";
import i18n from "../i18n/index.js";

export const useAppStore = create((set) => ({
  lang: localStorage.getItem("farmate_lang") || "en",
  darkMode: false,
  demoCrop: null,

  setLang: (lang) => {
    localStorage.setItem("farmate_lang", lang);
    i18n.changeLanguage(lang);
    set({ lang });
  },

  toggleDarkMode: () =>
    set((state) => {
      const next = !state.darkMode;
      document.documentElement.classList.toggle("dark", next);
      return { darkMode: next };
    }),

  setDemoCrop: (crop) => set({ demoCrop: crop }),
}));
