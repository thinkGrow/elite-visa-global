import { defineField, defineType } from "sanity";

export default defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "International", value: "international" },
          { title: "Local", value: "local" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "continent",
      title: "Continent",
      type: "string",
      options: {
        list: [
          { title: "Europe", value: "europe" },
          { title: "Asia", value: "asia" },
          { title: "North America", value: "na" },
          { title: "South America", value: "sa" },
          { title: "Africa", value: "africa" },
          { title: "Oceania", value: "oceania" },
          { title: "Multi Countries", value: "multi" },
        ],
      },
    }),

    defineField({ name: "country", title: "Country", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "durationText", title: "Duration", type: "string" }),
    defineField({ name: "fromPriceText", title: "From Price", type: "string" }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
});