import styles from './ExoWorksInnovation.module.scss';

type DataProps = {
  name: string;
  subhead: string;
};

export const ExoWorksInnovation = ({ title, data }: { title: string; data: DataProps[] }) => {
  if (!title) return null;
  return (
    <div className={styles.calloutContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.bgGradient} />
          <p className={styles.title}>{title}</p>
          <div className={styles.inner}>
            {data?.map((works, i) => (
              <div key={i} className={styles.box}>
                <p className={styles.subtitle}>{works?.name}</p>
                <p className={styles.description}>{works?.subhead}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ExoWorksInnovation.displayName = 'ExoWorksInnovation';
