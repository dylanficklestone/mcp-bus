import React from 'react';
import { CivicAnnouncement } from '../types/transit';
import { X, Calendar, AlertTriangle, ShieldCheck, Route, FileText } from 'lucide-react';

interface AnnouncementDetailModalProps {
  announcement: CivicAnnouncement | null;
  onClose: () => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  onClose
}) => {
  if (!announcement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-[8px] max-w-xl w-full border border-[#dbe0e6] overflow-hidden modal-shadow"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#5e1770] p-5 text-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f5adff] bg-white/10 px-2 py-0.5 rounded-[3px]">
                {announcement.category}
              </span>
              <span className="text-xs text-white/80 font-mono">
                {announcement.date}
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-snug">
              {announcement.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-[4px] bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto text-sm text-[#1f1f23]">
          {announcement.urgent && (
            <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a]/30 rounded-[4px] text-xs text-[#93000a] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#ba1a1a]" />
              <span className="font-bold">Active operational advisory. Alternative route travel recommended.</span>
            </div>
          )}

          <div>
            <h4 className="text-xs font-bold text-[#686a73] uppercase tracking-wide mb-1">
              SUMMARY
            </h4>
            <p className="font-medium text-[#1f1f23] leading-relaxed">
              {announcement.summary}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#686a73] uppercase tracking-wide mb-1">
              FULL ADVISORY STATEMENT
            </h4>
            <div className="text-xs text-[#4f434f] leading-relaxed whitespace-pre-line bg-[#fbf8ff] p-4 rounded-[4px] border border-[#dbe0e6]">
              {announcement.content}
            </div>
          </div>

          {announcement.affectedRoutes && announcement.affectedRoutes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#686a73] uppercase tracking-wide mb-2">
                AFFECTED CORRIDORS & TRANSIT SERVICES
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {announcement.affectedRoutes.map((route) => (
                  <span
                    key={route}
                    className="px-2.5 py-1 rounded-[4px] bg-[#f0f2f5] text-[#500062] font-bold text-xs border border-[#dbe0e6]"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0f2f5] border-t border-[#dbe0e6] flex items-center justify-between">
          <span className="text-xs text-[#686a73]">Issued by Public Transport Council</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#500062] hover:bg-[#6c1d7e] text-white text-xs font-bold font-heading rounded-[4px] transition-colors"
          >
            Close Advisory
          </button>
        </div>
      </div>
    </div>
  );
};
