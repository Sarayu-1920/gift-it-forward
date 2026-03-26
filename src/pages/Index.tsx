import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import GiftCategories from "@/components/GiftCategories";
import ImpactSection from "@/components/ImpactSection";
import CelebrationCard from "@/components/CelebrationCard";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <GiftCategories />
      <ImpactSection />
      <CelebrationCard />
      <Footer />
    </div>
  );
};

export default Index;