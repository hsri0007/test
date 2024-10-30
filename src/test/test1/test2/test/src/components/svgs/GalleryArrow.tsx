import { SvgProps } from '~/utils/types';

export const GalleryArrow = ({ className, title }: SvgProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 134 134" className={className}>
      {title && <title>{title}</title>}
      <g strokeWidth="2" filter="url(#a)">
        <path stroke="#fff" d="M65.52 57h8.478v8.478M67.477 72h-8.479v-8.478" />
        <rect
          width="62"
          height="62"
          x="36"
          y="33"
          stroke="#F7F9FC"
          rx="31"
          shapeRendering="crispEdges"
        />
      </g>
    </svg>
  );
};
