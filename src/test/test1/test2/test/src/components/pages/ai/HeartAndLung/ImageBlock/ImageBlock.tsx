import { AssetFragment } from '~/cms';
import { CMSImage } from '~/components/ui';

import styles from './ImageBlock.module.scss';

const ImageBlock = ({
  title,
  image,
  text,
  textTitle,
}: {
  title: string;
  image: AssetFragment | null;
  textTitle: string;
  text: string;
}) => {
  return (
    <section className={styles.ImageBlock}>
      <div className={styles.inner}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.imageTextContainer}>
          <div className={styles.imageContainer}>
            <CMSImage asset={image} className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.textTitle}>{textTitle}</p>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

ImageBlock.displayName = 'ImageBlock';

export default ImageBlock;
