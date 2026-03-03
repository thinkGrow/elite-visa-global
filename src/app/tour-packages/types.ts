export type TourCategoryKey = "international" | "local";

export type ContinentKey =
  | "europe"
  | "asia"
  | "na"
  | "sa"
  | "africa"
  | "oceania"
  | "multi";

export type Country = {
  key: string;
  name: string;
  flag?: string;
  slug: string;
  heroImage: string;
  badge?: string;
};

export type PackageCard = {
  id: string;
  title: string;
  duration: string;
  fromPrice: string;
  image: string;
  tags?: string[];
};

export type CmsTour = {
  _id: string;
  title: string;
  slug: string;
  category: TourCategoryKey;
  continent?: ContinentKey;
  country?: string;
  city?: string;
  durationText?: string;
  fromPriceText?: string;
  heroImage?: any;
  badges?: string[];
  tags?: string[];
  summary?: string;
  isFeatured?: boolean;
};