"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";
import { client } from "@/sanity/lib/client";

type VisaCategoryKey = "student" | "visit";

type VisaDestination = {
  countrySlug: string;
  countryName: string;
  shortName?: string;
  flagEmoji: string;
  badge?: string;
  displayOrder?: number;
  heroTitle?: string;
  heroSubtitle?: string;
  processingTime?: string;
  visaFee?: string;
  overview?: any[];
  requirements?: any[];
  documents?: any[];
  notes?: any[];
};

const visaDestinationsQuery = `
*[
  _type == "visaCountryContent" &&
  visaCategory == $category &&
  isPublishedDestination == true
] | order(displayOrder asc, country->name asc) {
  badge,
  heroTitle,
  heroSubtitle,
  processingTime,
  visaFee,
  overview,
  requirements,
  documents,
  notes,
  displayOrder,
  "countrySlug": country->slug.current,
  "countryName": country->name,
  "shortName": country->shortName,
  "flagEmoji": country->flagEmoji
}
`;

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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-28">
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--evg-deep)]">
            {title}
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>
        {subtitle ? (
          <p className="mt-3 text-sm sm:text-base text-slate-600">{subtitle}</p>
        ) : null}
      </div>

      <Card hairline className="p-5 sm:p-7">
        {children}
      </Card>
    </section>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 flex items-center gap-3 text-base font-semibold text-[var(--evg-deep)] sm:text-lg">
      <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.14)]" />
      {children}
    </h3>
  );
}

