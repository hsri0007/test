import { Metadata } from 'next';

import { cms } from '~/cms';
import { TechSpecsContent } from '~/components/pages/tech-specs/TechSpecsContent';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  const response = await cms().techSpecs({ ...cms().defaultVariables, product: 'exo-iris' });
  const data = getFirstItemInCollection(response.techSpecsPageCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return formatPageMeta(data?.meta);
}

const ExoIrisTechSpecsPage = async () => {
  const data = await getData();

  return <TechSpecsContent {...data} />;
};

export default ExoIrisTechSpecsPage;
