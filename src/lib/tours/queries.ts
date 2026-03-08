export const toursListQuery = `
*[_type == "tourPackage"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  category,
  continent,
  country,
  city,
  durationText,
  fromPriceText,
  heroImage,
  tags,
  badges,
  isFeatured
}
`;

export const tourBySlugQuery = `
*[_type == "tourPackage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  category,
  continent,
  country,
  city,
  durationText,
  fromPriceText,
  heroImage,
  tags,
  badges,
  isFeatured,
  highlights,
  includes,
  excludes,
  summaryContent,
  remarksContent,
  itinerary,
  faq
}
`;


export const countriesLiteQuery = `
*[_type == "country"] | order(name asc) {
  _id,
  name,
  shortName,
  flagEmoji,
  "slug": slug.current,
  continent->{
    name,
    "slug": slug.current
  }
}
`;