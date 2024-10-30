import { ComponentProps } from 'react';

import { TechSpecContentFragment } from '~/cms';
import { TechSpecListSection } from '~/components/sections/TechSpecListSection';
import { TechSpecSection } from '~/components/sections/TechSpecSection';
import { Outro, Section } from '~/components/ui';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './TechSpecsContent.module.scss';

type TechSpecsContentPropsParents = OmitChildren<ComponentProps<'div'>> & TechSpecContentFragment;

interface TechSpecsContentProps extends TechSpecsContentPropsParents {}

export const TechSpecsContent = (props: TechSpecsContentProps) => {
  const {
    className,
    heroHeading,
    heroCopy,
    featuredTechSpecsCollection,
    techSpecsCollection,
    outro,
    ...otherProps
  } = props;

  const techSpecSections =
    !!featuredTechSpecsCollection && featuredTechSpecsCollection.items?.length
      ? featuredTechSpecsCollection.items.map((spec, index) => {
          return <TechSpecSection key={spec.sys.id} {...spec} alignRight={index % 2 !== 0} />;
        })
      : '';
  return (
    <div {...otherProps} className={cx(className)}>
      <Section className={styles.hero}>
        {!!heroHeading && <h1 className={styles.heroHeading}>{heroHeading}</h1>}
        {!!heroCopy && <p className={styles.heroCopy}>{heroCopy}</p>}
      </Section>
      {techSpecSections}
      {!!techSpecsCollection && techSpecsCollection.items?.length && (
        <TechSpecListSection specs={techSpecsCollection.items} />
      )}
      <div className={styles.require}>
        <p>*Requires Exo Works Enterprise</p>
      </div>
      <Outro {...outro} />
    </div>
  );
};
