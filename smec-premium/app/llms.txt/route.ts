import { SITE } from '@/lib/siteData';
import { SPEC_PAGES, isPublished } from '@/lib/spec';
import { ARTICLE_ROUTES } from '@/lib/spec/legacy';

/**
 * /llms.txt — an optional discovery aid for AI assistants (Technical Master
 * §11), never a substitute for the HTML, the sitemap or the structured data.
 * It lists the sitemap's own pages, each with its H1 and the description it
 * already publishes, grouped as the navigation groups them. Nothing here is
 * new copy.
 */
export const dynamic = 'force-static';

const SECTIONS: [string, string][] = [
  ['/solutions/', 'Engineering Solutions'],
  ['/products/', 'Systems & Products'],
  ['/digital/', 'Digitalisation'],
  ['/industries/', 'Industries'],
  ['/customers/', 'By customer'],
  ['/markets/', 'Markets'],
  ['/resources/', 'Projects & Resources'],
  ['/company/', 'About SMEC'],
];

export function GET() {
  const published = SPEC_PAGES.filter(isPublished);
  const home = published.find((page) => page.url === '/');
  const lines = [`# ${SITE.name}`, '', `> ${home?.metaDescription ?? ''}`, ''];

  for (const [prefix, title] of SECTIONS) {
    const pages = published.filter((page) => page.url.startsWith(prefix));
    const articles = prefix === '/resources/' ? ARTICLE_ROUTES : [];
    if (!pages.length && !articles.length) continue;
    lines.push(`## ${title}`, '');
    for (const page of pages) {
      const about = page.metaDescription || page.answer;
      lines.push(`- [${page.h1}](${SITE.url}${page.url})${about ? `: ${about}` : ''}`);
    }
    for (const route of articles) lines.push(`- [${route.article.title}](${SITE.url}${route.url})`);
    lines.push('');
  }

  lines.push('## Contact', '', `- [Submit a technical RFQ](${SITE.url}/contact/)`, '');
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
