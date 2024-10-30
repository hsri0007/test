import { Metadata } from 'next';

import { cms } from '~/cms';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import ExoWorksContent from './ExoWorksContent';

const getData = async () => {
  const response = await cms().works(cms().defaultVariables);
  const topBanner = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '2lWgtBdFudHdHEMQZ9Op5J',
  });
  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.exoWorksCollection),
    topBanner: topBanner.crmEventBasedModal,
  };
};
export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}
const ExoWorksPage = async () => {
  const { articles, page } = await getData();
  return (
    <>
      <ExoWorksContent articleCollection={articles} data={page} />
    </>
  );
};

export default ExoWorksPage;
