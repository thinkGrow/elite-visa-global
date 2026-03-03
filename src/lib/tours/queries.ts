export const toursListQuery = `
*[_type == "tourPackage"] | order(coalesce(sortRank, 9999) asc, _createdAt desc) {
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
  badges,
  tags,
  isFeatured
}
`;