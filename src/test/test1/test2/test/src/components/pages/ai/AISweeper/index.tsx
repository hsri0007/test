import styles from './AISweeper.module.scss';

export const SweepAi = () => {
  return (
    <div className={styles.calloutContainer}>
      <div className={styles.inner}>
        <div className={styles.bgGradient} />
        <div>
          <h1 className={styles.title}>Introducing</h1>
          <img className={styles.image} src="./logo-AI.png" alt="Logo" />
        </div>
        <div className={styles.descriptionContent}>
          <p className={styles.description}>
            {' '}
            Exo’s FDA-cleared SweepAI™ continuously evaluates and monitors the quality of your
            ultrasound images and provides immediate feedback, ensuring you are capturing the best
            scan possible. SweepAI automatically identifies quality images during scanning and
            indicates when enough diagnostic information has been captured. It takes mere seconds.
          </p>
        </div>
      </div>
    </div>
  );
};
