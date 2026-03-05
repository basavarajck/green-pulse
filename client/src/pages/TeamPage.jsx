// src/pages/TeamPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import TeamMemberCard from '../components/team/TeamMemberCard';
import TeamMemberForm from '../components/team/TeamMemberForm';
import { getTeamMembers, addTeamMember, updateTeamMember, deleteTeamMember } from '../api/teamApi';
import { isAdmin } from '../utils/auth';

const TeamPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await getTeamMembers();
      setMembers(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (formData) => {
    try {
      setFormLoading(true);
      const result = await addTeamMember(formData);
      setMembers([...members, result.member]);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (formData, id) => {
    try {
      setFormLoading(true);
      const result = await updateTeamMember(id, formData);
      setMembers(members.map((m) => (m._id === id ? result.member : m)));
      setEditingMember(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      await deleteTeamMember(id);
      setMembers(members.filter((m) => m._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingMember(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Loading team...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 md:px-8 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-green-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-900/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-3">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-12 h-12 text-green-400 opacity-80" />
            </div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Our Team
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Meet the passionate people behind Green Pulse, working to make our campus a greener, better place.
            </p>
          </div>

          {/* Admin: Add member button */}
          {isAdmin() && !showForm && !editingMember && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all duration-200"
            >
              + Add Member
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-900/30 border border-red-800/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Admin Form: Add new */}
        {isAdmin() && showForm && (
          <TeamMemberForm
            onSubmit={handleCreate}
            onCancel={handleCancelForm}
            loading={formLoading}
          />
        )}

        {/* Admin Form: Edit existing */}
        {isAdmin() && editingMember && (
          <TeamMemberForm
            onSubmit={handleUpdate}
            onCancel={handleCancelForm}
            initialData={editingMember}
            loading={formLoading}
          />
        )}

        {/* Members Grid */}
        {members.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-20 h-20 text-gray-600 mx-auto mb-6 opacity-40" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Team Members Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              The team will be introduced here soon. Stay tuned!
            </p>
            {isAdmin() && (
              <p className="text-green-400 text-sm">Add the first member above 👆</p>
            )}
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {members.map((member) => (
              <TeamMemberCard
                key={member._id}
                member={member}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;