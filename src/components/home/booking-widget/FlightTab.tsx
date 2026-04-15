"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
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

const inputClass =
  "h-12 w-full rounded-lg border border-black/12 bg-white px-4 text-sm text-[var(--evg-deep)] outline-none transition focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/20 disabled:cursor-not-allowed disabled:opacity-70";

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
        message: "Please select a return date for round-trip.",
      });
      return;
    }

    if (form.tripType === "multi-city") {
      setStatus({
        type: "error",
        message: "Multi-city will be added later.",
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
      <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--evg-deep)]/55 uppercase">
        Flight Search
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex flex-wrap gap-5 border-b border-black/8 pb-4 text-sm text-[var(--evg-deep)]/75">
          <TripTypeOption
            label="1 WAY"
            checked={form.tripType === "one-way"}
            onClick={() => setTripType("one-way")}
          />
          <TripTypeOption
            label="ROUND-TRIP"
            checked={form.tripType === "round-trip"}
            onClick={() => setTripType("round-trip")}
          />
          <TripTypeOption
            label="MULTI-CITY"
            checked={form.tripType === "multi-city"}
            onClick={() => setTripType("multi-city")}
          />
        </div>

        <div
          className={[
            "grid gap-3 items-end",
            form.tripType === "round-trip"
              ? "md:grid-cols-4"
              : "md:grid-cols-3",
          ].join(" ")}
        >
          <Field label="FLYING FROM">
            <input
              type="text"
              value={form.flyingFrom}
              onChange={(e) => updateField("flyingFrom", e.target.value)}
              placeholder="Flying From"
              className={inputClass}
              required
            />
          </Field>

          <Field label="FLYING TO">
            <input
              type="text"
              value={form.flyingTo}
              onChange={(e) => updateField("flyingTo", e.target.value)}
              placeholder="Flying To"
              className={inputClass}
              required
            />
          </Field>

          <Field label="DEPARTING">
            <input
              type="date"
              value={form.departing}
              onChange={(e) => updateField("departing", e.target.value)}
              className={inputClass}
              required
            />
          </Field>

          {form.tripType === "round-trip" ? (
            <Field label="RETURNING">
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

        <div className="grid gap-3 md:grid-cols-3 items-end">
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
          <Field label="CLASS">
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

          <Field label="NATIONALITY">
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
            Submit your route and travel preferences and the team will follow up
            with flight options.
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

function TripTypeOption({
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
      className="inline-flex items-center gap-3 text-sm"
    >
      <span
        className={[
          "relative h-4.5 w-4.5 rounded-full border transition",
          checked
            ? "border-[var(--evg-gold)] bg-[var(--evg-gold)]/10"
            : "border-black/20 bg-white",
        ].join(" ")}
      >
        {checked ? (
          <span className="absolute inset-1 rounded-full bg-[var(--evg-gold)]" />
        ) : null}
      </span>
      <span
        className={
          checked ? "text-[var(--evg-deep)]" : "text-[var(--evg-deep)]/65"
        }
      >
        {label}
      </span>
    </button>
  );
}