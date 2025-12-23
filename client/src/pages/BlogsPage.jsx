// src/pages/BlogsPage.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/blogs/BlogCard';
import BlogForm from '../components/blogs/BlogForm';
import { getBlogs, addBlog, deleteBlog, updateBlog } from '../api/blogsApi';
import { isAdmin, isLoggedIn } from '../utils/auth';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (blogData) => {
    try {
      setFormLoading(true);
      const result = await addBlog(blogData);
      setBlogs([result.blog, ...blogs]);
      setEditingBlog(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (blogData) => {
    try {
      setFormLoading(true);
      const result = await updateBlog(blogData);
      setBlogs(blogs.map(b => b._id === blogData._id ? result.blog : b));
      setEditingBlog(null);
      setError('');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter(b => b._id !== id));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Loading blogs...</p>
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
              Our Blogs
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Insights, stories, and updates from the Green Pulse community. Exploring sustainability, technology, and innovation.
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
        {(isAdmin() || editingBlog) && (
          <BlogForm
            onSubmit={editingBlog ? handleUpdate : handleCreate}
            onCancel={() => setEditingBlog(null)}
            initialData={editingBlog}
            loading={formLoading}
          />
        )}

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-gray-400 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Our writers are crafting amazing content. Check back soon for insightful articles!
            </p>
            {isLoggedIn() && isAdmin() && (
              <p className="text-green-400">
                Write the first blog post above 👆
              </p>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
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

export default BlogsPage;
