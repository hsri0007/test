'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Asset } from '~/cms';
import { HubSpotForm } from '~/components/forms/HubSpotForm';
import { useLenis } from '~/components/layout/LenisWrapper';
import { useGlobalStore } from '~/stores/globalStore';

import Dialog from '../Dialog';

const newsletterKey = 'showNewsletterSubscription';
const timeUntilDialogShows = 10000;
const shortTimeUntilDialogShows = 1000;
const daysUntilNextDialogAppears = 30;
const DIALOG_TRIGGER_HEIGHT = 2; // percent of viewport height

export const EmailDialog = ({
  heroText,
  supportingText,
  isModalEnabledOnSite,
}: {
  heroText?: string;
  supportingText?: string;
  isModalEnabledOnSite: boolean;
}) => {
  const { showEmailDialogSoon, setShowEmailDialogSoon } = useGlobalStore([
    'showEmailDialogSoon',
    'setShowEmailDialogSoon',
  ]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const lenis = useLenis();
  const [dialogNotReady, setDialogNotReady] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    var today = new Date();
    today.setDate(today.getDate() + daysUntilNextDialogAppears);
    localStorage.setItem(newsletterKey, today.toUTCString());
  };

  useEffect(() => {
    const dateToShow = localStorage.getItem(newsletterKey);
    if (dateToShow && new Date() < new Date(dateToShow)) {
      setDialogNotReady(true);
    } else {
      setDialogNotReady(false);
    }
  }, []);

  useEffect(() => {
    const timeout = timer.current;
    if (!isModalEnabledOnSite || dialogNotReady) return;
    if (!showEmailDialogSoon) return;
    if (timeout) {
      clearTimeout(timeout);
    }
    timer.current = setTimeout(() => {
      setIsOpen(true);
    }, shortTimeUntilDialogShows);
  }, [dialogNotReady, showEmailDialogSoon, isModalEnabledOnSite]);

  useEffect(() => {
    const timeout = timer.current;
    if (!isModalEnabledOnSite || dialogNotReady) {
      if (timeout) {
        clearTimeout(timeout);
      }
      return;
    }

    timer.current = setTimeout(() => {
      setIsOpen(true);
    }, timeUntilDialogShows);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [isModalEnabledOnSite, dialogNotReady]);

  const handleScroll = useCallback(
    (e: any) => {
      const scroll = e.targetScroll;
      const triggerHeight = window.innerHeight * DIALOG_TRIGGER_HEIGHT;
      if (scroll > triggerHeight) {
        setShowEmailDialogSoon(true);
        lenis?.off('scroll', handleScroll);
      }
    },
    [lenis, setShowEmailDialogSoon]
  );

  useEffect(() => {
    lenis?.on('scroll', handleScroll);
    return () => {
      lenis?.off('scroll', handleScroll);
    };
  }, [lenis, handleScroll]);

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} title={heroText} description={supportingText}>
      <HubSpotForm
        id="email-modal-form-subscription"
        portalId="20465501"
        formId="1cc7d66f-811e-4a7a-a72d-9b3a92029c52"
      />
    </Dialog>
  );
};
