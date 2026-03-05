import React from "react";
import Link from "next/link";
import type { PackageCard } from "../types";
import { Card } from "./Ui";

export function PackageGrid({
  items,
  detailsHrefForSlug,
}: {
  items: PackageCard[];
  detailsHrefForSlug: (pkgId: string) => string;
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => {
        const href = detailsHrefForSlug(p.id);

        return (
          <Link  key={p.id} href={href} className="block">
            <Card
              hairline
              className="group hover:border-slate-300 transition cursor-pointer"
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
                  <span className="rounded-2xl bg-[var(--evg-deep)] px-4 py-2 text-sm text-white shadow-sm group-hover:opacity-95 inline-flex items-center justify-center">
                    View Details
                  </span>

                  <span className="text-xs text-slate-500">Opens package page</span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}