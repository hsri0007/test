import { cms } from '~/cms';
import { LegalSection } from '~/components/sections/LegalSection';
import { getFirstItemInCollection } from '~/utils';

const getData = async () => {
  const response = await cms().cookiePolicy(cms().defaultVariables);

  return {
    page: getFirstItemInCollection(response.legalPageCollection),
  };
};

const CookiePolicyPage = async () => {
  const { page } = await getData();

  const { title, slug, content, contentMore } = page;

  return (
    <div>
      <LegalSection title={title} content={content} />
    </div>
  );
};

export default CookiePolicyPage;
