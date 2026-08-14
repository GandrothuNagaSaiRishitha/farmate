import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // offline-safe
    }
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="mb-6 font-display text-3xl font-semibold text-soil">{t("contact.title")}</h1>
      {sent ? (
        <p className="rounded-card bg-leaf/15 p-4 text-sm text-leaf">Thanks — we'll get back to you soon.</p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-3">
          <input
            required
            placeholder={t("contact.name")}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
          />
          <input
            required
            type="email"
            placeholder={t("contact.email")}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
          />
          <textarea
            required
            rows={4}
            placeholder={t("contact.message")}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="rounded-lg border border-soil/15 bg-white px-4 py-2 text-sm"
          />
          <button type="submit" className="rounded-full bg-wheat py-2.5 font-semibold text-soil hover:brightness-95">
            {t("contact.send")}
          </button>
        </form>
      )}
    </div>
  );
}
