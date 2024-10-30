import { title } from 'process';

import { Gradient } from '~/utils/types';

export const PRICING_CARDS = [
  {
    number: 1,
    name: 'Exo Works Connect',
    subhead:
      'Centralize all your POCUS imaging in one place for reporting, collaborating and managing QA or credentialing.',
    price: '$4,500',
    buyNowLink: 'https://www.google.com',
    buyNowCopy: 'Buy now',
    priceDetails: 'Includes Exo Works Connect 1yr. $1500',
    listItems: [
      '3rd Party Ultrasound Support',
      'Collaboration and QA Workflow',
      'Proficiency Management',
      'Multi-specialty Support',
      'Teleguidance',
    ],
    legalCopy:
      'Legal line can go here over multiple lines. Legal line can go here over multiple lines. Legal line can go here over multiple lines.',
    installCopy: 'Self install',
  },
  {
    number: 2,
    name: 'Exo Works Enterprise',
    subhead:
      'Our most powerful software for advanced control and flexibility across your health system from scanning to billing.',
    buyNowLink: 'https://www.google.com',
    buyNowCopy: 'Get quote',
    priceDetails: 'Price includes subscription to Exo Works Connect ($1500 per year)',
    bubbleText: 'Includes Iris Essential +',
    listItems: [
      'EMR Connectivity',
      'Automated Billing',
      'Multi-specialty Support',
      'Fleet Management',
    ],
    legalCopy:
      'Legal line can go here over multiple lines. Legal line can go here over multiple lines. Legal line can go here over multiple lines.',
    installCopy: 'White glove install',
  },
];

export const TABLE_DATA = {
  titles: ['Exo Works Connect', 'Exo Works Enterprise'],
  content: [
    {
      title: '3rd Party Ultrasound Support',
      subhead: 'Cras pharetra magna magna, ac pharetrafsomg neque lobortis sit amet.',
      col1: true,
      col2: true,
    },
    {
      title: 'Collaboration and QA Workflow',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: true,
      col2: true,
    },
    {
      title: 'Proficiency Management',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
    },
    {
      title: 'Multi-specialty Support',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
    },
    {
      title: 'Teleguidance',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: false,
    },
    {
      title: 'EMR Connectivity',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
    },
    {
      title: 'Automated Billing',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
    },
  ],
  prices: [
    {
      price: '$3,500',
      priceInfo: 'Price includes subscription to Exo Works Essential ($500 per year)',
    },
    { priceInfo: 'Speak to our team so we can understand your health systems unique needs.' },
  ],
};

// export const MOBILE_GRADIENT = `linear-gradient(
//   180deg,
//   rgba(8, 11, 27, 1) 0%,
//   rgba(104, 100, 221, 1) 33%,
//   rgba(236, 194, 111, 0.75) 65%,
//   rgba(255, 255, 255, 1) 100%
// )`;

export const MOBILE_GRADIENT = {
  stops: [
    { color: `rgba(8, 11, 27, 1)` },
    { color: `rgba(104, 100, 221, 1)` },
    { color: `rgba(236, 194, 111, 0.75)` },
    { color: `rgba(255, 255, 255, 1)` },
  ],
} satisfies Gradient;

export const DESKTOP_GRADIENT = {
  stops: [
    { color: `rgba(8, 11, 27, 1)` },
    { color: `rgba(104, 100, 221, 1)` },
    { color: `rgba(236, 194, 111, 0.8)` },
    { color: `rgba(255, 255, 255, 1)` },
  ],
} satisfies Gradient;

export const STEPS_DATA = [
  {
    id: 'step1',
    heading: 'Document in seconds.',
    bodyCopy:
      'Go from soul-crushing to state-of-the-art. Whether you have an encounter-based or order-based workflow, documenting ultrasound exams is now a breeze. Focus on more important things, like your patients.',
  },
  {
    id: 'step2',
    heading: 'Review images anywhere',
    bodyCopy:
      'Say goodbye to the rigid and outdated workflows of the past. Scan with any DICOM-enabled ultrasound and use Exo Works to send the images to PACS with a few clicks.',
  },
  {
    id: 'step3',
    heading: 'A new way to QA',
    bodyCopy:
      'No more hot mess. Fast-loading images, simple markup tools, and image tagging makes QA review a breeze and real-time feedback a reality.',
    isLaptop: true,
  },
  {
    id: 'step4',
    heading: 'Billing made easy',
    bodyCopy:
      'Automatically send exam info where it needs to go, whether to EMR or to the cloud. Easy archiving makes billing simple.',
    smallCopy:
      'Exo Works is Epic App Orchard certified and Cerner CODE program approved. Easily sync with your EMR.',
  },
  {
    id: 'step5',
    heading: "Stay in the driver's seat",
    bodyCopy:
      'Admins can manage user access, app security, and get insights on POCUS performance, user credentialing, and proficiency across your department — all in one dashboard.',
  },
];

export const EXO_WORKS_INNOVATION_CARDS = {
  title:
    'Exo Works POCUS workflow can scan to meet your   needs. With Exo Works Connect, get up and running fast for compliance, QA and   credentialing. With Exo Works Enterprise, scale across your multi-site   organization and integrate with EHR for workflow and billing.',
  data: [
    {
      name: 'Exo Works Connect',
      subhead:
        'Centralize all your POCUS imaging in one place for reporting, collaborating and managing QA or credentialing.',
    },
    {
      name: 'Exo Works Enterprise',
      subhead:
        'Our most powerful software for advanced control and flexibility across your health system from scanning to billing.',
    },
  ],
};
