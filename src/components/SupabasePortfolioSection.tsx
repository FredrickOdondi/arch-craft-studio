import React, { useState } from 'react';
import { Eye, ArrowRight, MapPin, Calendar } from 'lucide-react';
import ProjectDetail from './ProjectDetail';
import { useProjects } from '../hooks/useProjects';

const SupabasePortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const { projects, isLoading, error } = useProjects();

  const filters = ['All', 'Residential', 'Commercial', 'Modern Villas'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleProjectClick = (project) => {
    // Convert Supabase project to legacy format for ProjectDetail component
    const legacyProject = {
      id: parseInt(project.id.replace(/-/g, '').substring(0, 8), 16),
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description,
      location: project.location,
      year: project.year,
      size: project.size,
      client: project.client,
      fullDescription: project.full_description,
      features: project.features,
      additionalImages: project.additional_images
    };
    setSelectedProject(legacyProject);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  if (error) {
    return (
      <section id="portfolio" className="py-20 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="gradient-text">Portfolio</span>
            </h2>
            <div className="glass bg-red-500/20 border border-red-500/30 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-red-200">Error loading projects: {error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="glass bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading projects...</p>
              </div>
            </div>
          )}

          {/* Projects Grid */}
          {!isLoading && (
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
          )}

          {/* Empty State */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="glass bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                <p className="text-gray-400">No projects match the selected filter.</p>
              </div>
            </div>
          )}
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

export default SupabasePortfolioSection;