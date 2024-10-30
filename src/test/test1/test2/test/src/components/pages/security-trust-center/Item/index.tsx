import { AssetFragment, LinkFragment } from '~/cms';
import { ArrowLink, CMSImage, Section } from '~/components/ui';
import { cx, externalToIsExternal } from '~/utils';

import styles from './Item.module.scss';

interface ItemProps {
  image: AssetFragment | null;
  heading: string | null;
  copy: string | null;
  cta: LinkFragment | null;
  alignRight?: boolean;
}

const Item = (props: ItemProps) => {
  const { image, heading, copy, cta, alignRight = false } = props;

  return (
    <Section
      className={cx(styles.container, alignRight ? styles.alignRight : styles.alignLeft)}
      isDark
    >
      <div className={styles.content}>
        {heading && <p className={styles.heading}>{heading}</p>}
        {copy && <p className={styles.copy}>{copy}</p>}
        {cta && <ArrowLink className={styles.cta} {...externalToIsExternal(cta)} isSmall={true} />}
      </div>
      {image && (
        <div className={styles.imageWrap}>
          <CMSImage
            asset={image}
            className={styles.image}
            width={375}
            xxs={{ width: 500 }}
            xs={{ width: 700 }}
            sm={{ width: 900 }}
            md={{ width: 1200 }}
            // sm={{ asset: image, width: }}
            // lg={{ asset: image, width: }}
          />
        </div>
      )}
    </Section>
  );
};

export { Item };
