import {loadEnvConfig} from '@next/env'
import {defineCliConfig} from 'sanity/cli'

const dev = process.env.NODE_ENV !== 'production'
loadEnvConfig(__dirname, dev, {info: () => null, error: console.error})

const projectId = process.env.SANITY_STUDIO_PROJECT_ID
const dataset = process.env.SANITY_STUDIO_DATASET

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
})
