
import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Project } from '../pages/Admin';

interface AdminProjectFormProps {
  project?: Project;
  onSubmit: (projectData: Omit<Project, 'id'>) => void;
  onClose: () => void;
  isEdit?: boolean;
}

const AdminProjectForm = ({ project, onSubmit, onClose, isEdit = false }: AdminProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    category: project?.category || 'Residential',
    image: project?.image || '',
    description: project?.description || '',
    location: project?.location || '',
    year: project?.year || '',
    size: project?.size || '',
    client: project?.client || '',
    fullDescription: project?.fullDescription || '',
    features: project?.features || [''],
    additionalImages: project?.additionalImages || ['']
  });

  const categories = ['Residential', 'Commercial', 'Modern Villas'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      additionalImages: formData.additionalImages.filter(img => img.trim() !== '')
    };
    
    onSubmit(cleanedData);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData({ ...formData, additionalImages: newImages });
  };

  const addImage = () => {
    setFormData({ ...formData, additionalImages: [...formData.additionalImages, ''] });
  };

  const removeImage = (index: number) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalImages: newImages });
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto glass bg-black/50 rounded-2xl border border-white/20 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">
              {isEdit ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className="glass bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <label className="block text-white font-medium mb-2">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="Enter project title"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-white/40 focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-gray-900 text-white">{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="e.g., Nairobi, Kenya"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="e.g., 2023"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Size</label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="e.g., 3,500 sq ft"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Client</label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                  placeholder="e.g., The Smith Family"
                  required
                />
              </div>
            </div>

            {/* Main Image */}
            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Main Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Short Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none resize-none"
                rows={3}
                placeholder="Brief description of the project"
                required
              />
            </div>

            {/* Full Description */}
            <div className="mt-6">
              <label className="block text-white font-medium mb-2">Full Description</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                className="w-full glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none resize-none"
                rows={5}
                placeholder="Detailed description of the project"
                required
              />
            </div>

            {/* Features */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white font-medium">Key Features</label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="glass bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                    placeholder="Enter feature"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="glass bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Images */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-white font-medium">Additional Images</label>
                <button
                  type="button"
                  onClick={addImage}
                  className="glass bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
              {formData.additionalImages.map((image, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    className="flex-1 glass bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.additionalImages.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="glass bg-red-500/20 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="glass bg-white/10 border border-white/20 px-6 py-3 rounded-lg text-white hover:bg-white/20 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="glass bg-white/20 border border-white/30 px-6 py-3 rounded-lg text-white hover:bg-white/30 transition-all duration-300 font-medium"
              >
                {isEdit ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectForm;
