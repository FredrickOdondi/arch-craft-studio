
import React, { useState, useEffect } from 'react';
import { Eye, ArrowRight, MapPin, Calendar } from 'lucide-react';
import ProjectDetail from './ProjectDetail';

const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const filters = ['All', 'Residential', 'Commercial', 'Modern Villas'];

  // Default projects as fallback
  const defaultProjects = [
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
      fullDescription: 'This stunning modern villa showcases the perfect blend of contemporary design and Kenyan architectural heritage. Located in the serene suburbs of Nairobi, this family home features clean lines, natural materials, and spaces designed for the Kenyan climate.',
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
      fullDescription: 'This executive residence in Mombasa represents the pinnacle of coastal Kenyan architecture. Designed to take advantage of ocean breezes and natural light, the home features elevated living spaces and materials selected for durability in the coastal environment.',
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
      fullDescription: 'This contemporary Nairobi home represents the future of urban Kenyan living. Featuring a striking rooftop terrace perfect for entertaining, the design maximizes the urban plot while providing private family spaces.',
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
      fullDescription: 'Located in the prestigious Karen area, this luxury villa exemplifies sophisticated Kenyan living. The design features extensive pergola elements that provide shade while creating beautiful light patterns throughout the day.',
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

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      if (parsedProjects.length > 0) {
        setProjects(parsedProjects);
        return;
      }
    }
    // Fall back to default projects if no saved projects
    setProjects(defaultProjects);
  };

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
      <section id="portfolio" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        {/* Floating glass elements */}
        <div className="absolute top-20 left-10 w-32 h-32 glass rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 glass rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Discover our collection of architectural masterpieces across Kenya. From Nairobi's urban landscapes 
              to Mombasa's coastal beauty, each project tells a story of Kenyan excellence.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 glass border border-white/20 ${
                  activeFilter === filter
                    ? 'bg-white/20 text-white shadow-xl backdrop-blur-xl'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer depth-card glass border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-white">
                          <Eye className="w-5 h-5" />
                          <span className="text-sm font-medium">View Details</span>
                        </div>
                        <ArrowRight className="w-6 h-6 text-white transform group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8 bg-black/50 backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {project.year}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    {project.location}
                  </div>
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
