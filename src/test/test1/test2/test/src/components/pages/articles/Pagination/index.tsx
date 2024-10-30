import { CircleArrow } from '~/components/svgs';
import { ArrowLink } from '~/components/ui';

import styles from './Pagination.module.scss';

interface PaginationProps {
  increaseLimit: Function;
  reachedLimit: boolean;
}

const Pagination = (props: PaginationProps) => {
  const { increaseLimit, reachedLimit } = props;

  if (reachedLimit) {
    return null;
  }

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    increaseLimit();
  };

  return (
    <div className={styles.container}>
      <hr className={styles.rule} />

      <ArrowLink
        data-accent-color="exo-blue"
        className={styles.button}
        isSmall
        isSpan
        label="View More"
        onClick={handleClick}
        direction="down"
      />
    </div>
  );
};

export { Pagination };
