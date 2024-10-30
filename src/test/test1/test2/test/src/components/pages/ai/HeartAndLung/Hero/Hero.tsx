import { AssetFragment, Maybe } from '~/cms';
import { CMSImage } from '~/components/ui';
import { DarkSection } from '~/components/ui/Section/DarkSection';

import styles from './Hero.module.scss';

const Hero = ({
  title,
  subtitle,
  image,
  eyebrow,
  mobileEyebrow,
}: {
  title: string;
  eyebrow: string;
  subtitle: string;
  mobileEyebrow: string;
  image: AssetFragment | null;
}) => {
  if (!title || !subtitle || !image) return null;

  return (
    <section className={styles.Hero}>
      <DarkSection>
        <div className={styles.inner}>
          <CMSImage
            loading="lazy"
            width={400}
            asset={image}
            lg={{ asset: image, width: 2000 }}
            className={styles.image}
          />
          <div className={styles.gradientTop} />
          <div className={styles.gradientBottom} />
          <div className={styles.eyebrow} dangerouslySetInnerHTML={{ __html: eyebrow }} />
          <div
            className={styles.mobileEyebrow}
            dangerouslySetInnerHTML={{ __html: mobileEyebrow }}
          />
          <div className={styles.textContent}>
            <h1 className={styles.title}>{title}</h1>
            <h1 className={styles.subtitle}>{subtitle}</h1>
          </div>
        </div>
      </DarkSection>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;
