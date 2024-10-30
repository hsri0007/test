import { marked } from 'marked';

import { ArticleContentCopyFragment } from '~/cms';

import styles from './Copy.module.scss';

interface ArticleContentCopyProps {
  item: ArticleContentCopyFragment;
}

const ArticleContentCopy = (props: ArticleContentCopyProps) => {
  const { item } = props;

  if (!item.copyContent) return null;

  return (
    <div
      className={styles.copy}
      dangerouslySetInnerHTML={{
        __html: marked.parse(item.copyContent, { mangle: false, headerIds: false, breaks: true }),
      }}
    />
  );
};

export { ArticleContentCopy };
