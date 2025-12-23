// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Code2, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import { getProjects, addProject, deleteProject, updateProject } from '../api/projectsApi';
import { isAdmin, isLoggedIn } from '../utils/auth';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (projectData) => {
    try {
      setFormLoading(true);
      const result = await addProject(projectData);
      setProjects([result.project, ...projects]);
      setEditingProject(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (projectData) => {
    try {
      setFormLoading(true);
      const result = await updateProject(projectData);
      setProjects(projects.map(p => p._id === projectData._id ? result.project : p));
      setEditingProject(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="mt-4 text-gray-400">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-400 hover:text-cyan-400 transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Code2 className="w-12 h-12 text-cyan-400 animate-pulse" />
                <Cpu className="w-12 h-12 text-blue-400 animate-pulse delay-300" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Our Projects
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Explore innovative hardware and software solutions built by Green Pulse. 
                From IoT systems to web platforms—engineering sustainability through technology.
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-8 p-4 rounded-xl bg-red-900/30 border border-red-800/50 text-red-200 text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Admin Form */}
          {(isAdmin() || editingProject) && (
            <ProjectForm
              onSubmit={editingProject ? handleUpdate : handleCreate}
              onCancel={() => setEditingProject(null)}
              initialData={editingProject}
              loading={formLoading}
            />
          )}

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Code2 className="w-20 h-20 text-gray-600 opacity-50" />
                <Cpu className="w-20 h-20 text-gray-600 opacity-50" />
              </div>
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No Projects Yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Our innovative tech projects will be showcased here soon. Stay tuned for amazing builds!
              </p>
              {isLoggedIn() && isAdmin() && (
                <p className="text-cyan-400">
                  Add the first project above 👆
                </p>
              )}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
