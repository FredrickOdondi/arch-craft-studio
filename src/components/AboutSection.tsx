
import React from 'react';
import { Star, Users, Calendar } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Calendar, number: '12+', label: 'Years in Kenya' },
    { icon: Users, number: '150+', label: 'Kenyan Homes Built' },
    { icon: Star, number: '25+', label: 'Awards & Recognition' }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Crafting Kenyan Spaces That
              <span className="text-gray-600"> Inspire</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At VN Design Tech, we understand the unique architectural needs of Kenyan families. Our designs 
              blend modern functionality with traditional Kenyan aesthetics, creating homes that are both 
              beautiful and practical for our climate and lifestyle.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              From Nairobi's urban developments to coastal Mombasa homes, we specialize in sustainable 
              design solutions that reflect Kenya's rich cultural heritage while embracing contemporary 
              living standards. Every project is tailored to the Kenyan context.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-black rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-black to-gray-800 rounded-lg p-8 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2965&q=80"
                alt="Modern Kenyan architectural design"
                className="rounded-lg w-full h-[500px] object-cover shadow-xl border-4 border-white"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-lg shadow-xl border-2 border-black">
              <p className="text-black font-semibold text-sm">Proudly Kenyan</p>
              <p className="text-gray-600 text-xs">Designed & Built</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
