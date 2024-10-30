import { AssetFragment, LinkFragment } from '~/cms';
import { ArrowLink, CMSImage } from '~/components/ui';
import { cx, externalToIsExternal } from '~/utils';

import styles from './Feature.module.scss';

interface FeatureProps {
  align: 'normal' | 'reverse';
  image: AssetFragment | null;
  heading: string | null;
  copy: string | null;
  cta: LinkFragment | null;
}

const Feature = (props: FeatureProps) => {
  const { align, image, heading, copy, cta } = props;

  if (!image && !heading && !copy && !cta) {
    return null;
  }

  return (
    <div className={styles.feature}>
      {image && (
        <div
          className={cx(
            styles.imageWrap,
            align === 'normal' && styles.imageLeft,
            align === 'reverse' && styles.imageRight
          )}
        >
          <CMSImage
            asset={image}
            className={styles.image}
            sm={{ asset: image, width: 800, height: 700 }} // @todo: add `width`
            lg={{ asset: image, width: 1500, height: 1300 }} // @todo: add `width`
            width={image?.width || 100}
            height={image?.height || 100}
            loading="lazy"
          />
        </div>
      )}

      <div
        className={cx(
          styles.content,
          align === 'normal' && styles.contentRight,
          align === 'reverse' && styles.contentLeft
        )}
      >
        {heading && <p className={styles.heading}>{heading}</p>}
        {copy && <p className={styles.copy}>{copy}</p>}
        {cta && <ArrowLink isSmall {...externalToIsExternal(cta)} />}
      </div>
    </div>
  );
};

export { Feature };
