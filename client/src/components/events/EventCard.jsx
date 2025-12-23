// src/components/events/EventCard.jsx
import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const EventCard = ({ event, onDelete, onEdit }) => {
  const { _id, title, description, date, image, link, isUpcoming } = event;

  return (
    <div className="group rounded-2xl border border-green-900/50 bg-gradient-to-br from-gray-950/80 to-black/50 p-6 shadow-2xl shadow-green-900/20 backdrop-blur-sm hover:border-green-500/70 hover:shadow-green-500/30 transition-all duration-300">
      {/* Image */}
      {image && (
        <div className="mb-6">
          <img
            src={image}
            alt={title}
            className="h-48 w-full rounded-xl object-cover shadow-2xl group-hover:scale-[1.02] transition-transform duration-300"
          />
        </div>
      )}

      {/* Status Badge */}
      <div className="mb-4 flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          isUpcoming 
            ? 'bg-green-900/60 text-green-100 border border-green-700/50' 
            : 'bg-gray-800/60 text-gray-400 border border-gray-700/50'
        }`}>
          {isUpcoming ? 'Upcoming' : 'Past'}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-white line-clamp-2 group-hover:text-green-400 transition-colors">
        {title}
      </h3>

      {/* Date */}
      <p className="mb-2 text-sm font-medium text-green-300">
        📅 {date}
      </p>

      {/* Description */}
      <p className="mb-6 text-sm text-gray-300 leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Link Button */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-lg bg-green-900/50 border border-green-700/50 text-green-200 text-sm font-medium hover:bg-green-800/70 hover:border-green-500/70 transition-all duration-200"
        >
          Register Now
          <ExternalLink className="w-4 h-4" />
        </a>
      )}

      {/* Admin Controls */}
      {isAdmin() && (
        <div className="flex gap-2 pt-4 border-t border-green-900/30">
          {onEdit && (
            <button
              onClick={() => onEdit(event)}
              className="flex-1 px-3 py-2 rounded-lg bg-blue-900/50 border border-blue-700/50 text-blue-200 text-xs font-medium hover:bg-blue-800/70 transition-all"
            >
              Edit
            </button>
          )}
          <button
            onClick={() => onDelete(_id)}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-900/50 border border-red-700/50 text-red-200 text-xs font-medium hover:bg-red-800/70 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
