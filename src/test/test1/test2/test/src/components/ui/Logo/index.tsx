import { ComponentProps } from 'react';

import { cx } from '~/utils';
import type { BreakpointLabel } from '~/utils/types';

import styles from './Logo.module.scss';

interface LogoProps extends ComponentProps<'div'> {
  multicolor?: boolean;
  hideIcon?: boolean;
  hideIconUntil?: BreakpointLabel;
  hideWordmark?: boolean;
  hideWordmarkUntil?: BreakpointLabel;
}

export const Logo = (props: LogoProps) => {
  const {
    multicolor = false,
    className,
    hideIcon = false,
    hideIconUntil = false,
    hideWordmark = false,
    hideWordmarkUntil = false,
  } = props;

  return (
    <div
      className={cx(
        styles.logo,
        hideIcon ? styles.hideIcon : styles[`hideIconUntil_${hideIconUntil}`],
        hideWordmark ? styles.hideWordmark : styles[`hideWordmarkUntil_${hideWordmarkUntil}`],
        className
      )}
    >
      <div className={styles.content}>
        <svg
          className={styles.icon}
          viewBox="0 0 168 109"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.72477 19.3761C15.0956 19.3761 19.4495 15.0386 19.4495 9.68807C19.4495 4.3375 15.0956 0 9.72477 0C4.35393 0 0 4.3375 0 9.68807C0 15.0386 4.35393 19.3761 9.72477 19.3761Z"
            fill={multicolor ? 'url(#paint0_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M9.72477 108.092C15.0956 108.092 19.4495 103.754 19.4495 98.4039C19.4495 93.0533 15.0956 88.7158 9.72477 88.7158C4.35393 88.7158 0 93.0533 0 98.4039C0 103.754 4.35393 108.092 9.72477 108.092Z"
            fill={multicolor ? 'url(#paint1_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M157.638 19.3761C163.009 19.3761 167.363 15.0386 167.363 9.68807C167.363 4.3375 163.009 0 157.638 0C152.267 0 147.913 4.3375 147.913 9.68807C147.913 15.0386 152.267 19.3761 157.638 19.3761Z"
            fill={multicolor ? 'url(#paint2_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M83.7521 19.3761C89.123 19.3761 93.4769 15.0386 93.4769 9.68807C93.4769 4.3375 89.123 0 83.7521 0C78.3813 0 74.0273 4.3375 74.0273 9.68807C74.0273 15.0386 78.3813 19.3761 83.7521 19.3761Z"
            fill={multicolor ? 'url(#paint3_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M46.8078 41.7297C52.1786 41.7297 56.5325 37.3922 56.5325 32.0416C56.5325 26.691 52.1786 22.3535 46.8078 22.3535C41.4369 22.3535 37.083 26.691 37.083 32.0416C37.083 37.3922 41.4369 41.7297 46.8078 41.7297Z"
            fill={multicolor ? 'url(#paint4_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M83.7521 108.092C89.123 108.092 93.4769 103.754 93.4769 98.4039C93.4769 93.0533 89.123 88.7158 83.7521 88.7158C78.3813 88.7158 74.0273 93.0533 74.0273 98.4039C74.0273 103.754 78.3813 108.092 83.7521 108.092Z"
            fill={multicolor ? 'url(#paint5_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M120.867 41.7294C126.243 41.7294 130.601 37.3919 130.601 32.0413C130.601 26.6908 126.243 22.3533 120.867 22.3533C115.491 22.3533 111.133 26.6908 111.133 32.0413C111.133 37.3919 115.491 41.7294 120.867 41.7294Z"
            fill={multicolor ? 'url(#paint6_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M46.8072 86.0095C52.1831 86.0095 56.5411 81.672 56.5411 76.3214C56.5411 70.9708 52.1831 66.6333 46.8072 66.6333C41.4313 66.6333 37.0732 70.9708 37.0732 76.3214C37.0732 81.672 41.4313 86.0095 46.8072 86.0095Z"
            fill={multicolor ? 'url(#paint7_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M157.638 108.092C163.009 108.092 167.363 103.754 167.363 98.4039C167.363 93.0533 163.009 88.7158 157.638 88.7158C152.267 88.7158 147.913 93.0533 147.913 98.4039C147.913 103.754 152.267 108.092 157.638 108.092Z"
            fill={multicolor ? 'url(#paint8_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M120.867 86.0095C126.243 86.0095 130.601 81.672 130.601 76.3214C130.601 70.9708 126.243 66.6333 120.867 66.6333C115.491 66.6333 111.133 70.9708 111.133 76.3214C111.133 81.672 115.491 86.0095 120.867 86.0095Z"
            fill={multicolor ? 'url(#paint9_logo_gradient)' : 'currentColor'}
          />
          <path
            d="M83.7525 63.7753C89.1284 63.7753 93.4864 59.4378 93.4864 54.0872C93.4864 48.7367 89.1284 44.3992 83.7525 44.3992C78.3766 44.3992 74.0186 48.7367 74.0186 54.0872C74.0186 59.4378 78.3766 63.7753 83.7525 63.7753Z"
            fill={multicolor ? 'url(#paint10_logo_gradient)' : 'currentColor'}
          />
          <defs>
            <linearGradient
              id="paint0_logo_gradient"
              x1="13.4495"
              y1="13.4083"
              x2="131.693"
              y2="131.656"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint1_logo_gradient"
              x1="-22.1193"
              y1="66.5599"
              x2="96.1239"
              y2="184.803"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint2_logo_gradient"
              x1="75.3122"
              y1="-72.6376"
              x2="193.56"
              y2="45.6055"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint3_logo_gradient"
              x1="44.4127"
              y1="-29.656"
              x2="162.656"
              y2="88.5917"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint4_logo_gradient"
              x1="19.9958"
              y1="5.22967"
              x2="138.244"
              y2="123.473"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint5_logo_gradient"
              x1="8.84387"
              y1="23.4956"
              x2="127.087"
              y2="141.739"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint6_logo_gradient"
              x1="50.9815"
              y1="-37.844"
              x2="169.211"
              y2="80.3853"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint7_logo_gradient"
              x1="2.25214"
              y1="31.7617"
              x2="120.482"
              y2="149.991"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint8_logo_gradient"
              x1="39.748"
              y1="-19.486"
              x2="157.991"
              y2="98.7571"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint9_logo_gradient"
              x1="33.2292"
              y1="-11.3163"
              x2="151.459"
              y2="106.913"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
            <linearGradient
              id="paint10_logo_gradient"
              x1="26.6149"
              y1="-3.04579"
              x2="144.849"
              y2="115.184"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10F8E4" />
              <stop offset="1" stopColor="#24B0FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className={styles.spacer} />
        <svg
          className={styles.wordmark}
          viewBox="0 0 284 93"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>EXO</title>
          <path
            d="M188.234 46.3074C188.234 18.6056 206.909 0.178955 236.115 0.178955C265.322 0.178955 283.996 18.2294 283.996 46.3074C283.996 74.3854 265.445 92.4359 236.115 92.4359C206.785 92.4359 188.234 74.3854 188.234 46.3074ZM270.588 46.3074C270.588 25.2478 257.803 12.0872 236.244 12.0872C214.684 12.0872 201.647 25.2478 201.647 46.3074C201.647 67.367 214.555 80.5276 236.115 80.5276C257.675 80.5276 270.583 67.367 270.583 46.3074H270.588Z"
            fill="currentColor"
          />
          <path
            d="M0.936232 2.43604H72.005L72.505 14.2204H13.8445V38.9131H62.1014V50.6975H13.8445V78.3993H74.6381L74.0096 90.1838H0.931641V2.43604H0.936232Z"
            fill="currentColor"
          />
          <path
            d="M177.55 2.56447V2.43604H162.004L141.344 27.6379L149.238 36.7755L177.55 2.56447Z"
            fill="currentColor"
          />
          <path
            d="M149.225 52.6013L141.156 61.9545L164.138 90.1793H180.055V90.0555L149.225 52.6013Z"
            fill="currentColor"
          />
          <path
            d="M106.225 2.43604L90.4312 2.56447L105.647 20.8718L125.532 44.803L104.087 70.5232L87.8027 90.0507V90.0553V90.1792H103.468L140.761 44.7525L134.055 36.5324L106.225 2.43604Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};
