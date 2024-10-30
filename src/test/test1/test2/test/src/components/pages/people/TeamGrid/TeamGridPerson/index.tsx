'use client';

import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { TeamPersonFragment } from '~/cms';
import { CMSImage, ExoLink } from '~/components/ui';
import { cx } from '~/utils';

import styles from './TeamGridPerson.module.scss';

interface TeamGridPersonProps extends TeamPersonFragment {}

export const TeamGridPerson = (props: TeamGridPersonProps) => {
  const { slug, gridPhoto, name, title, sys, ...otherProps } = props;

  const ref = useRef<HTMLAnchorElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [16, 0, 0, 16]);
  const blur = useMotionTemplate`blur(${blurValue}rem)`;

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.li className={cx(styles.personWrapper)} style={{ filter: blur, opacity }}>
      <ExoLink ref={ref} href={`/our-people/${slug}`} className={styles.person}>
        <article className={styles.personContent}>
          <CMSImage
            className={styles.image}
            focus="top"
            fit="fill"
            asset={gridPhoto}
            xs={{ width: 700, height: 944 }}
            sm={{ width: 450, height: 607 }}
            md={{ width: 600, height: 809 }}
            lg={{ width: 250, height: 375 }}
            xl={{ width: 450, height: 607 }}
            xxl={{ width: 700, height: 944 }}
            width={500}
            height={674}
            loading="lazy"
          />
          <h1 className={styles.name}>{name}</h1>
          <h2 className={styles.title}>{title}</h2>
        </article>
      </ExoLink>
    </motion.li>
  );
};
