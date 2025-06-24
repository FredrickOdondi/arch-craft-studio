
import React, { useState } from 'react';
import ProjectDetail from './ProjectDetail';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = ['All', 'Residential', 'Commercial', 'Modern Villas'];

  const projects = [
    {
      id: 1,
      title: 'Modern Kenyan Family Villa',
      category: 'Residential',
      image: '/lovable-uploads/6ddadf5e-e33d-4f45-b5f1-42e7b925683d.png',
      description: 'Contemporary family home with traditional Kenyan elements in Nairobi',
      location: 'Nairobi, Kenya',
      year: '2023',
      size: '3,500 sq ft',
      client: 'The Kimani Family',
      fullDescription: 'This stunning modern villa showcases the perfect blend of contemporary design and Kenyan architectural heritage. Located in the serene suburbs of Nairobi, this family home features clean lines, natural materials, and spaces designed for the Kenyan climate. The design incorporates traditional elements like the pergola-style roof extensions while maintaining a distinctly modern aesthetic.',
      features: [
        'Climate-responsive design for Kenyan weather',
        'Traditional pergola-style roofing',
        'Open-plan living spaces',
        'Natural stone and timber accents',
        'Landscaped garden with indigenous plants',
        'Energy-efficient lighting and ventilation'
      ],
      additionalImages: [
        '/lovable-uploads/6ab3ee37-24a8-49ad-9cbf-99c74b15746e.png',
        '/lovable-uploads/6702865e-f31d-4f22-a824-ab8468fd1354.png'
      ]
    },
    {
      id: 2,
      title: 'Executive Residence Mombasa',
      category: 'Modern Villas',
      image: '/lovable-uploads/a16de9f5-818f-4a5c-af5a-20513e2a4b35.png',
      description: 'Luxury coastal home designed for Mombasa\'s tropical climate',
      location: 'Mombasa, Kenya',
      year: '2023',
      size: '4,200 sq ft',
      client: 'The Ochieng Family',
      fullDescription: 'This executive residence in Mombasa represents the pinnacle of coastal Kenyan architecture. Designed to take advantage of ocean breezes and natural light, the home features elevated living spaces, covered terraces, and materials selected for durability in the coastal environment. The design respects traditional Swahili architectural principles while delivering modern luxury.',
      features: [
        'Elevated design for coastal climate',
        'Traditional Swahili architectural elements',
        'Hurricane-resistant construction',
        'Covered outdoor living spaces',
        'Cross-ventilation for natural cooling',
        'Coral stone and modern materials blend'
      ],
      additionalImages: [
        '/lovable-uploads/7b40a898-be57-4c55-9814-9abfa1665dfc.png',
        '/lovable-uploads/d9fb4d4c-ede6-4db2-8e2f-1681fc13c3dc.png'
      ]
    },
    {
      id: 3,
      title: 'Contemporary Nairobi Home',
      category: 'Residential',
      image: '/lovable-uploads/d9a911c7-1507-4221-9ff9-f3b7689f3c71.png',
      description: 'Modern urban family residence with rooftop entertainment area',
      location: 'Nairobi, Kenya',
      year: '2024',
      size: '3,800 sq ft',
      client: 'The Mutua Family',
      fullDescription: 'This contemporary Nairobi home represents the future of urban Kenyan living. Featuring a striking rooftop terrace perfect for entertaining, the design maximizes the urban plot while providing private family spaces. The clean geometric lines and mixed materials create a sophisticated aesthetic that stands out in the neighborhood.',
      features: [
        'Rooftop entertainment area',
        'Modern geometric design',
        'Urban plot optimization',
        'Mixed material facade',
        'Smart home integration',
        'Sustainable building practices'
      ],
      additionalImages: [
        '/lovable-uploads/ea62cb5d-5bef-4710-9794-d4a643565769.png',
        '/lovable-uploads/09009e14-2f52-4e71-a3d6-c0090d31f47c.png'
      ]
    },
    {
      id: 4,
      title: 'Luxury Karen Estate Villa',
      category: 'Modern Villas',
      image: '/lovable-uploads/1a18720d-6f1a-4028-8d3b-5a009f6fe80f.png',
      description: 'Premium villa with pergola features and modern amenities',
      location: 'Karen, Nairobi',
      year: '2023',
      size: '5,000 sq ft',
      client: 'The Wanjiku Family',
      fullDescription: 'Located in the prestigious Karen area, this luxury villa exemplifies sophisticated Kenyan living. The design features extensive pergola elements that provide shade while creating beautiful light patterns throughout the day. The integration of outdoor and indoor spaces makes this home perfect for Kenya\'s year-round outdoor lifestyle.',
      features: [
        'Extensive pergola design elements',
        'Luxury finishes throughout',
        'Karen area prestige location',
        'Indoor-outdoor living integration',
        'Private garden sanctuary',
        'Premium security features'
      ],
      additionalImages: [
        '/lovable-uploads/6ddadf5e-e33d-4f45-b5f1-42e7b925683d.png',
        '/lovable-uploads/6ab3ee37-24a8-49ad-9cbf-99c74b15746e.png'
      ]
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Kenyan <span className="text-gray-400">Portfolio</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover our collection of architectural masterpieces across Kenya. From Nairobi's urban landscapes 
              to Mombasa's coastal beauty, each project tells a story of Kenyan excellence.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
                  activeFilter === filter
                    ? 'bg-white text-black border-white shadow-xl'
                    : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer overflow-hidden rounded-lg border-4 border-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                      <div className="bg-white text-black px-6 py-3 rounded-full text-sm font-bold transform scale-90 group-hover:scale-100 transition-transform duration-300 border-2 border-black">
                        View Full Project
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-black text-white">
                  <div className="text-gray-400 text-sm font-medium mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-3">{project.description}</p>
                  <p className="text-sm text-gray-400">📍 {project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetail 
          project={selectedProject} 
          onClose={closeProjectDetail}
        />
      )}
    </>
  );
};

export default PortfolioSection;
