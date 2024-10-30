'use client';

import Script from 'next/script';
import { ComponentProps, useCallback, useEffect, useId, useState } from 'react';

import { PreloaderLogo } from '~/components/svgs';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './HubSpotForm.module.scss';

interface HubSpotFormProps extends OmitChildren<ComponentProps<'div'>> {
  portalId: string;
  formId: string;
  id: string;
}

type WindowWithHubSpot = Window & {
  hbspt?: Record<string, any>;
};

declare const window: WindowWithHubSpot;

export const HubSpotForm = (props: HubSpotFormProps) => {
  const { className, portalId, formId, id, ...otherProps } = props;
  const [missingScript, setMissingScript] = useState(false);

  const injectForm = useCallback(() => {
    if (window.hbspt) {
      window.hbspt.forms.create({
        portalId,
        formId,
        target: `#form-${id}`,
      });
    }
  }, [formId, id, portalId]);

  // If the script isn't loaded listen for the event otherwise inject the form
  useEffect(() => {
    if (typeof window.hbspt === 'undefined') {
      window.addEventListener('hubspotformsscriptloaded', injectForm);
    } else {
      injectForm();
    }
    return () => {
      window.removeEventListener('hubspotformsscriptloaded', injectForm);
    };
  }, [injectForm]);

  // Add the script if it's not already present
  useEffect(() => {
    if (typeof window.hbspt === 'undefined') {
      setMissingScript(true);
    }
  }, []);

  return (
    <>
      <div id={`form-${id}`} {...otherProps} className={cx(styles.wrapper, className)}>
        <div className={styles.placeholder}>
          <PreloaderLogo />
        </div>
      </div>
      {missingScript && (
        <Script
          src="https://js.hsforms.net/forms/v2.js"
          strategy="lazyOnload"
          onLoad={() => {
            const hubSpotScriptLoadedEvent = new CustomEvent('hubspotformsscriptloaded');
            window.dispatchEvent(hubSpotScriptLoadedEvent);
          }}
        />
      )}
    </>
  );
};
