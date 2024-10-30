import { ArticleContentFragment } from '~/cms';

import { ArticleContentAudio } from '../ContentAudio';
import { ArticleContentCopy } from '../ContentCopy';
import { ArticleContentImage } from '../ContentImage';
import { ArticleContentQuote } from '../ContentQuote';
import { ArticleContentVideo } from '../ContentVideo';
import styles from './Content.module.scss';

interface ArticleContentProps {
  content: ArticleContentFragment['contentCollection'];
}

const ArticleContent = (props: ArticleContentProps) => {
  const { content } = props;

  if (!content || !content.items) return null;

  const items = content.items.map((item) => {
    switch (item.__typename) {
      case 'Audio':
        return <ArticleContentAudio key={item.sys.id} item={item} />;
      case 'Copy':
        return <ArticleContentCopy key={item.sys.id} item={item} />;
      case 'Image':
        return <ArticleContentImage key={item.sys.id} item={item} />;
      case 'Quote':
        return <ArticleContentQuote key={item.sys.id} item={item} />;
      case 'Video':
        return <ArticleContentVideo key={item.sys.id} item={item} />;
    }
  });

  return <div className={styles.articleContent}>{items}</div>;
};

export { ArticleContent };
