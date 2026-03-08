import {defineField, defineType} from 'sanity'

export const visaDualChecklistBlockType = defineType({
  name: 'visaDualChecklistBlock',
  title: 'Dual checklist block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'leftTitle',
      title: 'Left title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'leftItems',
      title: 'Left items',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: 'rightTitle',
      title: 'Right title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'rightItems',
      title: 'Right items',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      leftTitle: 'leftTitle',
      rightTitle: 'rightTitle',
    },
    prepare({heading, leftTitle, rightTitle}) {
      return {
        title: heading || 'Dual checklist',
        subtitle: `${leftTitle} / ${rightTitle}`,
      }
    },
  },
})