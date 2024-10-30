import { ArticleWithoutContentFragment } from '~/cms';

import { Item } from '../Item';
import styles from './List.module.scss';

interface ListProps {
  data: ArticleWithoutContentFragment[];
  featured?: ArticleWithoutContentFragment | undefined;
  filter?: string;
  showCategory?: boolean;
  showDate?: boolean;
}

const List = (props: ListProps) => {
  const { data, featured, filter, showCategory, showDate } = props;

  return (
    <div className={styles.list}>
      {featured && (
        <Item
          data={featured}
          featured
          filter={filter}
          key={`${filter}${featured.sys.id}`}
          showCategory={showCategory}
          showDate={showDate}
        />
      )}

      {data.map((article) => (
        <Item
          data={article}
          key={`${filter}${article.sys.id}`}
          filter={filter}
          showCategory={showCategory}
          showDate={showDate}
        />
      ))}
    </div>
  );
};

export { List };
