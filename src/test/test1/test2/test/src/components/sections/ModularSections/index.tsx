'use client';

import dynamic from 'next/dynamic';

import {
  ArticleCarouselSectionFragment,
  EmailSignUpSectionFragment,
  PageWithModularSectionFragment,
  QuoteCarouselSectionFragment,
  ResponsiveVideoSectionFragment,
} from '~/cms';
import { ArticleCarouselSection } from '~/components/sections/ArticleCarouselSection';
import { NewsletterSection } from '~/components/sections/NewsletterSection';
import { QuotesCarouselSection } from '~/components/sections/QuotesCarouselSection';

const VideoSection = dynamic(() => import('../VideoSection'));

interface ModularSectionProps extends Omit<PageWithModularSectionFragment, '__typename'> {
  items?: (
    | ArticleCarouselSectionFragment
    | EmailSignUpSectionFragment
    | ResponsiveVideoSectionFragment
    | QuoteCarouselSectionFragment
    | { __typename?: never }
  )[];
}

export const ModularSections = (props: ModularSectionProps) => {
  const { items, articleCollection } = props;

  if (!items) {
    return <></>;
  }
  const sections = items.map((section) => {
    if (!section?.__typename) {
      return '';
    }
    switch (section.__typename) {
      case 'ArticleCarousel':
        return (
          <ArticleCarouselSection
            key={section.sys.id}
            {...section}
            articleCollection={articleCollection}
          />
        );
      case 'ResponsiveVideo':
        return <VideoSection key={section.sys.id} {...section} />;
      case 'QuoteCarousel':
        return (
          <QuotesCarouselSection
            testimonials={section.quotesCollection}
            key={section.sys.id}
            {...section}
          />
        );
      case 'EmailSignUp':
        const { heading, copy, darkTheme } = section;

        return (
          <NewsletterSection
            key={section.sys.id}
            heading={heading}
            copy={copy}
            isDark={darkTheme ?? false}
          />
        );
      default:
        return '';
    }
  });
  return <>{sections}</>;
};
