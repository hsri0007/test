import { draftMode } from 'next/headers';
import Link, { LinkProps } from 'next/link';
import 'server-only';

import styles from './DraftModeIndicator.module.scss';

interface DraftModeIndicatorProps extends Omit<LinkProps, 'href'> {}

export const DraftModeIndicator = (props: DraftModeIndicatorProps) => {
  const { ...otherProps } = props;
  const { isEnabled } = draftMode();
  if (!isEnabled) {
    return <></>;
  }
  return (
    <Link {...otherProps} href="/api/disable-draft" prefetch={false} className={styles.indicator}>
      Exit Draft
    </Link>
  );
};
