import { Metadata } from 'next';

import { cms } from '~/cms';
import { SecondaryHeader } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  const response = await cms().works(cms().defaultVariables);
  const topBanner = await cms().getEventBasedModal({
    ...cms().defaultVariables,
    id: '2lWgtBdFudHdHEMQZ9Op5J',
  });
  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.exoWorksCollection),
    topBanner: topBanner.crmEventBasedModal,
  };
};
export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}
const ExoWorksLayout = async (props: { children: React.ReactNode }) => {
  const { children } = props;
  const { topBanner } = await getData();

  return (
    <div data-accent-color="works-purple">
      <SecondaryHeader
        heroText={topBanner?.heroText ?? ''}
        isModalEnabledOnSite={topBanner?.isModalEnabledOnSite ?? false}
        link={topBanner?.link ?? ''}
        logo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="58"
            viewBox="0 0 313 58"
            fill="none"
          >
            <g clip-path="url(#clip0_201_6315)">
              <path
                d="M55.925 10.23H28.56V27.065H53.325V30.575H28.56V49.49H55.925V53H24.725V6.72H55.925V10.23ZM74.4627 35.775L87.4627 53H83.1077L79.0127 47.54C76.7377 44.42 74.4627 41.3 72.3177 38.44C70.1727 41.365 67.8327 44.485 65.6227 47.605L61.5277 53H57.2377L70.1727 35.775L57.9527 19.46H62.2427L66.6627 25.31C68.6127 27.975 70.5627 30.575 72.3827 33.175L78.1027 25.31L82.4577 19.46H86.7477L74.4627 35.775ZM101.921 53.78C92.6906 53.78 86.3206 46.76 86.3206 36.23C86.3206 25.7 92.6906 18.68 101.921 18.68C111.216 18.68 117.586 25.7 117.586 36.23C117.586 46.76 111.216 53.78 101.921 53.78ZM101.921 50.465C109.136 50.465 113.751 44.94 113.751 36.23C113.751 27.52 109.136 21.995 101.921 21.995C94.7706 21.995 90.1556 27.52 90.1556 36.23C90.1556 44.94 94.7706 50.465 101.921 50.465Z"
                fill="currentColor"
              />
              <path
                d="M184.09 6.72H188.12L174.145 53H169.79L161.08 23.815C159.975 19.85 158.805 15.625 157.7 11.53C156.66 15.625 155.49 19.85 154.32 23.815L145.675 53H141.32L127.345 6.72H131.375L139.825 34.605C141.125 39.09 142.49 43.835 143.595 48.385C144.83 43.77 146.065 39.025 147.365 34.475L155.555 6.72H159.91L168.1 34.475C169.4 39.025 170.635 43.77 171.87 48.385C172.975 43.835 174.34 39.09 175.64 34.605L184.09 6.72ZM197.513 53.78C188.283 53.78 181.913 46.76 181.913 36.23C181.913 25.7 188.283 18.68 197.513 18.68C206.808 18.68 213.178 25.7 213.178 36.23C213.178 46.76 206.808 53.78 197.513 53.78ZM197.513 50.465C204.728 50.465 209.343 44.94 209.343 36.23C209.343 27.52 204.728 21.995 197.513 21.995C190.363 21.995 185.748 27.52 185.748 36.23C185.748 44.94 190.363 50.465 197.513 50.465ZM233.243 19.005C233.828 19.005 234.413 19.005 235.128 19.07V22.58H233.568C226.093 22.58 221.868 27.13 221.868 34.215V53H218.163V19.46H221.673V26.48C223.428 22.58 227.068 19.005 233.243 19.005ZM262.032 53L249.422 34.15L242.467 40.52V53H238.762V6.72H242.467V36.23L260.472 19.46H265.347L252.087 31.81L266.322 53H262.032ZM279.569 53.78C270.794 53.78 266.114 49.685 265.659 42.6H269.429C269.884 47.865 272.809 50.595 279.569 50.595C285.549 50.595 288.929 48.515 288.929 44.225C288.929 40.78 286.784 39.025 280.674 37.92L277.229 37.335C270.079 36.035 266.699 33.11 266.699 27.845C266.699 22.19 271.184 18.68 278.724 18.68C287.759 18.68 291.659 22.775 291.984 29.08H288.214C287.889 24.205 285.094 21.865 278.724 21.865C273.459 21.865 270.404 24.01 270.404 27.78C270.404 31.55 273.199 33.045 278.334 34.02L281.714 34.605C289.449 36.035 292.634 38.83 292.634 44.03C292.634 50.595 287.304 53.78 279.569 53.78Z"
                data-fill-color="works-purple"
              />
              <path
                d="M298.606 10.596H300.168C300.505 10.596 300.821 10.5887 301.114 10.574C301.422 10.5447 301.693 10.4787 301.928 10.376C302.163 10.2733 302.346 10.1193 302.478 9.914C302.625 9.694 302.698 9.39333 302.698 9.012C302.698 8.68933 302.632 8.43267 302.5 8.242C302.383 8.05133 302.221 7.90467 302.016 7.802C301.825 7.69933 301.598 7.63333 301.334 7.604C301.085 7.56 300.835 7.538 300.586 7.538H298.606V10.596ZM297.11 6.328H300.828C301.972 6.328 302.815 6.55533 303.358 7.01C303.915 7.46467 304.194 8.154 304.194 9.078C304.194 9.94333 303.952 10.5813 303.468 10.992C302.984 11.388 302.383 11.6227 301.664 11.696L304.414 15.942H302.808L300.19 11.806H298.606V15.942H297.11V6.328ZM293.524 11.102C293.524 12.114 293.693 13.0527 294.03 13.918C294.382 14.7687 294.859 15.5093 295.46 16.14C296.076 16.7707 296.795 17.2693 297.616 17.636C298.452 17.988 299.354 18.164 300.322 18.164C301.275 18.164 302.163 17.988 302.984 17.636C303.805 17.2693 304.517 16.7707 305.118 16.14C305.734 15.5093 306.211 14.7687 306.548 13.918C306.9 13.0527 307.076 12.114 307.076 11.102C307.076 10.1193 306.9 9.20267 306.548 8.352C306.211 7.50133 305.734 6.768 305.118 6.152C304.517 5.52133 303.805 5.03 302.984 4.678C302.163 4.31133 301.275 4.128 300.322 4.128C299.354 4.128 298.452 4.31133 297.616 4.678C296.795 5.03 296.076 5.52133 295.46 6.152C294.859 6.768 294.382 7.50133 294.03 8.352C293.693 9.20267 293.524 10.1193 293.524 11.102ZM292.028 11.102C292.028 9.94333 292.248 8.86533 292.688 7.868C293.128 6.87067 293.722 6.00533 294.47 5.272C295.233 4.53867 296.113 3.96667 297.11 3.556C298.122 3.13067 299.193 2.918 300.322 2.918C301.451 2.918 302.515 3.13067 303.512 3.556C304.509 3.96667 305.382 4.53867 306.13 5.272C306.878 6.00533 307.472 6.87067 307.912 7.868C308.352 8.86533 308.572 9.94333 308.572 11.102C308.572 12.29 308.352 13.39 307.912 14.402C307.472 15.3993 306.878 16.272 306.13 17.02C305.382 17.7533 304.509 18.3253 303.512 18.736C302.515 19.1467 301.451 19.352 300.322 19.352C299.193 19.352 298.122 19.1467 297.11 18.736C296.113 18.3253 295.233 17.7533 294.47 17.02C293.722 16.272 293.128 15.3993 292.688 14.402C292.248 13.39 292.028 12.29 292.028 11.102Z"
                data-fill-color="works-purple"
              />
            </g>
            <defs>
              <clipPath id="clip0_201_6315">
                <rect width="312.356" height="58" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        }
        mobileLogo={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="58"
            viewBox="0 0 313 58"
            fill="none"
          >
            <g clip-path="url(#clip0_201_6315)">
              <path
                d="M55.925 10.23H28.56V27.065H53.325V30.575H28.56V49.49H55.925V53H24.725V6.72H55.925V10.23ZM74.4627 35.775L87.4627 53H83.1077L79.0127 47.54C76.7377 44.42 74.4627 41.3 72.3177 38.44C70.1727 41.365 67.8327 44.485 65.6227 47.605L61.5277 53H57.2377L70.1727 35.775L57.9527 19.46H62.2427L66.6627 25.31C68.6127 27.975 70.5627 30.575 72.3827 33.175L78.1027 25.31L82.4577 19.46H86.7477L74.4627 35.775ZM101.921 53.78C92.6906 53.78 86.3206 46.76 86.3206 36.23C86.3206 25.7 92.6906 18.68 101.921 18.68C111.216 18.68 117.586 25.7 117.586 36.23C117.586 46.76 111.216 53.78 101.921 53.78ZM101.921 50.465C109.136 50.465 113.751 44.94 113.751 36.23C113.751 27.52 109.136 21.995 101.921 21.995C94.7706 21.995 90.1556 27.52 90.1556 36.23C90.1556 44.94 94.7706 50.465 101.921 50.465Z"
                fill="currentColor"
              />
              <path
                d="M184.09 6.72H188.12L174.145 53H169.79L161.08 23.815C159.975 19.85 158.805 15.625 157.7 11.53C156.66 15.625 155.49 19.85 154.32 23.815L145.675 53H141.32L127.345 6.72H131.375L139.825 34.605C141.125 39.09 142.49 43.835 143.595 48.385C144.83 43.77 146.065 39.025 147.365 34.475L155.555 6.72H159.91L168.1 34.475C169.4 39.025 170.635 43.77 171.87 48.385C172.975 43.835 174.34 39.09 175.64 34.605L184.09 6.72ZM197.513 53.78C188.283 53.78 181.913 46.76 181.913 36.23C181.913 25.7 188.283 18.68 197.513 18.68C206.808 18.68 213.178 25.7 213.178 36.23C213.178 46.76 206.808 53.78 197.513 53.78ZM197.513 50.465C204.728 50.465 209.343 44.94 209.343 36.23C209.343 27.52 204.728 21.995 197.513 21.995C190.363 21.995 185.748 27.52 185.748 36.23C185.748 44.94 190.363 50.465 197.513 50.465ZM233.243 19.005C233.828 19.005 234.413 19.005 235.128 19.07V22.58H233.568C226.093 22.58 221.868 27.13 221.868 34.215V53H218.163V19.46H221.673V26.48C223.428 22.58 227.068 19.005 233.243 19.005ZM262.032 53L249.422 34.15L242.467 40.52V53H238.762V6.72H242.467V36.23L260.472 19.46H265.347L252.087 31.81L266.322 53H262.032ZM279.569 53.78C270.794 53.78 266.114 49.685 265.659 42.6H269.429C269.884 47.865 272.809 50.595 279.569 50.595C285.549 50.595 288.929 48.515 288.929 44.225C288.929 40.78 286.784 39.025 280.674 37.92L277.229 37.335C270.079 36.035 266.699 33.11 266.699 27.845C266.699 22.19 271.184 18.68 278.724 18.68C287.759 18.68 291.659 22.775 291.984 29.08H288.214C287.889 24.205 285.094 21.865 278.724 21.865C273.459 21.865 270.404 24.01 270.404 27.78C270.404 31.55 273.199 33.045 278.334 34.02L281.714 34.605C289.449 36.035 292.634 38.83 292.634 44.03C292.634 50.595 287.304 53.78 279.569 53.78Z"
                data-fill-color="works-purple"
              />
              <path
                d="M298.606 10.596H300.168C300.505 10.596 300.821 10.5887 301.114 10.574C301.422 10.5447 301.693 10.4787 301.928 10.376C302.163 10.2733 302.346 10.1193 302.478 9.914C302.625 9.694 302.698 9.39333 302.698 9.012C302.698 8.68933 302.632 8.43267 302.5 8.242C302.383 8.05133 302.221 7.90467 302.016 7.802C301.825 7.69933 301.598 7.63333 301.334 7.604C301.085 7.56 300.835 7.538 300.586 7.538H298.606V10.596ZM297.11 6.328H300.828C301.972 6.328 302.815 6.55533 303.358 7.01C303.915 7.46467 304.194 8.154 304.194 9.078C304.194 9.94333 303.952 10.5813 303.468 10.992C302.984 11.388 302.383 11.6227 301.664 11.696L304.414 15.942H302.808L300.19 11.806H298.606V15.942H297.11V6.328ZM293.524 11.102C293.524 12.114 293.693 13.0527 294.03 13.918C294.382 14.7687 294.859 15.5093 295.46 16.14C296.076 16.7707 296.795 17.2693 297.616 17.636C298.452 17.988 299.354 18.164 300.322 18.164C301.275 18.164 302.163 17.988 302.984 17.636C303.805 17.2693 304.517 16.7707 305.118 16.14C305.734 15.5093 306.211 14.7687 306.548 13.918C306.9 13.0527 307.076 12.114 307.076 11.102C307.076 10.1193 306.9 9.20267 306.548 8.352C306.211 7.50133 305.734 6.768 305.118 6.152C304.517 5.52133 303.805 5.03 302.984 4.678C302.163 4.31133 301.275 4.128 300.322 4.128C299.354 4.128 298.452 4.31133 297.616 4.678C296.795 5.03 296.076 5.52133 295.46 6.152C294.859 6.768 294.382 7.50133 294.03 8.352C293.693 9.20267 293.524 10.1193 293.524 11.102ZM292.028 11.102C292.028 9.94333 292.248 8.86533 292.688 7.868C293.128 6.87067 293.722 6.00533 294.47 5.272C295.233 4.53867 296.113 3.96667 297.11 3.556C298.122 3.13067 299.193 2.918 300.322 2.918C301.451 2.918 302.515 3.13067 303.512 3.556C304.509 3.96667 305.382 4.53867 306.13 5.272C306.878 6.00533 307.472 6.87067 307.912 7.868C308.352 8.86533 308.572 9.94333 308.572 11.102C308.572 12.29 308.352 13.39 307.912 14.402C307.472 15.3993 306.878 16.272 306.13 17.02C305.382 17.7533 304.509 18.3253 303.512 18.736C302.515 19.1467 301.451 19.352 300.322 19.352C299.193 19.352 298.122 19.1467 297.11 18.736C296.113 18.3253 295.233 17.7533 294.47 17.02C293.722 16.272 293.128 15.3993 292.688 14.402C292.248 13.39 292.028 12.29 292.028 11.102Z"
                data-fill-color="works-purple"
              />
            </g>
            <defs>
              <clipPath id="clip0_201_6315">
                <rect width="312.356" height="58" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        }
        logoLink={{ href: '/exo-works' }}
        links={[
          { href: '/exo-works', label: 'Why Exo Works' },
          { href: '/exo-works/specs', label: 'Tech Specs' },
          { href: '/exo-works#pricing', label: 'Pricing' },
        ]}
        cta={{ href: '/book-demo', label: 'Demo Now' }}
      />
      {children}
    </div>
  );
};

export default ExoWorksLayout;
