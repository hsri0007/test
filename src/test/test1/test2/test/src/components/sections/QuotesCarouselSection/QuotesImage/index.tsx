import { ComponentProps } from 'react';

import styles from './QuotesImage.module.scss';

interface QuotationImageProps extends ComponentProps<'div'> {
  imgSrc?: string;
  altText?: string;
}

export const QuotationImage = (props: QuotationImageProps) => {
  const { imgSrc, altText } = props;
  return (
    <div className={styles.carouselImage}>
      <img src={imgSrc} alt={altText} />
    </div>
  );
};
