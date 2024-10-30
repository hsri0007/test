import { marked } from 'marked';

import { AssetFragment, LinkFragment } from '~/cms';
import { ArrowLink } from '~/components/ui';
import { CMSImage } from '~/components/ui';
import { cx, externalToIsExternal } from '~/utils';
import { parseMarkdown } from '~/utils/server';

import { PointHeart } from '../PointHeart';
import styles from './Feature.module.scss';

interface FeatureProps {
  align: 'normal' | 'reverse';
  image: AssetFragment | null;
  heading: string | null;
  copy: string | null;
  cta: LinkFragment | null;
  hasHeart?: boolean;
}

const Feature = (props: FeatureProps) => {
  const { align, image, heading, copy, cta, hasHeart = false } = props;

  if (!image && !heading && !copy && !cta) {
    return null;
  }

  return (
    <div
      className={cx(
        styles.feature,
        align === 'normal' && styles.featureNormal,
        align === 'reverse' && styles.featureReverse
      )}
    >
      {image && !hasHeart && (
        <div className={styles.imageWrap}>
          <CMSImage
            asset={image}
            className={styles.image}
            sm={{ asset: image }}
            lg={{ asset: image }}
            loading="lazy"
          />
        </div>
      )}

      {hasHeart && (
        <div className={cx(styles.imageWrap, styles.heartWrap)}>
          <PointHeart />
        </div>
      )}

      <div className={styles.content}>
        {heading && <p className={styles.heading}>{heading}</p>}

        {copy && (
          <div
            className={styles.copy}
            dangerouslySetInnerHTML={{
              __html: parseMarkdown(copy) ?? '',
            }}
          />
        )}

        {cta && <ArrowLink isSmall {...externalToIsExternal(cta)} />}
      </div>
    </div>
  );
};

export { Feature };
