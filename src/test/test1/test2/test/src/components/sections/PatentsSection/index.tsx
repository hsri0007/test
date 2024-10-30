'use client';

import { useState } from 'react';

import { ArticleContentCopy } from '~/components/pages/article/ContentCopy';

import styles from './PatentsSection.module.scss';

type Tabs = 'Exo Iris' | 'Exo Works';

const PatentsSection = () => {
  const patents = {
    exoIris: {
      label: 'Exo Iris',
      patents: [
        'US7183622',
        'US7705467',
        'US8516905',
        'US8542074',
        'US8698569',
        'US8742872',
        'US8826742',
        'US9061890',
        'US9116238',
        'US9196752',
        'US9490196',
        'US9663353',
        'US9786581',
        'US9850121',
        'US10083936',
        'US10150668',
        'US10301176',
        'US10403604',
        'US10455308',
        'US10636769',
        'US10656007',
        'US10835209',
        'US10966683',
        'US11039814',
        'US11058396',
        'US11143547',
        'US11199623',
        'US11313717',
        'US11432800',
        'US11504093',
        'US11712222',
        'US11721022',
        'US11730451',
        'US11759175',
      ],
    },
    exoWorks: { label: 'Exo Works', patents: ['US9116238', 'US11721022', 'US11759175'] },
  };
  const title = 'Exo Patent Information';
  const content =
    'Exo products are protected by patents in the U.S. and elsewhere. This webpage is provided to satisfy the virtual patent marking provisions of Section 16 of the America Invents Act and to further serve as notice under 35 U.S.C. §287(a). This webpage is not intended to provide legal advice and does not waive any legal rights or remedies that Exo may have.\n\n The following list of Exo products may not be all-inclusive, and other Exo products not listed here may be protected by one or more patents. Additional U.S. patent applications and non-U.S. patents owned by Exo may cover these Exo products.';
  const [selectedTab, setSelectedTab] = useState<Tabs>('Exo Iris');

  const getTabContent = () => {
    const arr = Object.values(patents);
    const index = arr.findIndex(({ label }) => label === selectedTab);
    if (index > -1) {
      const key = Object.keys(patents)[index];
      return patents[key as 'exoIris' | 'exoWorks'].patents.join('\n');
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentSection}>
        <h1 className={styles.title}>{title}</h1>
        <ArticleContentCopy
          item={{
            sys: '' as any,
            copyContent: content as string,
          }}
        />
        <div className={styles.body}>
          <div className={styles.menuTitle}>
            {Object.values(patents).map(({ label }) => (
              <button
                key={label}
                className={selectedTab === label ? styles.active : ''}
                onClick={() => setSelectedTab(label as Tabs)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.tabContent}>
            <ArticleContentCopy
              item={{
                sys: '' as any,
                copyContent: getTabContent() as string,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PatentsSection };
