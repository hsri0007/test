'use client';

import { HTMLMotionProps, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import {
  BaseSyntheticEvent,
  ComponentProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { BaseReactPlayerProps, OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/file';

import { Maybe } from '~/cms';
import { useIsLandscape, useIsMobile } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';
import { ColorName } from '~/utils/types';

import { Cursor } from '../Cursor';
import { MuteButton } from './MuteButton';
import styles from './Video.module.scss';

type BaseVideoProps = ComponentProps<'div'>;

export interface VideoProps extends BaseVideoProps {
  url: string;
  mobileUrl?: string | null;
  previewUrl?: string | null;
  showNativeControls?: boolean;
  // autoplayPreview?: boolean; // Loop the video silently until the user hits play
  isBackgroundVideo?: boolean; // Autoplay the video silently on loop
  controlsHidden?: boolean;
  onClickPlay?: () => void;
  playerWrapperProps?: HTMLMotionProps<'div'>;
  altText?: Maybe<string>;
}

export const Video = (props: VideoProps) => {
  const {
    className,
    showNativeControls = false,
    url,
    mobileUrl,
    previewUrl,
    onProgress,
    isBackgroundVideo = false,
    controlsHidden = false,
    onClickPlay,
    playerWrapperProps,
    altText,
    ...otherProps
  } = props;

  const pathname = usePathname();
  const autoPlay = pathname == '/iris/demo';
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);
  // Tracks the actualy play/pause state of the video
  const [isPlaying, setIsPlaying] = useState(false);
  // Controls if the video should be playing or not
  const [shouldBePlaying, setShouldBePlaying] = useState(autoPlay);
  const [isPreview, setIsPreview] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement | null>(null);
  const isLandscape = useIsLandscape();
  const { mouseInactive, volume, setVolume } = useGlobalStore([
    'mouseInactive',
    'volume',
    'setVolume',
  ]);
  const [describedId, setDescribedId] = useState<string | null>(null);

  useEffect(() => {
    if (!altText) return;
    setDescribedId(`describedId_${`${Math.random()}`.replaceAll('.', '')}`);
  }, [altText]);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    // If we hide the controls then we should stop the video
    if (isPlaying && controlsHidden && !isPreview) {
      setShouldBePlaying(false);
    }
  }, [isPlaying, controlsHidden, isPreview]);

  useEffect(() => {
    if (isBackgroundVideo) {
      setShouldBePlaying(true);
    } else if (previewUrl) {
      setIsPreview(true);
      setShouldBePlaying(true);
    }
  }, [isBackgroundVideo, previewUrl]);

  const handlePlayPause = useCallback(() => {
    const player = playerRef.current;
    if (!isPlaying || (isPlaying && isPreview)) {
      onClickPlay?.();
    }
    if (isPreview) {
      setShouldBePlaying(false);
      player?.seekTo(0);
    }
    setShouldBePlaying(isPreview ? true : !isPlaying);
    setIsPreview(false);
  }, [isPlaying, isPreview, onClickPlay]);

  const handleProgress = useCallback(
    (playerState: OnProgressProps) => {
      const progress = progressRef.current;
      if (progress && !isScrubbing) {
        progress.value = `${playerState.played * 100}`;
        progress.style.backgroundPosition = `${-100 * playerState.played}%`;
      }
    },
    [isScrubbing]
  );

  const handleMouseEnter = useCallback(() => {
    if (!isHovered) {
      setIsHovered(true);
    }
  }, [isHovered]);

  const handleMouseLeave = useCallback(() => {
    if (isHovered) {
      setIsHovered(false);
    }
  }, [isHovered]);

  const handleScrub = useCallback((e: BaseSyntheticEvent) => {
    const player = playerRef.current;
    const value = parseInt(e?.target?.value ?? 0);
    player?.seekTo(value / 100, 'fraction');
    const progress = progressRef.current;
    if (progress) {
      progress.value = `${value}`;
      progress.style.backgroundPosition = `${-1 * value}%`;
    }
  }, []);

  const handleVolumeChange = useCallback(
    (e: BaseSyntheticEvent) => {
      const value = parseInt(e?.target?.value ?? 0);
      setVolume(value / 100);
    },
    [setVolume]
  );

  useEffect(() => {
    const volumeSlider = volumeSliderRef.current;
    if (volumeSlider) {
      volumeSlider.value = `${Math.floor(volume * 100)}`;
    }
  }, [volume]);

  const startScrubbing = useCallback(() => {
    setIsScrubbing(true);
  }, []);
  const stopScrubbing = useCallback(() => {
    setIsScrubbing(false);
  }, []);

  return (
    <div
      ref={videoWrapperRef}
      data-video-wrapper
      className={cx(
        styles.videoWrapper,
        className,
        !mouseInactive && styles.mouseActive,
        (isHovered || isMobile) && styles.hovered
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...otherProps}
    >
      {altText && describedId && (
        <p id={describedId} className={styles.describedByText}>
          {altText}
        </p>
      )}
      {isReady ? (
        <motion.div
          {...(altText && describedId ? { 'aria-describedby': describedId } : {})}
          {...playerWrapperProps}
          className={styles.playerWrapper}
        >
          <ReactPlayer
            ref={playerRef}
            onProgress={handleProgress}
            style={{
              pointerEvents: isMobile && !(isPreview || isBackgroundVideo) ? 'all' : 'none',
            }}
            playing={shouldBePlaying}
            progressInterval={100}
            width={'100%'}
            height={'100%'}
            volume={volume}
            muted={isMuted || isPreview || isBackgroundVideo}
            playsinline={isPreview || isBackgroundVideo}
            autoPlay={isPreview || isBackgroundVideo}
            controls={isMobile && !(isPreview || isBackgroundVideo)}
            loop={isPreview || isBackgroundVideo}
            config={{}}
            url={isPreview && previewUrl ? previewUrl : isLandscape ? url : mobileUrl ?? url}
            onPlay={() => {
              setIsPlaying(true);
              setShouldBePlaying(true);
            }}
            onPause={() => {
              // fix issue in Safari where video pauses when you scroll it off screen
              if (!isBackgroundVideo) {
                setIsPlaying(false);
                setShouldBePlaying(false);
              }
            }}
          />
        </motion.div>
      ) : (
        ''
      )}
      {(!isBackgroundVideo || isPreview || !isPlaying) &&
        (!isMobile || (isMobile && isPreview)) && (
          <button
            className={styles.cursorWrapper}
            data-cursor={!isPreview && isPlaying ? 'pause' : 'play'}
            data-cursor-inactive-hidden={true}
            onClick={handlePlayPause}
            aria-label={!isPreview && isPlaying ? 'pause' : 'play'}
          >
            {isPreview && isMobile && (
              <Cursor className={styles.cursor} name={'play'} aria-label={'play'} />
            )}
          </button>
        )}
      {!isPreview && !isBackgroundVideo && !controlsHidden && !isMobile && (
        <>
          <div className={styles.controlsBackgroundOverlay} />
          <div className={styles.progressBar}>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              aria-label="Video Progress"
              className={styles.progress}
              onFocus={startScrubbing}
              onBlur={stopScrubbing}
              onMouseDown={startScrubbing}
              onMouseUp={stopScrubbing}
              onChange={handleScrub}
            />
          </div>
          <div className={styles.volumeControls}>
            <div className={styles.volumeBar}>
              <input
                ref={volumeSliderRef}
                type="range"
                min="0"
                max="100"
                aria-label="Video Volume"
                className={styles.volume}
                onChange={handleVolumeChange}
                style={{ backgroundPosition: `${-1 * volume * 100}%` }}
              />
            </div>
            <MuteButton
              isMuted={isMuted}
              className={styles.muteButton}
              onClick={() => {
                setIsMuted(!isMuted);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
