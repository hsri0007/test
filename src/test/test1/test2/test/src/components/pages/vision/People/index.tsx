import { VisionContentFragment } from '~/cms';
import { ArrowLink, CMSImage, Section } from '~/components/ui';
import { cx } from '~/utils';

import styles from './People.module.scss';

interface PeopleProps {
  heading: VisionContentFragment['aboutHeading'];
  copyA: VisionContentFragment['aboutCopyA'];
  copyB: VisionContentFragment['aboutCopyB'];
  ctaA: VisionContentFragment['aboutCtaA'];
  ctaB: VisionContentFragment['aboutCtaB'];
  people: VisionContentFragment['aboutPeopleCollection'];
}

const People = (props: PeopleProps) => {
  const { heading, copyA, copyB, ctaA, ctaB, people } = props;

  return (
    <Section className={styles.container}>
      {heading && <p className={styles.heading}>{heading}</p>}

      <div className={styles.columnLeft}>
        <div className={styles.content}>
          {copyA && <p className={styles.contentCopy}>{copyA}</p>}
          {ctaA && <ArrowLink className={styles.contentLink} isSmall {...ctaA} />}
        </div>

        <div className={styles.content}>
          {copyB && <p className={styles.contentCopy}>{copyB}</p>}
          {ctaB && <ArrowLink className={styles.contentLink} isSmall {...ctaB} />}
        </div>
      </div>

      <div className={styles.columnRight}>
        {people?.items.map((item, index) => (
          <div className={cx(styles.person, styles[`person-${index + 1}`])} key={item.sys.id}>
            <CMSImage
              asset={item.gridPhoto}
              className={styles.personImage}
              fit="fill"
              focus="top"
              sm={{ asset: item.gridPhoto, width: 620 }}
              lg={{ asset: item.gridPhoto, width: 300 }}
              xl={{ asset: item.gridPhoto, width: 350 }}
              xxl={{ asset: item.gridPhoto, width: 400 }}
              loading="lazy"
            />

            <div className={styles.personContent}>
              <p className={styles.personName}>{item.name}</p>
              <p className={styles.personTitle}>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export { People };
