'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Texture, VideoTexture } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import {
  BREAKPOINTS,
  COL_COUNT_DESKTOP,
  COL_COUNT_MOBILE,
  COL_COUNT_TABLET,
  GRID_GAP_DESKTOP,
  GRID_GAP_MOBILE,
  GRID_GAP_TABLET,
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  SIDE_PADDING_DESKTOP,
  SIDE_PADDING_MOBILE,
  SIDE_PADDING_TABLET,
} from '~/constants';
import { useGlobalStore } from '~/stores/globalStore';
import { getBrowserInfo } from '~/utils/client';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', listener);
    } else {
      media.addEventListener('change', listener);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', listener);
      } else {
        media.removeEventListener('change', listener);
      }
    };
  }, [matches, query]);

  return matches;
}

export const useIsXxs = () => useMediaQuery(`(min-width: ${BREAKPOINTS.xxs}px)`);
export const useIsXs = () => useMediaQuery(`(min-width: ${BREAKPOINTS.xs}px)`);
export const useIsSm = () => useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);
export const useIsMd = () => useMediaQuery(`(min-width: ${BREAKPOINTS.md}px)`);
export const useIsLg = () => useMediaQuery(`(min-width: ${BREAKPOINTS.lg}px)`);
export const useIsXl = () => useMediaQuery(`(min-width: ${BREAKPOINTS.xl}px)`);
export const useIsXxl = () => useMediaQuery(`(min-width: ${BREAKPOINTS.xxl}px)`);
export const useIsPortrait = () => useMediaQuery(`(orientation: portrait)`);
export const useIsLandscape = () => useMediaQuery(`(orientation: landscape)`);

// RETURN VALUE BASED ON OBJECT MATCHING BREAKPOINTS
export interface ResponsiveObject {
  xxs: any;
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  xxl?: any;
}
export const useResponsiveValue = (obj: ResponsiveObject) => {
  const detectMatch = (obj: ResponsiveObject) => {
    const matchedBreakpoint = Object.entries(obj).map(([key]) => {
      //@ts-ignore
      return { key, value: window.matchMedia(`(min-width: ${BREAKPOINTS[key]}px)`).matches };
    });

    const lastBp = matchedBreakpoint.findLast((el) => el.value === true);
    if (lastBp) {
      //@ts-ignore
      return obj[lastBp.key];
    } else {
      return obj?.xxs;
    }
  };
  const [responsiveValue, setResponsiveValue] = useState(detectMatch(obj));

  useLayoutEffect(() => {
    const handleResize = () => {
      setResponsiveValue(detectMatch(obj));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [obj]);

  return responsiveValue;
};

export const useHeaderHeight = () => {
  const isDesktop = useIsLandscape();
  return isDesktop ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE;
};

export const useSidePadding = () => {
  const isTablet = useIsPortrait();
  const isDesktop = useIsLandscape();
  return isDesktop ? SIDE_PADDING_DESKTOP : isTablet ? SIDE_PADDING_TABLET : SIDE_PADDING_MOBILE;
};

export const useGridGap = () => {
  const isTablet = useIsPortrait();
  const isDesktop = useIsLandscape();
  return isDesktop ? GRID_GAP_DESKTOP : isTablet ? GRID_GAP_TABLET : GRID_GAP_MOBILE;
};

export const useColCount = () => {
  const isTablet = useIsPortrait();
  const isDesktop = useIsLandscape();
  return isDesktop ? COL_COUNT_DESKTOP : isTablet ? COL_COUNT_TABLET : COL_COUNT_MOBILE;
};

/**
 * Get the grid column width based on the window width
 */
export const useColWidth = () => {
  const { windowWidth } = useGlobalStore(['windowWidth']);
  const sidePadding = useSidePadding();
  const gridGap = useGridGap();
  const colCount = useColCount();
  return (windowWidth - sidePadding * 2 - gridGap * (colCount - 1)) / colCount;
};

/**
 * Checks if the user's browser is mobile or not
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const browser = getBrowserInfo();
    const platformType = browser?.getPlatformType();
    setIsMobile(platformType === 'mobile' || platformType === 'tablet' || platformType === 'tv');
  }, []);
  return isMobile;
};

/**
 * IS IN VIEWPORT
 */
export function useInViewport(
  ref: React.RefObject<HTMLDivElement>,
  cb: (isActive: boolean) => void = () => {},
  deps: any[] = []
) {
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        cb?.(self.isActive);
      },
    });

    return () => {
      st.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]);
}

/**
 * 3d THINGS
 */
export function useDeepClone(model: THREE.Object3D, deps = []) {
  return useMemo(() => {
    const clone = model.clone(true);
    clone.traverse((el: any) => {
      if (el.isMesh) {
        el.material = el.material.clone();
      }
    });

    return clone;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, ...deps]);
}

interface Asset {
  path: string;
  contentType: string;
}

/**
 * Renders a texture or video texture based on the content type
 * @param assets {Asset[]}
 */
export const useLoadContent = (assets?: Asset[]): (Texture | VideoTexture)[] => {
  return useMemo(() => {
    if (typeof document === 'undefined') return [];
    // @ts-ignore
    return assets.map((asset) => {
      const { path, contentType } = asset;
      const isVideo = contentType?.split('/')[0] === 'video';

      if (isVideo) {
        const video = document.createElement('video');
        video.src = path;
        video.crossOrigin = 'Anonymous';
        video.loop = true;
        video.muted = true;
        video.preload = 'auto';
        video.playsInline = true;
        video.load();
        video.pause();
        return new VideoTexture(video);
      } else {
        return new TextureLoader().load(path);
      }
    });
  }, [assets]);
};
