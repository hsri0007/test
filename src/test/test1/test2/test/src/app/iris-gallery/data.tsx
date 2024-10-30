export const PRICING_CARDS = [
  {
    name: 'Iris Essential',
    subhead: 'Scan, document, review and store exams from anywhere.',
    price: '$3,500',
    buyNowLink: 'https://www.google.com',
    buyNowCopy: 'Buy now',
    priceDetails: 'Price includes subscription to Exo Works Essential ($500 per year)',
    listItems: [
      'Simple Workflow',
      'Documenting and Reporting',
      'Secure Archiving',
      'DICOM',
      'PACS Integration',
    ],
    legalCopy:
      'Legal line can go here over multiple lines. Legal line can go here over multiple lines. Legal line can go here over multiple lines.',
    installCopy: 'Self install',
  },
  {
    name: 'Iris Connect',
    subhead:
      'Centralize all your POCUS imaging in one place for reporting, collaborating and managing QA or credentialing.',
    price: '$4,500',
    buyNowLink: 'https://www.google.com',
    buyNowCopy: 'Buy now',
    priceDetails: 'Price includes subscription to Exo Works Connect ($1500 per year)',
    bubbleText: 'Includes Iris Essential +',
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
    name: 'Iris Enterprise',
    subhead:
      'Our most powerful software for advanced control and flexibility across your health system from scanning to billing.',
    buyNowLink: 'https://www.google.com',
    buyNowCopy: 'Get quote',
    priceDetails: 'Speak to our team so we can understand your health systems unique needs.',
    bubbleText: 'Includes Iris Essential & Connect +',
    listItems: [
      'EMR Connectivity',
      'Automated Billing',
      'Multi-facility Support',
      'Fleet Management',
    ],
    legalCopy: 'Legal line can go here over multiple lines.',
    installCopy: 'White glove install',
  },
];

export const TABLE_DATA = {
  titles: ['Iris Essential', 'Iris Connect', 'Iris Enterprise'],
  content: [
    {
      title: 'Simple Workflow',
      subhead: 'Cras pharetra magna magna, ac pharetrafsomg neque lobortis sit amet.',
      col1: true,
      col2: true,
      col3: true,
    },
    {
      title: 'Documenting and Reporting',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: true,
      col2: true,
      col3: true,
    },
    {
      title: '3rd Party Ultrasound Support',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
      col3: true,
    },
    {
      title: 'Collab and QA Workflow',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: true,
      col3: true,
    },
    {
      title: 'Multi-facility Support',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: false,
      col3: true,
    },
    {
      title: 'Fleet Management',
      subhead: 'Cras pharetra magna magna, ac pharetra neque lobortis sit amet.',
      col1: false,
      col2: false,
      col3: true,
    },
  ],
  prices: [
    {
      price: '$3,500',
      priceInfo: 'Price includes subscription to Exo Works Essential ($500 per year)',
    },
    {
      price: '$4,500',
      priceInfo: 'Price includes subscription to Exo Works Connect ($1500 per year)',
    },
    { priceInfo: 'Speak to our team so we can understand your health systems unique needs.' },
  ],
};
