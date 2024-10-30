import { Metadata } from 'next';

import { cms } from '~/cms';
import { HubSpotForm } from '~/components/forms/HubSpotForm';
import { FormCheckbox, FormInput, FormSelect, FormTextarea } from '~/components/pages/contact';
import { cx, getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './contact.module.scss';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Curious? See what we can do. We are ready to help. For the speediest reply, fill in the form. Our team will respond as soon as possible.',
  openGraph: {
    title: 'Contact Us',
    description:
      'Curious? See what we can do. We are ready to help. For the speediest reply, fill in the form. Our team will respond as soon as possible.',
    locale: 'en-US',
    type: 'website',
  },
};

const LEGAL_COPY: string = `Exo is committed to protecting and respecting your privacy, and we’ll only use your personal information to administer your account to provide the products and services you requested from us.
From time to time, we'd like to contact you about our products and services, as well as other content that may be of interest to you.`;

const getData = async () => {
  const response = await cms().contact(cms().defaultVariables);

  return {
    page: getFirstItemInCollection(response.contactCollection),
  };
};

async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.pageMeta);
}

const ContactPage = async () => {
  const { page } = await getData();

  const {
    consentCopy,
    legalCopy,
    slug,
    title,
    subhead,
    headline,
    formSubmissionUrl,
    formSpecialtyDropdownOptions,
    formTopicDropdownOptions,
    formHowDidYouHearAboutUs,
  } = page;

  const specialtyOptions = formSpecialtyDropdownOptions?.map((option, index) => {
    return { value: `S${index + 1}`, name: option };
  });

  const topicOptions = formTopicDropdownOptions?.map((option, index) => {
    return { value: `T${index + 1}`, name: option };
  });

  const howDidYouHearOptions = formHowDidYouHearAboutUs?.map((option, index) => {
    return { value: `H${index + 1}`, name: option };
  });

  return (
    <section className={styles.container}>
      <div className={styles.hero}>
        {!!title && <p className={styles.heroHeading}>{title}</p>}
        {!!subhead && <p className={styles.heroCopy}>{subhead}</p>}
      </div>

      <div className={styles.formContainer}>
        <HubSpotForm
          id="contact-form-feature-module"
          portalId="20465501"
          formId="907052b6-79ed-433a-86c3-cb6199abb684"
        />
      </div>
    </section>
  );
};

export default ContactPage;
