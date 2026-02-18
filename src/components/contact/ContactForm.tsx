// src/components/contact/ContactForm.tsx
"use client";

import React from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service:
    | "Student Visa"
    | "Tourist Visa"
    | "Business Visa"
    | "Hajj & Umrah"
    | "Tours & Travel"
    | "Other";
  message: string;
  company: string; // honeypot
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-4">
        <span className="text-xs tracking-[0.22em] text-white/55">{label}</span>
        {hint ? <span className="text-xs text-white/40">{hint}</span> : null}
      </div>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const baseField =
  "w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white " +
  "placeholder:text-white/35 outline-none backdrop-blur-xl transition " +
  "focus:border-white/25 focus:bg-white/[0.085] focus:ring-2 focus:ring-[rgba(214,162,58,0.22)]";

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "Student Visa",
    message: "",
    company: "",
  });

  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in Name, Email, and Message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("ok");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "Student Visa",
        message: "",
        company: "",
      });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="hidden">
        <label>
          Company
          <input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            className={baseField}
          />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="NAME" hint="required">
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={baseField}
            placeholder="Your full name"
            autoComplete="name"
          />
        </Field>

        <Field label="EMAIL" hint="required">
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={baseField}
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
          />
        </Field>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="PHONE" hint="optional">
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={baseField}
            placeholder="+8801XXXXXXXXX"
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>

        <Field label="SERVICE" hint="optional">
          <select
            value={form.service}
            onChange={(e) =>
              update("service", e.target.value as FormState["service"])
            }
            className={baseField}
          >
            <option>Student Visa</option>
            <option>Tourist Visa</option>
            <option>Business Visa</option>
            <option>Hajj & Umrah</option>
            <option>Tours & Travel</option>
            <option>Other</option>
          </select>
        </Field>
      </div>

      <Field label="MESSAGE" hint="required">
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={[baseField, "min-h-[170px] resize-y"].join(" ")}
          placeholder="Tell us what you need help with..."
        />
      </Field>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          disabled={loading}
          className={[
            "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium",
            "bg-[var(--evg-gold)] text-slate-900",
            "transition hover:brightness-110 active:brightness-100",
            "shadow-[0_16px_45px_rgba(214,162,58,0.20)]",
            loading ? "opacity-70 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status === "ok" ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            Message sent. We’ll get back to you soon.
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            {errorMsg}
          </div>
        ) : null}
      </div>
    </form>
  );
}
