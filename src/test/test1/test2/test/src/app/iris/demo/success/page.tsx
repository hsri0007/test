import { cms } from '~/cms';
import { ButtonLink, ExoLink } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';

import styles from './success.module.scss';

const getData = async () => {
  const response = await cms().bookDemo({
    ...cms().defaultVariables,
    product: 'exo-iris-virtual-demo',
  });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

const Success = async () => {
  const data = await getData();

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{data.thankYouHeading}</h1>
      {data.thankYouSubheading && <p className={styles.subheading}>{data.thankYouSubheading}</p>}
      {data.thankYouBody && <p className={styles.body}>{data.thankYouBody}</p>}
      <div className={styles.buttonContainer}>
        <ButtonLink href="/iris/demo/virtual-demo">Virtual Demo</ButtonLink>
        <ButtonLink secondary href="/iris/">
          Home
        </ButtonLink>
      </div>
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
    </section>
  );
};

export default Success;
