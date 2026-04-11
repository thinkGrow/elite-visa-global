"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";
import { client } from "@/sanity/lib/client";

type VisaCategoryKey = "student" | "visit" | "transit";

type VisaDestination = {
  countrySlug: string;
  countryName: string;
  shortName?: string;
  flagEmoji: string;
  badge?: string;
  continent?: {
    name: string;
    slug: string;
    displayOrder?: number;
  };
};

const visaDestinationsQuery = `
*[
  _type == "visaCountryContent" &&
  visaCategory == $category &&
  isPublishedDestination == true
] | order(displayOrder asc, country->name asc) {
  badge,
  "countrySlug": country->slug.current,
  "countryName": country->name,
  "shortName": country->shortName,
  "flagEmoji": country->flagEmoji,
  "continent": country->continent->{
    name,
    "slug": slug.current,
    displayOrder
  }
}
`;

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-8xl px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main style={themeVars} className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <div className="pt-24 pb-14 sm:pt-28 sm:pb-16">{children}</div>
    </main>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-3xl border border-slate-200/70 bg-white",
        "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-slate-200/70" />;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function Dropdown({
  value,
  onChange,
}: {
  value: VisaCategoryKey;
  onChange: (v: VisaCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-4xl border-l border-[color:var(--evg-gold)]/60 pl-6">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-4xl">
          Visa Processing
        </h2>

        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Compliance-focused guidance for students, visitors, families, business
          travelers, and transit passengers.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Visa category
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as VisaCategoryKey)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20"
        >
          <option value="student">Student Visa</option>
          <option value="visit">Visit Visa</option>
          <option value="transit">Transit Visa</option>
        </select>
      </div>
    </div>
  );
}

function ContinentTabs({
  continents,
  active,
  onChange,
}: {
  continents: Array<{ slug: string; name: string }>;
  active: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-semibold text-[var(--evg-deep)] sm:text-2xl">
          Browse by continent
        </h3>
        <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
      </div>

      <div className="flex flex-wrap gap-2">
        {continents.map((continent) => {
          const isActive = continent.slug === active;

          return (
            <button
              key={continent.slug}
              type="button"
              onClick={() => onChange(continent.slug)}
              className={[
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border",
                isActive
                  ? "border-[var(--evg-gold)]/70 bg-[rgba(214,162,58,0.10)] text-[var(--evg-deep)] shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[var(--evg-gold)]/50 hover:text-[var(--evg-deep)]",
              ].join(" ")}
            >
              {continent.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CountryCards({
  items,
  onSelect,
}: {
  items: VisaDestination[];
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((c) => (
        <button
          key={c.countrySlug}
          type="button"
          onClick={() => onSelect(c.countrySlug)}
          className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.98] hover:border-[var(--evg-gold)]/60 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-white text-3xl shadow-sm transition group-hover:scale-105">
                {c.flagEmoji}
              </div>

              <div>
                <div className="text-lg font-semibold text-[var(--evg-deep)]">
                  {c.countryName}
                </div>

                {c.shortName && c.shortName !== c.countryName ? (
                  <div className="text-sm text-slate-500">{c.shortName}</div>
                ) : null}

                {c.continent?.name ? (
                  <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                    {c.continent.name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[var(--evg-gold)]">
              →
            </div>
          </div>

          {c.badge ? (
            <div className="mt-4">
              <Badge>{c.badge}</Badge>
            </div>
          ) : null}
        </button>
      ))}
    </div>
  );
}

export default function VisaProcessingClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();

  const initialCategory: VisaCategoryKey =
    typeParam === "visit"
      ? "visit"
      : typeParam === "transit"
        ? "transit"
        : "student";

  const [category, setCategory] =
    React.useState<VisaCategoryKey>(initialCategory);
  const [destinations, setDestinations] = React.useState<VisaDestination[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeContinent, setActiveContinent] = React.useState("");

  React.useEffect(() => {
    const t = (searchParams.get("type") ?? "").toLowerCase();

    const nextCategory: VisaCategoryKey =
      t === "visit"
        ? "visit"
        : t === "transit"
          ? "transit"
          : "student";

    setCategory(nextCategory);
  }, [searchParams]);

  React.useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      try {
        const data = await client.fetch<VisaDestination[]>(
          visaDestinationsQuery,
          { category },
        );

        if (!mounted) return;
        setDestinations(data ?? []);
      } catch (error) {
        console.error("Failed to load visa destinations:", error);
        if (mounted) setDestinations([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [category]);

  const continents = React.useMemo(() => {
    const map = new Map<
      string,
      { slug: string; name: string; displayOrder?: number }
    >();

    destinations.forEach((item) => {
      const continent = item.continent;
      if (!continent?.slug || !continent?.name) return;

      if (!map.has(continent.slug)) {
        map.set(continent.slug, {
          slug: continent.slug,
          name: continent.name,
          displayOrder: continent.displayOrder,
        });
      }
    });

    return Array.from(map.values()).sort(
      (a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999),
    );
  }, [destinations]);

  React.useEffect(() => {
    if (!continents.length) return;
    if (!continents.some((c) => c.slug === activeContinent)) {
      setActiveContinent(continents[0].slug);
    }
  }, [continents, activeContinent]);

  const filteredDestinations = React.useMemo(() => {
    return destinations.filter(
      (item) => item.continent?.slug === activeContinent,
    );
  }, [destinations, activeContinent]);

  const onChangeCategory = (v: VisaCategoryKey) => {
    setCategory(v);
    router.replace(`/visa-processing?type=${v}`, { scroll: false });
  };

  const onSelectCountry = (slug: string) => {
    router.push(`/visa-processing/${slug}?type=${category}`);
  };

  return (
    <PageShell>
      <Container>
        <Card className="p-6">
          <Dropdown value={category} onChange={onChangeCategory} />
        </Card>

        <Divider />

        {loading ? (
          <div className="text-sm text-slate-500">Loading destinations...</div>
        ) : !destinations.length ? (
          <div className="text-sm text-slate-500">
            No visa destinations found in CMS.
          </div>
        ) : (
          <div className="space-y-8">
            <ContinentTabs
              continents={continents}
              active={activeContinent}
              onChange={setActiveContinent}
            />

            <CountryCards
              items={filteredDestinations}
              onSelect={onSelectCountry}
            />
          </div>
        )}
      </Container>
    </PageShell>
  );
}