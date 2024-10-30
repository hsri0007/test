import { ArticleContentAudioFragment } from '~/cms';

import styles from './Audio.module.scss';

interface ArticleContentAudioProps {
  item: ArticleContentAudioFragment;
}

const ArticleContentAudio = (props: ArticleContentAudioProps) => {
  const { item } = props;

  if (!item.anchorUrl) return null;

  return (
    <div className={styles.audio}>
      <iframe className={styles.audioFrame} src={item.anchorUrl} title="Podcast" />
    </div>
  );
};

export { ArticleContentAudio };
