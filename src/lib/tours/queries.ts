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
  isFeatured,
  summary
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
  summary
}
`;