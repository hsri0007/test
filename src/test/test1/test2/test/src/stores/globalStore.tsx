'use client';

import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';
import { devtools } from 'zustand/middleware';

import { MOUSE_ACTIVITY_TIMEOUT, NAV_HIGHLIGHT_TIMEOUT } from '~/constants';
import { ColorName, CursorName } from '~/utils/types';

export type CursorState = {
  name?: CursorName;
  hidden: boolean;
  inactiveHidden: boolean;
  accentColor?: ColorName;
  theme: 'dark' | 'light';
};

const DEFAULT_GLOBAL_CURSOR = {
  hidden: false,
  inactiveHidden: false,
  name: undefined,
  accentColor: undefined,
  theme: 'light',
} satisfies CursorState;

type StoreState = {
  // Window
  windowWidth: number;
  windowHeight: number;
  refreshWindowSize: () => void;
  // Mouse
  mousePressed: boolean;
  setMousePressed: (mousePressed: boolean) => void;
  globalCursor: CursorState;
  updateGlobalCursor: (update: Partial<CursorState>) => void;
  resetGlobalCursor: () => void;
  mouseInactive: boolean;
  mouseActivityTimeout?: NodeJS.Timeout;
  setMouseInactive: () => void;
  handleMouseActivity: () => void;
  // used for page transitions
  exitTransitionActive: boolean;
  setExitTransitionActive: (exitTransitionActive: boolean) => void;
  lastPathname: string;
  setLastPathname: (pathname: string) => void;
  // Header
  headerReady: boolean;
  setHeaderReady: (ready: boolean) => void;

  // Header Themes
  darkHeaderRequests: string[];
  headerTheme: 'dark' | 'light';
  requestDarkHeader: (id: string) => void;
  unrequestDarkHeader: (id: string) => void;
  clearDarkHeaderRequests: () => void;

  // Banner Themes
  darkBannerRequests: string[];
  bannerTheme: 'dark' | 'light';
  requestDarkBanner: (id: string) => void;
  unrequestDarkBanner: (id: string) => void;
  clearDarkBannerRequests: () => void;

  // Iris Quick Links Themes
  darkQuickLinksRequests: string[];
  quickLinksTheme: 'dark' | 'light';
  requestDarkQuickLinks: (id: string) => void;
  unrequestDarkQuickLinks: (id: string) => void;
  clearDarkQuickLinksRequests: () => void;

  // Scrolling
  scrollDisabled: boolean;
  setScrollDisabled: (scrollDisabled: boolean) => void;
  scrollingUp: boolean;
  setScrollingUp: (up: boolean) => void;
  atPageTop: boolean;
  setAtPageTop: (top: boolean) => void;
  // Nav
  activeNavItem: string | null;
  activeNavItemTimeout?: NodeJS.Timeout;
  setActiveNavItem: (id: string) => void;
  removeActiveNavItem: () => void;
  clearActiveNavItem: () => void;
  mobileNavExpanded: boolean;
  expandMobileNav: () => void;
  collapseMobileNav: () => void;
  dropdownOpen: boolean;
  openDropdown: () => void;
  closeDropdown: () => void;
  // Video
  volume: number;
  setVolume: (volume: number) => void;
  showEmailDialogSoon: boolean;
  setShowEmailDialogSoon: (inView: boolean) => void;
};

let initialWindowDimensions = { width: 1, height: 1 };

