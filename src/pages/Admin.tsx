
import React, { useState, useEffect } from 'react';
import { Plus, ArrowLeft, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminProjectForm from '../components/AdminProjectForm';
import AdminProjectCard from '../components/AdminProjectCard';

export interface Project {
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
}

const Admin = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
    }
  }, [isAuthenticated]);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('portfolioProjects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  };

  const saveProjects = (newProjects: Project[]) => {
    localStorage.setItem('portfolioProjects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handleAddProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now()
    };
    const updatedProjects = [...projects, newProject];
    saveProjects(updatedProjects);
    setShowForm(false);
  };

  const handleEditProject = (projectData: Omit<Project, 'id'>) => {
    if (editingProject) {
      const updatedProjects = projects.map(p => 
        p.id === editingProject.id ? { ...projectData, id: editingProject.id } : p
      );
      saveProjects(updatedProjects);
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id: number) => {
    const updatedProjects = projects.filter(p => p.id !== id);
    saveProjects(updatedProjects);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="glass bg-white/10 p-8 rounded-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="glass bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-4xl font-bold text-white">
              Portfolio <span className="gradient-text">Admin</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(true)}
              className="glass bg-white/10 border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Project</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="glass bg-red-500/20 border border-red-500/30 px-6 py-3 rounded-lg text-white hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <AdminProjectCard
              key={project.id}
              project={project}
              onEdit={() => setEditingProject(project)}
              onDelete={() => handleDeleteProject(project.id)}
            />
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="glass bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-white/60" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">Start building your portfolio by adding your first project.</p>
              <button
                onClick={() => setShowForm(true)}
                className="glass bg-white/10 border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
              >
                Add First Project
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Project Form Modal */}
      {showForm && (
        <AdminProjectForm
          onSubmit={handleAddProject}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Edit Project Form Modal */}
      {editingProject && (
        <AdminProjectForm
          project={editingProject}
          onSubmit={handleEditProject}
          onClose={() => setEditingProject(null)}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Admin;
