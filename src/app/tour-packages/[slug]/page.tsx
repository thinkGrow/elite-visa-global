import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { tourBySlugQuery } from "@/lib/tours/queries";
import { PageShell, Container, Divider } from "../components/Shell";

export const revalidate = 60;

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <div className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--evg-deep)]/55">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--evg-deep)] md:text-3xl">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-base font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await client.fetch(tourBySlugQuery, { slug });

  if (!tour) return notFound();

  const ptComponents = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="mt-10 text-2xl font-semibold text-[var(--evg-deep)] md:text-3xl">
          {children}
        </h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="mt-8 text-xl font-semibold text-slate-900 md:text-2xl">
          {children}
        </h3>
      ),
      normal: ({ children }: any) => (
        <p className="mt-4 leading-8 text-slate-700">{children}</p>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-relaxed text-slate-700">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }: any) => (
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
          {children}
        </ul>
      ),
      number: ({ children }: any) => (
        <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }: any) => <li className="pl-1">{children}</li>,
      number: ({ children }: any) => <li className="pl-1">{children}</li>,
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
            className="text-[var(--evg-deep)] underline underline-offset-4 hover:opacity-90"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
          >
            {children}
          </a>
        );
      },
    },

    types: {
      image: ({ value }: any) => (
        <div className="my-8">
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl md:h-[360px]">
            <Image
              src={urlFor(value).width(1800).height(1000).url()}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),

      callout: ({ value }: any) => {
        const tone = value?.tone ?? "info";
        const toneCls =
          tone === "success"
            ? "border-emerald-200 bg-emerald-50"
            : tone === "warning"
              ? "border-amber-200 bg-amber-50"
              : "border-slate-200 bg-slate-50";

        return (
          <div className={`my-8 rounded-2xl border p-5 ${toneCls}`}>
            {value?.title ? (
              <div className="text-sm font-semibold text-slate-900">
                {value.title}
              </div>
            ) : null}

            {value?.text ? (
              <div className="mt-2 whitespace-pre-line leading-relaxed text-slate-700">
                {value.text}
              </div>
            ) : null}
          </div>
        );
      },

      tableBlock: ({ value }: any) => {
        const rows = value?.rows ?? [];

        return (
          <div className="my-10">
            {value?.title ? (
              <div className="mb-3 text-sm font-semibold text-slate-900">
                {value.title}
              </div>
            ) : null}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
          </div>
        );
      },
    },
  };

  const infoCards = [
    { label: "Country", value: tour.country || "—" },
    { label: "City / Region", value: tour.city || "—" },
    { label: "Duration", value: tour.durationText || "—" },
  ];

  return (
    <PageShell>
      <Container>
        {/* HERO SECTION (unchanged) */}
        {/* ... all your existing code stays exactly the same ... */}

        {tour.summaryContent?.length ? (
          <>
            <Divider />
            <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="min-w-0">
                <SectionHeading
                  eyebrow="Package overview"
                  title="Overview"
                  subtitle="A fuller breakdown of the experience, package details, and important context."
                />

                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                  <div className="prose prose-slate max-w-none">
                    <PortableText
                      value={tour.summaryContent}
                      components={ptComponents}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {tour.includes?.length ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                      Includes
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
                      {tour.includes.map((item: string, i: number) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {tour.excludes?.length ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                      Excludes
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
                      {tour.excludes.map((item: string, i: number) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </>
        ) : null}

        {!tour.summaryContent?.length &&
        (tour.includes?.length || tour.excludes?.length) ? (
          <>
            <Divider />
            <section>
              <SectionHeading
                eyebrow="Package scope"
                title="Includes & Excludes"
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {tour.includes?.length ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                      Includes
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
                      {tour.includes.map((item: string, i: number) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {tour.excludes?.length ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-[var(--evg-deep)]">
                      Excludes
                    </h3>
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-700 marker:text-[var(--evg-gold)]">
                      {tour.excludes.map((item: string, i: number) => (
                        <li key={`${item}-${i}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          </>
        ) : null}

        {tour.itinerary?.length ? (
          <>
            <Divider />
            <section>
              <SectionHeading
                eyebrow="Trip flow"
                title="Itinerary"
                subtitle="A day-by-day view of how the package is planned."
              />

              <div className="mt-8 space-y-5">
                {tour.itinerary.map((day: any, i: number) => (
                  <div
                    key={i}
                    className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[90px_1fr] md:p-6"
                  >
                    <div className="flex flex-row items-start gap-3 md:flex-col md:gap-2">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--evg-deep)] text-sm font-semibold text-white">
                        {day?.day ?? i + 1}
                      </div>
                      <div className="pt-2 text-xs uppercase tracking-[0.18em] text-slate-500 md:pt-0">
                        Day
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
                        {day?.title || `Day ${day?.day ?? i + 1}`}
                      </h3>

                      {day?.description ? (
                        <p className="mt-3 whitespace-pre-line leading-8 text-slate-700">
                          {day.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {tour.remarksContent?.length ? (
          <>
            <Divider />
            <section>
              <SectionHeading
                eyebrow="Important notes"
                title="Remarks"
                subtitle="Policies, reminders, travel notes, and any important package-specific instructions."
              />

              <div className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/60 p-6 shadow-sm md:p-8">
                <div className="max-w-4xl">
                  <PortableText
                    value={tour.remarksContent}
                    components={ptComponents}
                  />
                </div>
              </div>
            </section>
          </>
        ) : null}

        {tour.faq?.length ? (
          <>
            <Divider />
            <section>
              <SectionHeading
                eyebrow="Questions people usually ask"
                title="FAQ"
                subtitle="Helpful answers to the most common package questions."
              />

              <div className="mt-6 space-y-4">
                {tour.faq.map((item: any, i: number) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-slate-900">
                      {item?.question}
                    </h3>

                    {item?.answer ? (
                      <p className="mt-3 whitespace-pre-line leading-8 text-slate-700">
                        {item.answer}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}
      </Container>
    </PageShell>
  );
}
