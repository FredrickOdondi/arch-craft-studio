
import React from 'react';
import { X, MapPin, Calendar, Home, Users } from 'lucide-react';

interface ProjectDetailProps {
  project: {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    location: string;
    year: string;
    size: string;
    client: string;
    fullDescription: string;
    features: string[];
    additionalImages: string[];
  };
  onClose: () => void;
}

const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-2xl">
          {/* Header */}
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg">
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
                <p className="text-xl opacity-90">{project.category}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-black mb-4">Project Overview</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">{project.fullDescription}</p>
                
                <h3 className="text-xl font-bold text-black mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Additional Images */}
                <h3 className="text-xl font-bold text-black mb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.additionalImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${project.title} - View ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg border-2 border-gray-200"
                    />
                  ))}
                </div>
              </div>

              {/* Project Details Sidebar */}
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-black">
                <h3 className="text-xl font-bold text-black mb-6">Project Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-black mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-black">{project.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-black mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Completed</p>
                      <p className="font-semibold text-black">{project.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Home className="w-5 h-5 text-black mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Size</p>
                      <p className="font-semibold text-black">{project.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-black mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Client</p>
                      <p className="font-semibold text-black">{project.client}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-black rounded-lg">
                  <h4 className="text-white font-bold mb-2">Interested in Similar Design?</h4>
                  <p className="text-gray-300 text-sm mb-4">Let's discuss your project requirements</p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="block text-center bg-white text-black py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
