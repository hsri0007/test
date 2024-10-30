'use client';

import Bowser from 'bowser';

/**
 * Gets information about the user's browser
 */
export const getBrowserInfo = () => {
  if (typeof window !== 'undefined') {
    return Bowser.getParser(window.navigator.userAgent);
  }
  return;
};
