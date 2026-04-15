"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
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

const inputClass =
  "h-12 w-full rounded-lg border border-black/12 bg-white px-4 text-sm text-[var(--evg-deep)] outline-none transition focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/20 disabled:cursor-not-allowed disabled:opacity-70";

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
        message: "Hotel inquiry sent successfully.",
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
      <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--evg-deep)]/55 uppercase">
        Hotel Search
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="grid gap-3">
          <Field label="WHERE DO YOU WANT TO GO">
            <input
              type="text"
              value={form.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              placeholder="City / State / Country / Country Code"
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid gap-3 md:grid-cols-2 items-end">
          <Field label="CHECK IN">
            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => updateField("checkIn", e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          <Field label="CHECK OUT">
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => updateField("checkOut", e.target.value)}
              className={inputClass}
              required
            />
          </Field>
        </div>

        <div className="grid gap-3 md:grid-cols-4 items-end">
          <Field label="ROOMS">
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

          <Field label="ADULT (12+ YRS)">
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

          <Field label="CHILD (3-11 YRS)">
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

          <Field label="INFANT (0-2 YRS)">
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

        <div className="grid gap-3 md:grid-cols-2 items-end">
          <Field label="RESIDENCE">
            <input
              type="text"
              value={form.residence}
              onChange={(e) => updateField("residence", e.target.value)}
              placeholder="Select a country"
              className={inputClass}
              required
            />
          </Field>

          <Field label="YOUR NATIONALITY">
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

        <div className="grid gap-3 md:grid-cols-2 items-end">
          <Field label="CONTACT NUMBER">
            <input
              type="tel"
              value={form.contactNumber}
              onChange={(e) => updateField("contactNumber", e.target.value)}
              placeholder="01XXXXXXXXX"
              className={inputClass}
              required
            />
          </Field>

          <Field label="EMAIL ADDRESS">
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

        <div className="grid gap-3 md:grid-cols-[1fr_auto] items-end">
          <div className="text-[11px] text-[var(--evg-deep)]/50">
            Share your stay details and the team will follow up with available
            hotel options and pricing.
          </div>

          <PrimaryButton
            type="submit"
            disabled={submitting}
            // className="h-12 w-full rounded-lg px-6 md:w-[190px] shadow-[0_10px_24px_rgba(214,162,58,0.28)]"
          >
            {submitting ? "SENDING..." : "SEARCH"}
          </PrimaryButton>
        </div>

        {status.type !== "idle" ? (
          <div
            className={[
              "rounded-lg border px-4 py-3 text-sm",
              status.type === "success"
                ? "border-emerald-300/70 bg-emerald-50 text-emerald-700"
                : "border-red-300/70 bg-red-50 text-red-700",
            ].join(" ")}
          >
            {status.message}
          </div>
        ) : null}
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
      <label className="mb-1.5 block text-[11px] font-medium tracking-[0.16em] text-[var(--evg-deep)]/55">
        {label}
      </label>
      {children}
    </div>
  );
}