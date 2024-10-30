'use client';

import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FocusEventHandler, MouseEventHandler, forwardRef, useCallback } from 'react';

import { useGlobalStore } from '~/stores/globalStore';

export interface ExoLinkProps extends Omit<NextLinkProps, 'href'> {
  href?: NextLinkProps['href'] | null;
  children?: React.ReactNode;
  label?: string | null; // Can be used instead of children or to add a friendly label in addition to the children
  className?: string;
  isExternal?: boolean; // Disables the trasition effect and opens the link in a new tab
  disableTransition?: boolean; // Disables the transition effect
  tabIndex?: number;
  isSpan?: boolean;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLAnchorElement>;
}

export const ExoLink = forwardRef<HTMLAnchorElement, ExoLinkProps>((props, ref) => {
  const {
    href,
    children,
    isExternal = false,
    disableTransition = false,
    isSpan = false,
    label,
    ...otherProps
  } = props;
  const router = useRouter();
  const { setExitTransitionActive, clearActiveNavItem, collapseMobileNav } = useGlobalStore([
    'setExitTransitionActive',
    'clearActiveNavItem',
    'collapseMobileNav',
  ]);
  const pathname = usePathname();

  const onClick = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      if (href === undefined) {
        return;
      }
      clearActiveNavItem();
      collapseMobileNav();
      if (typeof href === 'string' || href === null) {
        // If the link is to the same page just go there
        if (
          pathname == href ||
          pathname == href?.split('?')[0] ||
          pathname == href?.split('#')[0]
        ) {
          if (href) {
            router.push(href);
          }
          return;
        }
      } else {
        // if the href has query params
        if (href.query && !href.pathname) {
          // join the key value pairs
          const params = Object.entries(href.query)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

          // push the existing pathname with the params appended
          router.push(`${pathname}?${params}`);
          return;
        }

        // If the link is to the same page just go there
        if (pathname == href.pathname) {
          router.push(`${href.pathname}`);
          return;
        }
      }
      setExitTransitionActive(true);
      // wait until exit transition is finished
      setTimeout(() => {
        if (typeof href === 'string') {
          router.push(href);
        } else {
          router.push(`${href?.pathname}`);
        }
      }, 500);
    },
    [clearActiveNavItem, collapseMobileNav, href, pathname, router, setExitTransitionActive]
  );

  const content = children ?? label;

  // Apply different props depending on if the link is external or explicitly set to not use the transition
  const conditionalLinkProps = isExternal
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : disableTransition || href === undefined || href === null
    ? {}
    : { onClick };

  if (href === undefined || href === null) {
    const Element = isSpan ? 'span' : 'a';

    return (
      <Element {...otherProps} {...conditionalLinkProps} aria-label={label ?? undefined} ref={ref}>
        {content}
      </Element>
    );
  }

  if (isSpan) {
    return (
      <span {...otherProps} {...conditionalLinkProps} aria-label={label ?? undefined} ref={ref}>
        {content}
      </span>
    );
  }

  return (
    <NextLink
      {...otherProps}
      {...conditionalLinkProps}
      href={href}
      aria-label={label ?? undefined}
      ref={ref}
    >
      {content}
    </NextLink>
  );
});

ExoLink.displayName = 'ExoLink';
