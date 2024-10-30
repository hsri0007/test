import { ExoLink, ExoLinkProps } from '~/components/ui/ExoLink';
import { cx } from '~/utils';

import styles from './button-link.module.scss';

interface ButtonLinkProps extends ExoLinkProps {
  secondary?: boolean;
  isSmall?: boolean;
}

export const ButtonLink = ({
  children,
  label,
  secondary,
  isSmall = false,
  className,
  ...otherProps
}: ButtonLinkProps) => {
  return (
    <ExoLink
      {...otherProps}
      label={label}
      className={cx(
        className && className,
        styles.container,
        isSmall && styles.isSmall,
        secondary && styles.containerSecondary
      )}
    >
      {children ?? label}
    </ExoLink>
  );
};
