// src/pages/BlogDetailPage.jsx - Process plain text content
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Tag } from 'lucide-react';
import { getBlogById } from '../api/blogsApi';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await getBlogById(id);
      setBlog(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert plain text to formatted content with images
  const formatContent = (content) => {
    if (!content) return '';
    
    const lines = content.split('\n');
    let formatted = '';
    
    lines.forEach((line) => {
      // Check if line is an image marker
      if (line.trim().startsWith('IMAGE:')) {
        const imageUrl = line.replace('IMAGE:', '').trim();
        formatted += `<div class="image-container"><img src="${imageUrl}" alt="Blog image" /></div>`;
      } else if (line.trim() === '') {
        // Empty line = paragraph break
        formatted += '<br />';
      } else {
        // Regular text line
        formatted += `<p>${line}</p>`;
      }
    });
    
    return formatted;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-400">Loading blog...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Blog Not Found</h2>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-12 px-4 md:px-8">
      <style>
        {`
          .blog-content p {
            color: #e5e7eb;
            font-size: 1.125rem;
            line-height: 1.75;
            margin-bottom: 0.75rem;
          }
          .blog-content br {
            display: block;
            content: "";
            margin: 0.5rem 0;
          }
          .blog-content .image-container {
            margin: 2rem 0;
            text-align: center;
          }
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(34, 197, 94, 0.2);
            display: inline-block;
          }
          .blog-content strong {
            color: #ffffff;
            font-weight: bold;
          }
          .blog-content em {
            color: #86efac;
            font-style: italic;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 text-sm font-medium text-gray-400 hover:text-green-400 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blogs
        </Link>

        {/* Blog Content */}
        <article className="rounded-2xl border border-green-900/40 bg-gradient-to-br from-gray-900/80 to-black/50 overflow-hidden shadow-2xl shadow-green-900/10">
          
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="relative h-96 w-full overflow-hidden">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
            </div>
          )}

          <div className="p-8 md:p-12 space-y-6">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-400" />
                <span className="font-medium text-green-300">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300 leading-tight">
              {blog.title}
            </h1>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-green-400" />
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/40 border border-green-700/50 text-green-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <hr className="border-green-900/50" />

            {/* Blog Content - Formatted plain text */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: formatContent(blog.content) }}
            />
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
