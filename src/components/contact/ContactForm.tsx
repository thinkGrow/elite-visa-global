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
  company: string;
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
      <div className="mb-2 flex items-end justify-between gap-4">
        <span className="text-[11px] tracking-[0.22em] text-[color:var(--evg-deep)]/60">
          {label}
        </span>
        {hint ? (
          <span className="text-[11px] text-slate-400">{hint}</span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

const baseField =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm " +
  "text-[var(--evg-deep)] shadow-sm outline-none transition-all duration-300 " +
  "placeholder:text-slate-400 " +
  "focus:border-[rgba(214,162,58,0.55)] focus:ring-2 focus:ring-[rgba(214,162,58,0.18)]";

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
          <div className="relative">
            <select
              value={form.service}
              onChange={(e) =>
                update("service", e.target.value as FormState["service"])
              }
              className={[baseField, "appearance-none pr-11"].join(" ")}
            >
              <option>Student Visa</option>
              <option>Tourist Visa</option>
              <option>Business Visa</option>
              <option>Hajj & Umrah</option>
              <option>Tours & Travel</option>
              <option>Other</option>
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--evg-gold)]">
              ▼
            </div>
          </div>
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
            "group inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold",
            "bg-[var(--evg-blue)] text-white",
            "shadow-[0_16px_40px_rgba(2,6,23,0.10)]",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(2,6,23,0.14)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--evg-gold)]/25",
            loading ? "cursor-not-allowed opacity-70" : "",
          ].join(" ")}
        >
          <span>{loading ? "Sending..." : "Send Message"}</span>
          <span className="text-white/70 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>

        {status === "ok" ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[var(--evg-deep)]/80">
            Message sent. We’ll get back to you soon.
          </div>
        ) : null}

        {status === "error" ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </div>
        ) : null}
      </div>
    </form>
  );
}