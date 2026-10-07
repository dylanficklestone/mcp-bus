import React from 'react';
import { BusStop } from '../types/transit';
import { X, Bookmark, Bus, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  busStops: BusStop[];
  onSelectStop: (stopCode: string) => void;
  onRemoveFavorite: (stopCode: string) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  favorites,
  busStops,
  onSelectStop,
  onRemoveFavorite
}) => {
  if (!isOpen) return null;

  const favoriteStops = busStops.filter((s) => favorites.includes(s.code));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-[8px] max-w-lg w-full border border-[#dbe0e6] overflow-hidden modal-shadow"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#5e1770] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[#fd6b2b]" />
            <h3 className="font-heading font-bold text-base text-white">
              Bookmarked Transit Stops ({favoriteStops.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close bookmarks dialog"
            className="w-8 h-8 rounded-[4px] bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {favoriteStops.length === 0 ? (
            <div className="text-center py-8 text-[#686a73]">
              <Bookmark className="w-10 h-10 mx-auto text-[#dbe0e6] mb-2" />
              <p className="text-sm font-semibold text-[#1f1f23]">No bookmarked stops yet</p>
              <p className="text-xs text-[#686a73] mt-1 max-w-xs mx-auto">
                Click the "Bookmark Stop" button while viewing any bus stop to access it instantly here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#e9ecef] border border-[#dbe0e6] rounded-[4px] overflow-hidden">
              {favoriteStops.map((stop) => (
                <div
                  key={stop.code}
                  className="p-3.5 hover:bg-[#fbf8ff] transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-12 text-center py-1 rounded-[4px] bg-[#6c1d7e] text-white font-mono font-bold text-xs shrink-0">
                      {stop.code}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-[#1f1f23]">
                        {stop.name}
                      </h4>
                      <p className="text-[11px] text-[#686a73]">
                        {stop.roadName} · {stop.services.length} services
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => {
                        onSelectStop(stop.code);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 bg-[#f0f2f5] hover:bg-[#6c1d7e] hover:text-white text-[#1f1f23] text-xs font-bold rounded-[3px] transition-colors inline-flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(stop.code)}
                      title="Remove bookmark"
                      className="p-1.5 text-[#686a73] hover:text-[#ba1a1a] transition-colors rounded-[3px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 bg-[#f0f2f5] border-t border-[#dbe0e6] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#dbe0e6] text-[#1f1f23] text-xs font-bold rounded-[4px] hover:bg-[#e9ecef] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
