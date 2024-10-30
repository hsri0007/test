import { AiContentFragment, AssetFragment } from '~/cms';
import { Section } from '~/components/ui';

import styles from './Manifesto.module.scss';

interface ManifestoProps {
  heading: AiContentFragment['manifestoSectionHeading'];
  ordered: AiContentFragment['manifestoItemsNumbered'];
  unordered: {
    icon: AssetFragment | null;
    heading: string | null;
    copy: string | null;
  }[];
}

const Manifesto = (props: ManifestoProps) => {
  const { heading, ordered, unordered } = props;

  return (
    <Section className={styles.container}>
      {heading && <p className={styles.heading}>{heading}</p>}

      {ordered && (
        <div className={styles.ordered}>
          {ordered.map((item, index) => (
            <div className={styles.orderedItem} key={index}>
              <p className={styles.orderedNumber}>{index + 1}</p>
              <p className={styles.orderedCopy}>{item}</p>
            </div>
          ))}
        </div>
      )}

      {unordered && (
        <div className={styles.unordered}>
          {unordered.map((item, index) => (
            <div className={styles.unorderedItem} key={index}>
              {item.icon && (
                <img
                  className={styles.unorderedIcon}
                  src={item.icon.url}
                  alt={item.heading ? item.heading : ''}
                  width={60}
                  height={60}
                />
              )}

              <div className={styles.unorderedContent}>
                {item.heading && <p className={styles.unorderedHeading}>{item.heading}</p>}

                {item.copy && (
                  <div
                    className={styles.unorderedCopy}
                    dangerouslySetInnerHTML={{ __html: item.copy }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export { Manifesto };