if (typeof window !== 'undefined') {
  initialWindowDimensions = { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Global Store Hook (Deep)
 * Used to track states across the site.
 * This hook is used for "deep" access to the the global store.
 * Using this will trigger renders on any change to the store
 */
export const useGlobalStoreDeep = create<StoreState>()(
  devtools(
    (set) => ({
      windowWidth: initialWindowDimensions.width,
      windowHeight: initialWindowDimensions.height,
      showEmailDialogSoon: false,
      setShowEmailDialogSoon: (inView: boolean) => set({ showEmailDialogSoon: inView }, false),
      refreshWindowSize: () =>
        set(
          () => {
            return { windowWidth: window.innerWidth, windowHeight: window.innerHeight };
          },
          false,
          'refreshWindowSize'
        ),
      mouseInactive: false as boolean,
      setMouseInactive: () => set({ mouseInactive: true }, false, 'setMouseInactive'),
      handleMouseActivity: () =>
        set(
          (state) => {
            // Clear the timeout and reset it
            clearTimeout(state.mouseActivityTimeout);

            const setMouseInactive = state.setMouseInactive;
            const mouseActivityTimeout = setTimeout(() => {
              setMouseInactive();
            }, MOUSE_ACTIVITY_TIMEOUT);
            return { mouseInactive: false, mouseActivityTimeout };
          },
          false,
          'handleMouseActivity'
        ),
      mousePressed: false as boolean,
      setMousePressed: (mousePressed) => set({ mousePressed }, false, 'setMousePressed'),
      globalCursor: DEFAULT_GLOBAL_CURSOR,
      updateGlobalCursor: (update) =>
        set(
          (state) => {
            return { globalCursor: { ...state.globalCursor, ...update } };
          },
          false,
          'updateGlobalCursor'
        ),
      resetGlobalCursor: () =>
        set(
          () => {
            return {
              globalCursor: DEFAULT_GLOBAL_CURSOR,
            };
          },
          false,
          'resetGlobalCursor'
        ),
      exitTransitionActive: false as boolean,
      setExitTransitionActive: (exitTransitionActive) =>
        set({ exitTransitionActive }, false, 'setExitTransitionActive'),
      volume: 1 as number,
      setVolume: (volume) => set({ volume }, false, 'setVolume'),
      lastPathname: '',
      setLastPathname: (lastPathname) => set({ lastPathname }, false, 'setLastPathname'),
      headerReady: false as boolean,
      setHeaderReady: (ready) => set({ headerReady: ready }, false, 'setHeaderReady'),
      // Header theming
      darkHeaderRequests: [],
      headerTheme: 'light',
      requestDarkHeader: (id) =>
        set(
          (state) => {
            // Add the request to the list of requests if it isn't in there already
            let darkHeaderRequests = [...state.darkHeaderRequests];
            if (!darkHeaderRequests.includes(id)) {
              darkHeaderRequests.push(id);
            }
            return { darkHeaderRequests, headerTheme: 'dark' };
          },
          false,
          'requestDarkHeader'
        ),
      unrequestDarkHeader: (id) =>
        set(
          (state) => {
            // Remove the request from the list of requests
            let darkHeaderRequests = [...state.darkHeaderRequests];
            const indexOfId = darkHeaderRequests.indexOf(id);
            if (indexOfId > -1) {
              darkHeaderRequests.splice(indexOfId, 1);
            }
            // If there are no remaining request then set the theme back to light
            const headerTheme = darkHeaderRequests.length ? 'dark' : 'light';
            return { darkHeaderRequests, headerTheme };
          },
          false,
          'unrequestDarkHeader'
        ),
      clearDarkHeaderRequests: () =>
        set({ darkHeaderRequests: [], headerTheme: 'light' }, false, 'clearDarkHeaderRequests'),

      // Banner theming
      darkBannerRequests: [],
      bannerTheme: 'light',
      requestDarkBanner: (id) =>
        set(
          (state) => {
            // Add the request to the list of requests if it isn't in there already
            let darkBannerRequests = [...state.darkBannerRequests];
            if (!darkBannerRequests.includes(id)) {
              darkBannerRequests.push(id);
            }
            return { darkBannerRequests, bannerTheme: 'dark' };
          },
          false,
          'requestDarkBanner'
        ),
      unrequestDarkBanner: (id) =>
        set(
          (state) => {
            // Remove the request from the list of requests
            let darkBannerRequests = [...state.darkBannerRequests];
            const indexOfId = darkBannerRequests.indexOf(id);
            if (indexOfId > -1) {
              darkBannerRequests.splice(indexOfId, 1);
            }
            // If there are no remaining request then set the theme back to light
            const bannerTheme = darkBannerRequests.length ? 'dark' : 'light';
            return { darkBannerRequests, bannerTheme };
          },
          false,
          'unrequestDarkBanner'
        ),
      clearDarkBannerRequests: () =>
        set({ darkBannerRequests: [], bannerTheme: 'light' }, false, 'clearDarkBannerRequests'),

      // quick links theming
      darkQuickLinksRequests: [],
      quickLinksTheme: 'light',
      requestDarkQuickLinks: (id) =>
        set(
          (state) => {
            // Add the request to the list of requests if it isn't in there already
            let darkQuickLinksRequests = [...state.darkQuickLinksRequests];
            if (!darkQuickLinksRequests.includes(id)) {
              darkQuickLinksRequests.push(id);
            }
            return { darkQuickLinksRequests, quickLinksTheme: 'dark' };
          },
          false,
          'requestDarkQuickLinks'
        ),
      unrequestDarkQuickLinks: (id) =>
        set(
          (state) => {
            // Remove the request from the list of requests
            let darkQuickLinksRequests = [...state.darkQuickLinksRequests];
            const indexOfId = darkQuickLinksRequests.indexOf(id);
            if (indexOfId > -1) {
              darkQuickLinksRequests.splice(indexOfId, 1);
            }
            // If there are no remaining request then set the theme back to light
            const quickLinksTheme = darkQuickLinksRequests.length ? 'dark' : 'light';
            return { darkQuickLinksRequests, quickLinksTheme };
          },
          false,
          'unrequestDarkQuickLinks'
        ),
      clearDarkQuickLinksRequests: () =>
        set(
          { darkQuickLinksRequests: [], quickLinksTheme: 'light' },
          false,
          'clearDarkQuickLinksRequests'
        ),

      scrollDisabled: false as boolean,
      setScrollDisabled: (disabled: boolean) =>
        set({ scrollDisabled: disabled }, false, 'setScrollDisabled'),
      scrollingUp: false as boolean,
      setScrollingUp: (scrollingUp) => set({ scrollingUp }, false, 'setScrollingUp'),
      atPageTop: false as boolean,
      setAtPageTop: (atPageTop) => set({ atPageTop }, false, 'setAtPageTop'),
      activeNavItem: null,
      activeNavItemTimeout: undefined,
      setActiveNavItem: (id) =>
        set(
          (state) => {
            if (state.activeNavItemTimeout) {
              clearTimeout(state.activeNavItemTimeout);
            }
            return { activeNavItem: id, activeNavItemTimeout: undefined };
          },
          false,
          'setActiveNavItem'
        ),
      removeActiveNavItem: () =>
        set(
          (state) => {
            if (state.activeNavItemTimeout) {
              clearTimeout(state.activeNavItemTimeout);
            }
            let activeNavItemTimeout = setTimeout(() => {
              useGlobalStoreDeep.setState(
                { activeNavItem: null },
                false,
                'removeActiveNavItem_timeoutResolved'
              );
            }, NAV_HIGHLIGHT_TIMEOUT);
            return { activeNavItemTimeout };
          },
          false,
          'removeActiveNavItem'
        ),
      clearActiveNavItem: () =>
        set(
          (state) => {
            if (state.activeNavItemTimeout) {
              clearTimeout(state.activeNavItemTimeout);
            }
            return { activeNavItemTimeout: undefined, activeNavItem: null };
          },
          false,
          'clearActiveNavItem'
        ),
      mobileNavExpanded: false,
      expandMobileNav: () => set({ mobileNavExpanded: true }, false, 'expandMobileNav'),
      collapseMobileNav: () => set({ mobileNavExpanded: false }, false, 'collapseMobileNav'),
      dropdownOpen: false,
      openDropdown: () => set({ dropdownOpen: true }, false, 'openDropdown'),
      closeDropdown: () => set({ dropdownOpen: false }, false, 'closeDropdown'),
    }),
    {
      name: 'global-store',
    }
  )
);

/**
 * Global Store Hook (Shallow)
 * Used to track states across the site.
 * This hook is used for "shallow" access to the the global store.
 * Using this will trigger renders on only when the values you are consuming change.
 */
export const useGlobalStore = withZustandards(useGlobalStoreDeep);
