import { DemoPageData } from '~/app/iris/demo/page';
import { HubSpotForm } from '~/components/forms/HubSpotForm';
import { ExoLink, Video } from '~/components/ui';
import { HS_FORM_ID_EXO_IRIS_DEMO } from '~/constants';

import styles from '../../../app/book-demo/book-demo.module.scss';

export const StandardDemo = ({ data }: { data: DemoPageData }) => {
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
        formId={HS_FORM_ID_EXO_IRIS_DEMO}
        id="BOOK_DEMO"
      />
      <ExoLink href="/iris" className={styles.closeLink}>
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
          <rect x="1" y="1" width="48" height="48" rx="24" stroke="#384049" strokeWidth="2" />
        </svg>
      </ExoLink>
    </div>
  );
};
