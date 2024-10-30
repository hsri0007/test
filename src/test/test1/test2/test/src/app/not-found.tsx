import { cms } from '~/cms';
import { Section404 } from '~/components/sections/Section404';
import { getFirstItemInCollection } from '~/utils';

const getData = async () => {
  const response = await cms().notFound({ ...cms().defaultVariables });
  const data = getFirstItemInCollection(response.notFoundPageCollection);

  return data;
};

export default async function NotFound() {
  const data = await getData();
  const { heading, copy, cta } = data;

  return <Section404 heading={heading} copy={copy} cta={cta} />;
}
