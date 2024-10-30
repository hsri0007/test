import { ArticleContentCopyFragment, ArticleContentFragment, LegalContentFragment } from '~/cms';
import { ArticleContent } from '~/components/pages/article/Content';
import { ArticleContentCopy } from '~/components/pages/article/ContentCopy';

import styles from './LegalSection.module.scss';

interface LegalSectionProps {
  title: LegalContentFragment['title'];
  content: LegalContentFragment['content'];
  contentMore?: LegalContentFragment['content'];
}

export const LegalSection = (props: LegalSectionProps) => {
  const { title, content, contentMore } = props;

  return (
    <div className={styles.legalSection}>
      <h1 className={styles.title}>{title}</h1>
      <ArticleContentCopy
        item={{
          sys: '' as any,
          copyContent: content as string,
        }}
      />
      {contentMore && (
        <ArticleContentCopy
          item={{
            sys: '' as any,
            copyContent: contentMore as string,
          }}
        />
      )}
    </div>
  );
};
