import { AssetFragment, LinkFragment } from '~/cms';

import { Item } from '../Item';
import styles from './Items.module.scss';

interface ItemsProps {
  items: {
    image: AssetFragment | null;
    heading: string | null;
    copy: string | null;
    cta: LinkFragment | null;
  }[];
}

const Items = (props: ItemsProps) => {
  const { items } = props;

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <Item
          key={index}
          image={item.image}
          heading={item.heading}
          copy={item.copy}
          cta={item.cta}
          alignRight={index % 2 === 0}
        />
      ))}
    </div>
  );
};

export { Items };
