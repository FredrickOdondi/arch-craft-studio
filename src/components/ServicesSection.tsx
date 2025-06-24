
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
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From initial concept to final construction, we provide comprehensive architectural services 
            tailored to bring your vision to life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <service.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Overview */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Design Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', description: 'Understanding your vision, needs, and project requirements' },
              { step: '02', title: 'Concept', description: 'Developing initial design concepts and exploring possibilities' },
              { step: '03', title: 'Design', description: 'Refining the design with detailed plans and specifications' },
              { step: '04', title: 'Delivery', description: 'Supporting construction and ensuring quality execution' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h4>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
