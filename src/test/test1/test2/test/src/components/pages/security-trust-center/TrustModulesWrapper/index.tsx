import { ReactNode } from 'react';

import { Asset, Link } from '~/cms';
import { ArrowLink, Section } from '~/components/ui';

import styles from './TrustModulesWrapper.module.scss';

export interface ITrustModulesWrapperProps {
  children: ReactNode;
  request?: Pick<Link, 'href' | 'label' | 'external'> | { label: string; href: string };
  headingCertificate?: string;
  certificateImages?: Pick<Asset, 'url' | 'title' | 'height' | 'width'>[];
  hideCertificate?: boolean;
}

const TrustModulesWrapper = (props: ITrustModulesWrapperProps) => {
  const {
    children,
    request,
    headingCertificate,
    certificateImages,
    hideCertificate = false,
  } = props;
  return (
    <Section className={styles.container}>
      {children}
      {!hideCertificate && (
        <div className={styles.certificate}>
          <h1 className={styles.text}>{headingCertificate}</h1>
          <ArrowLink className={styles.arrowLink} href={request?.href} isResponsive isSmall={true}>
            {request?.label}
          </ArrowLink>
          <div className={styles?.imageContainer}>
            {certificateImages?.map((certification, i) => {
              return (
                <img
                  key={i}
                  src={certification?.url}
                  style={{ height: certification?.height, width: certification?.width }}
                  alt={certification?.title}
                />
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
};

export default TrustModulesWrapper;
