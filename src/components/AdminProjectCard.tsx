
import React from 'react';
import { Edit, Trash2, MapPin, Calendar } from 'lucide-react';
import { Project } from '../pages/Admin';

interface AdminProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminProjectCard = ({ project, onEdit, onDelete }: AdminProjectCardProps) => {
  return (
    <div className="group depth-card glass border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-500">
      <div className="relative overflow-hidden">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={onEdit}
              className="glass bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <Edit className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onDelete}
              className="glass bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-medium text-gray-300">
            {project.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {project.year}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-3">
          {project.title}
        </h3>
        
        <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex items-center text-sm text-gray-400">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          {project.location}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectCard;
