export const METADATA_DEFAULTS = {
  title: 'Exo',
  titleTemplate: '%s | Exo',
  description: '',
  keywords: '',
  locale: 'en-US',
} as const;

export const BREAKPOINTS = {
  xxs: 375,
  xs: 500,
  sm: 700,
  md: 900,
  lg: 1200,
  xl: 1400,
  xxl: 1800,
} as const;

export const HEADER_HEIGHT_MOBILE = 60 as const;
export const HEADER_HEIGHT_DESKTOP = 60 as const;
export const HEADER_HEIGHT_OVERSIZED = 60 as const;

export const SIDE_PADDING_MOBILE = 20 as const;
export const SIDE_PADDING_TABLET = 40 as const;
export const SIDE_PADDING_DESKTOP = 80 as const;

export const GRID_GAP_MOBILE = 12 as const;
export const GRID_GAP_TABLET = 12 as const;
export const GRID_GAP_DESKTOP = 20 as const;

export const COL_COUNT_MOBILE = 2 as const;
export const COL_COUNT_TABLET = 4 as const;
export const COL_COUNT_DESKTOP = 12 as const;

/**
 * Number of PX in either direction a scroll needs
 * to move before we consider it a change in direction.
 */
export const SCROLL_DIRECTION_MIN_SCROLL = 1 as const;

/**
 * Number of ms after which the last nav item active will lose it's highlight.
 */
export const NAV_HIGHLIGHT_TIMEOUT = 100 as const;

export const MOUSE_ACTIVITY_TIMEOUT = 2000 as const;

export const CMS_IMAGE_RESOLUTIONS = [1.5, 2, 2.5, 3]; // Does not include 1x

export const IS_NOT_PRODUCTION = process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production';

export const HS_FORM_ID_EXO_WORKS_DEMO = 'c74c58f6-1916-457a-8dc7-33d770d326f4';

export const HS_FORM_ID_EXO_IRIS_DEMO = '52b7843d-5b34-41c0-8364-0b2529f75d8d';

export const HS_FORM_SUBMISSION_URL = 'https://api.hsforms.com/submissions/v3/integration/submit';

export const FORCED_SCROLL_RESET_PATHS = ['/technology', '/ai'];
