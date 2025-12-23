// src/pages/AnnouncementsPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementForm from '../components/announcements/AnnouncementForm';
import { getAnnouncements, addAnnouncement, deleteAnnouncement, updateAnnouncement } from '../api/announcementsApi';
import { isAdmin, isLoggedIn } from '../utils/auth';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const data = await getAnnouncements();
      setAnnouncements(data); // Already sorted by backend (newest first)
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (announcementData) => {
    try {
      setFormLoading(true);
      const result = await addAnnouncement(announcementData);
      setAnnouncements([result.announcement, ...announcements]);
      setEditingAnnouncement(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (announcementData) => {
    try {
      setFormLoading(true);
      const result = await updateAnnouncement(announcementData);
      setAnnouncements(announcements.map(a => a._id === announcementData._id ? result.announcement : a));
      setEditingAnnouncement(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await deleteAnnouncement(id);
      setAnnouncements(announcements.filter(a => a._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (announcement) => {
    setEditingAnnouncement(announcement);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Loading announcements...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
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
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-400 via-green-300 to-emerald-400 bg-clip-text text-transparent">
              Announcements
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated with the latest news, alerts, and important information from Green Pulse.
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-900/30 border border-red-800/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Admin Form */}
        {(isAdmin() || editingAnnouncement) && (
          <AnnouncementForm
            onSubmit={editingAnnouncement ? handleUpdate : handleCreate}
            onCancel={() => setEditingAnnouncement(null)}
            initialData={editingAnnouncement}
            loading={formLoading}
          />
        )}

        {/* Announcements Grid */}
        {announcements.length === 0 ? (
          <div className="text-center py-20">
            <Bell className="w-20 h-20 text-gray-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Announcements Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Check back soon for important updates, alerts, and news from Green Pulse.
            </p>
            {isLoggedIn() && isAdmin() && (
              <p className="text-green-400">
                Post the first announcement above 👆
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement._id}
                announcement={announcement}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
