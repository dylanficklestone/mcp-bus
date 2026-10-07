import React, { useState, useEffect } from 'react';
import { ActiveTab } from '../types/transit';
import { Clock, ShieldCheck, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  textScale: 'sm' | 'base' | 'lg';
  onTextScaleChange: (scale: 'sm' | 'base' | 'lg') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  textScale,
  onTextScaleChange
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-SG', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }) + ' SGT'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-white border-b border-[#dbe0e6] sticky top-0 z-40">
      {/* Top Banner Bar: 3-Zone Contract */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded bg-[#500062] flex items-center justify-center text-white font-bold text-lg shadow-sm">
            <span className="font-heading tracking-tight">SG</span>
          </div>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onTabChange('bus');
            }}
            className="font-heading font-extrabold text-lg sm:text-xl text-[#500062] tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Public Transit & Commuter Portal
          </a>
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#686a73]">
          <button
            onClick={() => onTabChange('bus')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeTab === 'bus'
                ? 'text-[#500062] border-[#500062] font-bold'
                : 'border-transparent hover:text-[#1f1f23]'
            }`}
          >
            Bus Arrivals
          </button>
          <button
            onClick={() => onTabChange('journey')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeTab === 'journey'
                ? 'text-[#500062] border-[#500062] font-bold'
                : 'border-transparent hover:text-[#1f1f23]'
            }`}
          >
            Journey Planner
          </button>
          <button
            onClick={() => onTabChange('rail')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeTab === 'rail'
                ? 'text-[#500062] border-[#500062] font-bold'
                : 'border-transparent hover:text-[#1f1f23]'
            }`}
          >
            Train & MRT Network
          </button>
          <button
            onClick={() => onTabChange('interchanges')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeTab === 'interchanges'
                ? 'text-[#500062] border-[#500062] font-bold'
                : 'border-transparent hover:text-[#1f1f23]'
            }`}
          >
            Interchange Facilities
          </button>
          <button
            onClick={() => onTabChange('fares')}
            className={`transition-colors pb-0.5 border-b-2 whitespace-nowrap ${
              activeTab === 'fares'
                ? 'text-[#500062] border-[#500062] font-bold'
                : 'border-transparent hover:text-[#1f1f23]'
            }`}
          >
            Fare Calculator
          </button>
        </nav>

        {/* Zone 3: 1-2 Primary Actions & Accessibility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Accessibility text scale controls */}
          <div className="flex items-center border border-[#dbe0e6] rounded-[4px] bg-[#f0f2f5] p-0.5">
            <span className="text-[11px] font-semibold text-[#686a73] px-1.5 hidden sm:inline">Text:</span>
            <button
              onClick={() => onTextScaleChange('sm')}
              title="Small text"
              aria-label="Small font size"
              className={`px-2 py-0.5 text-xs font-bold rounded-[3px] transition-colors ${
                textScale === 'sm'
                  ? 'bg-white text-[#500062] shadow-xs'
                  : 'text-[#686a73] hover:text-[#1f1f23]'
              }`}
            >
              A-
            </button>
            <button
              onClick={() => onTextScaleChange('base')}
              title="Default text"
              aria-label="Default font size"
              className={`px-2 py-0.5 text-xs font-bold rounded-[3px] transition-colors ${
                textScale === 'base'
                  ? 'bg-white text-[#500062] shadow-xs'
                  : 'text-[#686a73] hover:text-[#1f1f23]'
              }`}
            >
              A
            </button>
            <button
              onClick={() => onTextScaleChange('lg')}
              title="Large text"
              aria-label="Large font size"
              className={`px-2 py-0.5 text-xs font-bold rounded-[3px] transition-colors ${
                textScale === 'lg'
                  ? 'bg-white text-[#500062] shadow-xs'
                  : 'text-[#686a73] hover:text-[#1f1f23]'
              }`}
            >
              A+
            </button>
          </div>

          {/* Real-time status / Clock */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#f4eaf7] text-[#500062] text-xs font-semibold tabular-nums">
            <Clock className="w-3.5 h-3.5 text-[#5e1770]" />
            <span>{currentTime || '00:00:00 SGT'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-[4px] border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="whitespace-nowrap">Transit Normal</span>
          </div>
        </div>
      </div>
    </header>
  );
};
