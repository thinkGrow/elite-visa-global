// src/app/tour-packages/page.tsx

import React, { Suspense } from "react";
import TourPackagesClient from "./TourPackagesClient";
import { client as sanityClient } from "@/sanity/lib/client";
import { toursListQuery } from "@/lib/tours/queries";

export const revalidate = 60; // ISR – refresh every 60s

export default async function TourPackagesPage() {
  const tours = await sanityClient.fetch(toursListQuery);

  return (
    <Suspense fallback={null}>
      <TourPackagesClient tours={tours} />
    </Suspense>
  );
}
