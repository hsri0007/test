import { ArrowRightSharp } from '~/components/svgs/ArrowRightSharp';
import { ExoLink, SecondaryHeader } from '~/components/ui';

import styles from './BackNav.module.scss';

export const BackNav = () => {
  return (
    <div className={styles.backNav}>
      <SecondaryHeader
        label={
          <ExoLink href="/our-people">
            <ArrowRightSharp />
            <span className={styles.backLabel}>Back</span>
          </ExoLink>
        }
      />
    </div>
  );
};
