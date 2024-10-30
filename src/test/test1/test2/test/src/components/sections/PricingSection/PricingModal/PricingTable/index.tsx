import { marked } from 'marked';

import { PricingFragment } from '~/cms';
import { CircleCheck } from '~/components/svgs';
import { ExoLink } from '~/components/ui/ExoLink';
import { cx } from '~/utils';

import styles from './PricingTable.module.scss';

export type TableData = {
  titles: string[];
  content: Content[];
  prices: Price[];
  links: links[];
};

export type Content = {
  title: string;
  subhead: string;
  col1: string;
  col2: string;
  col3?: string;
};

export type Price = {
  price?: string;
  priceInfo: string;
};

type PricingTableProps = {
  data: TableData;
  buttons: any;
};

export type links = {
  text: string;
  href: string;
};

export const PricingTable = ({ data, buttons }: PricingTableProps) => {
  const { titles, content, links } = data;
  return (
    <table className={styles.table}>
      <colgroup>
        <col
          className={cx(
            styles.titleCellCol,
            titles.length > 2 && styles['titleCellCol--threeColumns']
          )}
        />
        <col className={styles.standardCellCol} />
        <col className={styles.standardCellCol} />
        {titles.length > 2 && <col className={styles.standardCellCol} />}
      </colgroup>
      <thead className={styles.thead}>
        <tr>
          <th></th>
          <th className={cx(styles.cell, styles.tableHead)}>
            {titles[0]}
            {buttons?.tableHeadButton1}
          </th>
          <th className={cx(styles.cell, styles.tableHead)}>
            {titles[1]}
            {buttons?.tableHeadButton2}
          </th>
          {titles.length > 2 && (
            <th className={cx(styles.cell, styles.tableHead)}>
              {titles[2]}
              {buttons?.tableHeadButton3}
            </th>
          )}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {content.map((item, i) => (
          <tr className={styles.row} key={i}>
            <td className={cx(styles.cell)}>
              <h3
                className={styles.title}
                dangerouslySetInnerHTML={{
                  __html: marked.parse(item.title, {
                    mangle: false,
                    headerIds: false,
                    breaks: true,
                  }),
                }}
              />
            </td>
            <td className={cx(styles.cell)}>
              {item.col1?.includes('yes') ? (
                <div className={styles.checkContainer}>
                  {item?.col1?.includes('~') ? (
                    <>
                      <CircleCheck className={styles.check} title="Yes" />
                      {item?.col1?.split('~')[1]}
                    </>
                  ) : (
                    <CircleCheck className={styles.check} title="Yes" />
                  )}
                </div>
              ) : (
                <div>
                  {/* // removed dash */}
                  {/* <div className={styles.blank}>-</div> */}
                  {item?.col1 ? (
                    <div className={styles.blank}>{item?.col1}</div>
                  ) : (
                    <>
                      <div className={styles.blank} />
                      <span className="sr-only">No</span>
                    </>
                  )}
                </div>
              )}
            </td>
            <td className={cx(styles.cell)}>
              {item.col2?.includes('yes') ? (
                <div className={styles.checkContainer}>
                  {item?.col2?.includes('~') ? (
                    <>
                      <CircleCheck className={styles.check} title="Yes" />
                      {item?.col2?.split('~')[1]}
                    </>
                  ) : (
                    <CircleCheck className={styles.check} title="Yes" />
                  )}
                </div>
              ) : (
                <>
                  {/* // removed dash */}
                  {/* <div className={styles.blank}>-</div> */}
                  {item?.col2 ? (
                    <div className={styles.blank}>{item?.col2}</div>
                  ) : (
                    <>
                      <div className={styles.blank} />
                      <span className="sr-only">No</span>
                    </>
                  )}
                </>
              )}
            </td>
            {titles.length > 2 && (
              <td className={cx(styles.cell)}>
                {item?.col3?.includes('yes') ? (
                  <div className={styles.checkContainer}>
                    {item?.col3?.includes('~') ? (
                      <>
                        <CircleCheck className={styles.check} title="Yes" />
                        {item?.col3?.split('~')[1]}
                      </>
                    ) : (
                      <CircleCheck className={styles.check} title="Yes" />
                    )}
                  </div>
                ) : (
                  <>
                    {/* // removed dash */}
                    {/* <div className={styles.blank}>-</div> */}
                    {item?.col3 ? (
                      <div className={styles.blank}>{item?.col3}</div>
                    ) : (
                      <>
                        <div className={styles.blank} />
                        <span className="sr-only">No</span>
                      </>
                    )}
                  </>
                )}
              </td>
            )}
          </tr>
        ))}
        {/* pricing row */}
        {/* <tr>
          <td className={cx(styles.cell)}>
            <h3 className={styles.title}>Price</h3>
          </td>
          <td className={cx(styles.cell)}>
            <div className={styles.price}>{data.prices[0].price ?? '---'}</div>
            {data.prices[0].priceInfo && (
              <div className={styles.priceInfo}>{data.prices[0].priceInfo}</div>
            )}
          </td>
          <td className={cx(styles.cell)}>
            <div className={styles.price}>{data.prices[1].price ?? '---'}</div>
            {data.prices[1].priceInfo && (
              <div className={styles.priceInfo}>{data.prices[1].priceInfo}</div>
            )}
          </td>
          {titles.length > 2 && (
            <td className={cx(styles.cell)}>
              <div className={styles.price}>{data.prices[2].price ?? '---'}</div>
              {data.prices[2].priceInfo && (
                <div className={styles.priceInfo}>{data.prices[2].priceInfo}</div>
              )}
            </td>
          )}
        </tr> */}
      </tbody>
    </table>
  );
};
