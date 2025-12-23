// src/components/projects/ProjectCard.jsx
import React from 'react';
import { ExternalLink, Trash2, Edit, Calendar } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const { _id, title, description, image, link, stack, date } = project;

  return (
    <div className="group relative rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-slate-900/90 via-slate-950/80 to-black/90 overflow-hidden shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-500/60">
      {/* Animated gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/5 via-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      <div className="relative z-10">
        {/* Image */}
        {image && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          </div>
        )}

        <div className="p-6 space-y-4">
          {/* Title & Date */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {title}
            </h3>
            {date && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Tech Stack */}
          {stack && stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border border-cyan-700/50 text-cyan-200 shadow-lg shadow-cyan-900/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Link */}
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-600/50 text-cyan-300 text-sm font-medium hover:from-cyan-600/40 hover:to-blue-600/40 hover:border-cyan-400/70 transition-all duration-300 group/link"
            >
              View Project
              <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          )}

          {/* Admin Controls */}
          {isAdmin() && (
            <div className="flex gap-2 pt-4 border-t border-cyan-900/30">
              {onEdit && (
                <button
                  onClick={() => onEdit(project)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-900/40 border border-blue-700/50 text-blue-200 text-xs font-medium hover:bg-blue-800/60 transition-all"
                >
                  <Edit className="w-3.5 h-3.5" />
                  Edit
                </button>
              )}
              <button
                onClick={() => onDelete(_id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-red-900/40 border border-red-700/50 text-red-200 text-xs font-medium hover:bg-red-800/60 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
