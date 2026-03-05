// src/components/team/TeamMemberCard.jsx
import React from 'react';
import { Mail, Pencil, Trash2, Shield } from 'lucide-react';
import { isAdmin } from '../../utils/auth';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const TeamMemberCard = ({ member, onEdit, onDelete }) => {
  const imageUrl = member.image
    ? member.image.startsWith('http')
      ? member.image
      : `${BASE_URL}/${member.image}`
    : null;

  return (
    <div className="group relative flex flex-col items-center rounded-2xl bg-gradient-to-b from-green-950/60 to-gray-950/80 border border-green-900/40 hover:border-green-500/60 p-6 text-center shadow-lg shadow-black/40 hover:shadow-green-900/30 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm overflow-hidden">
      
      {/* Ambient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

      {/* Admin action buttons */}
      {isAdmin() && (
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => onEdit(member)}
            className="p-1.5 rounded-lg bg-green-900/70 hover:bg-green-700 text-green-300 hover:text-white transition-all border border-green-800/50"
            title="Edit member"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(member._id)}
            className="p-1.5 rounded-lg bg-red-900/70 hover:bg-red-700 text-red-300 hover:text-white transition-all border border-red-800/50"
            title="Delete member"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Photo */}
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-green-800/60 group-hover:ring-green-500/70 transition-all duration-300 shadow-lg shadow-black/50">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          {/* Fallback avatar */}
          <div
            className="w-full h-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center"
            style={{ display: imageUrl ? 'none' : 'flex' }}
          >
            <span className="text-2xl font-black text-green-200 select-none">
              {member.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        </div>

        {/* Designation badge */}
        {member.designation && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-green-800/80 border border-green-700/60 text-[10px] font-semibold text-green-300 backdrop-blur-sm">
            {member.designation}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="mt-3 text-base font-bold text-green-50 leading-tight group-hover:text-green-200 transition-colors">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-1 text-xs font-medium text-green-400/80 uppercase tracking-widest">
        {member.role}
      </p>

      {/* Email */}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors group/mail"
          onClick={(e) => e.stopPropagation()}
        >
          <Mail className="w-3 h-3 group-hover/mail:scale-110 transition-transform" />
          <span className="truncate max-w-[140px]">{member.email}</span>
        </a>
      )}
    </div>
  );
};

export default TeamMemberCard;