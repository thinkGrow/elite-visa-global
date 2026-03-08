import {defineField, defineType} from 'sanity'

export const visaSectionType = defineType({
  name: 'visaSection',
  title: 'Visa section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtitle',
      title: 'Section subtitle',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'visaParagraphBlock'},
        {type: 'visaBulletListBlock'},
        {type: 'visaKeyValueGridBlock'},
        {type: 'visaDualChecklistBlock'},
        {type: 'visaCalloutBlock'},
      ],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      blocks: 'blocks',
    },
    prepare({title, blocks}) {
      return {
        title,
        subtitle: `${blocks?.length || 0} block(s)`,
      }
    },
  },
})