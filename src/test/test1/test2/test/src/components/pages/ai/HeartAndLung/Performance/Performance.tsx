import styles from './Performance.module.scss';

type AmenityCollectionItem = {
  title: string;
  description: string;
};

const Performance = ({
  title,
  paragraph1,
  paragraph2,
  amenity1Title,
  amenity1ItemsCollection,
  amenity2Title,
  amenity2ItemsCollection,
}: {
  title: string;
  paragraph1: string;
  paragraph2: string;
  amenity1Title: string;
  amenity1ItemsCollection: AmenityCollectionItem[];
  amenity2Title: string;
  amenity2ItemsCollection: AmenityCollectionItem[];
}) => {
  if (
    !title ||
    !paragraph1 ||
    !paragraph2 ||
    !amenity1Title ||
    !amenity1ItemsCollection.length ||
    !amenity2Title ||
    !amenity2ItemsCollection.length
  ) {
    return null;
  }

  return (
    <div className={styles.Performance}>
      <div className={styles.inner}>
        <div className={styles.heroContent}>
          <div className={styles.bgGradient} />
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.heroContent__paragraphs}>
            <p className={styles.heroContent__paragraphs__p}>{paragraph1}</p>
            <p className={styles.heroContent__paragraphs__p}>{paragraph2}</p>
          </div>
        </div>
        <div className={styles.amenitiesContainer}>
          <Amenity title={amenity1Title} items={amenity1ItemsCollection} />
          <Amenity title={amenity2Title} items={amenity2ItemsCollection} />
        </div>
      </div>
    </div>
  );
};

function Amenity({ title, items }: { title: string; items: AmenityCollectionItem[] }) {
  return (
    <div className={styles.amenityItem}>
      <p className={styles.amenityItem__title}>{title}</p>
      <div className={styles.amenitiesList}>
        {items.map((obj, i) => (
          <div className={styles.amenity} key={i}>
            <p className={styles.amenity__title}>{obj.title}</p>
            <p className={styles.amenity__description}>{obj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

Performance.displayName = 'Performance';

export default Performance;
