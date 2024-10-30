import { ComponentProps, useMemo } from 'react';

import {
  FooterFirstNavSectionCollection,
  Link,
  LinkCollection,
  LinkFragment,
  Maybe,
  NotMaybe,
  SocialIcon as SocialIconCMS,
} from '~/cms';
import { cx, getFirstItemInCollection } from '~/utils';

import { ExoLink } from '../ExoLink';
import { Logo } from '../Logo';
import { SocialIcon } from '../SocialIcon';
import styles from './Footer.module.scss';

interface FooterProps extends ComponentProps<'footer'> {
  firstNavSectionCollection: Maybe<{ items: Pick<Link, 'label' | 'href' | 'external'>[] }>;
  secondNavSectionCollection: Maybe<{ items: Pick<Link, 'label' | 'href' | 'external'>[] }>;
  bottomNavSectionCollection: Maybe<{ items: Pick<Link, 'label' | 'href' | 'external'>[] }>;
  socialIconsCollection: Maybe<{ items: Array<NotMaybe<Pick<SocialIconCMS, 'platform' | 'url'>>> }>;
  addressLine1: Maybe<string>;
  addressLine2: Maybe<string>;
  copyrightText: Maybe<string>;
}

export const Footer = (props: FooterProps) => {
  const {
    className,
    firstNavSectionCollection,
    secondNavSectionCollection,
    bottomNavSectionCollection,
    socialIconsCollection,
    addressLine1,
    addressLine2,
    copyrightText,
    ...otherProps
  } = props;

  const generatePrimaryLinkClass = (href: Maybe<string>) => {
    if (href === '/exo-iris' || href === '/iris') {
      return styles.irisLink;
    } else if (href === '/exo-works') {
      return styles.worksLink;
    } else if (href === '/ai') {
      return styles.aiLink;
    }
  };
  const socialLinks = useMemo(
    () =>
      socialIconsCollection?.items.map((item) => {
        if (!item.platform) {
          return '';
        }
        return (
          <li key={item.platform} className={styles.socialLinkItem}>
            <ExoLink className={styles.socialLink} href={item.url} isExternal>
              <SocialIcon icon={item.platform} />
            </ExoLink>
          </li>
        );
      }),
    [socialIconsCollection?.items]
  );

  return (
    <footer className={cx(styles.footer, className)} {...otherProps}>
      <div className={styles.content}>
        <div className={styles.sectionLogo}>
          <ExoLink href="/">
            <Logo className={styles.logo} />
          </ExoLink>
        </div>
        <div className={styles.sectionPrimary}>
          <ul className={styles.primaryLinks}>
            {firstNavSectionCollection?.items.map((item, index) => (
              <li key={index} className={styles.primaryLinkItem}>
                <ExoLink
                  className={cx(styles.primaryLink, generatePrimaryLinkClass(item.href))}
                  href={item.href}
                  isExternal={item.external ?? false}
                >
                  {item.label}
                </ExoLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sectionSecondary}>
          <ul className={styles.secondaryLinks}>
            {secondNavSectionCollection?.items.map((item, index) => (
              <li key={index} className={styles.secondaryLinkItem}>
                <ExoLink
                  className={styles.secondaryLink}
                  href={item.href}
                  isExternal={item.external ?? undefined}
                >
                  {item.label}
                </ExoLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sectionSocial}>
          <ul className={styles.socialLinks}>{socialLinks}</ul>
        </div>
        <div className={styles.sectionLegal}>
          <ul className={styles.legalLinks}>
            {bottomNavSectionCollection?.items.map((item, index) => (
              <li key={index} className={styles.legalLinkItem}>
                <ExoLink
                  className={styles.legalLink}
                  href={item.href}
                  isExternal={item.external ?? false}
                >
                  {item.label}
                </ExoLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.sectionAddress}>
          <div className={styles.address}>
            <span>{addressLine1}</span>
            <br />
            <span>{addressLine2}</span>
          </div>
        </div>
        <div className={styles.sectionCopyright}>
          <span className={styles.copyright}>{copyrightText}</span>
        </div>
      </div>
    </footer>
  );
};
