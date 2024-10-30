export type BreakpointLabel = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type SvgProps = {
  className?: string;
  title?: string;
};

/**
 * Safely matches any string but still auto completes the list of given types
 * Ex: StringWithSuggestions<'a' | 'b'> is equal to 'a' | 'b' | string but autocomplete works for 'a' and 'b'
 */
export type StringWithSuggestions<suggestions> = suggestions | (string & {});

/**
 * Alias to omit the children property from a type
 */
export type OmitChildren<t> = Omit<t, 'children'>;

/**
 * All the named colors from the exo design system
 */
export type ColorName =
  | 'pink'
  | 'gold'
  | 'lavender'
  | 'light-gray'
  | 'light-light-gray'
  | 'gray'
  | 'dark-gray'
  | 'dark-blue'
  | 'works-purple'
  | 'ai-green'
  | 'iris-blue'
  | 'exo-blue'
  | 'exo-fluro'
  | 'dark-dark-blue'
  | 'black'
  | 'white'
  | 'background'
  | 'foreground'
  | 'foreground-alt'
  | 'highlight';

export type CursorIconName = 'pause' | 'chevron-right' | 'chevron-left';

export type GradientStop = { color: string; position?: string };

export type Gradient = { angle?: string; stops: GradientStop[] };
// This should match the list of cursor names in _vars.scss
export type CursorName = CursorIconName | 'tap' | 'drag' | 'play';
