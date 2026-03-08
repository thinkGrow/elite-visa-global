import {defineField, defineType} from 'sanity'

export const visaParagraphBlockType = defineType({
  name: 'visaParagraphBlock',
  title: 'Paragraph block',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(1200),
    }),
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare({text}) {
      return {
        title: 'Paragraph',
        subtitle: text?.slice(0, 80) || '',
      }
    },
  },
})