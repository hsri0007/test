import { LinkFragment, TrustCenterFragment } from '~/cms';
import { ArrowLink } from '~/components/ui';
import { cx } from '~/utils';

import styles from './LogosCTASection.module.scss';

interface LogosCTASectionProps {
  privacyHeading: TrustCenterFragment['heading'];
  privacySubhead: TrustCenterFragment['subhead'];
  trustCenterText: LinkFragment['label'];
  trustCenterUrl: LinkFragment['href'];
  trustOrgLogosCollection: TrustCenterFragment['complianceOrgsCollection'];
  className?: string | undefined;
}

export const LogosCTASection = (props: LogosCTASectionProps) => {
  return (
    <section className={cx(styles.container, props.className)}>
      <div className={styles.gradient} aria-hidden />
      <div className={styles.contentContainer}>
        {!!props.privacyHeading && <h2 className={styles.heading}>{props.privacyHeading}</h2>}
        {!!props.privacySubhead && <p className={styles.copy}>{props.privacySubhead}</p>}
        <ArrowLink className={styles.ctaLink} href={props.trustCenterUrl ?? '/'} isSmall isExternal>
          {props.trustCenterText ?? ''}
        </ArrowLink>
        <div className={styles.logosContainer}>
          {props.trustOrgLogosCollection?.items.map(({ url, description }, i) => (
            <img
              key={i}
              className={styles.image}
              src={url}
              alt={description}
              loading="lazy"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
