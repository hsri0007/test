import { Metadata } from 'next';

import { cms } from '~/cms';
import { HubSpotForm } from '~/components/forms/HubSpotForm';
import { ExoLink, Video } from '~/components/ui';
import { HS_FORM_ID_EXO_WORKS_DEMO } from '~/constants';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './book-demo.module.scss';

const getData = async () => {
  const response = await cms().bookDemo({ ...cms().defaultVariables, product: 'exo-works' });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return formatPageMeta(data?.pageMeta);
}

interface BookDemoProps {}

const BookDemo = async (props: BookDemoProps) => {
  const data = await getData();

  const details =
    data.details && data.details.length
      ? data.details.map((detail, index) => {
          return (
            <li className={styles.detail} key={`demo-detail-${index}`}>
              {detail}
            </li>
          );
        })
      : false;

  return (
    <div className={styles.bookDemo}>
      <section className={styles.info}>
        <h1 className={styles.heading}>{data.heading}</h1>
        {!!data.subheading && <h2 className={styles.subheading}>{data.subheading}</h2>}
        {!!details && <ul className={styles.details}>{details}</ul>}
        {!!data.video && !!data.video.url && (
          <Video
            altText={data.video.description}
            url={data.video.url}
            className={styles.video}
            data-theme="dark"
          />
        )}
      </section>
      <HubSpotForm
        className={styles.form}
        portalId="20465501"
        formId={HS_FORM_ID_EXO_WORKS_DEMO}
        id="BOOK_DEMO"
      />
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
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.4844 32L32.0014 18.4829"
            stroke="#384049"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="1" y="1" width="48" height="48" rx="24" stroke="#384049" stroke-width="2" />
        </svg>
      </ExoLink>
    </div>
  );
};

export default BookDemo;
