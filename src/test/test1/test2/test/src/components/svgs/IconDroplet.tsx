import { SvgProps } from '~/utils/types';

export const IconDroplet = ({ className, title }: SvgProps) => {
  return (
    <svg
      width="75"
      height="75"
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {title && <title>{title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M37.5 55C41.3456 55 45.0338 53.4774 47.753 50.7673C50.4723 48.0571 52 44.3813 52 40.5486C52 36.624 50.0562 32.6898 45.657 29.1822C42.2808 26.4904 39.4469 22.942 37.5 19C35.5531 22.942 32.7192 26.4904 29.343 29.1822C24.9438 32.6898 23 36.624 23 40.5486C23 44.3813 24.5277 48.0571 27.247 50.7673C29.9662 53.4774 33.6544 55 37.5 55Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 48.9999C44.1269 48.9999 47 45.6919 47 43.9999"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="1" y="1" width="73" height="73" rx="36.5" stroke="#ECC26F" strokeWidth="2" />
    </svg>
  );
};
