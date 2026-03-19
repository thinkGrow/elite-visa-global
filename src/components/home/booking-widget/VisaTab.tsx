"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

type VisaCategoryKey = "student" | "visit";

type VisaWidgetCountry = {
  countrySlug: string;
  countryName: string;
  shortName?: string;
  flagEmoji?: string;
  visaCategory: VisaCategoryKey;
  displayOrder?: number;
};

const visaWidgetQuery = `
*[
  _type == "visaCountryContent" &&
  isPublishedDestination == true
] | order(visaCategory asc, displayOrder asc, country->name asc) {
  visaCategory,
  displayOrder,
  "countrySlug": country->slug.current,
  "countryName": country->name,
  "shortName": country->shortName,
  "flagEmoji": country->flagEmoji
}
`;

export function VisaTab() {
  const router = useRouter();

  const [category, setCategory] = React.useState<VisaCategoryKey>("student");
  const [countries, setCountries] = React.useState<VisaWidgetCountry[]>([]);
  const [selectedCountrySlug, setSelectedCountrySlug] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    async function loadCountries() {
      setLoading(true);

      try {
        const data = await client.fetch<VisaWidgetCountry[]>(visaWidgetQuery);
        if (!mounted) return;
        setCountries(data ?? []);
      } catch (error) {
        console.error("Failed to load visa widget countries:", error);
        if (mounted) setCountries([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadCountries();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCountries = React.useMemo(() => {
    return countries.filter((item) => item.visaCategory === category);
  }, [countries, category]);

  React.useEffect(() => {
    setSelectedCountrySlug((prev) => {
      if (filteredCountries.some((item) => item.countrySlug === prev)) {
        return prev;
      }
      return filteredCountries[0]?.countrySlug ?? "";
    });
  }, [filteredCountries]);

  const handleGo = () => {
    if (!selectedCountrySlug) return;
    router.push(
      `/visa-processing?type=${category}&country=${selectedCountrySlug}`,
    );
  };

  return (
    <>
      <div className="text-xs tracking-[0.2em] text-white/70">VISA SEARCH</div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/60">
              Visa Type
            </label>

            <div className="relative">
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as VisaCategoryKey)
                }
                className="w-full appearance-none rounded-2xl border border-white/10 bg-white/95 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20"
              >
                <option value="student">Student Visa</option>
                <option value="visit">Visit / Family / Business</option>
              </select>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                ▼
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-white/60">
              Country
            </label>

            <div className="relative">
              <select
                value={selectedCountrySlug}
                onChange={(e) => setSelectedCountrySlug(e.target.value)}
                disabled={loading || filteredCountries.length === 0}
                className="w-full appearance-none rounded-2xl border border-white/10 bg-white/95 px-4 py-3 pr-10 text-sm text-slate-900 outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20"
              >
                {loading ? (
                  <option value="">Loading countries...</option>
                ) : filteredCountries.length === 0 ? (
                  <option value="">No countries available</option>
                ) : (
                  filteredCountries.map((country) => (
                    <option key={country.countrySlug} value={country.countrySlug}>
                      {country.flagEmoji ? `${country.flagEmoji} ` : ""}
                      {country.shortName || country.countryName}
                    </option>
                  ))
                )}
              </select>

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                ▼
              </div>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleGo}
              disabled={loading || !selectedCountrySlug}
              className="w-full rounded-2xl bg-[var(--evg-gold)] px-5 py-3 text-sm font-semibold text-[var(--evg-deep)] transition hover:-translate-y-[1px] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-[150px]"
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </>
  );
}