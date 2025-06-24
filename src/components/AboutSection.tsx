
import React from 'react';
import { Star, Users, Calendar } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Calendar, number: '15+', label: 'Years Experience' },
    { icon: Users, number: '200+', label: 'Projects Completed' },
    { icon: Star, number: '50+', label: 'Awards Won' }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Crafting Spaces That
              <span className="text-blue-600"> Inspire</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At ApexArch, we believe architecture is more than just buildings—it's about creating experiences, 
              fostering connections, and shaping the way people live and work. Our award-winning team combines 
              innovative design with sustainable practices to deliver projects that stand the test of time.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              From cutting-edge commercial complexes to intimate residential spaces, we approach each project 
              with fresh eyes and a commitment to excellence that has earned us recognition across the industry.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2965&q=80"
              alt="Modern architectural design"
              className="rounded-lg shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
