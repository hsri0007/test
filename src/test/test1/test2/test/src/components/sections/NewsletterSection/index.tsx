'use client';

import { motion, useMotionTemplate, useScroll, useTime, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

import { EmailSignUpCollection, Maybe } from '~/cms';
import { FormInput } from '~/components/pages/contact';
import { ArrowLink, Section, SectionProps } from '~/components/ui';
import { HS_FORM_SUBMISSION_URL } from '~/constants';
import { cx } from '~/utils';

import styles from './NewsletterSection.module.scss';

interface NewsletterSectionProps extends SectionProps {
  className?: string | undefined;
  heading: Maybe<string>;
  copy: Maybe<string>;
  darkTheme?: boolean;
}

const WAVE_FACTOR = 20000;
const SECONDARY_ANGLE = 40;
const PRIMARY_ANGLE = 30;
const MARQUEE_OFFSET = 0.3333;

const validateEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};

export const NewsletterSection = ({
  className,
  heading,
  copy,
  darkTheme,
}: NewsletterSectionProps) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [thankYouMessage, setThankYouMessage] = useState('');
  const submitEmail = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      setEmailError(true);
      setThankYouMessage('Please enter a valid email address.');
      return;
    }

    if (email.length !== 0) {
      try {
        // submit email to hubspot API using fetch POST
        const data = {
          submittedAt: Date.now(),
          fields: [
            {
              objectTypeId: '0-1',
              name: 'email',
              value: email,
            },
          ],
        };

        const response = await fetch(
          `${HS_FORM_SUBMISSION_URL}/20465501/ce86ff4b-80f7-4187-800b-de1c3c178b0b`,
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.ok) {
          setEmailError(false);
          setEmail('');
          setThankYouMessage('Thank you for signing up!');
        }
      } catch (e) {
        // Handle error
        setEmailError(true);
        setThankYouMessage('There was an error submitting your email. Please try again.');
      }
    }
  };
  const primaryColor = 'exo-blue';
  const secondaryColor = 'exo-fluro';

  return (
    <Section className={cx(className, styles.newsletter)} isDark={darkTheme}>
      <div className={styles.contentWrapper}>
        <div className={styles.backgroundWrapper}>
          <div className={styles.background}>
            <div className={styles.backgroundContent}>
              <div
                className={styles.secondary}
                data-background-color={secondaryColor}
                style={{
                  rotate: '15deg',
                  transformOrigin: '40% -80%',
                }}
              />
              <div
                className={styles.primary}
                data-background-color={primaryColor}
                style={{
                  rotate: '30deg',
                  transformOrigin: '30% -80%',
                }}
              />
            </div>
          </div>
        </div>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.copy}>{copy}</p>
        <div className={styles.inputWrapper}>
          <FormInput
            value={email}
            className={styles.emailField}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            label="Email*"
            placeholder="jamessmith@example.com"
            type="email"
            required
          />
          <ArrowLink isSpan className={styles.submitBtn} onClick={submitEmail} isSmall />
          {thankYouMessage && (
            <span style={{ color: emailError ? 'red' : 'black' }}>{thankYouMessage}</span>
          )}
        </div>
      </div>
    </Section>
  );
};
