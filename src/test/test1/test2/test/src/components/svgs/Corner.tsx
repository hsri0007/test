import { SvgProps } from '~/utils/types';

export const Corner = ({ className, title }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 15 15">
      {title && <title>{title}</title>}
      <path stroke="currentColor" d="M7.5 0v5M7.5 10v5M10 7.5h5M0 7.5h5" />
    </svg>
  );
};
