"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

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

const inputClass =
  "h-11 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-slate-900 outline-none focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30 disabled:cursor-not-allowed disabled:opacity-70";

export function VisaTab() {
  const router = useRouter();

  const [category, setCategory] = React.useState<VisaCategoryKey>("student");
  const [countries, setCountries] = React.useState<VisaWidgetCountry[]>([]);
  const [selectedCountrySlug, setSelectedCountrySlug] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    async function loadCountries() {
      try {
        const data = await client.fetch<VisaWidgetCountry[]>(visaWidgetQuery);

        if (!mounted) return;

        setCountries(data ?? []);
      } catch (error) {
        console.error("Failed to load visa widget countries:", error);

        if (!mounted) return;

        setCountries([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadCountries();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCountries = React.useMemo(() => {
    return countries
      .filter((item) => item.visaCategory === category)
      .sort((a, b) =>
        (a.shortName || a.countryName).localeCompare(
          b.shortName || b.countryName,
        ),
      );
  }, [countries, category]);

  React.useEffect(() => {
    setSelectedCountrySlug((prev) => {
      if (filteredCountries.some((item) => item.countrySlug === prev)) {
        return prev;
      }
      return filteredCountries[0]?.countrySlug ?? "";
    });
  }, [filteredCountries]);

  const handleSearch = () => {
    if (!selectedCountrySlug) return;

    router.push(
      `/visa-processing?type=${category}&country=${selectedCountrySlug}`,
    );
  };

  return (
    <>
      <div className="text-xs tracking-[0.2em] text-white/70">VISA SEARCH</div>

      <div className="mt-4 grid gap-3 md:grid-cols-3 items-end">
        <Field label="SELECT VISA TYPE">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as VisaCategoryKey)}
            disabled={isLoading}
            className={inputClass}
          >
            <option value="student">Student Visa</option>
            <option value="visit">Visit / Family / Business</option>
          </select>
        </Field>

        <Field label="SELECT COUNTRY">
          <select
            value={selectedCountrySlug}
            onChange={(e) => setSelectedCountrySlug(e.target.value)}
            disabled={isLoading || !filteredCountries.length}
            className={inputClass}
          >
            <option value="" disabled>
              {isLoading
                ? "Loading countries..."
                : filteredCountries.length
                  ? "Choose a country"
                  : "No countries available"}
            </option>

            {filteredCountries.map((country) => (
              <option key={country.countrySlug} value={country.countrySlug}>
                {country.flagEmoji ? `${country.flagEmoji} ` : ""}
                {country.shortName || country.countryName}
              </option>
            ))}
          </select>
        </Field>

        <div>
          <PrimaryButton
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !selectedCountrySlug}
            className="w-full"
          >
            SEARCH
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-white/50">
        Choose a visa category first, then select a country to view the relevant
        processing details.
      </div>
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
      <label className="mb-1 block text-[11px] tracking-[0.2em] text-white/60">
        {label}
      </label>
      {children}
    </div>
  );
}
