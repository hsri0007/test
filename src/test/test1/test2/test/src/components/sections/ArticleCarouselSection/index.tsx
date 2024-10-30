import dayjs from 'dayjs';

import { ArticleCarouselSectionFragment, PageWithModularSectionFragment } from '~/cms';
import { SectionProps } from '~/components/ui';

import styles from './ArticleCarouselSection.module.scss';
import { ArticleCarouselSectionContent, ArticleDataItem } from './ArticleCarouselSectionContent';

interface ArticleCarouselSectionProps extends ArticleCarouselSectionFragment, SectionProps {
  articleCollection: PageWithModularSectionFragment['articleCollection'];
}

export const ArticleCarouselSection = (props: ArticleCarouselSectionProps) => {
  const {
    articleCollection,
    maxArticles,
    categoryWhitelist,
    categoryBlacklist,
    darkTheme,
    isDark,
    ...otherProps
  } = props;

  // Check if for some reason there are no articles
  const noArticles =
    !articleCollection || !articleCollection.items || articleCollection.items.length === 0;

  if (noArticles) {
    return <></>;
  }

  let articleDataWithFormattedDates: ArticleDataItem[] = [];
  articleCollection.items.forEach((article) => {
    if (articleDataWithFormattedDates.length < (maxArticles ?? 20)) {
      // If there is a whitelist only include articles from the given categories
      if (
        (categoryWhitelist && categoryWhitelist.includes(`${article.category}`)) ||
        !categoryWhitelist
      ) {
        // If there is a blacklist don't include articles from the given categories
        if (
          (categoryBlacklist && !categoryBlacklist.includes(`${article.category}`)) ||
          !categoryBlacklist
        ) {
          const formattedDate = dayjs(article.date).format('MMM DD, YYYY');
          // const excerpt
          articleDataWithFormattedDates.push({ ...article, formattedDate });
        }
      }
    }
  });

  // Edge case that no articles come back we hide the whole carousel

  return (
    <ArticleCarouselSectionContent
      isDark={isDark !== undefined ? isDark : darkTheme !== false}
      articleData={articleDataWithFormattedDates}
      {...otherProps}
    />
  );
};
