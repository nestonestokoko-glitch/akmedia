"use client";

import { CylinderCarousel, type CarouselImage } from "@/components/ui/cylinder-carousel";
import SplitText from "@/components/ui/SplitText";
import GsapReveal from "@/components/ui/GsapReveal";

// All official campaign thumbnails from https://akmediaindia.com/ ("Campaigns In Action")
// Using YouTube maxresdefault.jpg for uncompressed HD 1080p quality
export const CAMPAIGN_IMAGES: CarouselImage[] = [
  {
    src: "https://img.youtube.com/vi/NKjd6G4-tH4/maxresdefault.jpg",
    alt: "Filmora x Tech Creators",
    title: "Filmora x Tech Creators",
    brand: "Filmora",
  },
  {
    src: "https://img.youtube.com/vi/ldloMOo0qHM/maxresdefault.jpg",
    alt: "Hostinger Creator Network",
    title: "Hostinger Creator Network",
    brand: "Hostinger",
  },
  {
    src: "https://img.youtube.com/vi/sxEHp_U6BWg/maxresdefault.jpg",
    alt: "Manomay Growth Campaign",
    title: "Manomay Growth Story",
    brand: "Manomay",
  },
  {
    src: "https://img.youtube.com/vi/ZwL6YSuxlzI/maxresdefault.jpg",
    alt: "XECH Smart Innovation Campaign",
    title: "XECH Innovation",
    brand: "XECH",
  },
  {
    src: "https://img.youtube.com/vi/aSK8XCa5m7k/maxresdefault.jpg",
    alt: "Tech Creators Review Showcase",
    title: "Tech Review Campaign",
    brand: "Tech Network",
  },
  {
    src: "https://img.youtube.com/vi/_GpMUWhHQ3k/maxresdefault.jpg",
    alt: "Brand Impact Campaign",
    title: "Creator Brand Impact",
    brand: "Brand Partner",
  },
  {
    src: "https://img.youtube.com/vi/jdq75nADv54/maxresdefault.jpg",
    alt: "Creative Narrative Storytelling",
    title: "Creative Storytelling",
    brand: "Studio Partner",
  },
  {
    src: "https://img.youtube.com/vi/e4iQr99nEXs/maxresdefault.jpg",
    alt: "High-Conversion Placement Campaign",
    title: "Conversion Placement",
    brand: "Growth Campaign",
  },
  {
    src: "https://img.youtube.com/vi/UILALSZcXac/maxresdefault.jpg",
    alt: "Verified Partner Release",
    title: "Verified Partner Release",
    brand: "E-Com Network",
  },
];

export function CylinderCarouselDemo() {
  return (
    <div className="w-full">
      <CylinderCarousel
        images={CAMPAIGN_IMAGES}
        autoRotate={true}
        autoRotateSpeed={0.16}
      />
    </div>
  );
}

export default function Process() {
  return (
    <section id="work" className="relative overflow-hidden bg-ink py-section border-t border-line-2">
      <div className="container-px mx-auto max-w-[1400px]">
        {/* Centered Editorial Header: Campaigns In Action */}
        <GsapReveal y={20} threshold={0.2}>
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-blue">
              <span className="size-1.5 rounded-full bg-blue" />
              Our Work
            </p>
            <SplitText
              as="h2"
              text="Campaigns In Action."
              accent="Action"
              className="mx-auto max-w-[20ch] text-balance text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white"
            />
            <p className="mt-4 text-sm leading-relaxed text-mist/80">
              Browse premium creator-led campaigns built for scale and conversions across our verified network.
            </p>
          </div>
        </GsapReveal>

        {/* 3D Landscape Cylinder Carousel with all Campaigns In Action thumbnails */}
        <GsapReveal y={24} threshold={0.1}>
          <div className="w-full">
            <CylinderCarouselDemo />
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}