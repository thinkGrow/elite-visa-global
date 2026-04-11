"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { themeVars } from "@/lib/theme";
import { Navbar } from "@/components/home/layout/Navbar";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";

type HajjCategoryKey = "hajj" | "umrah";

type PilgrimageSection =
  | {
      _type: "pilgrimageBulletSection";
      heading: string;
      items?: string[];
    }
  | {
      _type: "pilgrimageKeyValueSection";
      heading: string;
      rows?: Array<{
        label: string;
        value: string;
      }>;
    };

type CmsPilgrimagePackage = {
  _id: string;
  title: string;
  subtitle?: string;
  metaLeft?: string;
  metaRight?: string;
  highlights?: string[];
  callout?: string;
  sections?: PilgrimageSection[];
};

type HajjUmrahClientProps = {
  umrahPackages: CmsPilgrimagePackage[];
  hajjPackages: CmsPilgrimagePackage[];
};

/* ===== shared shell bits (same as visa/tours) ===== */

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

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-7 flex items-center gap-3 text-base font-semibold text-[var(--evg-deep)] sm:text-lg">
      <span className="h-2 w-2 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.14)]" />
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3 text-sm text-slate-700 sm:text-base">
          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-[var(--evg-blue)]/70" />
          <span className="leading-relaxed">{t}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyValueGrid({
  rows,
}: {
  rows: Array<{ k: string; v: React.ReactNode }>;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      {rows.map((r, i) => (
        <div
          key={i}
          className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4 shadow-[0_10px_28px_rgba(2,6,23,0.05)]"
        >
          <div className="text-xs uppercase tracking-wide text-slate-500">
            {r.k}
          </div>
          <div className="mt-1 text-sm leading-relaxed text-slate-800 sm:text-base">
            {r.v}
          </div>
        </div>
      ))}
    </div>
  );
}

function AccentCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[var(--evg-gold)] shadow-[0_0_0_4px_rgba(214,162,58,0.12)]" />
        <div className="text-sm leading-relaxed text-slate-700">{children}</div>
      </div>
    </div>
  );
}

/* ===== top header dropdown ===== */

function Dropdown({
  value,
  onChange,
}: {
  value: HajjCategoryKey;
  onChange: (v: HajjCategoryKey) => void;
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-4xl border-l border-[color:var(--evg-gold)]/60 pl-6">
        <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
          ELITE VISA GLOBAL
        </div>

        <div className="mt-3 flex items-center gap-3">
<h2 className="text-3xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-4xl">
  {value === "umrah" ? "Umrah" : "Hajj"}
</h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          Packages, pre-registration, and guided support—structured and
          transparent. Choose Hajj or Umrah to explore.
        </p>
      </div>

      <div className="w-full sm:w-[420px]">
        <label className="block text-xs uppercase tracking-wide text-slate-500">
          Dropdown Menu
        </label>
        <div className="relative mt-2">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as HajjCategoryKey)}
            className="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-[var(--evg-gold)]/60 focus:ring-2 focus:ring-[var(--evg-gold)]/20 sm:text-base"
          >
            <option value="hajj">Hajj</option>
            <option value="umrah">Umrah</option>
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            ▼
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          Click a package to expand. Only one opens at a time.
        </div>
      </div>
    </div>
  );
}

/* ===== accordion ===== */

type AccordionPkg = {
  id: string;
  title: string;
  subtitle?: string;
  metaLeft?: string;
  metaRight?: string;
  highlights: string[];
  body: React.ReactNode;
};

