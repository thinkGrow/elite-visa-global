"use client";

import React from "react";

type TripType = "one-way" | "round-trip" | "multi-city";

type FlightInquiryForm = {
  tripType: TripType;
  flyingFrom: string;
  flyingTo: string;
  departing: string;
  returning: string;
  adults: string;
  children: string;
  infants: string;
  travelClass: string;
  nationality: string;
  contactNumber: string;
  emailAddress: string;
};

const initialForm: FlightInquiryForm = {
  tripType: "one-way",
  flyingFrom: "",
  flyingTo: "",
  departing: "",
  returning: "",
  adults: "",
  children: "",
  infants: "",
  travelClass: "",
  nationality: "Bangladeshi",
  contactNumber: "",
  emailAddress: "",
};

export function FlightTab() {
  const [form, setForm] = React.useState<FlightInquiryForm>(initialForm);
  const [submitting, setSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const updateField = (key: keyof FlightInquiryForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const setTripType = (tripType: TripType) => {
    setForm((prev) => ({
      ...prev,
      tripType,
      returning: tripType === "round-trip" ? prev.returning : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (form.tripType === "round-trip" && !form.returning) {
      setStatus({
        type: "error",
        message: "Please select a return date for round-trip inquiries.",
      });
      return;
    }

    if (form.tripType === "multi-city") {
      setStatus({
        type: "error",
        message: "Multi-city inquiry is not available yet.",
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/flight-inquiry", {
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
        message: "Flight inquiry sent successfully.",
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
      <div className="text-xs tracking-[0.2em] text-white/70">
        FLIGHT SEARCH
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-5">
        <div className="flex flex-wrap gap-5 border-b border-white/10 pb-4">
          <TripTypeRadio
            label="1 Way"
            checked={form.tripType === "one-way"}
            onClick={() => setTripType("one-way")}
          />
          <TripTypeRadio
            label="Round-Trip"
            checked={form.tripType === "round-trip"}
            onClick={() => setTripType("round-trip")}
          />
          <TripTypeRadio
            label="Multi-City"
            checked={form.tripType === "multi-city"}
            onClick={() => setTripType("multi-city")}
          />
        </div>

        <div
          className={[
            "grid gap-4",
            form.tripType === "round-trip"
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3",
          ].join(" ")}
        >
          <Field label="Flying from">
            <input
              type="text"
              value={form.flyingFrom}
              onChange={(e) => updateField("flyingFrom", e.target.value)}
              placeholder="Flying From"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Flying to">
            <input
              type="text"
              value={form.flyingTo}
              onChange={(e) => updateField("flyingTo", e.target.value)}
              placeholder="Flying To"
              className={inputClass}
              required
            />
          </Field>

          <Field label="Departing">
            <input
              type="date"
              value={form.departing}
              onChange={(e) => updateField("departing", e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          {form.tripType === "round-trip" ? (
            <Field label="Returning">
              <input
                type="date"
                value={form.returning}
                onChange={(e) => updateField("returning", e.target.value)}
                className={inputClass}
                required
              />
            </Field>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
          <Field label="Class">
            <select
              value={form.travelClass}
              onChange={(e) => updateField("travelClass", e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select a class</option>
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </Field>

          <Field label="Nationality">
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
          {submitting ? "Sending..." : "Search Flight"}
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

function TripTypeRadio({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-3 text-sm text-white/85"
    >
      <span
        className={[
          "flex h-5 w-5 items-center justify-center rounded-full border transition",
          checked
            ? "border-[var(--evg-gold)] bg-[var(--evg-gold)]"
            : "border-white/35 bg-white/10",
        ].join(" ")}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--evg-deep)]" />
      </span>
      <span>{label}</span>
    </button>
  );
}

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/95 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20";