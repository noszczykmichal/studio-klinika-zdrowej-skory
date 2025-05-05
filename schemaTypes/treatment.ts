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
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.trim() === '') {
            return 'Proszę uzupełnić pole.'
          }

          if (value.length > 290) {
            return `Maksymalna długość tekstu to 290 znaków. Aktualna długość to ${value.length} znaków.`
          }
          return true
        }),
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
      title: 'Opis głównej grafiki',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value || value.trim() === '') {
            return 'Proszę uzupełnić pole.'
          }

          if (!/\.\s*$/.test(value)) {
            return 'Opis powinien kończyć się kropką.'
          }

          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'blockContent',
    }),
  ],
})
