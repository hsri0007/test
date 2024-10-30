import { cx } from '~/utils';

import { CardProps } from '../../PricingSection';
import styles from './PricingCard.module.scss';

type PricingCardProps = {
  number: number;
} & CardProps;

export const PricingCard = ({
  number,
  name,
  subhead,
  price,
  buyNowLink,
  buyNowCopy,
  priceDetails,
  bubbleText,
  listItems,
  legalCopy,
  installCopy,
}: PricingCardProps) => {
  return (
    <>
      {/* because there's no subgrid, this container is for screen readers and mobile only */}
      <article className={styles.container}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.subhead}>{subhead}</p>
        {(price || (buyNowLink && buyNowCopy)) && (
          <div className={styles.priceContainer}>
            {price && <p className={styles.price}>{price}</p>}
            {buyNowLink && buyNowCopy && (
              <a
                className={styles.buyNow}
                href={buyNowLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {buyNowCopy}
              </a>
            )}
          </div>
        )}
        {priceDetails && <p className={styles.priceDetails}>{priceDetails}</p>}
        {bubbleText && <p className={styles.bubbleText}>{bubbleText}</p>}
        {listItems && (
          <ul className={styles.list}>
            {listItems.map((item) => (
              <li key={item} className={styles.listItem}>
                {item}
              </li>
            ))}
          </ul>
        )}
        {legalCopy && <p className={styles.legalCopy}>{legalCopy}</p>}
        {legalCopy && installCopy && <div className={styles.divider} aria-hidden />}
        {installCopy && <p className={styles.installCopy}>{installCopy}</p>}
      </article>
      {/* this redundant mess is for desktop only; done to ensure content across cards
    lines up correctly, even if copy has variable length */}
      {/* <div
        className={cx(styles.desktopOnly, styles.desktopContainer)}
        style={{ gridColumn: `${number} / span 1` }}
      />
      <h3 className={cx(styles.desktopOnly, styles.name)} aria-hidden>
        {name}
      </h3>
      <p className={cx(styles.desktopOnly, styles.subhead)} aria-hidden>
        {subhead}
      </p>
      {(price || (buyNowLink && buyNowCopy)) && (
        <div className={cx(styles.desktopOnly, styles.priceContainer)} aria-hidden>
          {price && <p className={cx(styles.desktopOnly, styles.price)}>{price}</p>}
          {buyNowLink && buyNowCopy && (
            <a
              className={cx(styles.desktopOnly, styles.buyNow)}
              href={buyNowLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {buyNowCopy}
            </a>
          )}
        </div>
      )}
      {priceDetails && (
        <p className={cx(styles.desktopOnly, styles.priceDetails)} aria-hidden>
          {priceDetails}
        </p>
      )}

      {name === 'Exo Works Connect' && (
        <p className={cx(styles.desktopOnly, bubbleText && styles.bubbleText)} aria-hidden />
      )}
      <p className={cx(styles.desktopOnly, bubbleText && styles.bubbleText)} aria-hidden>
        {bubbleText}
      </p>

      {listItems && (
        <ul className={cx(styles.desktopOnly, styles.list)} aria-hidden>
          {listItems.map((item) => (
            <li key={item} className={cx(styles.desktopOnly, styles.listItem)}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {legalCopy && (
        <p className={cx(styles.desktopOnly, styles.legalCopy)} aria-hidden>
          {legalCopy}
        </p>
      )}
      {legalCopy && installCopy && (
        <div className={cx(styles.desktopOnly, styles.divider)} aria-hidden />
      )}
      {installCopy && (
        <p className={cx(styles.desktopOnly, styles.installCopy)} aria-hidden>
          {installCopy}
        </p>
      )} */}
    </>
  );
};
