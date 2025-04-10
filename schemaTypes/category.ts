import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategoria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nazwa kategorii',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'categorySlug',
      title: 'Slug dla kategorii',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Proszę wygenerować pole!'),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
  ],
})
