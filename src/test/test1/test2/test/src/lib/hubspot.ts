import { Client } from '@hubspot/api-client';
import 'server-only';

import { env } from '~/env';

// This was abandon in favor the form injections script. Can be used for any other hubspot API needs

/**
 * HubSpot API Client
 */
const client = new Client({});

export const getForm = async (id: string) => {
  try {
    // HubSpot Docs: https://legacydocs.hubspot.com/docs/methods/forms/v2/get_form
    const response = await client.apiRequest({
      method: 'GET',
      path: `/forms/v2/forms/${id}`,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const hubspot = { client, getForm };
