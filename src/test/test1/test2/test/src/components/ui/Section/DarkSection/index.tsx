'use client';

import { useInView } from 'framer-motion';
import {
  ComponentPropsWithoutRef,
  Ref,
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useHeaderHeight } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';

interface DarkSectionProps extends ComponentPropsWithoutRef<'section'> {}

export const DarkSection = forwardRef((props: DarkSectionProps, ref: Ref<HTMLElement | null>) => {
  const { className, children, ...otherProps } = props;
  const {
    requestDarkHeader,
    unrequestDarkHeader,
    windowHeight,
    requestDarkBanner,
    unrequestDarkBanner,
    requestDarkQuickLinks,
    unrequestDarkQuickLinks,
  } = useGlobalStore([
    'requestDarkHeader',
    'unrequestDarkHeader',
    'windowHeight',
    'requestDarkBanner',
    'unrequestDarkBanner',
    'requestDarkQuickLinks',
    'unrequestDarkQuickLinks',
  ]);
  // Used to track which sections are requesting the dark header
  const id = useId();
  const sectionRef = useRef<HTMLElement | null>(null);
  // Pass in the external ref if needed
  useImperativeHandle(ref, () => sectionRef.current);

  // Get half the header height
  const headerHeight = useHeaderHeight();
  const halfHeaderHeight = useMemo(() => headerHeight * 0.5, [headerHeight]);
  // Calculate the in-view margins so the area is the top half of the header
  const inViewMargin = useMemo(() => {
    return `${halfHeaderHeight * -1}px 0px ${halfHeaderHeight - windowHeight}px 0px`;
  }, [halfHeaderHeight, windowHeight]);

  // Determine if the section is under the header using the in-view hook
  const isUnderHeader = useInView(sectionRef, {
    margin: inViewMargin,
  });

  // Determine if the section is under the banner using the in-view hook
  const inViewMarginBanner = useMemo(() => {
    return `${halfHeaderHeight - windowHeight}px 0px ${halfHeaderHeight * -1}px 0px`;
  }, [halfHeaderHeight, windowHeight]);

  const inViewMarginQuickLinks = useMemo(() => {
    return `${halfHeaderHeight - windowHeight * 0.5}px 0px ${halfHeaderHeight * -1}px 0px`;
  }, [halfHeaderHeight, windowHeight]);

  const isUnderBanner = useInView(sectionRef, {
    margin: inViewMarginBanner,
  });

  const isUnderQuickLinks = useInView(sectionRef, {
    margin: inViewMarginQuickLinks,
  });

  const [triggeringActive, setTriggeringActive] = useState(false);
  const [triggeringBannerActive, setTriggeringBannerActive] = useState(false);
  const [triggeringQuickLinksActive, setTriggeringQuickLinksActive] = useState(false);

  useEffect(() => {
    if (triggeringActive) return;
    // Request and unrequests the dark header theme depeding on if
    if (isUnderHeader) {
      setTriggeringActive(true);
      requestDarkHeader(id);
      setTimeout(() => {
        setTriggeringActive(false);
      }, 350);
    } else {
      setTriggeringActive(true);
      unrequestDarkHeader(id);
      setTimeout(() => {
        setTriggeringActive(false);
      }, 350);
    }
  }, [id, isUnderHeader, requestDarkHeader, triggeringActive, unrequestDarkHeader]);

  useEffect(() => {
    if (triggeringBannerActive) return;
    // Request and unrequests the dark header theme depeding on if
    if (isUnderBanner) {
      setTriggeringBannerActive(true);
      requestDarkBanner(id);
      setTimeout(() => {
        setTriggeringBannerActive(false);
      }, 350);
    } else {
      setTriggeringBannerActive(true);
      unrequestDarkBanner(id);
      setTimeout(() => {
        setTriggeringBannerActive(false);
      }, 350);
    }
  }, [id, isUnderBanner, requestDarkBanner, triggeringBannerActive, unrequestDarkBanner]);

  useEffect(() => {
    if (triggeringQuickLinksActive) return;
    // Request and unrequests the dark header theme depeding on if
    if (isUnderQuickLinks) {
      setTriggeringQuickLinksActive(true);
      requestDarkQuickLinks(id);
      setTimeout(() => {
        setTriggeringQuickLinksActive(false);
      }, 350);
    } else {
      setTriggeringQuickLinksActive(true);
      unrequestDarkQuickLinks(id);
      setTimeout(() => {
        setTriggeringQuickLinksActive(false);
      }, 350);
    }
  }, [
    id,
    isUnderQuickLinks,
    requestDarkQuickLinks,
    triggeringQuickLinksActive,
    unrequestDarkQuickLinks,
  ]);

  return (
    <section
      data-id={id}
      ref={sectionRef}
      data-theme="dark"
      data-under-header={isUnderHeader}
      {...otherProps}
      className={className}
    >
      {children}
    </section>
  );
});

DarkSection.displayName = 'DarkSection';
