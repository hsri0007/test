/**
 * Contentful GraphQL Codegen
 *
 * This file generates the types and functions needed to access content in the CMS.
 * Queries and fragments are pulled from the .graphql files in src/cms/graphql.
 */
import type { CodegenConfig } from '@graphql-codegen/cli';

require('dotenv').config({ path: `.env.development.local`, override: true });

console.log('🕷️ Starting Contentful GraphQL query codegen');

if (!process.env.CONTENTFUL_API_KEY) {
  throw new Error('Contentful API Key need for GraphQL query codegen!');
}

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('Contentful API Key need for GraphQL query codegen!');
}

if (!process.env.CONTENTFUL_ENVIRONMENT) {
  throw new Error('Contentful Environment need for GraphQL query codegen!');
}

const schemaUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;

const config: CodegenConfig = {
  overwrite: true,
  debug: true,
  verbose: true,
  schema: [
    {
      [schemaUrl]: {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`,
        },
      },
    },
  ],
  documents: 'src/cms/graphql/**/*.graphql',
  ignoreNoDocuments: true,
  generates: {
    './src/cms/graphql-generated.ts': {
      hooks: {
        afterOneFileWrite: ['pnpm post-generate'],
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
      config: {
        skipTypename: true,
        avoidOptionals: true,
        inlineFragmentTypes: 'inline',
        maybeValue: 'T | null',
        preResolveTypes: false,
      },
    },
  },
};

export default config;
