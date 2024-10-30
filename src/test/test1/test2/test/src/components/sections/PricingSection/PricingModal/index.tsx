'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { PricingFragment } from '~/cms';
import { Close } from '~/components/svgs';
import { ExoLink } from '~/components/ui/ExoLink';
import { cx } from '~/utils';

import styles from './PricingModal.module.scss';
import { PricingTable } from './PricingTable';
import { transformTableData } from './transformTableData';

type PricingModalProps = {
  columns: PricingFragment['columnsCollection'];
  rowHeadings: PricingFragment['rowHeadingsCollection'];
  triggerText: string | null;
};

export const PricingModal = ({ columns, rowHeadings, triggerText }: PricingModalProps) => {
  // const [open, setOpen] = useState(false);

  const router = useRouter();
  const table = transformTableData(columns, rowHeadings);

  const linksLength = table.links?.length as number;
  const isThreeCols = table.titles.length > 2;

  const tableHeadButton1 = (
    <>
      <div>
        <p className={styles.subHeader}>{columns?.items[0]?.subheader}</p>
      </div>
      <div className={styles.buyLinkContainer}>
        <ExoLink
          isExternal={true}
          href={columns?.items[0]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkMobile)}
        >
          {columns?.items[0]?.buttonText?.includes('Buy') ? 'Buy' : 'Quote'}
        </ExoLink>
        <ExoLink
          isExternal={true}
          href={columns?.items[0]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkDesktop)}
        >
          {columns?.items[0]?.buttonText}
        </ExoLink>
      </div>
    </>
  );
  const tableHeadButton2 = isThreeCols ? (
    <>
      <div>
        <p className={styles.subHeader}>{columns?.items[1]?.subheader}</p>
      </div>
      <div className={styles.buyLinkContainer}>
        <ExoLink
          isExternal={true}
          href={columns?.items[1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkMobile)}
        >
          {columns?.items[1]?.buttonText?.includes('Buy') ? 'Buy' : 'Quote'}
        </ExoLink>
        <ExoLink
          isExternal={true}
          href={columns?.items[1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkDesktop)}
        >
          {columns?.items[1]?.buttonText}
        </ExoLink>
      </div>
    </>
  ) : (
    <>
      <div>
        <p className={styles.subHeader}>{columns?.items[columns?.items?.length - 1]?.subheader}</p>
      </div>
      <div className={styles.buyLinkContainer}>
        <ExoLink
          isExternal={true}
          href={columns?.items[columns?.items?.length - 1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkMobile)}
        >
          {columns?.items[columns?.items?.length - 1]?.buttonText?.includes('Buy')
            ? 'Buy'
            : 'Quote'}
        </ExoLink>
        <ExoLink
          isExternal={true}
          href={columns?.items[columns?.items?.length - 1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkDesktop)}
        >
          {columns?.items[columns?.items?.length - 1]?.buttonText}
        </ExoLink>
      </div>
    </>
  );
  const tableHeadButton3 = (
    <>
      <div>
        <p className={styles.subHeader}>{columns?.items[columns?.items?.length - 1]?.subheader}</p>
      </div>
      <div className={styles.buyLinkContainer}>
        <ExoLink
          isExternal={true}
          href={columns?.items[columns?.items?.length - 1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkMobile)}
        >
          {columns?.items[columns?.items?.length - 1]?.buttonText?.includes('Buy')
            ? 'Buy'
            : 'Quote'}
        </ExoLink>
        <ExoLink
          isExternal={true}
          href={columns?.items[columns?.items?.length - 1]?.buttonLink}
          className={cx(styles.buyLink, styles.buyLinkDesktop)}
        >
          {columns?.items[columns?.items?.length - 1]?.buttonText}
        </ExoLink>
      </div>
    </>
  );

  const handleBack = () => {
    router.push(`${window.location.origin}/${window.location.pathname.split('/')[1]}#pricing`);
  };

  return (
    <div className={styles.container}>
      {/* // <Dialog.Root open={open} onOpenChange={(o) => setOpen(o)}>
    //   <Dialog.Trigger className={styles.triggerButton}>{triggerText}</Dialog.Trigger>
    //   <AnimatePresence>
    //     {open ? ( */}
      {/* // <Dialog.Portal forceMount>
    //   <Dialog.Overlay asChild forceMount>
    //     <motion.div */}
      {/* //       className={styles.overlay}
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       transition={{ duration: 0.4, ease: 'easeInOut' }}
    //     ></motion.div>
    //   </Dialog.Overlay> */}
      {/* <Dialog.Content asChild forceMount>
        <motion.div
          className={styles.contentContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0 } }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.5 }}
          data-lenis-prevent
        > */}
      {/* <Dialog.Title className="sr-only">Comparing Exo Packages</Dialog.Title> */}
      <div className={styles.close} onClick={handleBack}>
        <Close title="Close gallery" className={styles.closeSvg} />
      </div>
      <div className={styles.closeCantainer}></div>
      <PricingTable
        data={table}
        buttons={{
          tableHeadButton1,
          tableHeadButton2,
          tableHeadButton3,
        }}
      />
      <div
        className={cx(
          styles.buyLinksContainer,
          isThreeCols && styles['buyLinksContainer--threeColumns']
        )}
      >
        <div aria-hidden />
        {/* <div className={styles.buyLinkContainer}>
          <ExoLink href={table.links[0].href} className={cx(styles.buyLink, styles.buyLinkMobile)}>
            Buy
          </ExoLink>
          <ExoLink href={table.links[0].href} className={cx(styles.buyLink, styles.buyLinkDesktop)}>
            Buy now
          </ExoLink>
        </div>

        {isThreeCols && (
          <div className={styles.buyLinkContainer}>
            <ExoLink
              href={table.links[1].href}
              className={cx(styles.buyLink, styles.buyLinkMobile)}
            >
              Buy
            </ExoLink>
            <ExoLink
              href={table.links[1].href}
              className={cx(styles.buyLink, styles.buyLinkDesktop)}
            >
              Buy now
            </ExoLink>
          </div>
        )}

        <div className={styles.buyLinkContainer}>
          <ExoLink
            href={table.links[linksLength - 1].href}
            className={cx(styles.buyLink, styles.buyLinkMobile)}
          >
            Quote
          </ExoLink>
          <ExoLink
            href={table.links[linksLength - 1].href}
            className={cx(styles.buyLink, styles.buyLinkDesktop)}
          >
            Get quote
          </ExoLink>
        </div> */}
      </div>
      {/* </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root> */}
    </div>
  );
};
