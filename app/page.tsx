import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import DualPath from "@/components/sections/DualPath";
import CreatorNetwork from "@/components/sections/CreatorNetwork";
import WhySection from "@/components/sections/WhySection";
import Process from "@/components/sections/Process";
import Founder from "@/components/sections/Founder";
import Testimonials from "@/components/sections/Testimonials";
import FinalCta from "@/components/sections/FinalCta";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <DualPath />
      <CreatorNetwork />
      <WhySection />
      <Process />
      <Founder />
      <Testimonials />
      <FinalCta />
      <Contact />
    </>
  );
}