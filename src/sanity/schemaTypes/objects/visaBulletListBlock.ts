import {defineField, defineType} from 'sanity'

export const visaBulletListBlockType = defineType({
  name: 'visaBulletListBlock',
  title: 'Bullet list block',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      items: 'items',
    },
    prepare({heading, items}) {
      return {
        title: heading || 'Bullet list',
        subtitle: `${items?.length || 0} item(s)`,
      }
    },
  },
})