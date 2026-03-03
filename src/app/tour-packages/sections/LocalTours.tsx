"use client";

import React from "react";
import type { CmsTour } from "../types";
import { Card } from "../components/Ui";
import { PackageGrid } from "../components/PackageGrid";
import { buildLocalCards } from "../lib/mappers";

export function LocalTours({ tours }: { tours: CmsTour[] }) {
  const localCards = React.useMemo(() => buildLocalCards(tours), [tours]);

  return (
    <div>
      <Card hairline className="p-5 sm:p-7">
        <div className="text-sm tracking-[0.18em] text-[var(--evg-deep)]/60">
          LOCAL TOURS
        </div>
        <div className="mt-2 text-sm sm:text-base text-slate-600">
          Bangladesh packages from CMS. View Details routes to /tour-packages/[slug].
        </div>
      </Card>

      <PackageGrid
        items={localCards}
        detailsHrefForSlug={(id) => `/tour-packages/${id}`}
      />
    </div>
  );
}