// src/app/visa-processing/[country]/page.tsx

import React from "react";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
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

const visaDestinationByCountryQuery = `
*[
  _type == "visaCountryContent" &&
  visaCategory == $category &&
  country->slug.current == $countrySlug &&
  isPublishedDestination == true
][0] {
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
          <h2 className="text-xl font-semibold tracking-tight text-[var(--evg-deep)] sm:text-2xl">
            {title}
          </h2>
          <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
        </div>

        {subtitle ? (
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{subtitle}</p>
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

export default async function VisaCountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { country } = await params;
  const resolvedSearchParams = await searchParams;

  const rawType = (resolvedSearchParams.type ?? "").toLowerCase();

  const category: VisaCategoryKey =
    rawType === "visit"
      ? "visit"
      : rawType === "transit"
        ? "transit"
        : "student";

  const data = await client.fetch<VisaDestination | null>(
    visaDestinationByCountryQuery,
    {
      category,
      countrySlug: country,
    },
  );

  if (!data) notFound();

  const backHref = `/visa-processing?type=${category}`;

  return (
    <PageShell>
      <Container>
        <div className="space-y-10">
          <Card hairline className="p-5 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_0%,rgba(28,90,168,0.10),transparent_55%),radial-gradient(700px_circle_at_85%_20%,rgba(214,162,58,0.10),transparent_55%)]"
            />

            <div className="relative">
              <a
                href={backHref}
                className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-[var(--evg-deep)]"
              >
                ← Back to visa destinations
              </a>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-4xl border-l border-[color:var(--evg-gold)]/60 pl-6">
                  <div className="text-sm tracking-[0.22em] text-[var(--evg-deep)]/60">
                    ELITE VISA GLOBAL
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-4xl">
                      <span className="mr-3">{data.flagEmoji}</span>
                      {data.countryName}
                    </h1>
                    <span className="h-[2px] flex-1 bg-gradient-to-r from-[var(--evg-gold)]/75 to-transparent" />
                  </div>

                  <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                    {category === "student"
                      ? "Student visa processing details and structured requirements."
                      : category === "visit"
                        ? "Visit, family, and business visa processing details."
                        : "Transit visa processing details and required documentation."}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <VisaContentSection data={data} />
        </div>
      </Container>
    </PageShell>
  );
}