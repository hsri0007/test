type WindowWithDataLayer = Window & {
  dataLayer?: Record<string, any>[];
};

declare const window: WindowWithDataLayer;

const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};

export const gtm = { pageview };
