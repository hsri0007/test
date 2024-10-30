import { AssetFragment, IntegrationsContentFragment, LinkFragment } from '~/cms';
import { Section } from '~/components/ui';

import { Feature } from '../';
import styles from './Features.module.scss';

interface FeaturesProps {
  heading: IntegrationsContentFragment['featuresHeading'];
  items: {
    image: AssetFragment | null;
    heading: string | null;
    copy: string | null;
    cta: LinkFragment | null;
  }[];
}

const Features = (props: FeaturesProps) => {
  const { heading, items } = props;

  return (
    <Section className={styles.container}>
      <div className={styles.headings}>
        {heading && <p className={styles.heading}>{heading}</p>}
      </div>

      {items.map((item, index) => (
        <Feature
          key={index}
          align={(index + 1) % 2 !== 0 ? 'normal' : 'reverse'}
          image={item.image}
          heading={item.heading}
          copy={item.copy}
          cta={item.cta}
        />
      ))}
    </Section>
  );
};

export { Features };
