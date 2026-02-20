import React, { Suspense } from "react";
import VisaProcessingClient from "./VisaProcessingClient";

export default function VisaProcessingPage() {
  return (
    <Suspense fallback={null}>
      <VisaProcessingClient></VisaProcessingClient>
    </Suspense>
  );
}
