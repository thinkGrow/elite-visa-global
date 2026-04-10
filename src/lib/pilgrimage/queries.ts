export const pilgrimagePackagesQuery = `
*[
  _type == "pilgrimagePackage" &&
  category == $category &&
  isPublished == true
] | order(displayOrder asc) {
  _id,
  title,
  subtitle,
  metaLeft,
  metaRight,
  highlights,
  callout,
  sections[]{
    _type,
    heading,
    items,
    rows[]{
      label,
      value
    }
  }
}
`;