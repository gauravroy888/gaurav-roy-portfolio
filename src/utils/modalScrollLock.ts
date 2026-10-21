'use client';

import { useEffect } from 'react';

/**
 * Global Modal Scroll Lock & Interaction Blocker
 * 
 * Blocks background website scrolling and interactions whenever ANY modal or popup is active:
 * 1. Locks documentElement and body scrolling.
 * 2. Intercepts mouse wheel & touch events outside scrollable modal containers (preventing backdrop/near-modal scroll bleed).
 * 3. Sets `inert` and `pointer-events-none` on the main page so background elements cannot be clicked, hovered, or focused.
 * 4. Emits `app-modal-state-change` events to inform background companions (like the CuteSpiderCompanion)
 *    to immediately silence voices, hide speech bubbles, and suspend section tracking.
 */

let activeModalCount = 0;
let wheelHandler: ((e: WheelEvent) => void) | null = null;
let touchHandler: ((e: TouchEvent) => void) | null = null;

export function setModalLock(isOpen: boolean) {
  if (typeof window === 'undefined') return;

  if (isOpen) {
    activeModalCount++;

    if (activeModalCount === 1) {
      // 1. Lock documentElement & body
      document.documentElement.classList.add('modal-is-open');
      document.body.classList.add('modal-is-open');

      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';

      // 2. Disable interactions on background website
      const main = document.querySelector('main');
      const navbar = document.querySelector('nav') || document.querySelector('header');
      const footer = document.querySelector('footer');

      if (main) {
        main.setAttribute('inert', '');
        main.setAttribute('aria-hidden', 'true');
        main.style.pointerEvents = 'none';
      }
      if (navbar) {
        navbar.style.pointerEvents = 'none';
      }
      if (footer) {
        footer.style.pointerEvents = 'none';
      }

      // 3. Intercept wheel events on window with capture: true & passive: false
      wheelHandler = (e: WheelEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) {
          e.preventDefault();
          return;
        }

        // Check if mouse wheel is happening inside an element explicitly meant to scroll inside the modal
        const scrollable = target.closest(
          '.overflow-y-auto, .overflow-y-scroll, .overflow-auto, [data-modal-scrollable]'
        ) as HTMLElement | null;

        if (!scrollable) {
          // Mouse is over the backdrop or outside the scrollable body of the modal
          e.preventDefault();
          return;
        }

        // If the container is scrollable, prevent chaining past top or bottom bounds
        const { scrollTop, scrollHeight, clientHeight } = scrollable;
        const canScrollDown = scrollTop + clientHeight < scrollHeight - 1;
        const canScrollUp = scrollTop > 1;

        if ((e.deltaY > 0 && !canScrollDown) || (e.deltaY < 0 && !canScrollUp)) {
          e.preventDefault();
        }
      };

      touchHandler = (e: TouchEvent) => {
        const target = e.target as HTMLElement | null;
        if (!target) {
          e.preventDefault();
          return;
        }

        const scrollable = target.closest(
          '.overflow-y-auto, .overflow-y-scroll, .overflow-auto, [data-modal-scrollable]'
        ) as HTMLElement | null;

        if (!scrollable) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', wheelHandler, { passive: false, capture: true });
      window.addEventListener('touchmove', touchHandler, { passive: false, capture: true });

      // 4. Notify background components (Spider Companion, background animations, etc.)
      window.dispatchEvent(
        new CustomEvent('app-modal-state-change', {
          detail: { isAnyModalOpen: true, count: activeModalCount },
        })
      );
    }
  } else {
    activeModalCount = Math.max(0, activeModalCount - 1);

    if (activeModalCount === 0) {
      // 1. Restore documentElement & body
      document.documentElement.classList.remove('modal-is-open');
      document.body.classList.remove('modal-is-open');

      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';

      // 2. Restore interactions on background website
      const main = document.querySelector('main');
      const navbar = document.querySelector('nav') || document.querySelector('header');
      const footer = document.querySelector('footer');

      if (main) {
        main.removeAttribute('inert');
        main.removeAttribute('aria-hidden');
        main.style.pointerEvents = '';
      }
      if (navbar) {
        navbar.style.pointerEvents = '';
      }
      if (footer) {
        footer.style.pointerEvents = '';
      }

      // 3. Remove event listeners
      if (wheelHandler) {
        window.removeEventListener('wheel', wheelHandler, { capture: true });
        wheelHandler = null;
      }
      if (touchHandler) {
        window.removeEventListener('touchmove', touchHandler, { capture: true });
        touchHandler = null;
      }

      // 4. Notify background components
      window.dispatchEvent(
        new CustomEvent('app-modal-state-change', {
          detail: { isAnyModalOpen: false, count: 0 },
        })
      );
    }
  }
}

/**
 * React hook to register any modal's open state into the global scroll/interaction lock.
 */
export function useModalScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      setModalLock(true);
      return () => {
        setModalLock(false);
      };
    }
  }, [isOpen]);
}

/**
 * Synchronous query to check if any modal is currently open.
 */
export function isAnyModalActive(): boolean {
  return activeModalCount > 0;
}
