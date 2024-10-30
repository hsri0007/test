import dayjs from 'dayjs';
import { useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

import { ArticleWithoutContentFragment } from '~/cms';
import { ArrowLink } from '~/components/ui';
import { CMSImage } from '~/components/ui';
import { cx } from '~/utils';

import styles from './Item.module.scss';

interface ItemProps {
  data: ArticleWithoutContentFragment;
  featured?: boolean;
  filter?: string;
  showCategory?: boolean;
  showDate?: boolean;
}

const Item = (props: ItemProps) => {
  const { data, featured, filter, showCategory, showDate } = props;
  const { category, date, shortTitle, slug, thumbnail, title } = data;

  const external = slug?.startsWith('http');

  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef);

  return (
    <Link
      className={styles.itemWrapper}
      href={external ? slug ?? '' : `/article/${slug}`}
      target={data.category === 'Media Coverage' ? '_blank' : '_self'}
    >
      <div
        className={cx(styles.item, featured && styles.itemFeatured, isInView && styles.itemInview)}
        ref={animationRef}
      >
        {thumbnail && (
          <div className={styles.itemImageWrap}>
            <CMSImage
              className={styles.itemImage}
              asset={thumbnail}
              xs={{ asset: thumbnail, width: 400 }}
              lg={{ asset: thumbnail, width: featured ? 450 : 200 }}
              xl={{ asset: thumbnail, width: featured ? 600 : 400 }}
            />
          </div>
        )}

        <div className={styles.itemContent}>
          <p className={cx(styles.itemTitle, !thumbnail && styles.isLarge)}>
            {shortTitle || title}
          </p>

          <div className={styles.itemBar}>
            <ArrowLink
              data-accent-color="exo-blue"
              className={styles.itemLink}
              href={external ? slug : `/article/${slug}`}
              isExternal={data.category === 'Media Coverage'}
              isSpan
            >
              {category === 'Podcast' ? 'Listen' : 'Read'}
            </ArrowLink>

            {showCategory && <p className={styles.itemPill}>{category?.toUpperCase()}</p>}

            {showDate && <p className={styles.itemPill}>{dayjs(date).format('MMM DD, YYYY')}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export { Item };
