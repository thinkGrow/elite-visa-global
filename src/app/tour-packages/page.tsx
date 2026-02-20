import React, { Suspense } from "react";
import TourPackagesClient from "./TourPackagesClient";

export default function TourPackagesPage() {
  return (
    <Suspense fallback={null}>
      <TourPackagesClient />
    </Suspense>
  );
}