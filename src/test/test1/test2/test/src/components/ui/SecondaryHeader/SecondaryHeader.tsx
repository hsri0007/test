'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ComponentProps, ReactNode, useCallback } from 'react';

import { ButtonLink } from '~/components/ui/ButtonLink';
import { ExoLink, ExoLinkProps } from '~/components/ui/ExoLink';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { ArrowLink } from '../ArrowLink';
import styles from './SecondaryHeader.module.scss';
import { SecondaryHeaderNav } from './SecondaryHeaderNav';
import { SecondaryHeaderWrapper } from './SecondaryHeaderWrapper';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export interface SecondaryHeaderProps extends ComponentProps<'header'> {
  logo?: ReactNode;
  mobileLogo?: ReactNode;
  logoLink?: ExoLinkProps;
  links?: ExoLinkProps[];
  cta?: ExoLinkProps;
  secondaryCta?: ExoLinkProps;
  label?: ReactNode;
  heroText?: string;
  isModalEnabledOnSite?: boolean;
  link?: string;
}

export const SecondaryHeaderContent = (props: SecondaryHeaderProps) => {
  const {
    className,
    children,
    logo,
    mobileLogo,
    logoLink = {},
    cta,
    links,
    label,
    secondaryCta,
    heroText,
    link,
    isModalEnabledOnSite,
    ...otherProps
  } = props;

  const isDesktop = useIsLandscape();

  const { dropdownOpen, openDropdown, closeDropdown } = useGlobalStore([
    'dropdownOpen',
    'openDropdown',
    'closeDropdown',
  ]);

  const toggleDropdown = useCallback(
    () => (dropdownOpen ? closeDropdown() : openDropdown()),
    [dropdownOpen, openDropdown, closeDropdown]
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams?.get('category');

  const navItems =
    links && links.length
      ? links.map((link, index) => {
          let isCurrent = pathname === link.href;

          // Handle article filters
          const url = link.href as unknown as
            | undefined
            | null
            | { query: { category: string | undefined } };
          const linkCategory = url?.query?.category;
          if (
            (category && linkCategory && linkCategory === category) ||
            (!category && link.label === 'Latest')
          ) {
            isCurrent = true;
          }
          return (
            <li
              key={`secondary-header-item-${index}`}
              className={cx(styles.navItem, isCurrent && styles.isCurrent)}
            >
              <ExoLink {...link} />
            </li>
          );
        })
      : '';

  return (
    <>
      <SecondaryHeaderWrapper
        heroText={heroText}
        isModalEnabledOnSite={isModalEnabledOnSite}
        link={link}
      >
        <header className={cx(styles.header, className)} {...otherProps}>
          {!!logo && (
            <ExoLink
              label={`Learn more about ${toTitleCase((logoLink?.href as string) || '')}`}
              {...logoLink}
              className={styles.logoLink}
            >
              <div className={styles.logo}>{logo}</div>
              <div className={styles.mobileLogo}>{mobileLogo ?? logo}</div>
            </ExoLink>
          )}
          {!!label && label}
          <div className={styles.content}>
            <SecondaryHeaderNav>
              <ul className={styles.navItems}>
                {navItems}
                {!!secondaryCta && !isDesktop && (
                  <li>
                    <ButtonLink {...secondaryCta} secondary className={styles.cta} isSmall>
                      {secondaryCta.label}
                    </ButtonLink>
                  </li>
                )}
              </ul>
            </SecondaryHeaderNav>
            {!!secondaryCta && isDesktop && (
              <ButtonLink {...secondaryCta} secondary className={styles.cta} isSmall>
                {secondaryCta.label}
              </ButtonLink>
            )}
            {!!cta && (
              <ButtonLink {...cta} className={styles.cta} isSmall>
                {cta.label}
              </ButtonLink>
            )}
            {!!navItems && (
              <div className={styles.toggleWrap}>
                <button
                  aria-hidden={isDesktop}
                  tabIndex={isDesktop ? -1 : 0}
                  className={cx(styles.toggle, dropdownOpen && styles.open)}
                  aria-label={dropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
                  role="button"
                  aria-expanded={isDesktop || dropdownOpen}
                  aria-controls="dropdown-nav"
                  onClick={toggleDropdown}
                />
              </div>
            )}
          </div>
        </header>
      </SecondaryHeaderWrapper>
    </>
  );
};
