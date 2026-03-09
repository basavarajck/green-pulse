// src/components/announcements/AnnouncementForm.jsx
import React, { useState, useEffect } from 'react';
import { isAdmin } from '../../utils/auth';

const AnnouncementForm = ({ onSubmit, onCancel, initialData = {}, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: ''
  });

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        _id: initialData._id,
        title: initialData.title || '',
        content: initialData.content || '',
        date: initialData.date || ''
      });
    } else {
      setFormData({
        title: '',
        content: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Title
    if (!formData.title || !formData.title.trim()) {
      alert('❌ Announcement title is required');
      return;
    }
    if (formData.title.trim().length < 3) {
      alert('❌ Announcement title must be at least 3 characters long');
      return;
    }
    if (formData.title.trim().length > 200) {
      alert('❌ Announcement title must be less than 200 characters');
      return;
    }
    
    // Validate Content
    if (!formData.content || !formData.content.trim()) {
      alert('❌ Announcement content is required');
      return;
    }
    if (formData.content.trim().length < 10) {
      alert('❌ Announcement content must be at least 10 characters long');
      return;
    }
    if (formData.content.trim().length > 5000) {
      alert('❌ Announcement content must be less than 5000 characters');
      return;
    }
    
    // Validate Date
    if (!formData.date || !formData.date.trim()) {
      alert('❌ Announcement date is required');
      return;
    }
    
    // Include _id when editing
    const submitData = initialData && initialData._id 
      ? { ...formData, _id: initialData._id }
      : formData;
    onSubmit(submitData);
  };

  if (!isAdmin()) return null;

  const isEditing = initialData && initialData._id;

  return (
    <div className="mb-10 p-8 rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/90 to-black/50 shadow-2xl shadow-green-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
          {isEditing ? 'Edit Announcement' : 'Create New Announcement'}
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

      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Title */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-green-300">Title *</label>
            <span className={`text-xs ${formData.title.length < 3 ? 'text-red-400' : formData.title.length > 200 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.title.length}/200 {formData.title.length < 3 && '(min 3)'}
            </span>
          </div>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="e.g. Important: Campus Closed Tomorrow"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Date *</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-green-300">Content *</label>
            <span className={`text-xs ${formData.content.length < 10 ? 'text-red-400' : formData.content.length > 5000 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.content.length}/5000 {formData.content.length < 10 && '(min 10)'}
            </span>
          </div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={5}
            maxLength={5000}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all resize-vertical"
            placeholder="Write your announcement details here..."
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-green-900/30 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Announcement' : 'Post Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnnouncementForm;
