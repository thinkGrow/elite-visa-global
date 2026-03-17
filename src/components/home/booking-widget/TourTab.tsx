"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";

type TourInventoryRow = {
  continent?: string;
  country?: string;
  countryName?: string;
};

type TourInventoryData = {
  regions: string[];
  rows: TourInventoryRow[];
};

const availableTourInventoryQuery = `
{
  "regions": array::unique(
    *[
      _type == "tourPackage" &&
      category == "international" &&
      defined(coalesce(continentRef->slug.current, continent))
    ]{
      "continent": coalesce(continentRef->slug.current, continent)
    }.continent
  ),
  "rows": *[
    _type == "tourPackage" &&
    category == "international" &&
    defined(coalesce(continentRef->slug.current, continent))
  ]{
    "continent": coalesce(continentRef->slug.current, continent),
    "country": coalesce(countryRef->slug.current, lower(country)),
    "countryName": coalesce(countryRef->name, country)
  }
}
`;

const regionLabelMap: Record<string, string> = {
  europe: "Europe",
  asia: "Asia",
  na: "North America",
  sa: "South America",
  africa: "Africa",
  oceania: "Oceania",
  multi: "Multi Countries",
};

function getRegionLabel(code: string) {
  return regionLabelMap[code] ?? code;
}

function normalize(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export function TourTab() {
  const router = useRouter();

  const [regions, setRegions] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<TourInventoryRow[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [selectedRegion, setSelectedRegion] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");

  React.useEffect(() => {
    let mounted = true;

    async function loadInventory() {
      try {
        const data = await client.fetch<TourInventoryData>(
          availableTourInventoryQuery
        );

        if (!mounted) return;

        setRegions((data?.regions ?? []).filter(Boolean));
        setRows((data?.rows ?? []).filter((row) => row?.continent));
      } catch (error) {
        console.error("Failed to load tour inventory:", error);

        if (!mounted) return;

        setRegions([]);
        setRows([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadInventory();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredCountries = React.useMemo(() => {
    if (!selectedRegion) return [];

    const seen = new Set<string>();

    return rows
      .filter((row) => normalize(row.continent) === normalize(selectedRegion))
      .filter((row) => row.country)
      .filter((row) => {
        const key = normalize(row.country);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .map((row) => ({
        slug: normalize(row.country),
        name: row.countryName?.trim() || row.country!.trim(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [rows, selectedRegion]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
    setSelectedCountry("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", "international");

    if (selectedRegion) {
      params.set("continent", selectedRegion);
    }

    if (selectedCountry) {
      params.set("country", selectedCountry);
    }

    router.push(`/tour-packages?${params.toString()}`);
  };

  return (
    <>
      <div className="text-xs tracking-[0.2em] text-white/70">TOUR SEARCH</div>

      <div className="mt-4 grid gap-3 md:grid-cols-3 items-end">
        <div>
          <label className="mb-1 block text-[11px] tracking-[0.2em] text-white/60">
            SELECT REGION
          </label>
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            disabled={isLoading}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-slate-900 outline-none focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option value="" disabled>
              {isLoading ? "Loading regions..." : "Choose a region"}
            </option>

            {regions.map((region) => (
              <option key={region} value={region}>
                {getRegionLabel(region)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-[11px] tracking-[0.2em] text-white/60">
            SELECT COUNTRY
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={isLoading || !selectedRegion}
            className="h-11 w-full rounded-xl border border-white/15 bg-white/95 px-4 text-sm text-slate-900 outline-none focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <option value="">
              {!selectedRegion
                ? "Choose a region first"
                : filteredCountries.length > 0
                  ? "All countries"
                  : "No countries found"}
            </option>

            {filteredCountries.map((country) => (
              <option key={country.slug} value={country.slug}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || !selectedRegion}
            className="h-11 w-full rounded-xl border border-white/10 bg-[var(--evg-gold)] text-white inline-flex cursor-pointer items-center justify-center gap-2 text-sm tracking-[0.2em] transition hover:brightness-110 active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
          >
            🔎 SEARCH
          </button>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-white/50">
        Select a region to explore available tours, or narrow down to a
        specific country.
      </div>
    </>
  );
}