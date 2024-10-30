import { useEffect, useRef, useState } from 'react';

import { Maybe } from '~/cms';

import styles from './VideoAltText.module.scss';

const VideoAltText = ({
  text,
  describes,
}: {
  text: Maybe<string>;
  describes?: Maybe<HTMLElement | undefined | null>;
}) => {
  const idRef = useRef(`videoAltText_${Math.random()}`);

  useEffect(() => {
    if (!describes) return;
    describes.setAttribute('aria-describedby', idRef.current);
  }, [describes]);

  if (!text) return null;

  return (
    <p id={idRef.current} className={styles.altText}>
      {text}
    </p>
  );
};

VideoAltText.displayName = 'VideoAltText';

export default VideoAltText;
