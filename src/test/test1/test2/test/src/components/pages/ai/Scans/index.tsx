import dynamic from 'next/dynamic';

import ScansContent, { ScansContentProps } from './ScansContent';

interface ScansProps extends ScansContentProps {}

// workaround for useLoader(TextureLoader, ...) issues with SSR
const Scans = (props: ScansProps) => {
  // const ScansContent = dynamic(() => import('./ScansContent'), {
  //   ssr: false,
  // });

  return <ScansContent {...props} />;
};

export { Scans };
