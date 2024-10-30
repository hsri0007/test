import { Metadata } from 'next';

import { cms } from '~/cms';
import { ArrowLink, SecondaryHeader } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import ExoIrisContent from './ExoIrisContent';

const getData = async () => {
  const response = await cms().iris(cms().defaultVariables);
  const topBanner = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '2lWgtBdFudHdHEMQZ9Op5J',
  });

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.exoIrisCollection),
    topBanner: topBanner.crmEventBasedModal,
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}

const ExoIrisPage = async () => {
  const { articles, page } = await getData();

  return (
    <div>
      <ExoIrisContent articleCollection={articles} data={page} />
    </div>
  );
};

export default ExoIrisPage;
