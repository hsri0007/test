import { SvgProps } from '~/utils/types';

export const QuotationOpen = ({ className, title }: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 73"
      fill="none"
      className={className}
      aria-hidden={title ? 'false' : 'true'}
    >
      {title && <title>{title}</title>}
      <path
        d="M7.15256e-07 39.8C7.15256e-07 19.4 5.2 7.79999 18.8 1.8L21.6 0.199995V8.99998L20 10.2C11.2 15 8.4 24.6 8.4 39V53H20V72.6H7.15256e-07V39.8ZM60.4 1.8L63.2 0.199995V8.99998L61.6 10.2C52.8 15 50 24.6 50 39V53H61.6V72.6H41.6V39.8C41.6 19.4 46.8 7.79999 60.4 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
};
