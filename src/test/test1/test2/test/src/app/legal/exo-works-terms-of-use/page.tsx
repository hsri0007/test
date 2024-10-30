import { cms } from '~/cms';
import { ArticleContentCopy } from '~/components/pages/article/ContentCopy';
import { LegalSection } from '~/components/sections/LegalSection';
import { getFirstItemInCollection } from '~/utils';

const getData = async () => {
  const response = await cms().exoWorksTermsOfUse(cms().defaultVariables);

  return {
    page: getFirstItemInCollection(response.legalPageCollection),
  };
};

const ExoWorksTermsOfUsePage = async () => {
  const { page } = await getData();
  const { title, slug, content, contentMore } = page;

  return (
    <div>
      <LegalSection title={title} content={content} contentMore={contentMore} />
    </div>
  );
};

export default ExoWorksTermsOfUsePage;
