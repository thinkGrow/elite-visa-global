import { client } from "@/sanity/lib/client";
import HajjUmrahClient from "./HajjUmrahClient";
import { pilgrimagePackagesQuery } from "@/lib/pilgrimage/queries";
import { Suspense } from "react";

export default async function Page() {
  const umrahPackages = await client.fetch(pilgrimagePackagesQuery, {
    category: "umrah",
  });

  const hajjPackages = await client.fetch(pilgrimagePackagesQuery, {
    category: "hajj",
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HajjUmrahClient
        umrahPackages={umrahPackages}
        hajjPackages={hajjPackages}
      />
    </Suspense>
  );
}