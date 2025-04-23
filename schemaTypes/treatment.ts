import {defineField, defineType} from 'sanity'
import './blockContent'

export default defineType({
  name: 'treatment',
  title: 'Zabieg',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa zabiegu',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'treatmentSlug',
      title: 'Slug dla zabiegu',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Proszę wygenerować pole!'),
    }),
    defineField({
      name: 'summary',
      title: 'Podsumowanie',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'treatmentGroup',
      title: 'Grupa zabiegowa',
      type: 'reference',
      to: {type: 'treatmentGroup'},
      validation: (Rule) => Rule.required().error('Proszę wybrać jedną opcję.'),
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
      name: 'altForMainImage',
      title: 'Alt dla głównej grafiki',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'blockContent',
    }),
  ],
})
