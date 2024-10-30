import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { cms } from '~/cms';
import TrustModulesWrapper from '~/components/pages/security-trust-center/TrustModulesWrapper';
import { LegalSection } from '~/components/sections/LegalSection';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  if (process.env.NODE_ENV !== 'production') {
    draftMode().enable();
  }
  const response = await cms().getSecurityData({ ...cms().defaultVariables });
  return {
    data: getFirstItemInCollection(response?.securityAndTrustCenterCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await getData();

  return formatPageMeta(data?.meta);
}

const Security = async () => {
  const { data } = await getData();

  return (
    <TrustModulesWrapper
      request={data?.ctaCertificate ?? { label: '', href: '' }}
      headingCertificate={data?.headingCertificate ?? ''}
      certificateImages={data?.complianceOrgs2Collection?.items}
    >
      <LegalSection title={data?.heading1} content={data?.body1} />
    </TrustModulesWrapper>
  );
};

export default Security;
