import type { Viewport } from 'next';
import localFont from 'next/font/local';

import { cms } from '~/cms';
import { Analytics } from '~/components/analytics';
import { PageWrapper } from '~/components/layout';
import { Footer, GlobalCursor, Header } from '~/components/ui';
import Banner from '~/components/ui/Banner';
import { EmailDialog } from '~/components/ui/Dialog';
import { DraftModeIndicator } from '~/components/ui/DraftModeIndicator';
import { METADATA_DEFAULTS } from '~/constants';
import '~/styles/index.scss';
import { cx, getFirstItemInCollection } from '~/utils';

const helveticaNowText = localFont({
  src: [
    { path: '../fonts/HelveticaNowTextThin.woff2', weight: '100' },
    { path: '../fonts/HelveticaNowTextLight.woff2', weight: '300' },
    { path: '../fonts/HelveticaNowText.woff2', weight: '400' },
    { path: '../fonts/HelveticaNowTextMedium.woff2', weight: '500' },
  ],
  variable: '--HNText',
});

const heleveticaNowDisplay = localFont({
  src: [
    { path: '../fonts/HelveticaNowDisplayThin.woff2', weight: '100' },
    { path: '../fonts/HelveticaNowDisplayXLt.woff2', weight: '200' },
    { path: '../fonts/HelveticaNowDisplayLight.woff2', weight: '400' },
    { path: '../fonts/HelveticaNowDisplayXBd.woff2', weight: '800' },
  ],
  variable: '--HNDisplay',
});

export const metadata = {
  title: {
    template: METADATA_DEFAULTS.titleTemplate,
    default: METADATA_DEFAULTS.title,
  },
  description: METADATA_DEFAULTS.description,
  other: {
    'facebook-domain-verification': 'crcc1w6m8pzupntevpwb2092a1v7x4',
  },
};

const getNavItems = async () => {
  const response = await cms().getFooter();
  const header = await cms().getNavigation();
  const eventBasedModal = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '694lKHQNLFTlsrYaNbiTzL',
  });
  const topBanner = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '2lWgtBdFudHdHEMQZ9Op5J',
  });

  return {
    nav: getFirstItemInCollection(header.navigationCollection),
    footer: getFirstItemInCollection(response.footerCollection),
    eventBasedModal: eventBasedModal.crmEventBasedModal,
    topBanner: topBanner.crmEventBasedModal,
  };
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { footer, nav, eventBasedModal, topBanner } = await getNavItems();
  const {
    firstNavSectionCollection,
    secondNavSectionCollection,
    bottomNavCollection,
    socialIconsCollection,
    addressLine1,
    addressLine2,
    copyrightText,
  } = footer;

  const store = {
    label: 'Store',
    external: false,
    href: 'https://store.exo.inc/',
  };

  const product = {
    label: 'Cart',
    external: false,
    href: 'https://store.exo.inc/product/FG-1001-24',
  };

  const { home, productsCollection, support, resources, technologyLink, aboutUsCollection } = nav;

  return (
    <html lang="en">
      <body
        className={cx(helveticaNowText.variable, heleveticaNowDisplay.variable)}
        data-accent-color="exo-blue"
        data-theme="light"
      >
        <Analytics />
        <EmailDialog
          heroText={eventBasedModal?.heroText ?? ''}
          supportingText={eventBasedModal?.supportingText ?? ''}
          isModalEnabledOnSite={eventBasedModal?.isModalEnabledOnSite ?? false}
        />
        <Header
          home={home}
          productsCollection={productsCollection as any}
          resources={resources}
          support={support}
          technologyLink={technologyLink}
          aboutUsCollection={aboutUsCollection}
          store={store}
          product={product}
          heroText={topBanner?.heroText ?? ''}
          isModalEnabledOnSite={topBanner?.isModalEnabledOnSite ?? false}
          link={topBanner?.link ?? ''}
        />
        <PageWrapper>{children}</PageWrapper>
        <Footer
          socialIconsCollection={socialIconsCollection}
          firstNavSectionCollection={firstNavSectionCollection}
          secondNavSectionCollection={secondNavSectionCollection}
          bottomNavSectionCollection={bottomNavCollection}
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          copyrightText={copyrightText}
        />
        <GlobalCursor />
        <DraftModeIndicator />
        <Banner />
      </body>
    </html>
  );
}
