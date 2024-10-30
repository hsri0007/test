import { AiContentFragment } from '~/cms';
import { ArrowLink } from '~/components/ui';
import { Section } from '~/components/ui';

import styles from './Partnerships.module.scss';

interface PartnershipsProps {
  heading: AiContentFragment['partnershipsHeading'];
  copy: AiContentFragment['partnershipsCopy'];
  cta: AiContentFragment['partnershipsCta'];
}

const Partnerships = (props: PartnershipsProps) => {
  const { heading, copy, cta } = props;

  return (
    <Section className={styles.container}>
      {heading && <p className={styles.heading}>{heading}</p>}
      {copy && <p className={styles.copy}>{copy}</p>}
      {cta && <ArrowLink className={styles.cta} isSmall {...cta} />}
    </Section>
  );
};

export { Partnerships };
