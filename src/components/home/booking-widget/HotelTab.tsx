"use client";

import React from "react";

type HotelInquiryForm = {
  destination: string;
  checkIn: string;
  checkOut: string;
  rooms: string;
  adults: string;
  children: string;
  infants: string;
  residence: string;
  nationality: string;
  contactNumber: string;
  emailAddress: string;
};

const initialForm: HotelInquiryForm = {
  destination: "",
  checkIn: "",
  checkOut: "",
  rooms: "",
  adults: "",
  children: "",
  infants: "",
  residence: "",
  nationality: "Bangladeshi",
  contactNumber: "",
  emailAddress: "",
};

export function HotelTab() {
  const [form, setForm] = React.useState<HotelInquiryForm>(initialForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const updateField = (key: keyof HotelInquiryForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });
    setSubmitting(true);

    try {
      const res = await fetch("/api/hotel-inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to send inquiry.");
      }

      setStatus({
        type: "success",
        message: "Inquiry sent successfully.",
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-xs tracking-[0.2em] text-white/70">HOTEL SEARCH</div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <Field label="Where do you want to go">
          <input
            type="text"
            value={form.destination}
            onChange={(e) => updateField("destination", e.target.value)}
            placeholder="City / State / Country / Country Code"
            className={inputClass}
            required
          />
        </Field>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Check in">
            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => updateField("checkIn", e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="Check out">
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => updateField("checkOut", e.target.value)}
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Rooms">
            <select
              value={form.rooms}
              onChange={(e) => updateField("rooms", e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Adult (12+ yrs)">
            <select
              value={form.adults}
              onChange={(e) => updateField("adults", e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Child (3-11 yrs)">
            <select
              value={form.children}
              onChange={(e) => updateField("children", e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Infant (0-2 yrs)">
            <select
              value={form.infants}
              onChange={(e) => updateField("infants", e.target.value)}
              className={inputClass}
            >
              <option value="">Select</option>
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Residence">
            <input
              type="text"
              value={form.residence}
              onChange={(e) => updateField("residence", e.target.value)}
              placeholder="Select a country"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Your nationality">
            <input
              type="text"
              value={form.nationality}
              onChange={(e) => updateField("nationality", e.target.value)}
              placeholder="Bangladeshi"
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Contact number">
            <input
              type="tel"
              value={form.contactNumber}
              onChange={(e) => updateField("contactNumber", e.target.value)}
              placeholder="01XXXXXXXXX"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Email address">
            <input
              type="email"
              value={form.emailAddress}
              onChange={(e) => updateField("emailAddress", e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </Field>
        </div>

        {status.type !== "idle" ? (
          <div
            className={[
              "rounded-2xl border px-4 py-3 text-sm",
              status.type === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                : "border-red-300 bg-red-50 text-red-700",
            ].join(" ")}
          >
            {status.message}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-[var(--evg-deep)] transition hover:-translate-y-[1px] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Search Hotel"}
        </button>
      </form>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/65">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20";
