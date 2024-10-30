import { NewsletterSection } from '~/components/sections/NewsletterSection';

import styles from './newsletter.module.scss';

const Newsletter = () => {
  return (
    <div className={styles.bookDemo}>
      <section className={styles.info}>
        <NewsletterSection
          heading="Good ideas? We've got a few."
          copy="Sign up for our emails to be the first to find out about latest breakthoughs and news"
        />
      </section>
    </div>
  );
};

export default Newsletter;
