import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tytuł',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug dla posta',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Proszę wygenerować pole.'),
    }),
    defineField({
      name: 'summary',
      title: 'Podsumowanie',
      type: 'string',
      validation: (Rule) => Rule.required().error('Proszę uzupełnić pole.'),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: {type: 'author'},
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
      name: 'category',
      title: 'Kategoria',
      type: 'reference',
      to: {type: 'category'},
      validation: (Rule) => Rule.required().error('Proszę wybrać jedną opcję.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data publikacji',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('Proszę wybrać poprawną datę.'),
    }),
    defineField({
      name: 'contentSections',
      title: 'Sekcje posta',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Sekcja',
          fields: [
            {
              name: 'paragraphTitle',
              title: 'Tytuł paragrafu',
              type: 'string',
            },
            {
              name: 'content',
              title: 'Tekst paragrafu',
              type: 'text',
            },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Post musi mieć co najmniej jedną sekcję.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
