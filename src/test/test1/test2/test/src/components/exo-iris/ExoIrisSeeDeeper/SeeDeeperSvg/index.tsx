import { ComponentProps } from 'react';

import { cx } from '~/utils';

import styles from './SeeDeeperSvg.module.scss';

interface SeeDeeperSvgProps extends ComponentProps<'svg'> {}

export const SeeDeeperSvg = (props: SeeDeeperSvgProps) => {
  return (
    <svg
      className={styles.container}
      viewBox="0 0 1920 1053"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="myClip" clipPathUnits="objectBoundingBox" transform="scale(0.0005208 0.000949)">
        <path
          id="deeper"
          d="M960 995L1920 250V1053H0V250L960 995Z"
          fill="white"
          fillOpacity="1"
          shapeRendering="crispEdges"
        />
        <path
          id="wider"
          className={styles.wider}
          d="M960.274 970.219C1498.9 970.219 1935.55 583.629 1935.55 45V1370.66H-15V45C-15 583.629 421.645 970.219 960.274 970.219Z"
          fill="white"
          fillOpacity="1"
          shapeRendering="crispEdges"
        />
      </clipPath>
    </svg>
  );
};
