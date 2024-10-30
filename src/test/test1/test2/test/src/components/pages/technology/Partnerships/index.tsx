import { TechnologyContentFragment } from '~/cms';
import { CircleCheck } from '~/components/svgs';
import { ArrowLink, Section } from '~/components/ui';
import { externalToIsExternal } from '~/utils';

import styles from './Partnerships.module.scss';

interface PartnershipsProps {
  heading: TechnologyContentFragment['partnershipsHeading'];
  subheading: TechnologyContentFragment['partnershipsSubheading'];
  contactHeading: TechnologyContentFragment['partnershipsContactHeading'];
  contactCopy: TechnologyContentFragment['partnershipsContactCopy'];
  contactCta: TechnologyContentFragment['partnershipsContactCta'];
  appsHeading: TechnologyContentFragment['partnershipsApplicationsListHeading'];
  appsList: TechnologyContentFragment['partnershipsApplicationsListItems'];
}

const Partnerships = (props: PartnershipsProps) => {
  const { heading, subheading, contactHeading, contactCopy, contactCta, appsHeading, appsList } =
    props;

  return (
    <Section className={styles.container} isDark>
      <div className={styles.meta}>
        {heading && <p className={styles.metaHeading}>{heading}</p>}
        {subheading && <p className={styles.metaSubhead}>{subheading}</p>}
      </div>

      <div className={styles.contact}>
        {contactHeading && <p className={styles.contactHeading}>{contactHeading}</p>}
        {contactCopy && <p className={styles.contactCopy}>{contactCopy}</p>}
        {contactCta && <ArrowLink isSmall {...externalToIsExternal(contactCta)} />}
      </div>

      <div className={styles.apps}>
        {appsHeading && <p className={styles.appsHeading}>{appsHeading}</p>}

        {appsList && (
          <ul className={styles.appsList}>
            {appsList.map((item, index) => (
              <li className={styles.appsItem} key={index}>
                <CircleCheck className={styles.appsItemIcon} />
                <span className={styles.appsItemText}>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
};

export { Partnerships };
