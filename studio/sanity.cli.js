import { defineCliConfig } from 'sanity/cli';

// import { config } from './lib/config';
// const { dataset, projectId } = config;

export default defineCliConfig({
  api: {
    projectId: 'hi18u6ms',
    dataset: 'production',
  },
});
