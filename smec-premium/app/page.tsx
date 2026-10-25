import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Credentials from '@/components/Credentials';
import WhoWeAre from '@/components/WhoWeAre';
import Clients from '@/components/Clients';
import Capabilities from '@/components/Capabilities';
import SystemFeature from '@/components/SystemFeature';
import Digitalisation from '@/components/Digitalisation';
import Industries from '@/components/Industries';
import Certifications from '@/components/Certifications';
import About from '@/components/About';
import CorporateFilm from '@/components/CorporateFilm';
import Training from '@/components/Training';
import KnowledgeLibrary from '@/components/KnowledgeLibrary';
import Newsletter from '@/components/Newsletter';
import HomeFaqs from '@/components/HomeFaqs';
import FinalRfq from '@/components/FinalRfq';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';
import { newsletterEnabled } from '@/lib/newsletter';

/**
 * Homepage composition — the client's 18 October homepage document, in her
 * order (PROJECT_REFERENCE.md §7, rows 1–15). Her section titles are the
 * page's H2s; the H1 is the hero headline.
 *
 *   hero · credentials             dark
 *   who we are                     white
 *   clients & ecosystem            paper
 *   engineering solutions          white
 *   systems & products             dark
 *   digitalisation                 paper
 *   industries                     white
 *   quality & certifications       paper
 *   about: bases & delivery        white
 *   corporate film                 dark
 *   training                       paper
 *   knowledge library              dark
 *   SMEC EDGE newsletter           white   only once Mailchimp is configured
 *   engineering FAQs               paper
 *   final RFQ                      dark
 *
 * Off the page because her document does not include them, pending her answer
 * to HP-20. Their files are unchanged in components/; each comes back with
 * its import and one line here: <AssetBrief /> (after <Credentials />),
 * <Systems /> (the "Engineered for the field" grid), <GlobalReach />,
 * <Innovation />, <Sustainability />, <Careers />.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Credentials />
        <WhoWeAre />
        <Clients />
        <Capabilities />
        <SystemFeature />
        <Digitalisation />
        <Industries />
        <Certifications />
        <About />
        <CorporateFilm />
        <Training />
        <KnowledgeLibrary />
        {newsletterEnabled() ? <Newsletter /> : null}
        <HomeFaqs />
        <FinalRfq />
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
