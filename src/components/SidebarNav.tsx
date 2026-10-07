import React from 'react';
import { ActiveTab } from '../types/transit';
import { 
  Bus, 
  MapPin, 
  Train, 
  Building2, 
  Calculator, 
  Bookmark, 
  AlertTriangle,
  HelpCircle,
  PhoneCall
} from 'lucide-react';

interface SidebarNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenDisruptions: () => void;
  disruptionsCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  onOpenFavorites,
  onOpenDisruptions,
  disruptionsCount
}) => {
  return (
    <aside className="w-full lg:w-[260px] shrink-0">
      {/* Side Navigation Card */}
      <div className="bg-white rounded-[8px] border border-[#dbe0e6] overflow-hidden card-shadow">
        {/* Deep Purple Section Header Banner */}
        <div className="bg-[#5e1770] px-4 py-3 text-white flex items-center justify-between">
          <span className="font-heading font-bold text-sm tracking-wide uppercase">
            COMMUTER SERVICES
          </span>
          <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-[4px] font-semibold">
            SG TRANSIT
          </span>
        </div>

        {/* Vertical Stacked Links with #e9ecef Dividers */}
        <nav className="flex flex-col">
          <button
            onClick={() => onTabChange('bus')}
            className={`flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors border-b border-[#e9ecef] relative ${
              activeTab === 'bus'
                ? 'text-[#e05615] bg-[#fff3eb]'
                : 'text-[#1f1f23] hover:bg-[#f5f2fa]'
            }`}
          >
            {activeTab === 'bus' && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e05615]" />
            )}
            <div className="flex items-center gap-3">
              <Bus className={`w-4 h-4 ${activeTab === 'bus' ? 'text-[#e05615]' : 'text-[#6c1d7e]'}`} />
              <span>Bus Arrival Times</span>
            </div>
            <span className="text-xs font-mono text-[#686a73] font-normal">Live</span>
          </button>

          <button
            onClick={() => onTabChange('journey')}
            className={`flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors border-b border-[#e9ecef] relative ${
              activeTab === 'journey'
                ? 'text-[#e05615] bg-[#fff3eb]'
                : 'text-[#1f1f23] hover:bg-[#f5f2fa]'
            }`}
          >
            {activeTab === 'journey' && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e05615]" />
            )}
            <div className="flex items-center gap-3">
              <MapPin className={`w-4 h-4 ${activeTab === 'journey' ? 'text-[#e05615]' : 'text-[#6c1d7e]'}`} />
              <span>Journey Planner</span>
            </div>
            <span className="text-xs font-mono text-[#686a73] font-normal">Point-to-Point</span>
          </button>

          <button
            onClick={() => onTabChange('rail')}
            className={`flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors border-b border-[#e9ecef] relative ${
              activeTab === 'rail'
                ? 'text-[#e05615] bg-[#fff3eb]'
                : 'text-[#1f1f23] hover:bg-[#f5f2fa]'
            }`}
          >
            {activeTab === 'rail' && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e05615]" />
            )}
            <div className="flex items-center gap-3">
              <Train className={`w-4 h-4 ${activeTab === 'rail' ? 'text-[#e05615]' : 'text-[#6c1d7e]'}`} />
              <span>Train & MRT Status</span>
            </div>
            <span className="text-xs text-emerald-700 font-bold">6 Lines</span>
          </button>

          <button
            onClick={() => onTabChange('interchanges')}
            className={`flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors border-b border-[#e9ecef] relative ${
              activeTab === 'interchanges'
                ? 'text-[#e05615] bg-[#fff3eb]'
                : 'text-[#1f1f23] hover:bg-[#f5f2fa]'
            }`}
          >
            {activeTab === 'interchanges' && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e05615]" />
            )}
            <div className="flex items-center gap-3">
              <Building2 className={`w-4 h-4 ${activeTab === 'interchanges' ? 'text-[#e05615]' : 'text-[#6c1d7e]'}`} />
              <span>Interchange Directory</span>
            </div>
            <span className="text-xs font-mono text-[#686a73] font-normal">Berths</span>
          </button>

          <button
            onClick={() => onTabChange('fares')}
            className={`flex items-center justify-between px-4 py-3.5 text-left text-sm font-semibold transition-colors border-b border-[#e9ecef] relative ${
              activeTab === 'fares'
                ? 'text-[#e05615] bg-[#fff3eb]'
                : 'text-[#1f1f23] hover:bg-[#f5f2fa]'
            }`}
          >
            {activeTab === 'fares' && (
              <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#e05615]" />
            )}
            <div className="flex items-center gap-3">
              <Calculator className={`w-4 h-4 ${activeTab === 'fares' ? 'text-[#e05615]' : 'text-[#6c1d7e]'}`} />
              <span>Fare Calculator</span>
            </div>
            <span className="text-xs font-mono text-[#686a73] font-normal">Rates</span>
          </button>
        </nav>

        {/* Secondary Commuter Actions */}
        <div className="p-3 bg-[#fbf8ff] border-t border-[#e9ecef] space-y-2">
          <button
            onClick={onOpenFavorites}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-[4px] border border-[#dbe0e6] bg-white text-[#1f1f23] hover:border-[#6c1d7e] hover:text-[#500062] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-3.5 h-3.5 text-[#e05615]" />
              <span>Bookmarked Stops</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-[#f4eaf7] text-[#500062] text-[11px] font-bold">
              {favoritesCount}
            </span>
          </button>

          <button
            onClick={onOpenDisruptions}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-[4px] border border-[#dbe0e6] bg-white text-[#1f1f23] hover:border-[#e05615] hover:text-[#e05615] transition-colors"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-[#e05615]" />
              <span>Service Advisories</span>
            </div>
            {disruptionsCount > 0 ? (
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                {disruptionsCount} Active
              </span>
            ) : (
              <span className="text-[11px] text-[#686a73]">0 Active</span>
            )}
          </button>
        </div>

        {/* Commuter Hotlines Box */}
        <div className="p-3 bg-[#f0f2f5] border-t border-[#dbe0e6] text-[11px] text-[#686a73]">
          <div className="flex items-center gap-1.5 font-bold text-[#1f1f23] mb-1">
            <PhoneCall className="w-3 h-3 text-[#500062]" />
            <span>Transit Helpline</span>
          </div>
          <p className="leading-tight">TransitLink Hotlines: 1800-2255-663</p>
          <p className="leading-tight mt-0.5">Operating: 08:00 – 18:00 Daily</p>
        </div>
      </div>
    </aside>
  );
};
