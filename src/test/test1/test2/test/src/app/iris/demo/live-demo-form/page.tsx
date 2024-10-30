import { cms } from '~/cms';
import { DemoHubspotContainer } from '~/components/demos/DemoHubspotContainer';
import { HS_FORM_ID_EXO_IRIS_DEMO } from '~/constants';
import { getFirstItemInCollection } from '~/utils';

const getData = async () => {
  const response = await cms().bookDemo({
    ...cms().defaultVariables,
    product: 'exo-iris-virtual-demo',
  });
  const data = getFirstItemInCollection(response.bookADemoCollection);

  return data;
};

const LiveDemoPage = async () => {
  const data = await getData();

  return (
    <DemoHubspotContainer
      exitHref="/iris/demo"
      title={data.liveDemoFormTitle}
      copy={data.liveDemoFormCopy}
      formId={HS_FORM_ID_EXO_IRIS_DEMO}
      portalId="20465501"
    />
  );
};

export default LiveDemoPage;
