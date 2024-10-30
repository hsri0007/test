/** @type {import('next').NextConfig} */
const path = require('path');
const LEGACY_ARTICLE_PATHS = [
  '/blog',
  '/guides',
  '/podcast',
  '/press-release',
  '/news',
  '/case-study',
];

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack(config, options) {
    const newConfig = config;

    newConfig.resolve.modules.push(path.resolve('./'));

    newConfig.module.rules.push(
      {
        test: /\.ya?ml$/,
        type: 'json',
        exclude: /node_modules/,
        use: ['yaml-loader'],
      },
      {
        test: /\.(frag|vert|glsl)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      }
    );

    return newConfig;
  },
  redirects: async () => {
    // redirect legacy articles from /:category/:slug to /article/:slug
    // https://nextjs.org/docs/app/api-reference/next-config-js/redirects#path-matching
    const articles = LEGACY_ARTICLE_PATHS.map((path) => ({
      source: `${path}/:slug`,
      destination: '/article/:slug',
      permanent: true,
    }));

    return [
      ...articles,
      {
        source: '/event/exo-works-finally',
        destination: 'https://explore.exo.inc/exo-works-finally',
        permanent: true,
      },
      {
        source: '/event/exoworks-taking-care-of-doctors',
        destination: 'https://explore.exo.inc/taking-care-of-doctors',
        permanent: true,
      },
      // Press Kit
      {
        source: `/press-kit`,
        destination: 'https://explore.exo.inc/press-kit',
        permanent: true,
      },
      // Legacy Redirect
      {
        source: '/legal/privacy-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/legal/social-policy',
        destination: '/social-policy',
        permanent: true,
      },
      {
        source: '/legal/cookie-policy',
        destination: '/cookie-policy',
        permanent: true,
      },
      {
        source: `/leadership/:slug`,
        destination: '/our-people/:slug',
        permanent: true,
      },
      // Common error redirect
      {
        source: `/exo-iris`,
        destination: '/iris',
        permanent: true,
      },
      // Common error redirect
      {
        source: `/exo-iris/specs`,
        destination: '/iris/specs',
        permanent: true,
      },
      // Common error redirect
      {
        source: `/exo-iris/tech-specs`,
        destination: '/iris/specs',
        permanent: true,
      },
      // Just in case redirect
      {
        source: `/silicon`,
        destination: '/technology',
        permanent: true,
      },
      // Legacy Redirect
      {
        source: `/exo-works/tech-specs`,
        destination: '/exo-works/specs',
        permanent: true,
      },
      {
        source: '/support/customer-support',
        destination: 'https://support.exo.inc/hc/en-us',
        permanent: true,
      },
      {
        source: '/event/essential-guide-to-improving-pocus-workflow/form',
        destination: 'https://explore.exo.inc/essential-guide-to-improving-pocus-workflow',
        permanent: true,
      },
      {
        source: '/event/rethink-pocus-workflow-webinar-recorded/form',
        destination: 'https://explore.exo.inc/webinar-rethinking-pocus-workflow',
        permanent: true,
      },
      {
        source: '/event/happy-hour/form',
        destination: '/',
        permanent: true,
      },
      {
        source: '/event/taking-care-of-doctors/form',
        destination: 'https://explore.exo.inc/taking-care-of-doctors',
        permanent: true,
      },
      {
        source: '/event/sccm-2023/form',
        destination: 'https://explore.exo.inc/sccm-2023',
        permanent: true,
      },
      {
        source: '/event/acep-2022/form',
        destination: '/article/going-to-acep-heres-what-were-excited-for',
        permanent: true,
      },
      {
        source: '/iris/manual',
        destination:
          'https://support.exo.inc/hc/en-us/articles/20390975160731-Exo-Iris-User-Manual',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
