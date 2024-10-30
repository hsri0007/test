import { clsx } from 'clsx';

import { AssetFragment } from '~/cms';
import { CMS_IMAGE_RESOLUTIONS } from '~/constants';

/**
 * Class Combiner
 */
export const cx = clsx;

/**
 * Get the value of a given CSS variable from the root.
 *
 * @param variable The full name of the CSS variable
 * @returns
 */
export const getRootCSSVariable = (variable: string) => {
  const root = document.querySelector(':root');
  if (!root) {
    console.error(`Could not get the value of the variable: ${variable}`);
    return undefined;
  }
  const rootStyle = getComputedStyle(root);
  return rootStyle.getPropertyValue(variable);
};

/**
 * Set the value of a given CSS variable at the root.
 *
 * @param variable The full name of the CSS variable
 * @param value The new value to set the CSS variable to
 * @returns
 */
export const setRootCSSVariable = (variable: string, value?: string | number | null) => {
  const root = document.querySelector(':root') satisfies HTMLElement | null;
  if (!root) {
    console.error(`Could not set the variable: ${variable} to "${value}"`);
    return false;
  }
  root.style.setProperty(variable, value ? `${value}` : null);
  return true;
};

/**
 * Generates an article's url
 * @param category
 * @param slug
 * @param migrationSlug
 * @returns
 */
export const generateArticleUrl = (
  category: string | null | undefined,
  slug: string | null | undefined,
  migrationSlug: string | null | undefined
) => {
  return `/${category?.toLowerCase().replaceAll(' ', '-')}/${slug}`;
};

export const getFirstItemInCollection = <T extends { items: (unknown | null)[] } | null>(
  collection: T
) => {
  return collection?.items[0] as NonNullable<NonNullable<T>['items'][number]>;
};

export const getFirstItemInCollectionPossiblyUndefined = <
  T extends { items: (unknown | null)[] } | null
>(
  collection: T
) => {
  return (collection?.items[0] as NonNullable<T>['items'][number]) || undefined;
};

export interface CMSImageSrcConfig {
  asset?: AssetFragment | null;
  format?: 'webp' | 'png' | 'jpeg';
  quality?: number;
  width?: number;
  height?: number;
  fit?: 'fill' | 'scale' | 'crop' | 'thumb';
  focus?:
    | 'center'
    | 'top'
    | 'right'
    | 'left'
    | 'bottom'
    | 'top_right'
    | 'top_left'
    | 'bottom_right'
    | 'bottom_left'
    | 'face'
    | 'faces';
}

/**
 * Generates a src url from a CMS Image Asset
 */
export const generateCMSImageSrc = (config?: CMSImageSrcConfig) => {
  const { format, quality = 100, width, height, fit, focus = 'center', asset } = config ?? {};

  if (!asset?.url) {
    return undefined;
  }
  // If there is no format override and the original URL is an SVG we assume the dev wants an SVG
  const isSVG = !format && asset.url.endsWith('.svg');
  const url = new URL(asset.url);

  // If the desired output is an SVG then we just return URL without any query parameters
  if (isSVG) {
    return url.toString();
  }
  url.searchParams.set('fm', format ?? 'webp');
  url.searchParams.set('q', `${quality}`);
  url.searchParams.set('f', focus);
  if (fit) {
    url.searchParams.set('fit', `${fit}`);
  }
  if (width) {
    url.searchParams.set('w', `${width}`);
  }
  if (height) {
    url.searchParams.set('h', `${height}`);
  }
  return url.toString();
};

/**
 * Generates a src-set for various resolutions from a CMS Image Asset if it has a width or height
 */
export const generateCMSImageSrcSet = (config?: CMSImageSrcConfig) => {
  const originalSrc = generateCMSImageSrc(config);
  if (!config || (!config.width && !config.height)) {
    return originalSrc;
  }
  let width = config.width;
  let height = config.height;
  let srcSet = CMS_IMAGE_RESOLUTIONS.map((res) => {
    const widthConfig = width ? { width: res * width } : {};
    const heightConfig = height ? { height: res * height } : {};
    const url = generateCMSImageSrc({ ...config, ...heightConfig, ...widthConfig });
    if (!url) {
      return '';
    }
    return `, ${url} ${res}x`;
  }).join('');
  return originalSrc + srcSet;
};

export const reverseNumber = (num: number) => {
  // Remember if it's negative
  const isNegative = num < 0;
  // Get the digits and decimal just for the absolute part
  const chars = (isNegative ? -num : num).toString().split('');
  // Reverse them
  chars.reverse();
  // Put it back together and convert back to a number
  const newNum = Number(chars.join(''));
  // Return the result, converting back to negative if appropriate
  return isNegative ? -newNum : newNum;
};

export class SeededRandom {
  seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }

  random = (min: number, max: number) => {
    // eslint-disable-next-line no-param-reassign
    max = max || 1;
    // eslint-disable-next-line no-param-reassign
    min = min || 0;

    this.seed = (this.seed * 9301 + 49297) % 233280;
    const rnd = this.seed / 233280;

    return min + rnd * (max - min);
  };
}

/**
 * Changes 'external' value to 'isExternal' value on CTA object
 */

export const externalToIsExternal = (obj: any) => {
  const objFormatted: any = {};
  if (obj) {
    const _obj: any = { ...obj };
    Object.keys(obj).forEach((key) => {
      if (key === 'external') {
        objFormatted.isExternal = _obj['external'];
      } else {
        objFormatted[key] = obj[key as keyof typeof obj];
      }
    });
  }
  return objFormatted;
};
