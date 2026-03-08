import {defineField, defineType} from 'sanity'

export const visaCalloutBlockType = defineType({
  name: 'visaCalloutBlock',
  title: 'Callout block',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({text}) {
      return {
        title: 'Callout',
        subtitle: text?.slice(0, 80) || '',
      }
    },
  },
})