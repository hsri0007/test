import type * as React from 'react';

import { ColorName, CursorIconName, StringWithSuggestions } from '~/utils/types';

declare module 'react' {
  interface DOMAttributes<T> {
    'data-theme'?: 'dark' | 'light';
    'data-color'?: ColorName;
    'data-accent-color'?: ColorName;
    'data-background-color'?: ColorName;
    'data-border-color'?: ColorName;
    'data-fill-color'?: ColorName;
    'data-cursor'?: CursorName;
    'data-cursor-hidden'?: boolean;
    'data-cursor-inactive-hidden'?: boolean;
  }

  interface CSSProperties {
    '--cursor'?: StringWithSuggestions<CursorName>;
    '--cursor-hidden'?: boolean;
  }

  interface ImgHTMLAttributes<HTMLImageElement> {
    alt?: string | null | undefined;
    src?: string | null | undefined;
  }
}
