// src/components/research/ResearchForm.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { upsertResearch, addProject } from '../../api/researchApi';

const ResearchForm = ({ domain, initialData, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    domain: domain,
    title: '',
    description: '',
    achievements: [],
    team: []
  });

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    lead: '',
    status: 'Planning'
  });

  const [newAchievement, setNewAchievement] = useState('');
  const [newTeamMember, setNewTeamMember] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        domain: initialData.domain || domain,
        title: initialData.title || '',
        description: initialData.description || '',
        achievements: initialData.achievements || [],
        team: initialData.team || []
      });
    }
  }, [initialData, domain]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await upsertResearch(formData);
      alert('Research domain updated successfully!');
      onSuccess();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.lead) {
      alert('Project title and lead are required');
      return;
    }

    try {
      setLoading(true);
      await addProject(domain, newProject);
      setNewProject({ title: '', description: '', lead: '', status: 'Planning' });
      alert('Project added successfully!');
      onSuccess();
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, { text: newAchievement }]
      }));
      setNewAchievement('');
    }
  };

  const removeAchievement = (index) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  const addTeamMember = () => {
    if (newTeamMember.trim()) {
      setFormData(prev => ({
        ...prev,
        team: [...prev.team, { name: newTeamMember }]
      }));
      setNewTeamMember('');
    }
  };

  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="mb-10 p-8 rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/90 to-black/50 shadow-2xl">
      <h2 className="text-2xl font-bold text-green-400 mb-6">
        {initialData ? 'Edit Research Domain' : 'Add Research Domain'}
      </h2>

      {/* Basic Info Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8 pb-8 border-b border-green-900/30">
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Domain Title *</label>
          <input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50"
            placeholder="e.g. Air Pollution Research"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50 resize-vertical"
            placeholder="Brief description of research work..."
          />
        </div>

        {/* Achievements */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Achievements</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm"
              placeholder="Add an achievement..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
            />
            <button
              type="button"
              onClick={addAchievement}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {formData.achievements.map((achievement, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded-lg">
                <span className="flex-1 text-sm text-gray-300">{achievement.text || achievement}</span>
                <button
                  type="button"
                  onClick={() => removeAchievement(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Team Members</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newTeamMember}
              onChange={(e) => setNewTeamMember(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm"
              placeholder="Add team member name..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTeamMember())}
            />
            <button
              type="button"
              onClick={addTeamMember}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.team.map((member, idx) => (
              <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-green-900/30 border border-green-700/50 rounded-lg">
                <span className="text-sm text-green-200">{member.name || member}</span>
                <button
                  type="button"
                  onClick={() => removeTeamMember(idx)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-8 py-3 rounded-xl text-white font-semibold shadow-lg transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Domain Info'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Add Project Form */}
      {initialData && (
        <form onSubmit={handleAddProject} className="space-y-4">
          <h3 className="text-xl font-bold text-green-400 mb-4">Add New Project</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold text-green-300">Project Title *</label>
              <input
                value={newProject.title}
                onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm"
                placeholder="Project name..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-green-300">Lead Researcher *</label>
              <input
                value={newProject.lead}
                onChange={(e) => setNewProject(prev => ({ ...prev, lead: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm"
                placeholder="Dr. Name..."
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-green-300">Description</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm resize-vertical"
              placeholder="Project details..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-green-300">Status</label>
            <select
              value={newProject.status}
              onChange={(e) => setNewProject(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-green-800/50 bg-gray-900/50 text-white text-sm"
            >
              <option value="Planning">Planning</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition-all disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Project'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ResearchForm;
