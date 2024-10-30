'use client';

import React from 'react';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';

import styles from './Background.module.scss';
import bgConfig from './bgConfig.yml';

export default function AiBackground() {
  return (
    <div className={styles.container}>
      <BackgroundCanvas
        config={bgConfig as BackgroundConfig}
        className={styles.gradientBackground}
      />
    </div>
  );
}
