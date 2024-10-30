export type FacebookPixelOptionValue = string | number | string[] | undefined;
type WindowWithDataLayer = Window & {
  fbq?: (action: string, name: string, options?: Record<string, FacebookPixelOptionValue>) => void;
};

declare const window: WindowWithDataLayer;

export const pageview = () => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', 'PageView');
  }
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options: Record<string, FacebookPixelOptionValue> = {}) => {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', name, options);
  }
};

export const pixel = { pageview, event };
