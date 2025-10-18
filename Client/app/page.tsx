import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection"; 
import TrendingSection from "./components/TrendingSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { Card } from "./components/ui/Card";
import Navbar from "./components/Navbar";
import { Flame, Shield, Sparkles, Search, Wallet, ShoppingCart, ChevronRight, Play } from "lucide-react";


export default function Page() {
  return (
    <div>
      
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TrendingSection />
      <CTASection />
      <Footer />

    </div>
  );
}