function FlagsPicker({
  title,
  items,
  selected,
  onSelect,
  layout = "wrap",
}: {
  title: string;
  items: VisaDestination[];
  selected: string;
  onSelect: (slug: string) => void;
  layout?: "wrap" | "grid";
}) {
  const listClass =
    layout === "grid"
      ? "mt-1 grid grid-cols-2 gap-2 sm:mt-0 sm:grid-cols-4 lg:grid-cols-5"
      : "flex flex-wrap gap-2";

  return (
    <Card hairline className="p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm font-medium text-[var(--evg-deep)]">
          {title}
        </div>

        <div className={listClass}>
          {items.map((c) => {
            const isActive = c.countrySlug === selected;

            return (
              <button
                key={c.countrySlug}
                type="button"
                onClick={() => onSelect(c.countrySlug)}
                className={[
                  "group inline-flex items-center gap-2 rounded-full",
                  "border bg-white px-3 py-2 text-sm",
                  "shadow-sm transition",
                  layout === "grid" ? "justify-start" : "",
                  isActive
                    ? "border-[var(--evg-gold)]/70 bg-[rgba(214,162,58,0.08)] text-[var(--evg-deep)]"
                    : "border-slate-200 text-slate-700 hover:-translate-y-0.5 hover:border-[var(--evg-gold)]/70 hover:shadow-md",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--evg-gold)]/25",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <span className="text-base transition-transform duration-300 group-hover:scale-[1.08]">
                  {c.flagEmoji}
                </span>

                <span className="truncate underline-offset-4 group-hover:underline group-hover:decoration-[var(--evg-gold)]">
                  {c.shortName || c.countryName}
                </span>

                {c.badge ? (
                  <span className="ml-1 hidden sm:inline-flex">
                    <Badge>{c.badge}</Badge>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
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

        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-4xl">
            Visa Processing
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Compliance-focused guidance for students, tourists, families, and
          business travelers—structured, transparent, and visa-ready.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="relative mt-2">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as VisaCategoryKey)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20 sm:text-base"
          >
            <option value="student">Student Visa Processing</option>
            <option value="visit">
              Visit, Family & Business Visa Processing
            </option>
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}

const ptComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-8 text-xl font-semibold text-[var(--evg-deep)] sm:text-2xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-6 text-lg font-semibold text-[var(--evg-deep)]">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="mt-4 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-700 sm:text-base">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-700 marker:text-[var(--evg-gold)] sm:text-base">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-3 list-decimal space-y-2 pl-6 text-sm text-slate-700 marker:text-[var(--evg-gold)] sm:text-base">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },

  marks: {
    goldText: ({ children }: any) => (
      <span className="text-[var(--evg-gold)]">{children}</span>
    ),
    blueText: ({ children }: any) => (
      <span className="text-[var(--evg-blue)]">{children}</span>
    ),
    link: ({ children, value }: any) => {
      const href = value?.href || "#";
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          href={href}
          className="text-[var(--evg-deep)] underline underline-offset-4 hover:opacity-80"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },

  types: {
    callout: ({ value }: any) => {
      const tone = value?.tone ?? "info";
      const toneCls =
        tone === "success"
          ? "border-emerald-200 bg-emerald-50"
          : tone === "warning"
            ? "border-amber-200 bg-amber-50"
            : "border-slate-200 bg-slate-50";

      return (
        <div className={`mt-5 rounded-2xl border p-4 ${toneCls}`}>
          {value?.title ? (
            <div className="text-sm font-semibold text-slate-900">
              {value.title}
            </div>
          ) : null}
          {value?.text ? (
            <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-base">
              {value.text}
            </div>
          ) : null}
        </div>
      );
    },

    tableBlock: ({ value }: any) => {
      const rows = value?.rows ?? [];

      return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {value?.title ? (
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900">
              {value.title}
            </div>
          ) : null}

          <table className="w-full text-sm">
            <tbody>
              {rows.map((r: any, i: number) => (
                <tr key={i} className="border-t first:border-t-0">
                  <td className="w-[38%] bg-slate-50 px-4 py-3 font-medium text-slate-600">
                    {r?.label}
                  </td>
                  <td className="px-4 py-3 text-slate-900">{r?.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

function VisaContentSection({ data }: { data: VisaDestination }) {
  return (
    <Section
      title={data.heroTitle || `${data.countryName} Visa`}
      subtitle={data.heroSubtitle}
    >
      {data.badge || data.processingTime || data.visaFee ? (
        <div className="mb-2 flex flex-wrap gap-2">
          {data.badge ? <Badge>{data.badge}</Badge> : null}
          {data.processingTime ? (
            <Badge>Processing: {data.processingTime}</Badge>
          ) : null}
          {data.visaFee ? <Badge>Fee: {data.visaFee}</Badge> : null}
        </div>
      ) : null}

      {data.overview?.length ? (
        <>
          <Subheading>Overview</Subheading>
          <PortableText value={data.overview} components={ptComponents} />
        </>
      ) : null}

      {data.requirements?.length ? (
        <>
          <Subheading>Requirements</Subheading>
          <PortableText value={data.requirements} components={ptComponents} />
        </>
      ) : null}

      {data.documents?.length ? (
        <>
          <Subheading>Required Documents</Subheading>
          <PortableText value={data.documents} components={ptComponents} />
        </>
      ) : null}

      {data.notes?.length ? (
        <>
          <Subheading>Important Notes</Subheading>
          <PortableText value={data.notes} components={ptComponents} />
        </>
      ) : null}
    </Section>
  );
}

export default function VisaProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();
  const countryParam = (searchParams.get("country") ?? "").toLowerCase();

  const initialCategory: VisaCategoryKey =
    typeParam === "visit" ? "visit" : "student";

  const [category, setCategory] =
    React.useState<VisaCategoryKey>(initialCategory);
  const [destinations, setDestinations] = React.useState<VisaDestination[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCountrySlug, setSelectedCountrySlug] =
    React.useState(countryParam);

  React.useEffect(() => {
    const t = (searchParams.get("type") ?? "").toLowerCase();
    const nextCategory: VisaCategoryKey = t === "visit" ? "visit" : "student";
    const nextCountry = (searchParams.get("country") ?? "").toLowerCase();

    setCategory(nextCategory);
    setSelectedCountrySlug(nextCountry);
  }, [searchParams]);

  React.useEffect(() => {
    let mounted = true;

    async function loadDestinations() {
      setLoading(true);

      try {
        const data = await client.fetch<VisaDestination[]>(
          visaDestinationsQuery,
          { category },
        );

        if (!mounted) return;

        const safeData = data ?? [];
        setDestinations(safeData);

        setSelectedCountrySlug((prev) => {
          if (safeData.some((item) => item.countrySlug === prev)) return prev;
          return safeData[0]?.countrySlug ?? "";
        });
      } catch (error) {
        console.error("Failed to load visa destinations:", error);
        if (mounted) {
          setDestinations([]);
          setSelectedCountrySlug("");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDestinations();

    return () => {
      mounted = false;
    };
  }, [category]);

  const onChangeCategory = (v: VisaCategoryKey) => {
    setCategory(v);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", v);
    params.delete("country");

    router.replace(`/visa-processing?${params.toString()}`, { scroll: false });
  };

  const onSelectCountry = (slug: string) => {
    setSelectedCountrySlug(slug);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", category);
    params.set("country", slug);

    router.replace(`/visa-processing?${params.toString()}`, { scroll: false });
  };

  const selected = destinations.find(
    (item) => item.countrySlug === selectedCountrySlug,
  );

  const pickerTitle =
    category === "student"
      ? "Student visa destinations"
      : "Visit, family & business destinations";

  const pickerLayout = "wrap";

  return (
    <PageShell>
      <Container>
        <Card hairline className="p-5 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
          />
          <div className="relative">
            <Dropdown value={category} onChange={onChangeCategory} />
          </div>
        </Card>

        <Divider />

        {loading ? (
          <div className="text-sm text-slate-500">Loading destinations...</div>
        ) : !destinations.length ? (
          <div className="text-sm text-slate-500">
            No visa destinations found in CMS.
          </div>
        ) : (
          <div className="space-y-10">
            <FlagsPicker
              title={pickerTitle}
              items={destinations}
              selected={selectedCountrySlug}
              onSelect={onSelectCountry}
              layout={pickerLayout}
            />

            {selected ? <VisaContentSection data={selected} /> : null}
          </div>
        )}
      </Container>
    </PageShell>
  );
}