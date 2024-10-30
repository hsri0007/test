import { ArticleContentImageFragment } from '~/cms';
import { CMSImage } from '~/components/ui';

import styles from './Image.module.scss';

interface ArticleContentImageProps {
  item: ArticleContentImageFragment;
}

const ArticleContentImage = (props: ArticleContentImageProps) => {
  const { item } = props;

  if (!item.imageContent) return null;

  return (
    <div className={styles.image}>
      <CMSImage asset={item.imageContent} className={styles.imageFile} disableWidthHeight />
    </div>
  );
};

export { ArticleContentImage };
