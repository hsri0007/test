import { SvgProps } from '~/utils/types';

export const CircleArrow = ({ className, title }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 38 38"
      className={className}
      aria-hidden={title ? false : true}
    >
      {title && <title>{title}</title>}
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        d="m21.493 19.493.53-.53-.53-.531-3.963-3.962-1.06 1.06 3.432 3.432-3.432 3.432 1.06 1.06 3.963-3.961ZM37.25 19c0 10.08-8.17 18.25-18.25 18.25S.75 29.08.75 19 8.92.75 19 .75 37.25 8.92 37.25 19Z"
      />
    </svg>
  );
};
