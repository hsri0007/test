import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_ENVIRONMENT: z.string().min(1),
    CONTENTFUL_API_KEY: z.string().min(1),
    CONTENTFUL_PREVIEW_API_KEY: z.string().min(1),
    DRAFT_MODE_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_GTM: z.string().min(1),
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: z.string().min(1),
  },
  runtimeEnv: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_API_KEY: process.env.CONTENTFUL_API_KEY,
    CONTENTFUL_PREVIEW_API_KEY: process.env.CONTENTFUL_PREVIEW_API_KEY,
    DRAFT_MODE_SECRET: process.env.DRAFT_MODE_SECRET,
    NEXT_PUBLIC_GTM: process.env.NEXT_PUBLIC_GTM,
    NEXT_PUBLIC_FACEBOOK_PIXEL_ID: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  },
});
