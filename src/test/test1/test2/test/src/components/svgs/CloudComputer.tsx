import { SvgProps } from '~/utils/types';

export const CloudComputer = ({ className, title }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 27" className={className}>
      {title && <title>{title}</title>}
      <path
        stroke="currentColor"
        d="M21.704 15.497a3.827 3.827 0 0 0 3.092-1.797c.7-1.118.778-2.518.208-3.707a3.83 3.83 0 0 0-3.013-2.153l-.407-.047-.034-.409a7.513 7.513 0 0 0-1.911-4.42A7.471 7.471 0 0 0 15.443.622l6.261 14.875Zm0 0H5.65a5.269 5.269 0 0 1-4.462-2.676 5.304 5.304 0 0 1 0-5.223 5.268 5.268 0 0 1 4.461-2.676c.382.001.763.045 1.136.13l.39.089.173-.363a7.491 7.491 0 0 1 3.346-3.455 7.456 7.456 0 0 1 4.75-.7l6.261 14.874ZM3.5 19.5h19v7h-19zM16 23h4"
      />
      <circle cx="7.5" cy="23" r="1" stroke="currentColor" />
      <circle cx="11.5" cy="23" r="1" stroke="currentColor" />
    </svg>
  );
};
