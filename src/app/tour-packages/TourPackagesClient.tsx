"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CmsTour, TourCategoryKey } from "./types";
import { PageShell, Container, Divider } from "./components/Shell";
import { Card } from "./components/Ui";
import { Dropdown } from "./components/Dropdown";
import { InternationalTours } from "./sections/InternationalTours";
import { LocalTours } from "./sections/LocalTours";

function normalize(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function prettifyLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function TourPackagesClient({ tours }: { tours: CmsTour[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = normalize(searchParams.get("type"));
  const continentParam = normalize(searchParams.get("continent"));
  const countryParam = normalize(searchParams.get("country"));

  const urlType: TourCategoryKey =
    typeParam === "local" ? "local" : "international";

  const [category, setCategory] = React.useState<TourCategoryKey>(urlType);

  React.useEffect(() => {
    setCategory(urlType);
  }, [urlType]);

  const onChange = (v: TourCategoryKey) => {
    setCategory(v);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", v);

    if (v === "local") {
      params.delete("continent");
      params.delete("country");
    }

    router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
  };

  const filteredTours = React.useMemo(() => {
    return tours.filter((tour) => {
      const matchesCategory = normalize(tour.category) === category;
      if (!matchesCategory) return false;

      if (category === "local") return true;

      const matchesContinent = continentParam
        ? normalize(tour.continent) === continentParam
        : true;

      const matchesCountry = countryParam
        ? normalize(tour.country) === countryParam
        : true;

      return matchesContinent && matchesCountry;
    });
  }, [tours, category, continentParam, countryParam]);

  const headerBg =
    category === "international"
      ? "/tours/hero-international.jpg"
      : "/tours/hero-local.jpg";

  const continentLabel = React.useMemo(() => {
    if (!continentParam) return "";
    const matchedTour = tours.find(
      (tour) => normalize(tour.continent) === continentParam
    );
    return matchedTour?.continentName || prettifyLabel(continentParam);
  }, [tours, continentParam]);

  const countryLabel = React.useMemo(() => {
    if (!countryParam) return "";
    const matchedTour = tours.find(
      (tour) => normalize(tour.country) === countryParam
    );
    return matchedTour?.countryName || prettifyLabel(countryParam);
  }, [tours, countryParam]);

  const activeFilterText =
    category === "international"
      ? [
          continentParam ? `Region: ${continentLabel}` : null,
          countryParam ? `Country: ${countryLabel}` : null,
        ]
          .filter(Boolean)
          .join(" • ")
      : "";

  return (
    <PageShell>
      <Container>
        <Card hairline className="p-0">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={headerBg} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/5 to-white/25" />
          </div>

          <div className="relative p-5 sm:p-8">
            <Dropdown value={category} onChange={onChange} />

            {activeFilterText ? (
              <div className="mt-4 text-sm text-slate-700">
                Showing filtered tours — {activeFilterText}
              </div>
            ) : null}
          </div>
        </Card>

        <Divider />

        {category === "international" ? (
          <InternationalTours tours={filteredTours} />
        ) : (
          <LocalTours tours={filteredTours} />
        )}
      </Container>
    </PageShell>
  );
}