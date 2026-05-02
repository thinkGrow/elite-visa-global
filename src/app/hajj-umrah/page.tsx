import { client } from "@/sanity/lib/client";
import HajjUmrahClient from "./HajjUmrahClient";
import { pilgrimagePackagesQuery } from "@/lib/pilgrimage/queries";
import { Suspense } from "react";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Page() {
  const umrahPackages = await client.fetch(
    pilgrimagePackagesQuery,
    { category: "umrah" },
    { cache: "no-store" }
  );

  const hajjPackages = await client.fetch(
    pilgrimagePackagesQuery,
    { category: "hajj" },
    { cache: "no-store" }
  );

  console.log(
    "UMRAH CALLOUT:",
    umrahPackages?.map((p: any) => p.callout)
  );

  console.log(
    "HAJJ CALLOUT:",
    hajjPackages?.map((p: any) => p.callout)
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HajjUmrahClient
        umrahPackages={umrahPackages}
        hajjPackages={hajjPackages}
      />
    </Suspense>
  );
}