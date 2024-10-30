'use client';

import { Link, LinkFragment, Maybe, NotFoundPage } from '~/cms';
import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { ButtonLink, Section, SectionProps } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import styles from './Section404.module.scss';
import bgConfig from './bgConfig.yml';

interface Section404Props extends SectionProps {
  heading: NotFoundPage['heading'];
  copy: NotFoundPage['copy'];
  cta: Maybe<Pick<Link, 'label' | 'href'>>;
}

export const Section404 = ({ heading, copy, cta }: Section404Props) => {
  const isDesktop = useIsLandscape();

  const renderContent = () => {
    if (!copy) {
      return null;
    }

    const lines = copy.split('\n');

    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <>
      <div className={styles.gradientContainer} aria-hidden>
        <BackgroundCanvas config={bgConfig as BackgroundConfig} />
      </div>
      <Section className={styles.container}>
        <div className={styles.content404}>
          <h1>{heading ?? '404'}</h1>
          <div className={styles.copy}>{renderContent()}</div>
          <ButtonLink href={cta?.href ?? '/'} className={styles.btn} isSmall>
            {cta?.label ?? 'Home'}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
};
