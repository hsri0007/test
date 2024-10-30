import { cms } from '~/cms';
import { SecondaryHeader } from '~/components/ui';

import styles from './resources.module.scss';

const getData = async () => {
  const topBanner = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '2lWgtBdFudHdHEMQZ9Op5J',
  });

  return {
    topBanner: topBanner.crmEventBasedModal,
  };
};

const ResourcesLayout = async (props: { children: React.ReactNode }) => {
  const { topBanner } = await getData();
  const { children } = props;

  return (
    <div>
      <SecondaryHeader
        label={<p className={styles.label}>Topics</p>}
        heroText={topBanner?.heroText ?? ''}
        isModalEnabledOnSite={topBanner?.isModalEnabledOnSite ?? false}
        link={topBanner?.link ?? ''}
        links={[
          // disabled `prefetch` because these links don't load new pages
          { href: { query: { category: '' } }, label: 'Latest', prefetch: false },
          { href: { query: { category: 'blog' } }, label: 'Blogs', prefetch: false },
          { href: { query: { category: 'event' } }, label: 'Events', prefetch: false },
          { href: { query: { category: 'guide' } }, label: 'Guides', prefetch: false },
          { href: { query: { category: 'podcast' } }, label: 'Podcasts', prefetch: false },
          { href: { query: { category: 'case study' } }, label: 'Case Study', prefetch: false },
        ]}
      />

      {children}
    </div>
  );
};

export default ResourcesLayout;
