import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ApprovedPartners from '@/components/ApprovedPartners';
import MajorProducts from '@/components/MajorProducts';
import Stats from '@/components/Stats';
import WhoWeAre from '@/components/WhoWeAre';
import Certifications from '@/components/Certifications';
import Clients from '@/components/Clients';
import GlobalPresence from '@/components/GlobalPresence';
import RDFocus from '@/components/RDFocus';
import SolutionsServices from '@/components/SolutionsServices';
import Sustainability from '@/components/Sustainability';
import Articles from '@/components/Articles';
import ContactBand from '@/components/ContactBand';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import Motion from '@/components/ui/Motion';

/* Section order is the wireframe's. Each section sits in a Motion group so
   its elements play their entrance as it scrolls into view. ContactBand is
   presentation only: it repeats contact details that already live in the
   header and footer, in the pale centred band the template closes with. */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Motion>
          <Hero />
        </Motion>
        <Motion>
          <ApprovedPartners />
        </Motion>
        <Motion>
          <MajorProducts />
        </Motion>
        <Motion>
          <Stats />
        </Motion>
        <Motion>
          <WhoWeAre />
        </Motion>
        <Motion>
          <Certifications />
        </Motion>
        <Motion>
          <Clients />
        </Motion>
        <Motion>
          <GlobalPresence />
        </Motion>
        <Motion>
          <RDFocus />
        </Motion>
        <Motion>
          <SolutionsServices />
        </Motion>
        <Motion>
          <Sustainability />
        </Motion>
        <Motion>
          <Articles />
        </Motion>
        <Motion>
          <ContactBand />
        </Motion>
      </main>
      <Motion>
        <Footer />
      </Motion>
      <FloatingWidgets />
    </>
  );
}
