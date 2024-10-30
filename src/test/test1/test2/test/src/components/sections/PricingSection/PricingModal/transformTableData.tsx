import { PricingFragment } from '~/cms';

import { Content, Price } from './PricingTable';

const transformTableData = (
  columns: PricingFragment['columnsCollection'],
  rowHeadings: PricingFragment['rowHeadingsCollection']
) => {
  const titles = columns?.items.map(
    (item) => item.rowContentsCollection?.items[0].content
  ) as string[];

  // build content by iterating the row headings
  // row 1 and the last row have no headings
  const content = rowHeadings?.items.map((rowHeading, headingIndex) => {
    // split content into row title and row subhead
    const [title, subhead] = rowHeading.content?.split('\n') as string[];

    // extract the data for this row from the column arrays
    const rowData = columns?.items.map((column) => {
      // add 1 to headingIndex because the first row has no heading
      const raw = column.rowContentsCollection?.items[headingIndex + 1]?.content;

      // convert "yes" and "no" to boolean
      return raw?.includes('yes') ? raw : raw?.includes('~') ? raw?.replace('~', '') : '';
    });

    // convert array of booleans to object
    // format: [true, true, false] becomes { col1: true, col2: true, col3: false }
    const rowArrayToObject = rowData?.reduce((accum, current, index) => {
      const key = `col${index + 1}`;
      accum[key] = current;
      return accum;
    }, {} as { [key: string]: string });

    return {
      title,
      subhead,
      ...rowArrayToObject,
    };
  });

  // 2nd to last row of each column is the prices
  const prices = columns?.items
    .map((item) => item.rowContentsCollection?.items.slice(-2, -1)[0])
    .map((row) => {
      // split content into price and price info
      const [price, priceInfo] = row?.content?.split('\n') as string[];

      // if only 1 string in the field, assume it's the price info
      if (!priceInfo) {
        return {
          priceInfo: price,
        };
      }

      return {
        price,
        priceInfo,
      };
    });

  // last row of each column is the "Buy" / "Quote" links
  const links = columns?.items
    .map((item) => item.rowContentsCollection?.items.slice(-1)[0])
    .map((row) => {
      const [text, href] = row?.content?.split('\n') as string[];

      // "text" is unused, because it depends on the device width
      return {
        text,
        href,
      };
    });

  // cast the types here because they seem to be disappearing
  // likely because of the array / object manipulation
  const table = {
    titles,
    content: content as Content[],
    prices: prices as Price[],
    links: links as { text: string; href: string }[],
  };

  return table;
};

export { transformTableData };
