"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

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

const inputClass =
  "h-12 w-full rounded-lg border border-black/12 bg-white px-4 text-sm text-[var(--evg-deep)] outline-none transition focus:border-[var(--evg-gold)] focus:ring-2 focus:ring-[color:var(--evg-gold)]/20 disabled:cursor-not-allowed disabled:opacity-70";

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
          availableTourInventoryQuery,
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

  React.useEffect(() => {
    if (!regions.length) return;

    setSelectedRegion((prev) => prev || regions[0]);
  }, [regions]);

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

  React.useEffect(() => {
    if (!selectedRegion) {
      setSelectedCountry("");
      return;
    }

    setSelectedCountry((prev) => {
      if (filteredCountries.some((country) => country.slug === prev)) {
        return prev;
      }
      return "";
    });
  }, [selectedRegion, filteredCountries]);

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
      <div className="text-[11px] font-medium tracking-[0.18em] text-[var(--evg-deep)]/55 uppercase">
        Tour Search
      </div>

      <div className="mt-4 grid items-end gap-3 md:grid-cols-[1fr_1fr_auto]">
        <Field label="SELECT REGION">
          <select
            value={selectedRegion}
            onChange={handleRegionChange}
            disabled={isLoading}
            className={inputClass}
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
        </Field>

        <Field label="SELECT COUNTRY">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            disabled={isLoading || !selectedRegion}
            className={inputClass}
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
        </Field>

        <PrimaryButton
          type="button"
          onClick={handleSearch}
          disabled={isLoading || !selectedRegion}
        >
          Search
        </PrimaryButton>
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
      <label className="mb-1.5 block text-[11px] font-medium tracking-[0.16em] text-[var(--evg-deep)]/55">
        {label}
      </label>
      {children}
    </div>
  );
}