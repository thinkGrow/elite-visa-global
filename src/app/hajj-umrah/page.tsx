import React, { Suspense } from "react";
import HajjUmrahClient from "./HajjUmrahClient";

export default function HajjUmrahPage() {
  return (
    <Suspense fallback={null}>
      <HajjUmrahClient />
    </Suspense>
  );
}