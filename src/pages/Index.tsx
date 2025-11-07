import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGallery from "@/components/ServicesGallery";
import PricingSection from "@/components/PricingSection";
import AdvantagesSection from "@/components/AdvantagesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesGallery />
      <PricingSection />
      <AdvantagesSection />
      <Footer />
    </div>
  );
};

export default Index;
