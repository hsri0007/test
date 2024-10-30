import ICONS from './Icons';
import styles from './Intro.module.scss';

const Intro = ({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: string[];
}) => {
  return (
    <section className={styles.Intro}>
      <div className={styles.inner}>
        <div className={styles.gradientTop} />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.descriptionContainer}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.pointsListContainer}>
          <ul className={styles.pointsList}>
            {points.map((point, i) => {
              const Icon = ICONS[i as keyof typeof ICONS];

              return (
                <li className={styles.point} key={i}>
                  <span className={styles.iconContainer}>
                    <Icon />
                  </span>
                  <span className={styles.text}>{point}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

Intro.displayName = 'Intro';

export default Intro;
