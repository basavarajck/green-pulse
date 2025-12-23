// src/components/blogs/BlogForm.jsx - Simple text editor
import React, { useState, useEffect } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const BlogForm = ({ onSubmit, onCancel, initialData = {}, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    coverImage: '',
    date: '',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        _id: initialData._id,
        title: initialData.title || '',
        author: initialData.author || '',
        content: initialData.content || '',
        coverImage: initialData.coverImage || '',
        date: initialData.date || '',
        tags: initialData.tags || []
      });
    } else {
      setFormData({
        title: '',
        author: '',
        content: '',
        coverImage: '',
        date: '',
        tags: []
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

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim() || !formData.content.trim() || !formData.date.trim()) {
      alert('Title, author, content, and date are required');
      return;
    }
    onSubmit(formData);
  };

  if (!isAdmin()) return null;

  const isEditing = initialData && initialData._id;

  return (
    <div className="mb-10 p-8 rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/90 to-black/50 shadow-2xl shadow-green-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
          {isEditing ? 'Edit Blog Post' : 'Write New Blog Post'}
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
          <label className="block mb-2 text-sm font-semibold text-green-300">Blog Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="e.g. My Journey with Sustainable Farming"
          />
        </div>

        {/* Author & Date */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-semibold text-green-300">Author Name *</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-green-300">Publication Date *</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">
            Cover Image URL
          </label>
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
            placeholder="https://example.com/cover-image.jpg"
          />
        </div>

        {/* Content - Simple Text Area */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">
            Blog Content * 
          </label>
          <div className="mb-2 p-3 rounded-lg bg-green-900/20 border border-green-700/30 text-xs text-green-200">
            <div className="flex items-start gap-2">
              <ImageIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">How to add images:</p>
                <p className="text-gray-300">
                  Type <span className="font-mono bg-green-900/40 px-1 py-0.5 rounded">IMAGE: https://your-image-url.com/photo.jpg</span> on a new line. 
                  The image will automatically appear in your blog.
                </p>
              </div>
            </div>
          </div>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={16}
            className="w-full px-4 py-3 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all resize-vertical text-base leading-relaxed"
            placeholder={`Write your blog here. Press Enter for new paragraphs.

Example:
This is my first paragraph about sustainable farming.

This is my second paragraph with more details.

IMAGE: https://example.com/farm-photo.jpg

And here's text after the image!`}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-green-300">Tags</label>
          <div className="flex gap-2 mb-3">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 rounded-xl border border-green-800/50 bg-gray-900/50 text-white placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/50 transition-all"
              placeholder="e.g. sustainability, farming, tips"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 rounded-xl bg-green-600/30 border border-green-600/50 text-green-300 hover:bg-green-600/50 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-900/50 border border-green-700/50 text-green-200"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      tags: prev.tags.filter((_, i) => i !== idx)
                    }));
                  }}
                  className="hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 px-8 py-3 rounded-xl text-white font-semibold shadow-lg shadow-green-900/30 hover:shadow-green-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Publishing...' : isEditing ? 'Update Blog' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
