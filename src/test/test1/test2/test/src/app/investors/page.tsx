import { Metadata } from 'next';

import { cms } from '~/cms';
import { CMSImage, Outro } from '~/components/ui';
import { ArrowLink } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './investors.module.scss';

const getInvestorsData = async () => {
  const response = await cms().investors(cms().defaultVariables);
  const data = getFirstItemInCollection(response.investorsPageCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getInvestorsData();

  return formatPageMeta(data?.meta);
}

const InvestorsPage = async () => {
  const data = await getInvestorsData();

  const { heroHeading, heroCopy, heroSubheading, investorCardsCollection, outro } = data;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.hero}>
          {heroHeading && <p className={styles.heroHeading}>{heroHeading}</p>}
          {heroCopy && <p className={styles.heroCopy}>{heroCopy}</p>}
          {heroSubheading && <p className={styles.heroSubhead}>{heroSubheading}</p>}
        </div>

        <div className={styles.cards}>
          {investorCardsCollection?.items.map((item) => (
            <div className={styles.card} key={item.sys.id}>
              {item.logo && (
                <div className={styles.cardImageWrap}>
                  <CMSImage
                    asset={item.logo}
                    className={styles.cardImage}
                    sm={{ asset: item.logo, width: 100 }}
                  />
                </div>
              )}

              {item.description && <p className={styles.cardDesc}>{item.description}</p>}
              {item.link && <ArrowLink className={styles.cardLink} isExternal {...item.link} />}
            </div>
          ))}
        </div>
      </div>

      <Outro {...outro} />
    </>
  );
};

export default InvestorsPage;
