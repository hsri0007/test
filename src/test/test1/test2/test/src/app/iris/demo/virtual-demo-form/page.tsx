import { cms } from '~/cms';
import { DemoHubspotContainer } from '~/components/demos/DemoHubspotContainer';
import { getFirstItemInCollection } from '~/utils';

const getData = async () => {
  const response = await cms().bookDemo({
    ...cms().defaultVariables,
    product: 'exo-iris-virtual-demo',
  });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

const VirtualDemoPage = async () => {
  const data = await getData();

  return (
    <DemoHubspotContainer
      exitHref="/iris/demo"
      title={data.virtualDemoFormTitle}
      copy={data.virtualDemoFormCopy}
      formId="bd9950ac-d7a5-4ff4-badb-537868b68010"
      portalId="20465501"
    />
  );
};

export default VirtualDemoPage;
