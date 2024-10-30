import { SvgProps } from '~/utils/types';

export const IconCrosshair = ({ className, title }: SvgProps) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {title && <title>{title}</title>}
      <line x1="7.5" y1="-2.18555e-08" x2="7.5" y2="5" stroke="black" />
      <line x1="7.5" y1="10" x2="7.5" y2="15" stroke="black" />
      <line x1="10" y1="7.5" x2="15" y2="7.5" stroke="black" />
      <line x1="4.37114e-08" y1="7.5" x2="5" y2="7.5" stroke="black" />
    </svg>
  );
};
