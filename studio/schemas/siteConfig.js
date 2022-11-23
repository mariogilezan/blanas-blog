export default {
  name: 'siteconfig',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [/* "create", "delete", */ 'update', 'publish'],
  fieldsets: [
    {
      name: 'metadata',
      title: 'SEO & metadata',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'social',
      title: 'Social Media',
    },
    {
      name: 'logos',
      title: 'Website Logo',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site title',
      type: 'string',
    },
    {
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The main site url. Used to create canonical url',
    },
    {
      name: 'copyright',
      title: 'Copyright Name',
      type: 'string',
      description: 'Enter company name to appear in footer after ©',
    },

    {
      name: 'logo',
      title: 'Main logo',
      type: 'image',
      description: 'Upload your main logo here. SVG preferred. ',
      fieldset: 'logos',
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },

    {
      name: 'logoalt',
      title: 'Alternate logo (optional)',
      type: 'image',
      description:
        'Upload alternate logo here. it can be light / dark variation ',
      fieldset: 'logos',
      fields: [
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Important for SEO and accessiblity.',
          options: {
            isHighlighted: true,
          },
        },
      ],
    },

    {
      name: 'email',
      title: 'Support Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: 'email', // Error message is "Does not match email-pattern"
            invert: false, // Boolean to allow any value that does NOT match pattern
          }
        ),
    },

    {
      name: 'phone',
      title: 'Support Phone',
      type: 'string',
    },

    {
      name: 'w3ckey',
      title: 'Web3Forms Access Key',
      type: 'string',
      description:
        'Enter Access key obtained from web3forms.com. It is required to make the form work.',
    },

    {
      name: 'social',
      title: 'Social Links',
      type: 'array',
      description: 'Enter your Social Media URLs',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'media',
              title: 'Choose Social Media',
              type: 'string',
              options: {
                list: [
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Linkedin', value: 'linkedin' },
                  { title: 'Youtube', value: 'youtube' },
                ],
              },
            },
            {
              name: 'url',
              title: 'Full Profile URL',
              type: 'url',
            },
          ],
          preview: {
            select: {
              title: 'media',
              subtitle: 'url',
            },
          },
        },
      ],
    },

    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      fieldset: 'metadata',
      rows: 5,
      validation: (Rule) => Rule.min(20).max(200),
      description: 'Enter SEO Meta Description',
    },

    {
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for sharing previews on Facebook, Twitter etc.',
      fieldset: 'metadata',
    },
  ],
};
