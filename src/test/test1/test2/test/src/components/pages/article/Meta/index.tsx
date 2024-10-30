import dayjs from 'dayjs';

import { ButtonLink } from '~/components/ui';

import styles from './Meta.module.scss';

interface ArticleMetaProps {
  category?: string | null;
  date?: string | null;
  source?: string | null;
  tags?: Array<string> | null;
  url?: string | null;
}

const ArticleMeta = (props: ArticleMetaProps) => {
  const { category, date, source, tags, url } = props;

  // combine category & tags
  let merged: Array<string> = [];

  if (category) merged = [category];
  if (tags) merged = [...merged, ...tags];

  const deduped = merged.filter((item, index) => merged.indexOf(item) === index);

  // format category label and list
  const formattedLabel = deduped.length > 1 ? 'Categories' : 'Category';
  const formattedCategories = deduped.join(', ');

  // format date
  const formattedDate = dayjs(date).format('MMMM DD, YYYY');

  return (
    <div className={styles.articleMeta}>
      <div className={styles.articleMetaGroup}>
        <p className={styles.articleMetaLabel}>{formattedLabel}</p>
        <p className={styles.articleMetaValue}>{formattedCategories}</p>
      </div>

      <div className={styles.articleMetaGroup}>
        <p className={styles.articleMetaLabel}>Date</p>
        <p className={styles.articleMetaValue}>{formattedDate}</p>
      </div>

      <div className={styles.articleMetaGroup}>
        <p className={styles.articleMetaLabel}>Source</p>
        <p className={styles.articleMetaValue}>{source || 'Exo'}</p>
      </div>

      {url && (
        <div className={styles.articleMetaGroup}>
          <p className={styles.articleMetaLabel}>PDF FILE</p>
          {/* <p className={styles.articleMetaValue}>{source || 'Exo'}</p> */}
          <a href={url} target="_blank">
            <ButtonLink className={styles.pdfDownload}>DOWNLOAD</ButtonLink>
          </a>
        </div>
      )}
    </div>
  );
};

export { ArticleMeta };
