import { Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './<FTName | pascalcase>.module.scss';

interface <FTName | pascalcase>Props extends OmitChildren<SectionProps> {}

export const <FTName | pascalcase> = (props: <FTName | pascalcase>Props) => {
    const { className, ...otherProps } = props;
    return <Section {...otherProps} className={cx(styles.section, className)}></Section>;
};