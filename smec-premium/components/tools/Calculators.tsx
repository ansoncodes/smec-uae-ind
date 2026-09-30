'use client';

import { useState } from 'react';
import { CALCULATORS, REVIEW_STATEMENT, type Calculator } from '@/lib/tools';
import styles from './Tools.module.css';

/**
 * The engineering calculators §23 asks for: "formula, units, assumptions,
 * limitations, engineering-review statement". All five are on the page, and
 * the limitations are not in a footnote — a calculator that hides what it
 * cannot account for is worse than no calculator.
 *
 * The maths is deliberately simple and standard. Nothing here is specific to
 * SMEC, so nothing here needs SMEC's approval; it needs an engineer to agree
 * the assumptions are the right ones to state.
 */

function compute(calc: Calculator, values: Record<string, number>): number | null {
  if (Object.values(values).some((v) => !Number.isFinite(v) || v <= 0)) return null;

  if (calc.slug === 'ups-autonomy') {
    const { load, voltage, capacity, efficiency, usable } = values;
    const stored = capacity * voltage * (usable / 100);
    const draw = load / (efficiency / 100);
    return stored / draw;
  }

  if (calc.slug === 'generator-loading') {
    return values.kw / values.pf;
  }

  return null;
}

function Panel({ calc }: { calc: Calculator }) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(calc.fields.map((f) => [f.name, f.initial]))
  );

  const result = compute(calc, values);
  const loading =
    calc.slug === 'generator-loading' && result ? (result / values.rating) * 100 : null;

  return (
    <section className={styles.tool} aria-labelledby={`calc-${calc.slug}`}>
      <h3 className={styles.toolTitle} id={`calc-${calc.slug}`}>
        {calc.title}
      </h3>
      <p className={styles.toolQuestion}>{calc.question}</p>

      <div className={styles.fields}>
        {calc.fields.map((field) => (
          <label className={styles.field} key={field.name}>
            <span>
              {field.label}
              {field.unit ? <em className={styles.unit}> ({field.unit})</em> : null}
            </span>
            <input
              type="number"
              inputMode="decimal"
              step={field.step ?? 1}
              min={field.min ?? 0}
              value={values[field.name]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.name]: Number(event.target.value),
                }))
              }
            />
          </label>
        ))}
      </div>

      <p className={styles.result} role="status">
        <span className={styles.resultLabel}>{calc.resultLabel}</span>
        <span className={styles.resultValue}>
          {result === null ? '—' : result.toFixed(result < 10 ? 2 : 1)}{' '}
          <em>{calc.resultUnit}</em>
        </span>
        {loading !== null ? (
          <span className={styles.resultAside}>
            {loading.toFixed(0)}% of the stated rating
          </span>
        ) : null}
      </p>

      <dl className={styles.notes}>
        <div>
          <dt>Formula</dt>
          <dd className={styles.formula}>{calc.formula}</dd>
        </div>
        <div>
          <dt>Assumes</dt>
          <dd>
            <ul>
              {calc.assumptions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Does not cover</dt>
          <dd>
            <ul>
              {calc.limitations.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default function Calculators() {
  return (
    <div className={styles.tools}>
      {CALCULATORS.map((calc) => (
        <Panel calc={calc} key={calc.slug} />
      ))}
      <p className={styles.review}>{REVIEW_STATEMENT}</p>
    </div>
  );
}
