import { SvgProps } from '~/utils/types';

export const SquareAndTriangle = ({ className, title }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="27"
      fill="none"
      className={className}
      aria-hidden={title ? 'false' : 'true'}
    >
      {title && <title>{title}</title>}

      <rect width="17" height="17" x=".5" y="9.5" stroke="#080B1B" rx=".5" />
      <path
        fill="#EAEDF1"
        stroke="#080B1B"
        d="M20.567.75a.5.5 0 0 1 .866 0l9.526 16.5a.5.5 0 0 1-.433.75H11.474a.5.5 0 0 1-.433-.75L20.567.75Z"
      />
    </svg>
  );
};
