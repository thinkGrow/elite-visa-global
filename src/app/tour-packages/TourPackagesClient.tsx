"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { CmsTour, TourCategoryKey } from "./types";
import { PageShell, Container, Divider } from "./components/Shell";
import { Card } from "./components/Ui";
import { Dropdown } from "./components/Dropdown";
import { InternationalTours } from "./sections/InternationalTours";
import { LocalTours } from "./sections/LocalTours";

export default function TourPackagesClient({ tours }: { tours: CmsTour[] }) {
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

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", v);
    router.replace(`/tour-packages?${params.toString()}`, { scroll: false });
  };

  const headerBg =
    category === "international"
      ? "/tours/hero-international.jpg"
      : "/tours/hero-local.jpg";

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
          </div>
        </Card>

        <Divider />

        {category === "international" ? (
          <InternationalTours tours={tours} />
        ) : (
          <LocalTours tours={tours} />
        )}

        <Divider />

        <div className="text-sm text-slate-600 leading-relaxed">
          CMS enabled. Next: build dynamic pages under{" "}
          <span className="text-slate-900">/src/app/tour-packages/[slug]</span>{" "}
          to render package details from Sanity.
        </div>
      </Container>
    </PageShell>
  );
}