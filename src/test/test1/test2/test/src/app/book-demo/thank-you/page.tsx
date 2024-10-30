import { Metadata } from 'next';

import { cms } from '~/cms';
import { ExoLink } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './thank-you.module.scss';

const getData = async () => {
  const response = await cms().bookDemo({ ...cms().defaultVariables, product: 'exo-works' });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return formatPageMeta(data?.pageMeta);
}

interface ThankYouProps {}

const ThankYou = async (props: ThankYouProps) => {
  const data = await getData();

  return (
    <div className={styles.thankYou}>
      <section className={styles.content}>
        {!!data.thankYouSubheading && (
          <h2 className={styles.subheading}>{data.thankYouSubheading}</h2>
        )}
        <h1 className={styles.heading}>{data.thankYouHeading}</h1>
        {!!data.thankYouBody && <h3 className={styles.body}>{data.thankYouBody}</h3>}
      </section>
      <ExoLink href="/exo-works" className={styles.closeLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          fill="none"
          className={styles.closeIcon}
        >
          <path
            d="M18.4844 18.4844L32.0014 32.0014"
            stroke="#384049"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M18.4844 32L32.0014 18.4829"
            stroke="#384049"
            stroke-width="2"
            stroke-linecap="round"
          />
          <rect x="1" y="1" width="48" height="48" rx="24" stroke="#384049" stroke-width="2" />
        </svg>
      </ExoLink>
    </div>
  );
};

export default ThankYou;
