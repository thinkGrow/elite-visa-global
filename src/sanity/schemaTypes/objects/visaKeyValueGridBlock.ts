import {defineField, defineType} from 'sanity'

export const visaKeyValueGridBlockType = defineType({
  name: 'visaKeyValueGridBlock',
  title: 'Key-value grid block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [{type: 'visaKeyValueRow'}],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      rows: 'rows',
    },
    prepare({heading, rows}) {
      return {
        title: heading || 'Key-value grid',
        subtitle: `${rows?.length || 0} row(s)`,
      }
    },
  },
})