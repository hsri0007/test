import { SvgProps } from '~/utils/types';

export const CircleCheck = ({ className, title }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 43 43" className={className}>
      {title && <title>{title}</title>}
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="m13.5 21.046 5.647 5.454 10.353-10"
      />
      <rect width="40" height="40" x="1.5" y="1.5" stroke="currentColor" strokeWidth="2" rx="20" />
    </svg>
  );
};
