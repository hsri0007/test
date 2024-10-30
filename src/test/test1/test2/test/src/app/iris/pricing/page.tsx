import { Metadata } from 'next';

import { cms } from '~/cms';
import { PricingModal } from '~/components/sections/PricingSection/PricingModal';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './pricing.module.scss';

const getData = async () => {
  const response = await cms().iris(cms().defaultVariables);

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.exoIrisCollection),
  };
};

export const metadata: Metadata = {
  title: 'Exo Iris™ | Pricing',
};

const PricingPage = async () => {
  const { page } = await getData();
  const { pricing } = page;

  if (!pricing) return null;

  const { rowHeadingsCollection, columnsCollection, ctaButtonText } = pricing;

  return (
    <div className={styles.container}>
      <PricingModal
        columns={columnsCollection}
        rowHeadings={rowHeadingsCollection}
        triggerText={ctaButtonText}
      />
    </div>
  );
};

export default PricingPage;
