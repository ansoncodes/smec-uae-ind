'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageTypeOf, track } from '@/lib/analytics';

/**
 * The conversion events that are not the RFQ form's, all in one place.
 *
 * Every one of them is a click on a link that already exists — a phone
 * number, an email address, the WhatsApp button, "Send an RFQ" — so rather
 * than thread a handler through twenty components, this listens once on the
 * document and reads the link. A new phone number anywhere on the site is
 * tracked the day it is added, and no component has to know analytics exists.
 *
 * `rfq_submit`, `rfq_file_upload` and `form_error` belong to the form itself
 * and are fired there. Between the two, all eleven events in the Technical
 * Master §19 are emitted.
 *
 * Nothing is sent that §19 forbids: no field values, no file contents, no
 * enquiry text — only the path, the page type, and the name of the product or
 * solution the visitor was reading.
 */

const TALK_TO_ENGINEER = /talk to (an |our )?(engineer|expert|smec)/i;

/** The page's own H1, which is the product or solution by name. */
const currentItem = () => document.querySelector('h1')?.textContent?.trim() || undefined;

/** Roughly where on the page the link sits, for the report. */
function whereIs(element: Element): string {
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('form')) return 'rfq_form';
  if (element.closest('[data-widget]')) return 'floating';
  return 'body';
}

export default function ConversionEvents() {
  const pathname = usePathname();

  // A case study opening is a page view, not a click.
  useEffect(() => {
    if (/^\/resources\/case-studies\/.+/.test(pathname)) {
      track('case_study_view', { page_type: 'resource', item: currentItem() });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute('href') ?? '';
      const label = link.textContent?.trim() ?? '';
      const location = whereIs(link);
      const page_type = pageTypeOf(pathname);

      if (href.startsWith('tel:')) track('click_phone', { location, page_type });
      else if (href.startsWith('mailto:')) track('click_email', { location, page_type });
      else if (/wa\.me|whatsapp/i.test(href)) track('click_whatsapp', { location, page_type });

      if (TALK_TO_ENGINEER.test(label)) {
        track('cta_talk_engineer', { location, page_type, item: currentItem() });
      }

      // An approved datasheet is a PDF; the spec allows no other kind of
      // technical download, so the extension is the whole test.
      if (/\.pdf($|\?)/i.test(href)) {
        track('datasheet_download', { location, page_type, item: currentItem() });
      }

      // Reaching the RFQ page from a product or a solution is the step the
      // sales team cares about, so it is counted where it started.
      if (/^\/contact\/?($|[?#])/.test(href)) {
        if (page_type === 'product') {
          track('product_to_rfq', { location, page_type, item: currentItem() });
        } else if (page_type === 'solution') {
          track('solution_to_rfq', { location, page_type, item: currentItem() });
        }
      }
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [pathname]);

  return null;
}
