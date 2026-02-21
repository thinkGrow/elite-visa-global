// src/app/tour-packages/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";

type TourCategoryKey = "international" | "local";

type ContinentKey =
  | "europe"
  | "asia"
  | "na"
  | "sa"
  | "africa"
  | "oceania"
  | "multi";

type Country = {
  key: string;
  name: string;
  flag: string;
  slug: string; // used for redirect /tour-packages/[slug]
  heroImage: string;
  badge?: string;
};

type PackageCard = {
  id: string;
  title: string;
  duration: string;
  fromPrice: string;
  image: string;
  tags?: string[];
};

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
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
  hairline = false,
}: {
  children: React.ReactNode;
  className?: string;
  hairline?: boolean;
}) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl",
        "border border-slate-200/70 bg-white",
        "shadow-[0_12px_40px_rgba(2,6,23,0.06)]",
        className,
      ].join(" ")}
    >
      {hairline ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--evg-gold)]/35 to-transparent"
        />
      ) : null}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-10 h-px w-full bg-slate-200/70" />;
}

function Dropdown({
  value,
  onChange,
}: {
  value: TourCategoryKey;
  onChange: (v: TourCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-4xl pl-6 border-l border-[color:var(--evg-gold)]/60">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--evg-deep)]">
            Tour Packages
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-600">
          International and local tours—clear itinerary, inclusions, and pricing
          tiers. Choose a category to explore.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="mt-2 relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as TourCategoryKey)}
            className={[
              "w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm sm:text-base text-slate-800",
              "shadow-sm outline-none transition",
              "focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20",
            ].join(" ")}
          >
            <option value="international">International Tours</option>
            <option value="local">Local Tours</option>
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Filter by continent and country for international tours.
        </div>
      </div>
    </div>
  );
}

/* =========================================
   DATA: 3–4 per continent, 5–6 for Europe/Asia
   Multi: 3–4 multi-country routes (no sub nav)
========================================= */

const continents: Array<{ key: ContinentKey; label: string }> = [
  { key: "europe", label: "Europe" },
  { key: "asia", label: "Asia" },
  { key: "na", label: "North America" },
  { key: "sa", label: "South America" },
  { key: "africa", label: "Africa" },
  { key: "oceania", label: "Oceania" },
  { key: "multi", label: "Multi Countries" },
];

// NOTE: these are just starting picks for tour packages.
// You can expand anytime, CMS later.
const countriesByContinent: Record<Exclude<ContinentKey, "multi">, Country[]> = {
  // 6 for Europe
  europe: [
    {
      key: "france",
      name: "France",
      flag: "🇫🇷",
      slug: "france",
      heroImage:
        "https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=1400&q=70",
      badge: "Paris",
    },
    {
      key: "italy",
      name: "Italy",
      flag: "🇮🇹",
      slug: "italy",
      heroImage:
        "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1400&q=70",
      badge: "Rome",
    },
    {
      key: "switzerland",
      name: "Switzerland",
      flag: "🇨🇭",
      slug: "switzerland",
      heroImage:
        "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?auto=format&fit=crop&w=1400&q=70",
      badge: "Alps",
    },
    {
      key: "spain",
      name: "Spain",
      flag: "🇪🇸",
      slug: "spain",
      heroImage:
        "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?auto=format&fit=crop&w=1400&q=70",
      badge: "Barcelona",
    },
    {
      key: "uk",
      name: "United Kingdom",
      flag: "🇬🇧",
      slug: "uk",
      heroImage:
        "https://images.unsplash.com/photo-1488747279002-c8523379faaa?auto=format&fit=crop&w=1400&q=70",
      badge: "London",
    },
    {
      key: "netherlands",
      name: "Netherlands",
      flag: "🇳🇱",
      slug: "netherlands",
      heroImage:
        "https://images.unsplash.com/photo-1526481280695-3c687fd643ed?auto=format&fit=crop&w=1400&q=70",
      badge: "Amsterdam",
    },
  ],

  // 6 for Asia
  asia: [
    {
      key: "thailand",
      name: "Thailand",
      flag: "🇹🇭",
      slug: "thailand",
      heroImage:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1400&q=70",
      badge: "Bangkok • Phuket",
    },
    {
      key: "malaysia",
      name: "Malaysia",
      flag: "🇲🇾",
      slug: "malaysia",
      heroImage:
        "https://images.unsplash.com/photo-1551516594-56cb78394645?auto=format&fit=crop&w=1400&q=70",
      badge: "KL • Langkawi",
    },
    {
      key: "singapore",
      name: "Singapore",
      flag: "🇸🇬",
      slug: "singapore",
      heroImage:
        "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=70",
      badge: "City break",
    },
    {
      key: "uae",
      name: "UAE",
      flag: "🇦🇪",
      slug: "uae",
      heroImage:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=70",
      badge: "Dubai",
    },
    {
      key: "japan",
      name: "Japan",
      flag: "🇯🇵",
      slug: "japan",
      heroImage:
        "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=1400&q=70",
      badge: "Tokyo • Osaka",
    },
    {
      key: "indonesia",
      name: "Indonesia",
      flag: "🇮🇩",
      slug: "indonesia",
      heroImage:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=70",
      badge: "Bali",
    },
  ],

  // 3–4 for North America
  na: [
    {
      key: "usa",
      name: "United States",
      flag: "🇺🇸",
      slug: "usa",
      heroImage:
        "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=1400&q=70",
      badge: "NYC • Orlando",
    },
    {
      key: "canada",
      name: "Canada",
      flag: "🇨🇦",
      slug: "canada",
      heroImage:
        "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1400&q=70",
      badge: "Toronto • Niagara",
    },
    {
      key: "mexico",
      name: "Mexico",
      flag: "🇲🇽",
      slug: "mexico",
      heroImage:
        "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1400&q=70",
      badge: "Cancún",
    },
    {
      key: "dominican",
      name: "Dominican Republic",
      flag: "🇩🇴",
      slug: "dominican-republic",
      heroImage:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=70",
      badge: "Resort",
    },
  ],

  // 3–4 for South America
  sa: [
    {
      key: "brazil",
      name: "Brazil",
      flag: "🇧🇷",
      slug: "brazil",
      heroImage:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1400&q=70",
      badge: "Rio",
    },
    {
      key: "argentina",
      name: "Argentina",
      flag: "🇦🇷",
      slug: "argentina",
      heroImage:
        "https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1400&q=70",
      badge: "Buenos Aires",
    },
    {
      key: "peru",
      name: "Peru",
      flag: "🇵🇪",
      slug: "peru",
      heroImage:
        "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1400&q=70",
      badge: "Machu Picchu",
    },
    {
      key: "colombia",
      name: "Colombia",
      flag: "🇨🇴",
      slug: "colombia",
      heroImage:
        "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1400&q=70",
      badge: "Cartagena",
    },
  ],

  // 3–4 for Africa
  africa: [
    {
      key: "egypt",
      name: "Egypt",
      flag: "🇪🇬",
      slug: "egypt",
      heroImage:
        "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1400&q=70",
      badge: "Cairo",
    },
    {
      key: "morocco",
      name: "Morocco",
      flag: "🇲🇦",
      slug: "morocco",
      heroImage:
        "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=70",
      badge: "Marrakech",
    },
    {
      key: "south-africa",
      name: "South Africa",
      flag: "🇿🇦",
      slug: "south-africa",
      heroImage:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=70",
      badge: "Cape Town",
    },
    {
      key: "kenya",
      name: "Kenya",
      flag: "🇰🇪",
      slug: "kenya",
      heroImage:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=70",
      badge: "Safari",
    },
  ],

  // 3–4 for Oceania
  oceania: [
    {
      key: "australia",
      name: "Australia",
      flag: "🇦🇺",
      slug: "australia",
      heroImage:
        "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?auto=format&fit=crop&w=1400&q=70",
      badge: "Sydney",
    },
    {
      key: "new-zealand",
      name: "New Zealand",
      flag: "🇳🇿",
      slug: "new-zealand",
      heroImage:
        "https://images.unsplash.com/photo-1502786129293-79981df4e689?auto=format&fit=crop&w=1400&q=70",
      badge: "Queenstown",
    },
    {
      key: "fiji",
      name: "Fiji",
      flag: "🇫🇯",
      slug: "fiji",
      heroImage:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=70",
      badge: "Islands",
    },
    {
      key: "papua",
      name: "Papua New Guinea",
      flag: "🇵🇬",
      slug: "papua-new-guinea",
      heroImage:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70",
      badge: "Nature",
    },
  ],
};

const multiCountryRoutes: Array<{
  key: string;
  title: string;
  subtitle: string;
  image: string;
  slug: string; // /tour-packages/[slug]
}> = [
  {
    key: "europe-multi",
    title: "Europe Multi-Country (Schengen)",
    subtitle: "France • Italy • Switzerland • Netherlands (example route)",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1400&q=70",
    slug: "europe-multi-country",
  },
  {
    key: "sea-combo",
    title: "Southeast Asia Combo",
    subtitle: "Thailand • Malaysia • Singapore",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1400&q=70",
    slug: "southeast-asia-combo",
  },
  {
    key: "gulf-combo",
    title: "Gulf Combo",
    subtitle: "UAE • Qatar • Oman (example route)",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=70",
    slug: "gulf-combo",
  },
  {
    key: "balkan-combo",
    title: "Balkan Explorer",
    subtitle: "Greece • Albania • Montenegro (example route)",
    image:
      "https://images.unsplash.com/photo-1505739773434-c1b5577f46b5?auto=format&fit=crop&w=1400&q=70",
    slug: "balkan-explorer",
  },
];

function makeDefaultPackages(countryName: string, slug: string): PackageCard[] {
  // keep it simple + realistic placeholders, CMS later
  return [
    {
      id: `${slug}-classic`,
      title: `${countryName} Classic Highlights`,
      duration: "5 Days / 4 Nights",
      fromPrice: "From Tk. 1,20,000",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=70",
      tags: ["Hotels", "Transfers", "Sightseeing"],
    },
    {
      id: `${slug}-premium`,
      title: `${countryName} Premium Experience`,
      duration: "7 Days / 6 Nights",
      fromPrice: "From Tk. 1,75,000",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70",
      tags: ["4 Star+", "Guided", "Flexible add-ons"],
    },
  ];
}

function Tabs({
  value,
  onChange,
}: {
  value: ContinentKey;
  onChange: (v: ContinentKey) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {continents.map((t) => {
        const active = t.key === value;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              "rounded-2xl px-4 py-2 text-sm border transition shadow-sm",
              active
                ? "border-[var(--evg-gold)]/50 bg-[var(--evg-gold)]/10 text-[var(--evg-deep)]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function CountrySubnav({
  countries,
  activeSlug,
  onPick,
}: {
  countries: Country[];
  activeSlug: string;
  onPick: (slug: string) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {countries.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <button
            key={c.slug}
            type="button"
            onClick={() => onPick(c.slug)}
            className={[
              "rounded-2xl px-4 py-2 text-sm border transition shadow-sm inline-flex items-center gap-2",
              active
                ? "border-[var(--evg-blue)]/35 bg-[var(--evg-blue)]/10 text-[var(--evg-deep)]"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
            ].join(" ")}
            title={c.name}
          >
            <span aria-hidden="true">{c.flag}</span>
            <span className="truncate max-w-[160px]">{c.name}</span>
            {c.badge ? (
              <span className="ml-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600">
                {c.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PackageGrid({
  items,
  detailsHrefForSlug,
}: {
  items: PackageCard[];
  detailsHrefForSlug: (pkgId: string) => string;
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <Card
          key={p.id}
          hairline
          className="group hover:border-slate-300 transition"
        >
          <div className="relative h-44 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
            <div className="absolute left-4 bottom-4 right-4">
              <div className="text-white/95 text-sm">{p.duration}</div>
              <div className="text-white text-lg font-semibold leading-tight">
                {p.title}
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="text-sm text-slate-600">{p.fromPrice}</div>

            {p.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-5 flex items-center justify-between">
              <Link
                href={detailsHrefForSlug(p.id)}
                className="rounded-2xl bg-[var(--evg-deep)] px-4 py-2 text-sm text-white shadow-sm hover:opacity-95 inline-flex items-center justify-center"
              >
                View Details
              </Link>

              <span className="text-xs text-slate-500">
                Click to open country page
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

/* =========================
   INTERNATIONAL (continent tabs + subnav)
========================= */

function InternationalTours() {
  const router = useRouter();
  const sp = useSearchParams();

  const urlContinent = (sp.get("continent") ?? "europe").toLowerCase();
  const urlCountry = (sp.get("country") ?? "").toLowerCase();

  const safeContinent: ContinentKey = ((
    ["europe", "asia", "na", "sa", "africa", "oceania", "multi"] as string[]
  ).includes(urlContinent)
    ? urlContinent
    : "europe") as ContinentKey;

  const [continent, setContinent] = React.useState<ContinentKey>(safeContinent);

  React.useEffect(() => {
    setContinent(safeContinent);
  }, [safeContinent]);

  const setQuery = (next: {
    continent?: ContinentKey;
    country?: string;
  }) => {
    const params = new URLSearchParams(sp.toString());
    if (next.continent) params.set("continent", next.continent);
    if (next.country !== undefined) {
      if (next.country) params.set("country", next.country);
      else params.delete("country");
    }
    router.replace(`/tour-packages?type=international&${params.toString()}`, {
      scroll: false,
    });
  };

  const onPickContinent = (v: ContinentKey) => {
    setContinent(v);

    // reset country when switching continent (except multi)
    if (v === "multi") setQuery({ continent: v, country: "" });
    else {
      const list = countriesByContinent[v as Exclude<ContinentKey, "multi">];
      const first = list?.[0]?.slug ?? "";
      setQuery({ continent: v, country: first });
    }
  };

  // Determine active country for subnav continents
  const activeCountrySlug = React.useMemo(() => {
    if (continent === "multi") return "";
    const list = countriesByContinent[continent];
    if (!list?.length) return "";
    const exists = list.some((c) => c.slug === urlCountry);
    return exists ? urlCountry : list[0].slug;
  }, [continent, urlCountry]);

  const activeCountry = React.useMemo(() => {
    if (continent === "multi") return null;
    return (
      countriesByContinent[continent].find((c) => c.slug === activeCountrySlug) ??
      countriesByContinent[continent][0]
    );
  }, [continent, activeCountrySlug]);

  const packages: PackageCard[] = React.useMemo(() => {
    if (continent === "multi") {
      // for multi, show route cards as packages
      return multiCountryRoutes.map((r) => ({
        id: r.slug,
        title: r.title,
        duration: "7–12 Days (varies)",
        fromPrice: "Request latest price",
        image: r.image,
        tags: ["Multi-country", "Guided", "Customizable"],
      }));
    }

    if (!activeCountry) return [];
    return makeDefaultPackages(activeCountry.name, activeCountry.slug).map(
      (p, idx) => ({
        ...p,
        // use country hero as first card image for nicer cohesion
        image: idx === 0 ? activeCountry.heroImage : p.image,
      })
    );
  }, [continent, activeCountry]);

  const detailsHrefForPkg = (pkgId: string) => {
    // redirect to country page (or multi route page).
    // you can parse pkgId later if you want /tour-packages/[country]/[pkg]
    if (continent === "multi") return `/tour-packages/${pkgId}`;
    return `/tour-packages/${activeCountry?.slug ?? "country"}`;
  };

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
                countries={countriesByContinent[continent]}
                activeSlug={activeCountrySlug}
                onPick={(slug) => setQuery({ continent, country: slug })}
              />

              <div className="mt-5 text-sm text-slate-600">
                Showing packages for{" "}
                <span className="text-slate-900">{activeCountry?.name}</span>.
                Click View Details to open the country page.
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

/* =========================
   LOCAL (kept simple placeholder)
========================= */

function LocalTours() {
  const localCards: PackageCard[] = [
    {
      id: "sundarbans",
      title: "Sundarbans Adventure",
      duration: "3 Days / 2 Nights",
      fromPrice: "From Tk. 18,000",
      image:
        "https://images.unsplash.com/photo-1520454974749-611b7248ffdb?auto=format&fit=crop&w=1400&q=70",
      tags: ["Cruise", "Forest", "Meals"],
    },
    {
      id: "coxsbazar",
      title: "Cox’s Bazar Relax",
      duration: "3 Days / 2 Nights",
      fromPrice: "From Tk. 12,500",
      image:
        "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=70",
      tags: ["Beach", "Hotel", "Transport"],
    },
    {
      id: "sylhet",
      title: "Sylhet Tea Gardens",
      duration: "3 Days / 2 Nights",
      fromPrice: "From Tk. 13,500",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70",
      tags: ["Nature", "Resort", "Sightseeing"],
    },
  ];

  return (
    <div>
      <Card hairline className="p-5 sm:p-7">
        <div className="text-sm tracking-[0.18em] text-[var(--evg-deep)]/60">
          LOCAL TOURS
        </div>
        <div className="mt-2 text-sm sm:text-base text-slate-600">
          Popular Bangladesh packages (placeholder). View Details will route to
          country/page later.
        </div>
      </Card>

      <PackageGrid
        items={localCards}
        detailsHrefForSlug={(id) => `/tour-packages/${id}`}
      />
    </div>
  );
}

export default function TourPackagesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();
  const urlType: TourCategoryKey =
    typeParam === "local" ? "local" : "international";

  const [category, setCategory] = React.useState<TourCategoryKey>(urlType);

  React.useEffect(() => {
    setCategory(urlType);
  }, [urlType]);

  const onChange = (v: TourCategoryKey) => {
    setCategory(v);

    // keep continent/country params if present
    const params = new URLSearchParams(searchParams.toString());
    params.set("type", v);
    router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
  };

  // ensure default continent/country exists for international (clean UX)
  React.useEffect(() => {
    if (category !== "international") return;

    const params = new URLSearchParams(searchParams.toString());
    const continent = (params.get("continent") ?? "").toLowerCase();

    const continentOk = (
      ["europe", "asia", "na", "sa", "africa", "oceania", "multi"] as string[]
    ).includes(continent);

    if (!continentOk) {
      params.set("continent", "europe");
      params.set("country", countriesByContinent.europe[0].slug);
      router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
      return;
    }

    if (continent !== "multi") {
      const list =
        countriesByContinent[continent as Exclude<ContinentKey, "multi">];
      const country = (params.get("country") ?? "").toLowerCase();
      const has = list?.some((c) => c.slug === country);

      if (!has) {
        params.set("country", list?.[0]?.slug ?? "");
        router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
      }
    } else {
      // multi: no country
      if (params.get("country")) {
        params.delete("country");
        router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <PageShell>
      <Container>
        <Card hairline className="p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
          />
          <div className="relative">
            <Dropdown value={category} onChange={onChange} />
          </div>
        </Card>

        <Divider />

        {category === "international" ? <InternationalTours /> : <LocalTours />}

        <Divider />

        <div className="text-sm text-slate-600 leading-relaxed">
          Next step: create dynamic pages under{" "}
          <span className="text-slate-900">/src/app/tour-packages/[slug]</span>{" "}
          to render country-specific details + multiple packages per country from
          CMS.
        </div>
      </Container>
    </PageShell>
  );
}