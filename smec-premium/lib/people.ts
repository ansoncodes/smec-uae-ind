/**
 * Named people and live vacancies.
 *
 * The schema table assigns `Person` to the leadership and MD pages and
 * `JobPosting` to careers, "only on live individual vacancies". Both need
 * facts about real people and real roles, which are SMEC's to approve
 * (docs/spec-alignment.md 0.8) — so both lists are empty, and the pages emit
 * no Person and no JobPosting until they are filled. Nothing here is invented
 * to make a schema validator happy: a fabricated director is worse than a
 * missing one.
 *
 * To publish, add entries and lift the page's gate in the Content Master.
 */

export type Person = {
  name: string;
  /** Job title, exactly as approved. */
  role: string;
  /** A short approved biography. Optional. */
  bio?: string;
  /** An approved public profile, e.g. LinkedIn. Optional. */
  profile?: string;
  /** A portrait in /public/images. Optional. */
  image?: string;
};

export type Vacancy = {
  title: string;
  /** What the role covers, in the advert's own words. */
  description: string;
  /** 'Abu Dhabi, United Arab Emirates' or 'Kochi, India'. */
  location: string;
  country: 'AE' | 'IN';
  employmentType?: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY';
  /** ISO date the advert was posted. */
  datePosted?: string;
  /** ISO date it closes; Google expects one and drops stale postings. */
  validThrough?: string;
};

export const LEADERSHIP: Person[] = [];

/** The Managing Director, for /company/md-message/. */
export const MANAGING_DIRECTOR: Person | null = null;

export const VACANCIES: Vacancy[] = [];

/** `Person` nodes for the people a page actually names. */
export const personSchema = (people: Person[], siteUrl: string) =>
  people.map((person) => ({
    '@type': 'Person',
    name: person.name,
    jobTitle: person.role,
    worksFor: { '@id': `${siteUrl}/#organization` },
    ...(person.bio ? { description: person.bio } : {}),
    ...(person.profile ? { sameAs: [person.profile] } : {}),
    ...(person.image ? { image: `${siteUrl}${person.image}` } : {}),
  }));

/** `JobPosting` nodes for live vacancies, never for role families. */
export const jobPostingSchema = (vacancies: Vacancy[], siteUrl: string) =>
  vacancies.map((vacancy) => ({
    '@type': 'JobPosting',
    title: vacancy.title,
    description: vacancy.description,
    hiringOrganization: { '@id': `${siteUrl}/#organization` },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: vacancy.location,
        addressCountry: vacancy.country,
      },
    },
    ...(vacancy.employmentType ? { employmentType: vacancy.employmentType } : {}),
    ...(vacancy.datePosted ? { datePosted: vacancy.datePosted } : {}),
    ...(vacancy.validThrough ? { validThrough: vacancy.validThrough } : {}),
  }));
