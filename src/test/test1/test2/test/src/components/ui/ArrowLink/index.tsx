import { ExoLink, ExoLinkProps } from '~/components/ui/ExoLink';
import { cx } from '~/utils';

import styles from './ArrowLink.module.scss';

interface ArrowLinkProps extends ExoLinkProps {
  isBig?: boolean;
  isSmall?: boolean;
  isResponsive?: boolean;
  direction?: 'right' | 'down' | 'left' | 'up';
  isSpan?: boolean;
}

export const ArrowLink = (props: ArrowLinkProps) => {
  const {
    className,
    label,
    children,
    isBig = false,
    isSmall = false,
    isResponsive = false,
    direction = 'right',
    isSpan = false,
    ...otherProps
  } = props;

  return (
    <ExoLink
      {...otherProps}
      label={label}
      className={cx(
        styles.link,
        isBig && styles.big,
        isSmall && styles.small,
        isResponsive && styles.isResponsive,
        styles[`direction_${direction}`],
        className
      )}
      isSpan={isSpan}
    >
      <span className={styles.copy}>{children ?? label}</span>
      <div className={styles.circle} aria-hidden>
        <svg
          className={styles.arrow}
          viewBox="0 0 5 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{`Chevron Facing ${direction}`}</title>
          <path
            d="M1.12793 0.797852L3.48843 3.15835L1.12793 5.51885"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </ExoLink>
  );
};
