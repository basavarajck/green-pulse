// src/components/team/TeamMemberForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, X, User, Mail, Briefcase, Tag, Loader2 } from 'lucide-react';

const TeamMemberForm = ({ onSubmit, onCancel, initialData, loading }) => {
  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    designation: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        role: initialData.role || '',
        email: initialData.email || '',
        designation: initialData.designation || '',
      });
      if (initialData.image) {
        const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
        setImagePreview(
          initialData.image.startsWith('http')
            ? initialData.image
            : `${BASE_URL}/${initialData.image}`
        );
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }
    setError('');
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileInput = (e) => {
    processFile(e.target.files[0]);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.role.trim() || !form.email.trim()) {
      setError('Name, role, and email are required.');
      return;
    }
    if (!initialData && !imageFile) {
      setError('Please upload a photo for the team member.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name.trim());
    formData.append('role', form.role.trim());
    formData.append('email', form.email.trim());
    formData.append('designation', form.designation.trim());
    if (imageFile) formData.append('image', imageFile);
    if (initialData?._id) formData.append('_id', initialData._id);

    try {
      await onSubmit(formData, initialData?._id);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-10 rounded-2xl border border-green-800/50 bg-gradient-to-b from-green-950/50 to-gray-950/60 p-6 md:p-8 shadow-xl shadow-black/40 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-green-300 mb-6 flex items-center gap-2">
        <User className="w-5 h-5" />
        {initialData ? 'Edit Team Member' : 'Add Team Member'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Upload */}
        <div>
          <label className="block text-xs font-semibold text-green-400 uppercase tracking-widest mb-2">
            Photo
          </label>

          {imagePreview ? (
            <div className="relative inline-block">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-green-600/60 shadow-lg"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-red-700 hover:bg-red-600 flex items-center justify-center text-white shadow-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer px-6 py-8 transition-all duration-200 ${
                dragOver
                  ? 'border-green-400 bg-green-900/30 scale-[1.01]'
                  : 'border-green-800/60 bg-green-950/30 hover:border-green-600/60 hover:bg-green-900/20'
              }`}
            >
              <UploadCloud className={`w-8 h-8 transition-colors ${dragOver ? 'text-green-300' : 'text-green-600'}`} />
              <div className="text-center">
                <p className="text-sm text-green-200 font-medium">
                  {dragOver ? 'Drop it here!' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP — max 5MB</p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Fields Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-widest mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Priya Sharma"
                required
                className="w-full rounded-lg bg-green-950/50 border border-green-800/50 pl-9 pr-3 py-2.5 text-sm text-green-50 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-widest mb-1.5">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. priya@example.com"
                required
                className="w-full rounded-lg bg-green-950/50 border border-green-800/50 pl-9 pr-3 py-2.5 text-sm text-green-50 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition-all"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-widest mb-1.5">
              Role / Title *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700" />
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. Lead Developer"
                required
                className="w-full rounded-lg bg-green-950/50 border border-green-800/50 pl-9 pr-3 py-2.5 text-sm text-green-50 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition-all"
              />
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-xs font-semibold text-green-400 uppercase tracking-widest mb-1.5">
              Club Designation
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700" />
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="e.g. Core Member"
                className="w-full rounded-lg bg-green-950/50 border border-green-800/50 pl-9 pr-3 py-2.5 text-sm text-green-50 placeholder-gray-600 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/40 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400 bg-red-900/20 border border-red-800/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-900/30 transition-all duration-200"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Add Member'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-green-800/50 bg-transparent hover:bg-green-900/30 px-5 py-2.5 text-sm font-medium text-green-300 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeamMemberForm;