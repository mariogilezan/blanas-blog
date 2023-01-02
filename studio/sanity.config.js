import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import schemas from './schemas/schema';
import deskStructure from './src/deskStructure';

import { config } from './lib/config';
const { dataset, projectId } = config;

export default defineConfig({
  title: 'studio',
  projectId,
  dataset,
  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],
  tools: (prev, context) => {
    const isAdmin = context.currentUser.roles.find(
      ({ name }) => name === 'administrator'
    );
    if (isAdmin) {
      return prev;
    }
    return prev.filter((tool) => tool.name !== 'vision');
  },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId !== 'siteconfig'
        );
      }

      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'siteconfig') {
        return prev.filter(
          ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)
        );
      }
      return prev;
    },
  },
});
