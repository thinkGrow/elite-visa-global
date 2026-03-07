import {defineField, defineType} from 'sanity'

export const countryType = defineType({
  name: 'country',
  title: 'Country',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Official name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'shortName',
      title: 'Short name',
      description: 'Example: UK, UAE, USA',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'flagEmoji',
      title: 'Flag emoji',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'continent',
      title: 'Continent',
      type: 'reference',
      to: [{type: 'continent'}],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'name',
      shortName: 'shortName',
      flagEmoji: 'flagEmoji',
      continentName: 'continent.name',
    },
    prepare({title, shortName, flagEmoji, continentName}) {
      return {
        title: `${flagEmoji ?? ''} ${shortName || title}`,
        subtitle: continentName || 'No continent',
      }
    },
  },
})