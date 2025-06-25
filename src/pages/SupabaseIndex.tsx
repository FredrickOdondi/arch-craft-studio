import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SupabasePortfolioSection from '../components/SupabasePortfolioSection';
import ServicesSection from '../components/ServicesSection';
import SupabaseContactSection from '../components/SupabaseContactSection';
import Footer from '../components/Footer';

const SupabaseIndex = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SupabasePortfolioSection />
      <ServicesSection />
      <SupabaseContactSection />
      <Footer />
    </div>
  );
};

export default SupabaseIndex;