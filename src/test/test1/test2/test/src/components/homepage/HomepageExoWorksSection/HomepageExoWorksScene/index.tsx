import { GroupProps } from '@react-three/fiber';
import { ComponentProps, useId } from 'react';

import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './HomepageExoWorksScene.module.scss';
import { PhoneModel } from './PhoneModel';

interface HomepageExoWorksSceneProps extends OmitChildren<GroupProps> {
  activeIndex: number;
  screens: string[];
}

export const HomepageExoWorksScene = (props: HomepageExoWorksSceneProps) => {
  const { activeIndex, screens, ...otherProps } = props;
  const id = useId();
  const phones = screens.map((screen, index) => {
    return (
      <PhoneModel key={`${id}-${index}`} index={index} activeIndex={activeIndex} screen={screen} />
    );
  });
  return (
    <group {...otherProps}>
      <ambientLight intensity={0.5} />
      {phones}
    </group>
  );
};
