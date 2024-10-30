import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { AssetFragment, cms } from '~/cms';
import { Hero, Items } from '~/components/pages/security-trust-center';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  if (process.env.NODE_ENV !== 'production') {
    draftMode().enable();
  }
  const response = await cms().getTrustCenter({ ...cms().defaultVariables });
  return {
    data: getFirstItemInCollection(response?.securityAndTrustCenterCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getData();

  return formatPageMeta(data?.meta);
}

const TrustCenterPage = async () => {
  const { data } = await getData();

  const {
    heroHeading,
    heroSubHeader,
    heading1,
    description1,
    cta1,
    heading2,
    description2,
    cta2,
    heading3,
    description3,
    cta3,
    outro,
    image1,
    image2,
    image3,
  } = data;

  const homePageData = {
    title: heroHeading ?? '',
    description: heroSubHeader ?? '',
  };

  return (
    <>
      <Hero {...homePageData} />
      <Items
        items={[
          {
            image: image1 as AssetFragment | null,
            heading: heading1,
            copy: description1,
            cta: { href: 'security-trust-center/security', label: cta1, external: true },
          },
          {
            image: image2 as AssetFragment | null,
            heading: heading2,
            copy: description2,
            cta: { href: 'security-trust-center/privacy', label: cta2, external: true },
          },
          {
            image: image3 as AssetFragment | null,
            heading: heading3,
            copy: description3,
            cta: { href: 'security-trust-center/resource', label: cta3, external: true },
          },
        ]}
      />
      <Outro {...outro} />
    </>
  );
};

export default TrustCenterPage;
