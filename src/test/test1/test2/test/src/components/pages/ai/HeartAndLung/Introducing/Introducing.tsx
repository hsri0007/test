import { AssetFragment } from '~/cms';
import { Phone } from '~/components/sections/MediaBackgroundSection';

import styles from './Introducing.module.scss';

const Introducing = ({
  subtitle,
  title,
  paragraph1,
  paragraph2,
  itemsCollection,
}: {
  subtitle: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  itemsCollection: {
    items: {
      title: string;
      description: string;
      asset: AssetFragment | null;
    }[];
  };
}) => {
  return (
    <section className={styles.Introducing}>
      <div className={styles.inner}>
        <div className={styles.gradientTop} />
        <div className={styles.topTextContainer}>
          <p className={styles.subtitle}>{subtitle}</p>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.descriptionsContainer}>
            <p className={styles.description1}>{paragraph1}</p>
            <p className={styles.description2}>{paragraph2}</p>
          </div>
        </div>
        <div className={styles.blocksContainer}>
          {itemsCollection.items.map((item: any, i) => (
            <div className={styles.block} key={i}>
              <div className={styles.block__textSide}>
                <div className={styles.block__titleContainer}>
                  <p className={styles.block__title}>{item.title}</p>
                  <div className={styles.block__markerContainer}>
                    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <line x1="7.5" y1="-2.18555e-08" x2="7.5" y2="5" stroke="#222222" />
                      <line x1="7.5" y1="10" x2="7.5" y2="15" stroke="#222222" />
                      <line x1="10" y1="7.5" x2="15" y2="7.5" stroke="#222222" />
                      <line x1="4.37114e-08" y1="7.5" x2="5" y2="7.5" stroke="#222222" />
                    </svg>
                  </div>
                </div>
                <div className={styles.block__descriptionContainer}>
                  <p className={styles.block__description}>{item.description}</p>
                </div>
              </div>
              <div className={styles.block__imageSide}>
                <Phone isContain className={styles.block__phone} mediaAsset={item.asset} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Introducing.displayName = 'Introducing';

export default Introducing;
