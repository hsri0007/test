import styles from './InnovationCallout.module.scss';

const InnovationCallout = ({ title, description }: { title: string; description: string }) => {
  if (!title || !description) return null;

  return (
    <div className={styles.InnovationCallout}>
      <div className={styles.inner}>
        <div className={styles.bgGradient} />
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.descriptionContent}>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

InnovationCallout.displayName = 'InnovationCallout';

export default InnovationCallout;
