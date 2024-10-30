import { Asset, Maybe, Sys } from '~/cms';
import { Video } from '~/components/ui';
import { cx } from '~/utils';

import styles from './MobilePhone.module.scss';

interface MobilePhoneProps {
  asset: Maybe<
    Pick<Asset, 'description' | 'contentType' | 'url' | 'width' | 'height'> & {
      sys: Pick<Sys, 'id'>;
    }
  >;
}

export const MobilePhone = (props: MobilePhoneProps) => {
  const { asset } = props;
  return (
    <div className={cx(styles.container, 'js__phone-container')}>
      <div className={styles.innerContainer}>
        <img
          className={styles.phoneFrame}
          src="/assets/images/exo-iris/iphone14pro.webp"
          alt="Mobile view of app"
        />
        {asset && asset.contentType && asset.contentType.includes('video') && asset.url && (
          <div className={styles.videoContainer}>
            <Video
              className={styles.video}
              isBackgroundVideo
              url={asset.url}
              altText={asset.description}
            />
          </div>
        )}
      </div>
    </div>
  );
};
