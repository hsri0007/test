import { TechSpecFragment } from '~/cms';
import { Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { parseMarkdown } from '~/utils/server';
import { OmitChildren } from '~/utils/types';

import styles from './TechSpecListSection.module.scss';

interface TechSpecListSectionProps extends OmitChildren<SectionProps> {
  specs: TechSpecFragment[];
}

export const TechSpecListSection = (props: TechSpecListSectionProps) => {
  const { className, specs, ...otherProps } = props;
  const specItems = specs.length
    ? specs.map((spec) => {
        return (
          <li className={styles.spec} key={`spec-list-item-${spec.sys.id}`}>
            <h2 className={styles.title}>{spec.title}</h2>
            {!!spec.description && (
              <p
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: parseMarkdown(spec.description) ?? '' }}
              ></p>
            )}
          </li>
        );
      })
    : '';
  return (
    <Section {...otherProps} className={cx(className)}>
      <ul className={styles.list}>{specItems}</ul>
    </Section>
  );
};
