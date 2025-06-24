
import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/6702865e-f31d-4f22-a824-ab8468fd1354.png"
          alt="Modern Kenyan Architecture"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-fade-in">
          Designing Kenya's
          <span className="block text-white drop-shadow-2xl">Future</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90 animate-fade-in max-w-3xl mx-auto leading-relaxed">
          Premier architectural solutions for modern Kenyan living. Creating innovative spaces that reflect our heritage and embrace tomorrow.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
          <a 
            href="#portfolio" 
            className="bg-white text-black px-10 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-white"
          >
            Explore Our Kenyan Projects
          </a>
          <a 
            href="#contact" 
            className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Start Your Dream Home
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white w-8 h-8" />
      </div>
    </section>
  );
};

export default HeroSection;
