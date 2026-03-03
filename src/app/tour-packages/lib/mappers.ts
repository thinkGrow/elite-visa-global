import { urlFor } from "@/sanity/lib/image";
import type { CmsTour, Country, PackageCard, ContinentKey } from "../types";

export function toImg(heroImage: any) {
  if (!heroImage) return "";
  return urlFor(heroImage).width(1400).height(900).fit("crop").url();
}

/** Build countries list from CMS */
export function buildCountriesByContinent(tours: CmsTour[]) {
  const out: Record<string, Country[]> = {};

  for (const t of tours) {
    if (t.category !== "international") continue;
    if (!t.continent || t.continent === "multi") continue;
    if (!t.country) continue;

    const key = t.country.toLowerCase().replace(/\s+/g, "-");
    const slug = key; // country page route (for now)
    const hero = toImg(t.heroImage) || "/tours/hero-international.jpg";

    out[t.continent] ??= [];
    if (!out[t.continent].some((c) => c.slug === slug)) {
      out[t.continent].push({
        key,
        name: t.country,
        flag: undefined, // add later if you add a country doc
        slug,
        heroImage: hero,
        badge: t.city || t.badges?.[0],
      });
    }
  }

  for (const k of Object.keys(out)) {
    out[k] = out[k].sort((a, b) => a.name.localeCompare(b.name));
  }

  return out as Record<Exclude<ContinentKey, "multi">, Country[]>;
}

/** Multi-country cards from CMS: continent="multi" */
export function buildMultiCards(tours: CmsTour[]): PackageCard[] {
  return tours
    .filter((t) => t.category === "international" && t.continent === "multi")
    .map((t) => ({
      id: t.slug,
      title: t.title,
      duration: t.durationText || "7–12 Days (varies)",
      fromPrice: t.fromPriceText || "Request latest price",
      image: toImg(t.heroImage) || "/tours/hero-international.jpg",
      tags: t.tags?.slice(0, 3) || [],
    }));
}

/** Local tours from CMS: category="local" */
export function buildLocalCards(tours: CmsTour[]): PackageCard[] {
  return tours
    .filter((t) => t.category === "local")
    .map((t) => ({
      id: t.slug,
      title: t.title,
      duration: t.durationText || "3 Days / 2 Nights",
      fromPrice: t.fromPriceText || "Request latest price",
      image: toImg(t.heroImage) || "/tours/hero-local.jpg",
      tags: t.tags?.slice(0, 3) || [],
    }));
}