import { SvgProps } from '~/utils/types';

export const Branch = ({ className, title }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 19"
      fill="none"
      className={className}
      aria-hidden={title ? 'false' : 'true'}
    >
      {title && <title>{title}</title>}
      <path
        fill="currentColor"
        d="m8 2.5.347-.36L8.202 2H8v.5Zm6.653 7.11a.5.5 0 0 0 .694-.72l-.694.72ZM4 3h4V2H4v1Zm3.653-.14 7 6.75.694-.72-7-6.75-.694.72Z"
      />
      <path
        fill="currentColor"
        d="m8 16.5.347.36-.145.14H8v-.5Zm6.653-7.11a.5.5 0 0 1 .694.72l-.694-.72ZM4 16h4v1H4v-1Zm3.653.14 7-6.75.694.72-7 6.75-.694-.72Z"
      />
      <path stroke="currentColor" d="M4 9.5h18" />
      <circle cx="2.5" cy="2.5" r="2" stroke="currentColor" />
      <circle cx="2.5" cy="16.5" r="2" stroke="currentColor" />
      <circle cx="2.5" cy="9.5" r="2" stroke="currentColor" />
      <circle cx="23.5" cy="9.5" r="2" stroke="currentColor" />
    </svg>
  );
};
