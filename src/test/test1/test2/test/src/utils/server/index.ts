import { marked } from 'marked';
import { Metadata } from 'next';
import 'server-only';

import type { PageMetaFragment } from '~/cms';
import { METADATA_DEFAULTS } from '~/constants';

export const formatPageMeta = (
  pageMeta?: PageMetaFragment | null,
  options?: { isArticle: boolean }
) => {
  if (!pageMeta) {
    return {};
  }

  return {
    title: pageMeta.pageTitle,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    openGraph: {
      title: pageMeta.pageTitle ?? METADATA_DEFAULTS.title,
      description: pageMeta.description ?? METADATA_DEFAULTS.description,
      images: pageMeta.socialImage
        ? [
            {
              url: pageMeta.socialImage?.url as string,
              width: pageMeta.socialImage.width as number,
              height: pageMeta.socialImage.height as number,
            },
          ]
        : undefined,
      locale: METADATA_DEFAULTS.locale,
      type: options?.isArticle ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta.pageTitle ?? METADATA_DEFAULTS.title,
      description: pageMeta.description ?? METADATA_DEFAULTS.description,
      images: pageMeta.socialImage ? [pageMeta.socialImage?.url as string] : undefined,
    },
  } satisfies Metadata;
};

/**
 * Parses markdown into an HTML String
 * @param copy
 * @returns
 */
export const parseMarkdown = (copy: string | null) => {
  if (!copy) return null;

  return marked.parse(copy, { mangle: false, headerIds: false });
};
