import { ArticleContentVideoFragment } from '~/cms';

import styles from './Video.module.scss';

interface ArticleContentVideoProps {
  item: ArticleContentVideoFragment;
}

const ArticleContentVideo = (props: ArticleContentVideoProps) => {
  const { item } = props;

  if (!item.youTubeId) return null;

  return (
    <div className={styles.video}>
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className={styles.videoFrame}
        src={`https://www.youtube.com/embed/${item.youTubeId}`}
        title="Video Player"
      />
    </div>
  );
};

export { ArticleContentVideo };
