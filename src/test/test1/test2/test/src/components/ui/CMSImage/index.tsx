import { ComponentProps } from 'react';

import { BREAKPOINTS } from '~/constants';
import { CMSImageSrcConfig, cx, generateCMSImageSrc, generateCMSImageSrcSet } from '~/utils';

import styles from './CmsImage.module.scss';

interface CmsImageProps extends ComponentProps<'img'>, CMSImageSrcConfig {
  xxs?: CMSImageSrcConfig;
  xs?: CMSImageSrcConfig;
  sm?: CMSImageSrcConfig;
  md?: CMSImageSrcConfig;
  lg?: CMSImageSrcConfig;
  xl?: CMSImageSrcConfig;
  xxl?: CMSImageSrcConfig;
  disableWidthHeight?: boolean;
  className?: string;
}

export const CMSImage = (props: CmsImageProps) => {
  const { className, xxs, xs, sm, md, lg, xl, xxl, disableWidthHeight, ...otherProps } = props;
  const { format, quality, width, height, fit, focus, asset, ...otherImgProps } = otherProps;
  const config = { format, quality, width, height, fit, focus, asset };
  return (
    <picture>
      {!!xxl && (
        <source
          media={`(min-width: ${BREAKPOINTS.xxl}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...xxl })}
        />
      )}
      {!!xl && (
        <source
          media={`(min-width: ${BREAKPOINTS.xl}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...xl })}
        />
      )}

      {!!lg && (
        <source
          media={`(min-width: ${BREAKPOINTS.lg}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...lg })}
        />
      )}

      {!!md && (
        <source
          media={`(min-width: ${BREAKPOINTS.md}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...md })}
        />
      )}

      {!!sm && (
        <source
          media={`(min-width: ${BREAKPOINTS.sm}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...sm })}
        />
      )}

      {!!xs && (
        <source
          media={`(min-width: ${BREAKPOINTS.xs}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...xs })}
        />
      )}
      {!!xxs && (
        <source
          media={`(min-width: ${BREAKPOINTS.xxs}px)`}
          srcSet={generateCMSImageSrcSet({ ...config, ...xxs })}
        />
      )}

      <img
        width={!disableWidthHeight && (width || asset?.width)}
        height={!disableWidthHeight && (height || asset?.height)}
        {...otherImgProps}
        src={generateCMSImageSrc(config)}
        srcSet={generateCMSImageSrcSet(config)}
        alt={asset?.description ? asset?.description : ''}
        className={cx(className)}
      />
    </picture>
  );
};
