'use client';

import { RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Keep keyboard focus inside an open dialog and return it to its trigger. */
export function useDialogAccessibility<T extends HTMLElement>(
  isOpen: boolean,
  dialogRef: RefObject<T | null>,
): void {
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const getFocusable = () => Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => element.getClientRects().length > 0 && element.getAttribute('aria-hidden') !== 'true');

    const focusInitial = () => {
      const firstFocusable = getFocusable()[0];
      (firstFocusable || dialog).focus({ preventScroll: true });
    };

    focusInitial();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !dialog.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) focusInitial();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('focusin', handleFocusIn, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('focusin', handleFocusIn, true);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [dialogRef, isOpen]);
}
