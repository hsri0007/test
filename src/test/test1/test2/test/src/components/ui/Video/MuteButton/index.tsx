import { ComponentProps } from 'react';

import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './MuteButton.module.scss';

interface MuteButtonProps extends OmitChildren<ComponentProps<'button'>> {
  isMuted: boolean;
}

export const MuteButton = (props: MuteButtonProps) => {
  const { className, isMuted, ...otherProps } = props;
  return (
    <button
      aria-label={isMuted ? 'Unmute' : 'Mute'}
      {...otherProps}
      className={cx(styles.muteButton, className)}
    >
      {isMuted ? (
        <svg
          className={styles.muteButtonIcon}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Playing Speaker</title>
          <path
            d="M5.29419 30.7649V19.2354C5.29419 19.1766 5.35301 19.1178 5.41184 19.1178H12.5295C12.7648 19.1178 12.9412 19.059 13.1765 18.9413L23.8824 12.8237C23.9412 12.7649 24.0001 12.8237 24.0001 12.8825V37.0002C24.0001 37.059 23.9412 37.1178 23.8824 37.059L13.1177 31.0002C12.9412 30.8825 12.706 30.8237 12.4707 30.8237H5.41184C5.35301 30.8825 5.29419 30.8237 5.29419 30.7649Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M29.2942 16.8823L45.4118 33"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M29.2942 33L45.4118 16.8823"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          className={styles.muteButtonIcon}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Muted Speaker</title>
          <path
            d="M9.94116 30.647V19.3529C9.94116 19.2941 9.99999 19.2941 9.99999 19.2941H17C17.2353 19.2941 17.4118 19.2353 17.647 19.1176L28.1765 13.1176C28.2353 13.0588 28.2941 13.1176 28.2941 13.1765V36.8823C28.2941 36.9412 28.2353 37 28.1765 36.9412L17.5882 30.8823C17.4117 30.7647 17.1765 30.7059 16.9412 30.7059H9.99999C9.94116 30.7647 9.94116 30.7059 9.94116 30.647Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M32 17.647C34.2353 19.3529 35.6471 21.9999 35.6471 24.9999C35.6471 27.9999 34.2353 30.647 32 32.3529"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M35.353 13.647C38.8236 16.2352 41 20.3529 41 24.9999C41 29.647 38.7647 33.7058 35.353 36.3529"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
};
