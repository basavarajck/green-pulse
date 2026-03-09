// src/components/events/EventForm.jsx - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { isAdmin } from '../../utils/auth';
import { isValidURL } from '../../utils/formValidation';

const EventForm = ({ onSubmit, onCancel, initialData = {}, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    image: '',
    link: '',
    isUpcoming: true
  });

  // FIXED: Safe initialData handling with proper dependency
  useEffect(() => {
    if (initialData && initialData._id) {
      // Edit mode
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        date: initialData.date || '',
        image: initialData.image || '',
        link: initialData.link || '',
        isUpcoming: initialData.isUpcoming !== undefined ? initialData.isUpcoming : true
      });
    } else {
      // Create mode - reset form
      setFormData({
        title: '',
        description: '',
        date: '',
        image: '',
        link: '',
        isUpcoming: true
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?._id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.title.trim()) {
      alert('❌ Event title is required');
      return;
    }
    
    if (formData.title.trim().length < 3) {
      alert('❌ Event title must be at least 3 characters long');
      return;
    }
    
    if (formData.title.trim().length > 200) {
      alert('❌ Event title must be less than 200 characters');
      return;
    }
    
    if (!formData.description || !formData.description.trim()) {
      alert('❌ Event description is required');
      return;
    }
    
    if (formData.description.trim().length < 10) {
      alert('❌ Event description must be at least 10 characters long');
      return;
    }
    
    if (formData.description.trim().length > 2000) {
      alert('❌ Event description must be less than 2000 characters');
      return;
    }
    
    if (!formData.date || !formData.date.trim()) {
      alert('❌ Event date is required');
      return;
    }
    
    // Validate optional URL fields if provided
    if (formData.image && formData.image.trim() && !isValidURL(formData.image.trim())) {
      alert('❌ Please enter a valid image URL (e.g., https://example.com/poster.jpg) or leave it empty');
      return;
    }
    
    if (formData.link && formData.link.trim() && !isValidURL(formData.link.trim())) {
      alert('❌ Please enter a valid registration link (e.g., https://forms.gle/xyz) or leave it empty');
      return;
    }
    
    // Filter out empty strings for optional fields
    const submitData = { ...formData };
    if (!submitData.image || !submitData.image.trim()) delete submitData.image;
    if (!submitData.link || !submitData.link.trim()) delete submitData.link;
    
    // Include _id when editing
    if (initialData && initialData._id) {
      submitData._id = initialData._id;
    }
    
    onSubmit(submitData);
  };
  
  // FIXED: Early return if not admin
  if (!isAdmin()) return null;

  // FIXED: Safe title rendering
  const isEditing = initialData && initialData._id;
  
  return (
    <div className="mb-10 p-8 rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/90 to-black/50 shadow-2xl shadow-green-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
          {isEditing ? 'Edit Event' : 'Create New Event'}
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

      {/* Rest of form stays exactly the same */}
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        {/* Title */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-green-300">Event Title *</label>
            <span className={`text-xs ${formData.title.length < 3 ? 'text-red-400' : formData.title.length > 200 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.title.length}/200 {formData.title.length < 3 && '(min 3)'}
            </span>
          </div>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="e.g. Campus Cleanup Drive 2025"
            maxLength={200}
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

        {/* Image URL */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Poster Image (Optional)</label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="https://example.com/event-poster.jpg"
          />
          <p className="mt-1 text-xs text-gray-500">Leave empty if no poster</p>
        </div>

        {/* Registration Link */}
        <div className="md:col-span-2">
          <label className="block mb-2 text-sm font-semibold text-green-300">Registration Link (Optional)</label>
          <input
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="https://forms.gle/xyz or https://example.com/register"
          />
          <p className="mt-1 text-xs text-gray-500">Google Forms, Eventbrite, or any registration page</p>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-green-300">Description *</label>
            <span className={`text-xs ${formData.description.length < 10 ? 'text-red-400' : formData.description.length > 2000 ? 'text-red-400' : 'text-gray-400'}`}>
              {formData.description.length}/2000 {formData.description.length < 10 && '(min 10)'}
            </span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all resize-vertical"
            placeholder="Brief description of the event..."
            maxLength={2000}
          />
        </div>

        {/* Upcoming Toggle */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              name="isUpcoming"
              checked={formData.isUpcoming}
              onChange={handleChange}
              className="w-5 h-5 text-green-600 bg-gray-900/50 border-green-700/50 focus:ring-green-500 rounded"
            />
            <span className="text-sm font-semibold text-green-300">Mark as Upcoming Event</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-green-900/30 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
