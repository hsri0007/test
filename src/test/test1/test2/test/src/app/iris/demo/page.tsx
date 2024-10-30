import { Metadata } from 'next';

import { BookDemoQuery, cms } from '~/cms';
import { StandardDemo } from '~/components/demos/StandardDemo';
import { VirtualDemo } from '~/components/demos/VirtualDemo';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

export type DemoPageData = NonNullable<BookDemoQuery['bookADemoCollection']>['items'][number];

const getData = async () => {
  const response = await cms().bookDemo({
    ...cms().defaultVariables,
    product: 'exo-iris-virtual-demo',
  });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return formatPageMeta(data?.pageMeta);
}

const IrisDemo = async () => {
  const data = await getData();

  if (data.virtualDemo) {
    return <VirtualDemo data={data} />;
  } else {
    return <StandardDemo data={data} />;
  }
};

export default IrisDemo;
