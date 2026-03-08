import {defineField, defineType} from "sanity";

export const visaCountryContentType = defineType({
  name: "visaCountryContent",
  title: "Visa Country Content",
  type: "document",

  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "visaCategory",
      title: "Visa Category",
      type: "string",
      options: {
        list: [
          { title: "Student Visa", value: "student" },
          { title: "Visit / Family / Business", value: "visit" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Example: UKVI, Subclass 500, F-1 / SEVIS, e-Visa",
      validation: (Rule) => Rule.max(40),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),

    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(1200),
    }),

    defineField({
      name: "sections",
      title: "Visa Sections",
      type: "array",
      of: [{ type: "visaSection" }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: "isPublishedDestination",
      title: "Show on Website",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      countryName: "country.name",
      flag: "country.flagEmoji",
      visaCategory: "visaCategory",
      badge: "badge",
    },

    prepare({ countryName, flag, visaCategory, badge }) {
      const category =
        visaCategory === "student"
          ? "Student Visa"
          : "Visit / Family / Business";

      return {
        title: `${flag ?? ""} ${countryName ?? "Untitled"}`,
        subtitle: `${category}${badge ? ` • ${badge}` : ""}`,
      };
    },
  },
});