import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import Credentials from '@/components/Credentials';
import About from '@/components/About';
import Systems from '@/components/Systems';
import SystemFeature from '@/components/SystemFeature';
import Industries from '@/components/Industries';
import GlobalReach from '@/components/GlobalReach';
import Certifications from '@/components/Certifications';
import Clients from '@/components/Clients';
import CorporateFilm from '@/components/CorporateFilm';
import Innovation from '@/components/Innovation';
import Sustainability from '@/components/Sustainability';
import Insights from '@/components/Insights';
import Careers from '@/components/Careers';
import ContactCTA from '@/components/ContactCTA';
import SiteFooter from '@/components/SiteFooter';
import FloatingWidgets from '@/components/FloatingWidgets';

/**
 * Homepage composition.
 *
 * The page alternates between the near-black ground and the paper counter-
 * ground so the eye gets a beat between sections:
 *
 *   hero · credentials      dark
 *   01 about                paper
 *   02 systems · 03 focus   dark
 *   04 industries           paper
 *   05 global presence      dark
 *   06 assurance · clients  paper
 *   film · 07 innovation    dark
 *   08 sustainability       paper
 *   09 insights             paper
 *   10 careers · contact    dark
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Credentials />
        <About />
        <Systems />
        <SystemFeature />
        <Industries />
        <GlobalReach />
        <Certifications />
        <Clients />
        <CorporateFilm />
        <Innovation />
        <Sustainability />
        <Insights />
        <Careers />
        <ContactCTA />
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </>
  );
}
