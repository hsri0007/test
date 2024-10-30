import { PersonFragment } from '~/cms';
import { CMSImage, Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './PersonHeader.module.scss';

interface PersonHeaderProps
  extends Pick<PersonFragment, 'name' | 'title' | 'headshot' | 'accentColor'> {}

export const PersonHeader = (props: PersonHeaderProps) => {
  const { name, title, headshot, accentColor } = props;
  return (
    <Section className={cx(styles.section)}>
      <div className={styles.card}>
        <div className={styles.copy}>
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.profile}>
          <div
            className={styles.accent}
            style={{ background: `${accentColor?.value ?? '#10F8E4'}` }}
          />
          <CMSImage
            className={styles.photo}
            focus="top"
            fit="fill"
            width={500}
            height={674}
            xs={{ width: 700, height: 944 }}
            sm={{ width: 450, height: 607 }}
            md={{ width: 600, height: 809 }}
            lg={{ width: 350, height: 472 }}
            xl={{ width: 450, height: 607 }}
            xxl={{ width: 700, height: 944 }}
            asset={headshot}
          />
        </div>
      </div>
    </Section>
  );
};
