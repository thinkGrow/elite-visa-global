import {defineField, defineType} from 'sanity'

export const visaKeyValueRowType = defineType({
  name: 'visaKeyValueRow',
  title: 'Key-value row',
  type: 'object',
  fields: [
    defineField({
      name: 'k',
      title: 'Key',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'v',
      title: 'Value',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(600),
    }),
  ],
  preview: {
    select: {
      title: 'k',
      subtitle: 'v',
    },
  },
})