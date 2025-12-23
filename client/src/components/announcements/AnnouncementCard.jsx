// src/components/announcements/AnnouncementCard.jsx
import React from 'react';
import { Bell, Trash2, Edit } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const AnnouncementCard = ({ announcement, onDelete, onEdit }) => {
  const { _id, title, content, date } = announcement;

  return (
    <div className="group relative rounded-2xl border border-green-900/40 bg-gradient-to-br from-gray-900/80 to-black/50 p-6 shadow-xl shadow-green-900/10 backdrop-blur-sm hover:border-green-500/60 hover:shadow-green-500/20 transition-all duration-300">
      {/* Icon Badge */}
      <div className="absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-green-500 shadow-lg shadow-green-600/50">
        <Bell className="h-6 w-6 text-white" />
      </div>

      {/* Date Badge */}
      <div className="mb-4 flex justify-end">
        <span className="rounded-full bg-green-900/50 border border-green-700/50 px-3 py-1 text-xs font-medium text-green-200">
          {date}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Content */}
      <p className="mb-4 text-sm text-gray-300 leading-relaxed line-clamp-4">
        {content}
      </p>

      {/* Admin Controls */}
      {isAdmin() && (
        <div className="flex gap-2 pt-4 border-t border-green-900/30 mt-4">
          {onEdit && (
            <button
              onClick={() => onEdit(announcement)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-900/50 border border-blue-700/50 text-blue-200 text-xs font-medium hover:bg-blue-800/70 transition-all"
            >
              <Edit className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(_id)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-900/50 border border-red-700/50 text-red-200 text-xs font-medium hover:bg-red-800/70 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AnnouncementCard;
