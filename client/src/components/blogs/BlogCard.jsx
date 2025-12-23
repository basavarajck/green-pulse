// src/components/blogs/BlogCard.jsx
import React from 'react';
import { Calendar, User, Trash2, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/auth';

const BlogCard = ({ blog, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { _id, title, author, content, coverImage, date, tags } = blog;

  // Extract plain text preview from HTML content
  const getPreview = (htmlContent) => {
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="group relative rounded-2xl border border-green-800/40 bg-gradient-to-br from-gray-900/90 to-black/80 overflow-hidden shadow-xl hover:shadow-green-500/20 hover:border-green-500/60 transition-all duration-300">
      
      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-green-400" />
            <span className="font-medium text-green-300">{author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2 cursor-pointer"
            onClick={() => navigate(`/blogs/${_id}`)}>
          {title}
        </h3>

        {/* Preview */}
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
          {getPreview(content)}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/40 border border-green-700/50 text-green-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-4 border-t border-green-900/30">
          <button
            onClick={() => navigate(`/blogs/${_id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-900/40 border border-green-700/50 text-green-200 text-xs font-medium hover:bg-green-800/60 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            Read More
          </button>

          {isAdmin() && (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(blog)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-900/40 border border-blue-700/50 text-blue-200 text-xs font-medium hover:bg-blue-800/60 transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => onDelete(_id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-900/40 border border-red-700/50 text-red-200 text-xs font-medium hover:bg-red-800/60 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
