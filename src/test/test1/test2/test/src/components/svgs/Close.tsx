import { SvgProps } from '~/utils/types';

export const Close = ({ className, title }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className={className}>
      {title && <title>{title}</title>}
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="m10.758 10.758 8.485 8.485M10.758 19.242l8.485-8.485"
      />
      <rect width="28" height="28" x="1" y="1" stroke="currentColor" strokeWidth="2" rx="14" />
    </svg>
  );
};
