import {defineField, defineType} from "sanity";
import {visaContentField} from "../blocks/visaContentField";

export const visaCountryContentType = defineType({
  name: "visaCountryContent",
  title: "Visa Country Content",
  type: "document",

  fieldsets: [
    {
      name: "hero",
      title: "Hero",
      options: {collapsible: true, collapsed: false},
    },
    {
      name: "contentSections",
      title: "Visa Sections",
      options: {collapsible: true, collapsed: false},
    },
    {
      name: "meta",
      title: "Meta",
      options: {collapsible: true, collapsed: true},
    },
  ],

  fields: [
    defineField({
      name: "country",
      title: "Country",
      type: "reference",
      to: [{type: "country"}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "visaCategory",
      title: "Visa Category",
      type: "string",
      options: {
        list: [
          {title: "Student Visa", value: "student"},
          {title: "Visit / Family / Business", value: "visit"},
          {title: "Transit Visa", value: "transit"},
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      fieldset: "hero",
      description: "Example: UKVI, Subclass 500, F-1 / SEVIS, e-Visa",
      validation: (Rule) => Rule.max(40),
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "hero",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      fieldset: "hero",
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),

    defineField({
      name: "overview",
      title: "Overview",
      fieldset: "contentSections",
      ...visaContentField,
    }),

    defineField({
      name: "requirements",
      title: "Requirements",
      fieldset: "contentSections",
      ...visaContentField,
    }),

    defineField({
      name: "documents",
      title: "Required Documents",
      fieldset: "contentSections",
      ...visaContentField,
    }),

    defineField({
      name: "processingTime",
      title: "Processing Time",
      type: "string",
      fieldset: "contentSections",
      description: "Example: Usually 3–6 weeks",
    }),

    defineField({
      name: "visaFee",
      title: "Visa Fee",
      type: "string",
      fieldset: "contentSections",
      description: "Example: £490 or Contact us for latest fees",
    }),

    defineField({
      name: "notes",
      title: "Important Notes",
      fieldset: "contentSections",
      ...visaContentField,
    }),

    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      fieldset: "meta",
      validation: (Rule) => Rule.integer().min(0),
    }),

    defineField({
      name: "isPublishedDestination",
      title: "Show on Website",
      type: "boolean",
      fieldset: "meta",
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

    prepare({countryName, flag, visaCategory, badge}) {
      const category =
        visaCategory === "student"
          ? "Student Visa"
          : visaCategory === "visit"
            ? "Visit / Family / Business"
            : "Transit Visa";

      return {
        title: `${flag ?? ""} ${countryName ?? "Untitled"}`,
        subtitle: `${category}${badge ? ` • ${badge}` : ""}`,
      };
    },
  },
});