import {defineArrayMember, defineField, defineType} from "sanity";

const calloutBlock = defineArrayMember({
  type: "object",
  name: "callout",
  title: "Callout",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        list: [
          {title: "Info", value: "info"},
          {title: "Success", value: "success"},
          {title: "Warning", value: "warning"},
        ],
      },
      initialValue: "info",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tone",
    },
    prepare({title, subtitle}) {
      return {
        title: title || "Callout",
        subtitle: subtitle || "info",
      };
    },
  },
});

const tableBlock = defineArrayMember({
  type: "object",
  name: "tableBlock",
  title: "Table",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "tableRow",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "value",
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({title}) {
      return {
        title: title || "Table",
        subtitle: "Table block",
      };
    },
  },
});

export default defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",

  fieldsets: [
    {
      name: "details",
      title: "Details",
      options: {collapsible: true, collapsed: false},
    },
    {
      name: "itinerarySection",
      title: "Itinerary",
      options: {collapsible: true, collapsed: true},
    },
    {
      name: "remarksSection",
      title: "Remarks",
      options: {collapsible: true, collapsed: true},
    },
    {
      name: "faqSection",
      title: "FAQ",
      options: {collapsible: true, collapsed: true},
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      fieldset: "details",
      validation: (r) => r.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "details",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      fieldset: "details",
      options: {
        list: [
          {title: "International", value: "international"},
          {title: "Local", value: "local"},
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),

    defineField({
      name: "continent",
      title: "Continent",
      type: "string",
      fieldset: "details",
      options: {
        list: [
          {title: "Europe", value: "europe"},
          {title: "Asia", value: "asia"},
          {title: "North America", value: "na"},
          {title: "South America", value: "sa"},
          {title: "Africa", value: "africa"},
          {title: "Oceania", value: "oceania"},
          {title: "Multi Countries", value: "multi"},
        ],
      },
      hidden: ({document}) => document?.category !== "international",
    }),

    defineField({
      name: "country",
      title: "Country",
      type: "string",
      fieldset: "details",
      hidden: ({document}) =>
        document?.category !== "international" || document?.continent === "multi",
    }),

    defineField({
      name: "city",
      title: "City / Region",
      type: "string",
      fieldset: "details",
    }),

    defineField({
      name: "durationText",
      title: "Duration",
      type: "string",
      fieldset: "details",
      description: "Example: 5 Days / 4 Nights",
    }),

    defineField({
      name: "fromPriceText",
      title: "From Price",
      type: "string",
      fieldset: "details",
      description: "Example: From ৳45,000",
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fieldset: "details",
      options: {hotspot: true},
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      fieldset: "details",
      of: [defineArrayMember({type: "string"})],
      options: {layout: "tags"},
    }),

    defineField({
      name: "badges",
      title: "Badges",
      type: "array",
      fieldset: "details",
      of: [defineArrayMember({type: "string"})],
      options: {layout: "tags"},
    }),

    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      fieldset: "details",
      of: [defineArrayMember({type: "string"})],
      description: "Short bullet points for the package.",
    }),

    defineField({
      name: "includes",
      title: "Includes",
      type: "array",
      fieldset: "details",
      of: [defineArrayMember({type: "string"})],
    }),

    defineField({
      name: "excludes",
      title: "Excludes",
      type: "array",
      fieldset: "details",
      of: [defineArrayMember({type: "string"})],
    }),

    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      fieldset: "details",
      initialValue: false,
    }),

    defineField({
      name: "summaryContent",
      title: "Summary Content",
      type: "array",
      fieldset: "details",
      of: [
        defineArrayMember({type: "block"}),
        defineArrayMember({type: "image", options: {hotspot: true}}),
        tableBlock,
        calloutBlock,
      ],
      description:
        "Main rich content area for intro text, paragraphs, lists, tables, images, and callouts.",
    }),

    defineField({
      name: "itinerary",
      title: "Itinerary Days",
      type: "array",
      fieldset: "itinerarySection",
      of: [
        defineArrayMember({
          type: "object",
          name: "itineraryDay",
          title: "Itinerary Day",
          fields: [
            defineField({
              name: "day",
              title: "Day Number",
              type: "number",
              validation: (r) => r.required().positive().integer(),
            }),
            defineField({
              name: "title",
              title: "Day Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: {
              day: "day",
              title: "title",
            },
            prepare({day, title}) {
              return {
                title: `Day ${day}: ${title}`,
              };
            },
          },
        }),
      ],
    }),

    defineField({
      name: "remarksContent",
      title: "Remarks Content",
      type: "array",
      fieldset: "remarksSection",
      of: [
        defineArrayMember({type: "block"}),
        calloutBlock,
        tableBlock,
      ],
      description:
        "Longer notes, policies, visa remarks, important instructions, seasonal notices, and tables if needed.",
    }),

    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      fieldset: "faqSection",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 4,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      category: "category",
      country: "country",
      city: "city",
      media: "heroImage",
    },
    prepare({title, category, country, city, media}) {
      return {
        title,
        subtitle: [category, country || city].filter(Boolean).join(" • "),
        media,
      };
    },
  },
});