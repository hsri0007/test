'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { IntegrationsContentFragment } from '~/cms';
import { CMSImage } from '~/components/ui';
import { Section } from '~/components/ui';
import { cx } from '~/utils';

import styles from './Device.module.scss';

interface DeviceProps {
  topHeading: IntegrationsContentFragment['deviceTopHeading'];
  topSubheading: IntegrationsContentFragment['deviceTopSubheading'];
  topCopy: IntegrationsContentFragment['deviceTopCopy'];
  deviceImage: IntegrationsContentFragment['deviceImage'];
  deviceRepeatedImage: IntegrationsContentFragment['deviceRepeatedImage'];
  bottomHeading: IntegrationsContentFragment['deviceBottomHeading'];
  bottomCopy: IntegrationsContentFragment['deviceBottomCopy'];
  bottomCta: IntegrationsContentFragment['deviceBottomCta'];
}

interface DeviceRepeatProps {
  deviceRepeatedImage: IntegrationsContentFragment['deviceRepeatedImage'];
  index: number;
}

const REPEAT_COUNT = 5; // number of times the repeated image is shown

const DeviceRepeat = (props: DeviceRepeatProps) => {
  const { deviceRepeatedImage, index } = props;
  const isVideo = deviceRepeatedImage?.contentType?.split('/')[0] === 'video';

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 25%'],
  });

  const adjustment = (index + 1) * (1 / REPEAT_COUNT);

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1 * adjustment]);

  const scale = useTransform(scrollYProgress, [0, 1], [0.285, 1 * adjustment]);
  const translate = useTransform(scrollYProgress, [0, 1], [-85, -85 + 85 * adjustment]);
  const transform = useMotionTemplate`translate3d(0, ${translate}%, 0) scale3d(${scale}, ${scale}, 1)`;

  return (
    <motion.div className={styles.repeatItem} ref={ref} style={{ opacity, transform }}>
      {isVideo ? (
        <video
          className={styles.repeatImage}
          autoPlay
          loop
          muted
          playsInline
          src={deviceRepeatedImage?.url!}
        />
      ) : (
        <CMSImage
          className={styles.repeatImage}
          asset={deviceRepeatedImage}
          disableWidthHeight
          sm={{ asset: deviceRepeatedImage, width: 375 }}
          lg={{ asset: deviceRepeatedImage, width: 400 }}
        />
      )}
    </motion.div>
  );
};

const Device = (props: DeviceProps) => {
  const {
    topHeading,
    topSubheading,
    topCopy,
    deviceImage,
    deviceRepeatedImage,
    bottomHeading,
    bottomCopy,
  } = props;

  return (
    <Section className={styles.container} isDark>
      <div className={cx(styles.headings, styles.headingsTop)}>
        {topHeading && <p className={styles.heading}>{topHeading}</p>}
        {topSubheading && <p className={styles.subhead}>{topSubheading}</p>}
        {topCopy && <p className={styles.copy}>{topCopy}</p>}
      </div>

      <div className={styles.deviceContent}>
        <div className={styles.deviceBackground}>
          <img
            className={styles.bgImageMobile}
            src="/assets/images/exo-iris/background-blur-mobile.webp"
            alt=""
          />
          <img
            className={styles.bgImageDesktop}
            src="/assets/images/exo-iris/background-blur.webp"
            alt=""
          />
        </div>

        <div className={styles.deviceWrap}>
          {deviceImage?.contentType?.split('/')[0] === 'video' ? (
            <video className={styles.deviceImage} src={deviceImage?.url!} />
          ) : (
            <CMSImage
              className={styles.deviceImage}
              asset={deviceImage}
              disableWidthHeight
              sm={{ asset: deviceImage, width: 400 }}
              lg={{ asset: deviceImage, width: 420 }}
            />
          )}
        </div>

        <div className={styles.repeatWrap}>
          {[...new Array(REPEAT_COUNT)].map((_, index) => (
            <DeviceRepeat key={index} deviceRepeatedImage={deviceRepeatedImage} index={index} />
          ))}
        </div>
      </div>

      <div className={cx(styles.headings, styles.headingsBottom)}>
        {bottomHeading && <p className={styles.heading}>{bottomHeading}</p>}
        {bottomCopy && <p className={styles.copy}>{bottomCopy}</p>}
      </div>
    </Section>
  );
};

export { Device };
