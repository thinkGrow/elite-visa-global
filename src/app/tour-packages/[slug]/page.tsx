// src/app/tour-packages/[slug]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { tourBySlugQuery } from "@/lib/tours/queries";
import { PageShell, Container, Divider } from "../components/Shell";

export const revalidate = 60;

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tour = await client.fetch(tourBySlugQuery, { slug });

  if (!tour) return notFound();

  return (
    <PageShell>
      <Container>
        {tour.heroImage ? (
          <div className="relative h-[360px] w-full overflow-hidden rounded-2xl">
            <Image
              src={urlFor(tour.heroImage).width(1800).height(1000).url()}
              alt={tour.title}
              fill
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
          </div>
        ) : null}

        <div className="mt-8">
          <div className="text-sm tracking-[0.18em] text-[var(--evg-deep)]/60">
            TOUR PACKAGE
          </div>

          <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[var(--evg-deep)]">
            {tour.title}
          </h1>

          {tour.badges?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {tour.badges.map((b: string) => (
                <span
                  key={b}
                  className="rounded-full bg-[var(--evg-gold)]/15 px-3 py-1 text-xs text-[var(--evg-deep)]"
                >
                  {b}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <Divider />

        <div className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-2xl border p-4">
            <div className="text-slate-500">Country</div>
            <div className="font-medium text-slate-900">{tour.country || "—"}</div>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="text-slate-500">City</div>
            <div className="font-medium text-slate-900">{tour.city || "—"}</div>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="text-slate-500">Duration</div>
            <div className="font-medium text-slate-900">
              {tour.durationText || "—"}
            </div>
          </div>
        </div>

        {tour.fromPriceText ? (
          <div className="mt-6 text-xl font-semibold text-[var(--evg-gold)]">
            From {tour.fromPriceText}
          </div>
        ) : null}

        {tour.summary ? (
          <div className="mt-8 rounded-2xl border bg-white p-6 text-slate-700 leading-relaxed">
            {tour.summary}
          </div>
        ) : null}

        {tour.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {tour.tags.map((t: string) => (
              <span key={t} className="rounded-full border px-3 py-1 text-xs">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </Container>
    </PageShell>
  );
}