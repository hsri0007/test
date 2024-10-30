import { ExoLink } from '~/components/ui';
import { cx } from '~/utils';

import styles from './IconLink.module.scss';

type IconLinkProps = {
  href: string;
  icon: React.ReactNode;
  dark?: boolean;
};

export const IconLink = ({ href, icon, dark }: IconLinkProps) => {
  return (
    <ExoLink href={href} className={cx(styles.link, dark && styles.darkLink)}>
      {icon}
    </ExoLink>
  );
};
