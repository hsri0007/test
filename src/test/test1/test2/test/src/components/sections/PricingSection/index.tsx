'use client';

import { usePathname, useRouter } from 'next/navigation';

import { PricingFragment } from '~/cms';
import { ButtonLink, Section } from '~/components/ui';
import { cx } from '~/utils';

import { PricingCard } from './PricingCard';
import { PricingModal } from './PricingModal';
import styles from './PricingSection.module.scss';

export type CardProps = {
  name: string | null;
  subhead: string | null;
  price: string | null;
  buyNowLink: string | null;
  buyNowCopy: string | null;
  priceDetails: string | null;
  bubbleText: string | null;
  listItems: string[] | null;
  legalCopy: string | null;
  installCopy: string | null;
};

interface PricingSectionProps {
  pricing: PricingFragment | null;
}

export const PricingSection = (props: PricingSectionProps) => {
  const { pricing } = props;
  const router = useRouter();
  const pathname = usePathname();

  if (!pricing) return null;

  const {
    heading,
    subhead,
    rowHeadingsCollection,
    columnsCollection,
    ctaCopy,
    ctaButtonText,
    showCta,
  } = pricing;

  const isThreeCols = columnsCollection?.items.length && columnsCollection.items.length > 2;

  return (
    <Section className={styles.container} id="pricing">
      <div className={styles.copyContainer}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subhead}>{subhead}</p>
      </div>
      <div
        className={cx(styles.cardContainer, isThreeCols && styles['cardContainer--three-cards'])}
      >
        {columnsCollection?.items.map((card, i) => {
          // TODO: remove code, this should be update from Contentful
          let updatedFeatureList = card.featureList;
          if (Array.isArray(card.featureList)) {
            updatedFeatureList = card.featureList.map((item) => {
              if (item.includes('3-in-1')) {
                return '3-in-1 imaging with real-time Bladder, Cardiac and Lung AI';
              }
              return item;
            });
          }
          return (
            <PricingCard
              key={card.name}
              number={i + 1}
              name={card.name}
              subhead={card.description}
              price={card.price}
              buyNowLink={card.buttonLink}
              buyNowCopy={card.buttonText}
              priceDetails={card.priceDetails}
              bubbleText={card.bubble}
              listItems={updatedFeatureList}
              legalCopy={card.legal}
              installCopy={card.install}
            />
          );
        })}
      </div>
      {showCta && (
        <div className={styles.ctaContainer}>
          <p className={styles.ctaCopy}>{ctaCopy}</p>
          <p
            className={styles.triggerButton}
            onClick={() => {
              router.push(`${pathname}/pricing`);
            }}
          >
            {ctaButtonText}
          </p>
          {/* <PricingModal
            columns={columnsCollection}
            rowHeadings={rowHeadingsCollection}
            triggerText={ctaButtonText}
          /> */}
        </div>
      )}
    </Section>
  );
};
