"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CmsTour, PackageCard, ContinentKey } from "../types";
import { Card } from "../components/Ui";
import { Tabs } from "../components/Tabs";
import { CountrySubnav } from "../components/CountrySubnav";
import { PackageGrid } from "../components/PackageGrid";
import {
  buildCountriesByContinent,
  buildMultiCards,
  toImg,
} from "../lib/mappers";

const allowedContinents = [
  "europe",
  "asia",
  "na",
  "sa",
  "africa",
  "oceania",
  "multi",
] as const;

function isContinentKey(v: string): v is ContinentKey {
  return (allowedContinents as readonly string[]).includes(v);
}

function normalize(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export function InternationalTours({ tours }: { tours: CmsTour[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const countriesByContinent = React.useMemo(
    () => buildCountriesByContinent(tours),
    [tours]
  );

  const urlContinent = normalize(sp.get("continent") ?? "europe");
  const urlCountry = normalize(sp.get("country") ?? "");

  const safeContinent: ContinentKey = isContinentKey(urlContinent)
    ? urlContinent
    : "europe";

  const [continent, setContinent] = React.useState<ContinentKey>(safeContinent);

  React.useEffect(() => {
    setContinent(safeContinent);
  }, [safeContinent]);

  const setQuery = (next: { continent?: ContinentKey; country?: string }) => {
    const params = new URLSearchParams(sp.toString());
    params.set("type", "international");

    if (next.continent) params.set("continent", next.continent);

    if (next.country !== undefined) {
      if (next.country) params.set("country", next.country);
      else params.delete("country");
    }

    router.replace(`/tour-packages?${params.toString()}`, {
      scroll: false,
    });
  };

  const onPickContinent = (v: ContinentKey) => {
    setContinent(v);

    if (v === "multi") {
      setQuery({ continent: v, country: "" });
      return;
    }

    const list = countriesByContinent[v as Exclude<ContinentKey, "multi">];
    const first = list?.[0]?.slug ?? "";
    setQuery({ continent: v, country: first });
  };

  const activeCountrySlug = React.useMemo(() => {
    if (continent === "multi") return "";

    const list = countriesByContinent[continent];
    if (!list?.length) return "";

    const exists = list.some((c) => normalize(c.slug) === urlCountry);
    return exists ? urlCountry : list[0].slug;
  }, [continent, urlCountry, countriesByContinent]);

  const activeCountry = React.useMemo(() => {
    if (continent === "multi") return null;

    const list = countriesByContinent[continent] || [];
    return (
      list.find((c) => normalize(c.slug) === normalize(activeCountrySlug)) ??
      list[0] ??
      null
    );
  }, [continent, activeCountrySlug, countriesByContinent]);

  const packages: PackageCard[] = React.useMemo(() => {
    if (continent === "multi") return buildMultiCards(tours);
    if (!activeCountry) return [];

    return tours
      .filter(
        (t) =>
          t.category === "international" &&
          normalize(t.continent) === normalize(continent) &&
          normalize(t.country) === normalize(activeCountry.slug)
      )
      .map((t) => ({
        id: t.slug,
        title: t.title,
        duration: t.durationText || "5 Days / 4 Nights",
        fromPrice: t.fromPriceText || "Request latest price",
        image: toImg(t.heroImage) || activeCountry.heroImage,
        tags: t.tags?.slice(0, 3) || [],
      }));
  }, [continent, activeCountry, tours]);

  const detailsHrefForPkg = (pkgId: string) => `/tour-packages/${pkgId}`;

  return (
    <div>
      <Card hairline className="p-5 sm:p-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
        />
        <div className="relative">
          <div className="text-sm tracking-[0.18em] text-[var(--evg-deep)]/60">
            FILTER BY CONTINENT
          </div>

          <div className="mt-3">
            <Tabs value={continent} onChange={onPickContinent} />
          </div>

          {continent !== "multi" ? (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Countries
              </div>

              <CountrySubnav
                countries={countriesByContinent[continent] || []}
                activeSlug={activeCountrySlug}
                onPick={(slug) => setQuery({ continent, country: slug })}
              />

              <div className="mt-5 text-sm text-slate-600">
                Showing packages for{" "}
                <span className="text-slate-900">
                  {activeCountry?.name || activeCountrySlug}
                </span>
                .
              </div>
            </div>
          ) : (
            <div className="mt-6 text-sm text-slate-600">
              Multi-country packages (no country sub nav).
            </div>
          )}
        </div>
      </Card>

      <PackageGrid items={packages} detailsHrefForSlug={detailsHrefForPkg} />
    </div>
  );
}