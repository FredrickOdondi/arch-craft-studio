
import React from 'react';
import { Home, Building, Map, Settings } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: 'Residential Design',
      description: 'Custom homes and residential spaces that reflect your lifestyle and values, combining comfort with stunning aesthetics.',
      features: ['Custom Home Design', 'Interior Planning', 'Landscape Integration', 'Sustainable Solutions']
    },
    {
      icon: Building,
      title: 'Commercial Projects',
      description: 'Innovative commercial spaces that enhance productivity and create memorable experiences for employees and customers.',
      features: ['Office Buildings', 'Retail Spaces', 'Hospitality Design', 'Mixed-Use Developments']
    },
    {
      icon: Map,
      title: 'Urban Planning',
      description: 'Comprehensive urban design solutions that create vibrant, sustainable communities for future generations.',
      features: ['Master Planning', 'Public Spaces', 'Transportation Design', 'Community Development']
    },
    {
      icon: Settings,
      title: 'Consultation',
      description: 'Expert architectural consultation services to guide your project from conception to completion.',
      features: ['Design Review', 'Code Compliance', 'Project Management', 'Construction Oversight']
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background design elements */}
      <div className="absolute top-10 right-10 floating-element w-32 h-32 animate-float opacity-10"></div>
      <div className="absolute bottom-20 left-20 floating-element w-20 h-20 animate-float opacity-15" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Our <span className="gradient-text bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            From initial concept to final construction, we provide comprehensive architectural services 
            tailored to bring your vision to life across Kenya.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {services.map((service, index) => (
            <div key={index} className="depth-card bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-3xl hover:shadow-4xl transition-all duration-500 group border border-white/20">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 glass rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-gray-200/50">
                    <service.icon className="w-10 h-10 text-gray-900 group-hover:text-black transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-800">
                        <div className="w-3 h-3 bg-gradient-to-r from-gray-900 to-gray-700 rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-base font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Overview */}
        <div className="depth-card bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/30">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Design Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your vision, needs, and project requirements through detailed consultations' },
              { step: '02', title: 'Concept', description: 'Developing initial design concepts and exploring creative possibilities for your space' },
              { step: '03', title: 'Design', description: 'Refining the design with detailed plans, specifications, and 3D visualizations' },
              { step: '04', title: 'Delivery', description: 'Supporting construction phases and ensuring quality execution of the final project' }
            ].map((process, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 glass bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-gray-300/50">
                  {process.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-black transition-colors duration-300">{process.title}</h4>
                <p className="text-gray-700 leading-relaxed">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
