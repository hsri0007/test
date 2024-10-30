import { AssetFragment, LinkFragment, TechnologyContentFragment } from '~/cms';
import { Section } from '~/components/ui';

import { Feature } from '../Feature';
import styles from './Features.module.scss';

interface FeaturesProps {
  heading: TechnologyContentFragment['featuresHeading'];
  subheading: TechnologyContentFragment['featuresSubheading'];
  items: {
    image: AssetFragment | null;
    heading: string | null;
    copy: string | null;
    cta: LinkFragment | null;
    hasHeart?: boolean;
  }[];
}

const Features = (props: FeaturesProps) => {
  const { heading, subheading, items } = props;

  return (
    <Section className={styles.container}>
      <div className={styles.headings}>
        {heading && <p className={styles.heading}>{heading}</p>}
        {subheading && <p className={styles.subhead}>{subheading}</p>}
      </div>

      {items.map((item, index) => (
        <Feature
          key={index}
          align={(index + 1) % 2 !== 0 ? 'normal' : 'reverse'}
          image={item.image}
          heading={item.heading}
          copy={item.copy}
          cta={item.cta}
          hasHeart={item.hasHeart}
        />
      ))}
    </Section>
  );
};

export { Features };
