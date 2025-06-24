
import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/6336335e-8404-42ce-bc92-8e7a52514670.png"
          alt="Architectural Design Process"
          className="w-full h-full object-cover"
        />
        {/* Enhanced gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80"></div>
        {/* Additional glass overlay for modern look */}
        <div className="absolute inset-0 glass-dark"></div>
      </div>

      {/* Floating design elements */}
      <div className="absolute top-20 left-10 floating-element w-24 h-24 animate-float opacity-20"></div>
      <div className="absolute bottom-32 right-16 floating-element w-16 h-16 animate-float opacity-30" style={{animationDelay: '2s'}}></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
        <div className="depth-card p-12 rounded-3xl border border-white/20">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in gradient-text">
            Designing Kenya's
            <span className="block text-white drop-shadow-2xl">Future</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in max-w-3xl mx-auto leading-relaxed">
            Premier architectural solutions for modern Kenyan living. Creating innovative spaces that reflect our heritage and embrace tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <a 
              href="#portfolio" 
              className="modern-button bg-white/10 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white/30 backdrop-blur-xl"
            >
              Explore Our Kenyan Projects
            </a>
            <a 
              href="#contact" 
              className="modern-button border-2 border-white/30 text-white hover:bg-white/20 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 backdrop-blur-xl"
            >
              Start Your Dream Home
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="glass w-12 h-12 rounded-full flex items-center justify-center border border-white/20">
          <ChevronDown className="text-white w-6 h-6" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
