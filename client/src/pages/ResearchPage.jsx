// src/pages/ResearchPage.jsx - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Microscope, FileText, Users, Award } from 'lucide-react';
import ResearchForm from '../components/research/ResearchForm';
import { getResearchByDomain, deleteProject } from '../api/researchApi';
import { isAdmin } from '../utils/auth';

const researchDomains = [
  { id: 'carbon-footprint', name: 'Carbon Footprint' },
  { id: 'renewable-energy', name: 'Renewable Energy' },
  { id: 'soil-conservation', name: 'Soil Conservation' },
  { id: 'biodiversity', name: 'Biodiversity & Ecosystem' },
  { id: 'waste-management', name: 'Waste Management' },
  { id: 'water-pollution', name: 'Water Pollution' },
  { id: 'air-pollution', name: 'Air Pollution' },
  { id: 'urban-heat', name: 'Urban Heat Island Effect' }
];

const ResearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const domain = searchParams.get('domain');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (domain) {
      fetchDomainContent();
    } else {
      setContent(null);
      setError('');
    }
  }, [domain]);

  const fetchDomainContent = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getResearchByDomain(domain);
      setContent(data);
    } catch (err) {
      console.log('Error fetching research:', err.message);
      setError(err.message);
      setContent(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm('Delete this project?')) return;
    
    try {
      await deleteProject(domain, projectId);
      await fetchDomainContent();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
          <p className="text-gray-400">Loading research data...</p>
        </div>
      </div>
    );
  }

  // Show all domains (no domain selected)
  if (!domain) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Research Domains
            </h1>
            <p className="text-xl text-gray-300">
              Select a domain to explore our research work
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {researchDomains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSearchParams({ domain: domain.id })}
                className="group p-6 rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/80 to-black/50 hover:border-green-500/70 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
              >
                <Microscope className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {domain.name}
                </h3>
                <p className="text-sm text-gray-400">Click to explore research</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Domain selected but no content (Coming Soon or Add Content)
  if (!content) {
    const domainInfo = researchDomains.find(d => d.id === domain);
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setSearchParams({})}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to All Domains
          </button>

          {!showForm && (
            <div className="text-center py-20">
              <Microscope className="w-20 h-20 text-green-500 mx-auto mb-6 opacity-50" />
              <h2 className="text-4xl font-bold text-white mb-4">
                {domainInfo ? domainInfo.name : 'Domain Not Found'}
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                {isAdmin() 
                  ? 'No research content yet. Click below to add content!' 
                  : 'Research content coming soon! Stay tuned for updates.'}
              </p>

              {isAdmin() ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  Add Research Content
                </button>
              ) : (
                <button
                  onClick={() => setSearchParams({})}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transition-all"
                >
                  Explore Other Domains
                </button>
              )}
            </div>
          )}

          {/* Admin Form */}
          {isAdmin() && showForm && (
            <ResearchForm
              domain={domain}
              onSuccess={() => {
                setShowForm(false);
                fetchDomainContent();
              }}
              onCancel={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    );
  }

  // Show domain content (content exists)
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button
            onClick={() => setSearchParams({})}
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            All Domains
          </button>
          <span className="text-gray-600">/</span>
          <span className="text-green-400 font-semibold">{content.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
            {content.title}
          </h1>
          <p className="text-xl text-gray-300">{content.description}</p>
        </div>

        {/* Admin Edit Button */}
        {isAdmin() && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-blue-900/50 border border-blue-700/50 text-blue-200 rounded-xl font-semibold hover:bg-blue-800/70 transition-all"
            >
              {showForm ? 'Cancel Edit' : 'Edit Domain Content'}
            </button>
          </div>
        )}

        {/* Admin Form */}
        {isAdmin() && showForm && (
          <ResearchForm
            domain={domain}
            initialData={content}
            onSuccess={() => {
              setShowForm(false);
              fetchDomainContent();
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Projects Section */}
        {content.projects && content.projects.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Research Projects</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {content.projects.map((project) => (
                <div
                  key={project._id}
                  className="p-6 rounded-xl border border-green-900/50 bg-gradient-to-br from-gray-950/80 to-black/50"
                >
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                  <p className="text-sm text-gray-400 mb-3">Lead: {project.lead}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Ongoing' 
                        ? 'bg-green-900/60 text-green-100' 
                        : project.status === 'Completed'
                        ? 'bg-blue-900/60 text-blue-100'
                        : 'bg-gray-900/60 text-gray-100'
                    }`}>
                      {project.status}
                    </span>
                    {isAdmin() && (
                      <button
                        onClick={() => handleDeleteProject(project._id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {content.achievements && content.achievements.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Key Achievements</h2>
            </div>
            <ul className="space-y-3">
              {content.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>{achievement.text || achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Team */}
        {content.team && content.team.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-green-400" />
              <h2 className="text-3xl font-bold text-white">Research Team</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {content.team.map((member, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-lg bg-green-900/30 border border-green-700/50 text-green-200"
                >
                  {member.name || member}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResearchPage;
