import { Maybe } from '~/cms';
import { HubSpotForm } from '~/components/forms/HubSpotForm';
import { ExoLink } from '~/components/ui/ExoLink';

import styles from './DemoHubspotContainer.module.scss';

interface DemoHubspotContainerProps {
  title?: Maybe<string>;
  copy?: Maybe<string>;
  exitHref?: string;
  formId: string;
  portalId: string;
}

export const DemoHubspotContainer = ({
  title,
  copy,
  formId,
  portalId,
  exitHref,
}: DemoHubspotContainerProps) => {
  return (
    <div className={styles.container}>
      {title && <h1 className={styles.heading}>{title}</h1>}
      {copy && <p className={styles.copy}>{copy}</p>}
      <HubSpotForm className={styles.form} portalId={portalId} formId={formId} id="BOOK_DEMO" />
      {exitHref && (
        <ExoLink href="/iris/demo" className={styles.closeLink}>
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
      )}
    </div>
  );
};
