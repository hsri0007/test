import { SvgProps } from '~/utils/types';

export const ArrowRightSharp = ({ className, title }: SvgProps) => {
  return (
    <svg
      width={10}
      height={15}
      className={className}
      viewBox="0 0 10 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      <line x1="8.70711" y1="0.707107" x2="1.70711" y2="7.70711" stroke="#B1B5C6" strokeWidth="2" />
      <line x1="8.29289" y1="13.7071" x2="1.29289" y2="6.70711" stroke="#B1B5C6" strokeWidth="2" />
    </svg>
  );
};
