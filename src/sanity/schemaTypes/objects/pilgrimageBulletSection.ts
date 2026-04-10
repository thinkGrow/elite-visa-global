import { defineField, defineType } from "sanity";

export const pilgrimageBulletSectionType = defineType({
  name: "pilgrimageBulletSection",
  title: "Pilgrimage Bullet Section",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
  },
});