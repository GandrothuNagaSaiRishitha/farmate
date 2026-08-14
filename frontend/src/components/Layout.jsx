import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Moon, Sun } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher.jsx";
import Disclaimer from "./Disclaimer.jsx";
import { useAppStore } from "../store/useAppStore.js";

const NAV_LINKS = [
  { to: "/about", key: "about" },
  { to: "/#features", key: "features" },
  { to: "/products", key: "phytoindex" },
  { to: "/contact", key: "contact" },
];

export default function Layout() {
  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useAppStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-ink dark:bg-soil dark:text-cream">
      <div className="sticky top-0 z-40 border-b border-soil/10 bg-cream/90 backdrop-blur dark:bg-soil/90">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="font-display text-xl font-bold tracking-tight text-soil dark:text-cream">
            FAR<span className="text-wheat">[M]</span>ATE
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.key}
                to={link.to}
                className="text-sm font-medium text-soil/80 hover:text-clay dark:text-cream/80"
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className="rounded-full p-2 text-soil/70 hover:bg-soil/10 dark:text-cream/70"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <LanguageSwitcher />
            <Link
              to="/advisory"
              className="rounded-full bg-wheat px-5 py-2 text-sm font-semibold text-soil shadow-sm hover:brightness-95"
            >
              {t("nav.getStarted")}
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {open && (
          <div className="flex flex-col gap-4 border-t border-soil/10 px-4 py-4 md:hidden">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.key} to={link.to} onClick={() => setOpen(false)} className="text-sm font-medium">
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
            <LanguageSwitcher />
            <Link
              to="/advisory"
              onClick={() => setOpen(false)}
              className="rounded-full bg-wheat px-5 py-2 text-center text-sm font-semibold text-soil"
            >
              {t("nav.getStarted")}
            </Link>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
        <Disclaimer />
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-soil/10 bg-soil text-cream/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="font-display text-lg font-bold text-cream">
              FAR<span className="text-wheat">[M]</span>ATE
            </div>
            <LanguageSwitcher className="bg-cream/10" />
          </div>
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-cream/60">{t("footer.disclaimer")}</p>
        </div>
      </footer>
    </div>
  );
}
