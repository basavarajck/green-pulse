// src/components/projects/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const ProjectForm = ({ onSubmit, onCancel, initialData = {}, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    stack: [],
    date: ''
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        _id: initialData._id,
        title: initialData.title || '',
        description: initialData.description || '',
        image: initialData.image || '',
        link: initialData.link || '',
        stack: initialData.stack || [],
        date: initialData.date || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        image: '',
        link: '',
        stack: [],
        date: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTech = () => {
    if (techInput.trim() && !formData.stack.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        stack: [...prev.stack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (tech) => {
    setFormData(prev => ({
      ...prev,
      stack: prev.stack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required');
      return;
    }
    onSubmit(formData);
  };

  if (!isAdmin()) return null;

  const isEditing = initialData && initialData._id;

  return (
    <div className="mb-10 p-8 rounded-2xl border border-cyan-900/50 bg-gradient-to-br from-slate-950/95 to-black/90 shadow-2xl shadow-cyan-900/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-blue-600/5 to-purple-600/5 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Project Title *</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              placeholder="e.g. Smart Irrigation System"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Link */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Project Link</label>
            <input
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              placeholder="https://github.com/username/project"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Project Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
              placeholder="https://example.com/project-image.jpg"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all resize-vertical"
              placeholder="Brief description of the project..."
            />
          </div>

          {/* Tech Stack */}
          <div className="md:col-span-2">
            <label className="block mb-2 text-sm font-semibold text-cyan-300">Tech Stack</label>
            <div className="flex gap-2 mb-3">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 rounded-xl border border-cyan-800/50 bg-slate-900/50 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
                placeholder="e.g. React, Arduino, Python"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 rounded-xl bg-cyan-600/30 border border-cyan-600/50 text-cyan-300 hover:bg-cyan-600/50 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-700/50 text-cyan-200"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTech(tech)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-cyan-900/40 hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
