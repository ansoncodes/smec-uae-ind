import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ApprovedPartners from "@/components/ApprovedPartners";
import MajorProducts from "@/components/MajorProducts";
import Stats from "@/components/Stats";
import WhoWeAre from "@/components/WhoWeAre";
import Certifications from "@/components/Certifications";
import Clients from "@/components/Clients";
import GlobalPresence from "@/components/GlobalPresence";
import RDFocus from "@/components/RDFocus";
import SolutionsServices from "@/components/SolutionsServices";
import Sustainability from "@/components/Sustainability";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";

/**
 * Same content and same section order as the wireframe build; the visual
 * language is a light SaaS theme.
 *
 * The wireframe's second nav bar (`StickyNav`) is folded into the single
 * sticky `Header` — both carried an identical menu, and one condensing header
 * is the SaaS equivalent.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ApprovedPartners />
        <MajorProducts />
        <Stats />
        <WhoWeAre />
        <Certifications />
        <Clients />
        <GlobalPresence />
        <RDFocus />
        <SolutionsServices />
        <Sustainability />
        <Articles />
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
