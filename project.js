export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Application', value: 'Web Application' },
          { title: 'iOS & Android', value: 'iOS & Android' },
          { title: 'Game Development', value: 'Game Development' },
          { title: 'Custom Software', value: 'Custom Software' },
        ],
      },
    },
    {
      name: 'tech',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'imageColor',
      title: 'Gradient Classes (Tailwind)',
      type: 'string',
      description: 'Example: from-blue-500 to-cyan-400',
    },
  ],
}