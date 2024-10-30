import { ComponentProps } from 'react';

import {
  Asset,
  Link,
  Maybe,
  NavigationCollection,
  NavigationFragment,
  ProductNavigationLink,
} from '~/cms';
import { CartIcon } from '~/components/svgs/CartIcon';
import { ExoLink } from '~/components/ui/ExoLink';
import { Logo } from '~/components/ui/Logo';
import { cx } from '~/utils';

import styles from './Header.module.scss';
import { HeaderWrapper } from './HeaderWrapper';
import { Nav } from './Nav';
import { NavItem } from './NavItem';

interface HeaderProps extends ComponentProps<'header'> {
  className?: string;
  home: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  productsCollection: Maybe<{
    items: Pick<ProductNavigationLink, 'label' | 'color' | 'url'>[];
  }>;
  support: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  resources: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  technologyLink: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  aboutUsCollection: Maybe<{ items: Pick<Link, 'label' | 'href' | 'external'>[] }>;

  store: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  product: Maybe<Pick<Link, 'label' | 'href' | 'external'>>;
  heroText?: string;
  isModalEnabledOnSite?: boolean;
  link?: string;
}

export const Header = (props: HeaderProps) => {
  const {
    home,
    productsCollection,
    support,
    resources,
    technologyLink,
    aboutUsCollection,
    className,
    store,
    product,
    heroText,
    isModalEnabledOnSite,
    link,
    ...otherProps
  } = props;

  const aboutUsItems = aboutUsCollection?.items.map((item, index) => {
    return {
      label: item.label,
      href: item.href,
    };
  });

  const productsItems = productsCollection?.items.map((item, index) => {
    return {
      label: item.label,
      href: item.url,
      color: item.color,
    };
  });

  return (
    <HeaderWrapper heroText={heroText} isModalEnabledOnSite={isModalEnabledOnSite} link={link}>
      <header className={cx(styles.header, className)} {...otherProps}>
        <ExoLink href="/" className={styles.logoLink}>
          <Logo hideIconUntil="lg" className={styles.logo} />
        </ExoLink>
        <Nav>
          <NavItem href={home?.href ?? '/'} id="home">
            {home?.label}
          </NavItem>
          <NavItem id="products" subItems={productsItems as any}>
            Products
          </NavItem>
          <NavItem id="technology" href={technologyLink?.href ?? ''}>
            {technologyLink?.label}
          </NavItem>
          <NavItem id="resources" href={resources?.href ?? ''}>
            {resources?.label}
          </NavItem>
          <NavItem
            id="support"
            isExternal={support?.external ?? undefined}
            href={support?.href ?? ''}
          >
            {support?.label}
          </NavItem>
          <NavItem id="about-us" subItems={aboutUsItems as any}>
            About Us
          </NavItem>
          <NavItem id="store" isExternal={store?.external ?? undefined} href={store?.href ?? ''}>
            {store?.label}
          </NavItem>
          <NavItem
            id="cart"
            isExternal={product?.external ?? undefined}
            href={product?.href ?? ''}
            className={`${styles.mobiNav} ${styles.cartIcon}`}
          >
            <CartIcon />
          </NavItem>
        </Nav>
      </header>
    </HeaderWrapper>
  );
};
