import {defineField, defineType} from 'sanity'
import './blockContent'

export default defineType({
  name: 'treatmentGroup',
  title: 'Grupa zabiegowa',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa grupy',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'groupSlug',
      title: 'Slug dla grupy',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Proszę wygenerować pole!'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Główny obraz',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error('Proszę wybrać plik.'),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'blockContent',
    }),
  ],
})
