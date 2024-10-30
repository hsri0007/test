import { Metadata } from 'next';

import { cms } from '~/cms';
import { ArticleContent } from '~/components/pages/article/Content';
import { ArticleMeta } from '~/components/pages/article/Meta';
import { formatPageMeta } from '~/utils/server';

import styles from './article.module.scss';

const getArticleData = async (slug: string) => {
  const response = await cms().getArticleBySlug({ ...cms().defaultVariables, slug });

  return {
    ...response,
  };
};

interface ArticleProps {
  params: { slug: string };
}

export async function generateMetadata(props: ArticleProps): Promise<Metadata> {
  const data = await getArticleData(props.params.slug);

  return formatPageMeta(data?.articleCollection?.items[0].pageMeta, { isArticle: true });
}

const Article = async (props: ArticleProps) => {
  const data = await getArticleData(props.params.slug);
  const pdfDownload = data?.articleCollection?.items[0];

  if (!data || !data.articleCollection || !data.articleCollection.items) {
    return null;
  }

  const { articleCollection } = data;
  const { items } = articleCollection;

  const { category, contentCollection, date, shortTitle, source, tags, title } = items[0];

  return (
    <div className={styles.article}>
      <h1 className={styles.articleTitle}>{shortTitle || title}</h1>
      <ArticleMeta
        category={category}
        date={date}
        source={source}
        tags={tags}
        url={pdfDownload?.download?.url}
      />
      <ArticleContent content={contentCollection} />
    </div>
  );
};

export default Article;
