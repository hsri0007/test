/**
 * Contentful CMS Client
 *
 * Creates a client from the generated graphql types/queries that can be used query to the CMS
 */
import { GraphQLClient } from 'graphql-request';
import { draftMode } from 'next/headers';
import 'server-only';

import { env } from '~/env';

import { getSdk } from './graphql-generated';

/**
 * CMS Client
 */
export const cms = () => {
  const { isEnabled: isDraftMode } = draftMode();
  const client = new GraphQLClient(
    `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`,
    {
      headers: {
        Authorization: `Bearer ${
          isDraftMode ? env.CONTENTFUL_PREVIEW_API_KEY : env.CONTENTFUL_API_KEY
        }`,
        'x-exo-draft-mode': isDraftMode ? 'true' : 'false',
      },
    }
  );
  return { ...getSdk(client), defaultVariables: { preview: isDraftMode } };
};
