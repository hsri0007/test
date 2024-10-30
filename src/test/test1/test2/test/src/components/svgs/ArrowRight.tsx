import { SvgProps } from '~/utils/types';

export const ArrowRight = ({ className, title }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
      aria-hidden={title ? 'false' : 'true'}
    >
      {title && <title>{title}</title>}
      <path
        fill="currentColor"
        d="M12.48.5 19.5 10l-7.02 9.5h-1.909l3.288-4.408c1.201-1.63 2.245-3.019 3.288-4.408H.5V9.265h16.628c-1.015-1.358-2.088-2.777-3.26-4.377L10.582.5h1.91-.01Z"
      />
    </svg>
  );
};
