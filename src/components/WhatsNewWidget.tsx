import React from 'react';
import { CivicAnnouncement } from '../types/transit';
import { Bell, ArrowRight, AlertCircle, Info } from 'lucide-react';

interface WhatsNewWidgetProps {
  announcements: CivicAnnouncement[];
  onSelectAnnouncement: (announcement: CivicAnnouncement) => void;
}

export const WhatsNewWidget: React.FC<WhatsNewWidgetProps> = ({
  announcements,
  onSelectAnnouncement
}) => {
  return (
    <div className="bg-[#5e1770] rounded-[8px] text-white overflow-hidden card-shadow">
      {/* Header with White Title */}
      <div className="px-5 py-3.5 bg-[#500062] border-b border-white/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#fd6b2b]" />
          <h3 className="font-heading font-bold text-base text-white tracking-tight">
            What's New & Advisories
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-[#fed6ff] bg-white/10 px-2 py-0.5 rounded-[4px]">
          Official Civic Bulletins
        </span>
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-white/10">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="p-4 hover:bg-white/5 transition-colors flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#f5adff]">
                {item.category}
              </span>
              <span className="text-xs text-white/70 font-mono tabular-nums">
                {item.date}
              </span>
            </div>

            <h4 className="font-heading font-bold text-sm text-white line-clamp-1 leading-snug">
              {item.title}
            </h4>

            <p className="text-xs text-white/85 line-clamp-2 leading-relaxed">
              {item.summary}
            </p>

            <div className="pt-1 flex items-center justify-between">
              {item.urgent ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ffdad6] bg-[#ba1a1a]/40 px-2 py-0.5 rounded-[4px]">
                  <AlertCircle className="w-3 h-3 text-[#ffdad6]" />
                  Service Adjustment
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] text-white/60">
                  <Info className="w-3 h-3" />
                  Public Transit Council
                </span>
              )}

              <button
                onClick={() => onSelectAnnouncement(item)}
                className="text-xs font-bold text-[#fd6b2b] hover:text-[#ffb59a] inline-flex items-center gap-1 underline underline-offset-2 transition-colors"
              >
                Read More
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
