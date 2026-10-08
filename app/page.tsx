import { Navbar, Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { WorkStrip } from "@/components/WorkStrip";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative bg-[#6b8aa5]">
      <SmoothScroll />
      <Navbar />
      {/* sticky hero stays fixed while Work slides over it = the hide animation */}
      <Hero />
      <Work />
      <WorkStrip />
      <Footer />
    </main>
  );
}
