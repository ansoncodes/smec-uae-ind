'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { ArrowRight } from '@/components/Icons';
import { catalogueHref } from '@/lib/catalogue';
import {
  CATALOGUE,
  CATALOGUE_APPLICATIONS,
  CATALOGUE_CATEGORIES,
  CATALOGUE_COPY,
  CATALOGUE_QUICK,
} from '@/lib/spec/catalogue.generated';
import type { CatalogueItem } from '@/lib/spec/types';
import styles from './ProductCatalogue.module.css';

/**
 * The client's 65-item Systems & Products catalogue (Tab 2), on the overview
 * her architecture makes "the discovery hub" (CNT-03).
 *
 * Every row is in the server HTML as a plain link under her category, so a
 * crawler, and a visitor whose script never runs, gets the whole list. The
 * search, the application filter and the category buttons only hide rows;
 * none of them decides what is there. They match as her prototype's do — a
 * search looks at name, category, summary, tags and applications, an
 * application at category, name, applications and tags — except that every
 * word of a search must match somewhere rather than the phrase as typed, and
 * "Refinery" finds "Refineries".
 *
 * The labels and messages are her prototypes' (FINAL and Complete Tab 2).
 */

const ALL = 'All Systems';

/** "refineries" and "refinery" both reduce to "refiner", found in either. */
const stem = (word: string) => word.replace(/ies$/, 'y').replace(/y$/, '');

const searchText = (item: CatalogueItem) =>
  [item.name, item.category, item.summary, ...item.tags, ...item.applications]
    .join(' ')
    .toLowerCase();

const applicationText = (item: CatalogueItem) =>
  [item.category, item.name, ...item.applications, ...item.tags].join(' ').toLowerCase();

const QUICK = CATALOGUE_QUICK.flatMap((slug) => CATALOGUE.filter((item) => item.slug === slug));

export default function ProductCatalogue() {
  const id = useId();
  const searchRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [application, setApplication] = useState('');
  const [category, setCategory] = useState(ALL);

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean).map(stem);
    const wanted = stem(application.toLowerCase());

    return new Set(
      CATALOGUE.filter(
        (item) =>
          (category === ALL || item.category === category) &&
          words.every((word) => searchText(item).includes(word)) &&
          (!wanted || applicationText(item).includes(wanted))
      ).map((item) => item.slug)
    );
  }, [query, application, category]);

  const filtered = Boolean(query.trim() || application || category !== ALL);

  const clear = () => {
    setQuery('');
    setApplication('');
    setCategory(ALL);
    // The button goes with the filters; the search box is where to start again.
    searchRef.current?.focus();
  };

  return (
    <div className={styles.catalogue}>
      <p className={styles.lead}>{CATALOGUE_COPY.lead}</p>
      <p className={styles.total}>
        {CATALOGUE.length} catalogue entries · {CATALOGUE_CATEGORIES.length} categories
      </p>

      <form className={styles.toolbar} role="search" onSubmit={(event) => event.preventDefault()}>
        <div className={styles.field}>
          <label htmlFor={`${id}-search`}>Search systems and products</label>
          <input
            ref={searchRef}
            id={`${id}-search`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={CATALOGUE_COPY.placeholder}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-application`}>Filter by application</label>
          <select
            id={`${id}-application`}
            value={application}
            onChange={(event) => setApplication(event.target.value)}
          >
            <option value="">All applications</option>
            {CATALOGUE_APPLICATIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className={styles.quick}>
        <p className={styles.quickLabel} id={`${id}-quick`}>
          Quick access / Frequently requested systems
        </p>
        <ul className={styles.quickList} aria-labelledby={`${id}-quick`}>
          {QUICK.map((item) => (
            <li key={item.slug}>
              <a href={catalogueHref(item)}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.categories} role="group" aria-label="Product categories">
        {[ALL, ...CATALOGUE_CATEGORIES].map((name) => (
          <button
            key={name}
            type="button"
            className={styles.category}
            aria-pressed={category === name}
            onClick={() => setCategory(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className={styles.status}>
        <p className={styles.count} role="status">
          {shown.size} matching systems
        </p>
        {filtered ? (
          <button type="button" className={styles.clear} onClick={clear}>
            Clear filters
          </button>
        ) : null}
      </div>

      {CATALOGUE_CATEGORIES.map((name, index) => {
        const rows = CATALOGUE.filter((item) => item.category === name);

        return (
          <section
            key={name}
            className={styles.group}
            hidden={!rows.some((item) => shown.has(item.slug))}
            aria-labelledby={`${id}-category-${index}`}
          >
            <h3 className={styles.groupTitle} id={`${id}-category-${index}`}>
              {name}
            </h3>
            <ul className={styles.items}>
              {rows.map((item) => (
                <li
                  key={item.slug}
                  id={`catalogue-${item.slug}`}
                  className={styles.item}
                  hidden={!shown.has(item.slug)}
                >
                  <a className={styles.link} href={catalogueHref(item)}>
                    {item.name}
                    <span className="visuallyHidden">
                      {item.url ? ' — explore system' : ' — request technical information'}
                    </span>
                  </a>
                  <p className={styles.summary}>{item.summary}</p>
                  <p className={styles.applications}>
                    <span className="visuallyHidden">Typical applications: </span>
                    {item.applications.join(' · ')}
                  </p>
                  <span className={styles.action} aria-hidden="true">
                    {item.url ? 'Explore system' : 'Request technical information'}
                    <ArrowRight className={styles.arrow} />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      {shown.size === 0 ? (
        <p className={styles.empty}>
          No matching systems. Try a broader search or select All Systems.
        </p>
      ) : null}
    </div>
  );
}
