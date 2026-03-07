import {defineField, defineType} from 'sanity'

export const continentType = defineType({
  name: 'continent',
  title: 'Continent',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'Examples: AS, EU, NA',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(8)
          .custom((value) =>
            !value || /^[A-Z]+$/.test(value) ? true : 'Use uppercase letters only'
          ),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
    },
  },
})