function PackagesAccordion({ items }: { items: AccordionPkg[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <div className="mt-8 grid gap-4">
      {items.map((pkg) => {
        const open = pkg.id === activeId;

        return (
          <Card
            key={pkg.id}
            hairline
            className={[
              "transition",
              open
                ? "border-[var(--evg-gold)]/40 ring-2 ring-[var(--evg-gold)]/15"
                : "hover:border-slate-300",
            ].join(" ")}
          >
            <button
              type="button"
              onClick={() => setActiveId(open ? null : pkg.id)}
              className="w-full p-5 text-left sm:p-7"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-lg font-semibold text-[var(--evg-deep)] sm:text-xl">
                    {pkg.title}
                  </div>

                  {pkg.subtitle ? (
                    <div className="mt-1 text-sm text-slate-600">
                      {pkg.subtitle}
                    </div>
                  ) : null}

                  <div className="mt-3 grid gap-2 text-sm text-slate-700">
                    {pkg.metaLeft ? (
                      <div className="text-slate-700">{pkg.metaLeft}</div>
                    ) : null}
                    {pkg.metaRight ? (
                      <div className="text-slate-600">{pkg.metaRight}</div>
                    ) : null}
                  </div>

                  <ul className="mt-4 grid gap-1 text-sm text-slate-700">
                    {pkg.highlights.slice(0, 4).map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[var(--evg-gold)]/80" />
                        <span className="min-w-0">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <div
                    className={[
                      "grid h-10 w-10 place-items-center rounded-2xl border",
                      open
                        ? "border-[var(--evg-gold)]/40 bg-[var(--evg-gold)]/10"
                        : "border-slate-200 bg-slate-50",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    <span
                      className={open ? "rotate-180 transition" : "transition"}
                    >
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {open ? (
              <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                <div className="mb-6 h-px bg-slate-200/70" />
                <div className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {pkg.body}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">
                    Want EVG to confirm availability and pricing for your dates?
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 shadow-sm hover:bg-slate-50"
                      onClick={() => setActiveId(null)}
                    >
                      Close
                    </button>

                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-2xl bg-[var(--evg-deep)] px-4 py-2 text-sm text-white shadow-sm hover:opacity-95"
                    >
                      Request Details
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

/* ===== cms section renderer ===== */

function RenderPilgrimageBody({ pkg }: { pkg: CmsPilgrimagePackage }) {
  return (
    <>
      {pkg.callout ? <AccentCallout>{pkg.callout}</AccentCallout> : null}

      {pkg.sections?.map((section, i) => {
        if (section._type === "pilgrimageBulletSection") {
          return (
            <div key={i}>
              <Subheading>{section.heading}</Subheading>
              <BulletList items={section.items ?? []} />
            </div>
          );
        }

        if (section._type === "pilgrimageKeyValueSection") {
          return (
            <div key={i}>
              <Subheading>{section.heading}</Subheading>
              <KeyValueGrid
                rows={(section.rows ?? []).map((r) => ({
                  k: r.label,
                  v: r.value,
                }))}
              />
            </div>
          );
        }

        return null;
      })}

      <div className="mt-6">
{/* <PrimaryCTA> */}
      </div>
    </>
  );
}

/* ===== dynamic sections ===== */

function Umrah({ packages }: { packages: CmsPilgrimagePackage[] }) {
  const items: AccordionPkg[] = packages.map((pkg) => ({
    id: pkg._id,
    title: pkg.title,
    subtitle: pkg.subtitle,
    metaLeft: pkg.metaLeft,
    metaRight: pkg.metaRight,
    highlights: pkg.highlights ?? [],
    body: <RenderPilgrimageBody pkg={pkg} />,
  }));

  return (
    <div>
      <PackagesAccordion items={items} />

      <Divider />


    </div>
  );
}

function Hajj({ packages }: { packages: CmsPilgrimagePackage[] }) {
  const items: AccordionPkg[] = packages.map((pkg) => ({
    id: pkg._id,
    title: pkg.title,
    subtitle: pkg.subtitle,
    metaLeft: pkg.metaLeft,
    metaRight: pkg.metaRight,
    highlights: pkg.highlights ?? [],
    body: <RenderPilgrimageBody pkg={pkg} />,
  }));

  return (
    <div>
      <PackagesAccordion items={items} />

      <Divider />


    </div>
  );
}

export default function HajjUmrahClient({
  umrahPackages,
  hajjPackages,
}: HajjUmrahClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = (searchParams.get("type") ?? "").toLowerCase();
  const initial: HajjCategoryKey = typeParam === "umrah" ? "umrah" : "hajj";

  const [category, setCategory] = React.useState<HajjCategoryKey>(initial);

  React.useEffect(() => {
    const t = (searchParams.get("type") ?? "").toLowerCase();
    const next: HajjCategoryKey = t === "umrah" ? "umrah" : "hajj";
    setCategory(next);
  }, [searchParams]);

  const onChange = (v: HajjCategoryKey) => {
    setCategory(v);
    router.replace(`/hajj-umrah?type=${v}`, { scroll: false });
  };

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

        {category === "hajj" ? (
          <Hajj packages={hajjPackages} />
        ) : (
          <Umrah packages={umrahPackages} />
        )}




      </Container>
    </PageShell>
  );
}