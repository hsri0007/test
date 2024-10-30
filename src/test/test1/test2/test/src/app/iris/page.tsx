import { Metadata } from 'next';

import ExoIrisContent from '~/app/iris/ExoIrisContent';
import { cms } from '~/cms';
import { ArrowLink, SecondaryHeader } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

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
    <>
      <div>
        <p>Wellstar MCG Health Implements Exo Works® and Sees 47% Increase in Revenue Capture</p>
        <ArrowLink
          href={
            '/article/wellstar-mcg-health-implements-exo-works-and-sees-47-percent-increase-in-revenue'
          }
          isBig
        />
      </div>
      <ExoIrisContent articleCollection={articles} data={page} />
    </>
  );
};

export default ExoIrisPage;
