import { ArticleContentQuoteFragment } from '~/cms';

import styles from './Quote.module.scss';

interface ArticleContentQuoteProps {
  item: ArticleContentQuoteFragment;
}

const QuoteIcon = (props: { className: string }) => (
  <svg
    className={props.className}
    fill="none"
    height="32"
    viewBox="0 0 28 32"
    width="28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0.65 17.79C0.65 9.11999 2.86 4.19 8.64 1.64L9.83 0.959998V4.69999L9.15 5.20999C5.41 7.25 4.22 11.33 4.22 17.45V23.4H9.15V31.73H0.65V17.79ZM26.32 1.64L27.51 0.959998V4.69999L26.83 5.20999C23.09 7.25 21.9 11.33 21.9 17.45V23.4H26.83V31.73H18.33V17.79C18.33 9.11999 20.54 4.19 26.32 1.64Z" />
  </svg>
);

const ArticleContentQuote = (props: ArticleContentQuoteProps) => {
  const { item } = props;

  if (!item.content) return null;

  return (
    <div className={styles.quote}>
      <QuoteIcon className={styles.quoteIcon} />
      <p className={styles.quoteText}>{item.content}</p>
    </div>
  );
};

export { ArticleContentQuote };
