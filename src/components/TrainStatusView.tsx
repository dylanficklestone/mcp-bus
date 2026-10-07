import React, { useState } from 'react';
import { MRT_LINES } from '../data/transitData';
import { MrtLine } from '../types/transit';
import { 
  Train, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Search, 
  Radio, 
  ShieldCheck,
  Info
} from 'lucide-react';

export const TrainStatusView: React.FC = () => {
  const [selectedLineCode, setSelectedLineCode] = useState<string>('NSL');
  const [stationSearch, setStationSearch] = useState<string>('');

  const activeLine = MRT_LINES.find((l) => l.code === selectedLineCode) || MRT_LINES[0];

  const filteredStations = activeLine.stations.filter((s) => {
    if (!stationSearch.trim()) return true;
    return (
      s.name.toLowerCase().includes(stationSearch.toLowerCase().trim()) ||
      s.code.toLowerCase().includes(stationSearch.toLowerCase().trim())
    );
  });

  return (
    <div className="space-y-6">
      {/* Network Overview Card */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e9ecef]">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#500062] tracking-tight">
              Rapid Transit (MRT) Operational Status
            </h2>
            <p className="text-xs text-[#686a73] mt-0.5">
              Real-time rail telemetry, train frequencies, and operating intervals across Singapore's 6 MRT lines.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-[4px] border border-emerald-200">
              Network Operating Normally
            </span>
          </div>
        </div>

        {/* 6 MRT Lines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {MRT_LINES.map((line) => {
            const isSelected = line.code === selectedLineCode;
            return (
              <button
                key={line.code}
                onClick={() => setSelectedLineCode(line.code)}
                className={`p-3 rounded-[6px] text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#6c1d7e] ring-2 ring-[#6c1d7e]/20 bg-[#fbf8ff]'
                    : 'border-[#dbe0e6] bg-white hover:border-[#6c1d7e]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="px-2 py-0.5 rounded-[3px] text-white font-mono font-bold text-xs"
                      style={{ backgroundColor: line.color }}
                    >
                      {line.code}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="font-heading font-bold text-xs text-[#1f1f23] line-clamp-1">
                    {line.name}
                  </h4>
                </div>
                <div className="mt-3 pt-2 border-t border-[#e9ecef] text-[11px] text-[#686a73]">
                  <span>Freq: {line.peakFrequency}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Line In-Depth Panel */}
      <div className="bg-white rounded-[8px] border border-[#dbe0e6] overflow-hidden card-shadow">
        {/* Banner with Line Color Strip */}
        <div
          className="p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ backgroundColor: activeLine.color }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-[4px] bg-black/20 flex items-center justify-center font-mono font-extrabold text-xl text-white border border-white/20">
              {activeLine.code}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="bg-white/20 px-2 py-0.5 rounded-[4px] text-xs font-bold uppercase tracking-wider">
                  HEAVY RAIL RAPID TRANSIT
                </span>
                <span className="bg-emerald-500/90 text-white px-2 py-0.5 rounded-[4px] text-xs font-bold">
                  {activeLine.status}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                {activeLine.name}
              </h3>
              <p className="text-xs text-white/90 mt-0.5">
                Terminus: {activeLine.terminalA} ⇄ {activeLine.terminalB}
              </p>
            </div>
          </div>

          {/* Quick Frequency Badges */}
          <div className="flex flex-wrap gap-2 text-xs bg-black/20 p-2.5 rounded-[4px] border border-white/10">
            <div>
              <span className="block text-white/70 text-[10px] uppercase font-bold">Peak Headway</span>
              <strong className="text-white font-mono">{activeLine.peakFrequency}</strong>
            </div>
            <div className="border-l border-white/20 pl-2.5">
              <span className="block text-white/70 text-[10px] uppercase font-bold">Off-Peak</span>
              <strong className="text-white font-mono">{activeLine.offPeakFrequency}</strong>
            </div>
          </div>
        </div>

        {/* First & Last Train Timings Bar */}
        <div className="bg-[#f5f2fa] px-5 py-3 border-b border-[#dbe0e6] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#500062]" />
            <div>
              <span className="font-bold text-[#1f1f23] mr-1.5">First Trains:</span>
              <span className="text-[#686a73] font-mono">{activeLine.firstTrain}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#e05615]" />
            <div>
              <span className="font-bold text-[#1f1f23] mr-1.5">Last Trains:</span>
              <span className="text-[#686a73] font-mono">{activeLine.lastTrain}</span>
            </div>
          </div>
        </div>

        {/* Station Sequence Search */}
        <div className="p-5 border-b border-[#e9ecef]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="font-heading font-bold text-sm text-[#1f1f23]">
              Station Sequence ({activeLine.stations.length} Stations)
            </h4>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#686a73] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={stationSearch}
                onChange={(e) => setStationSearch(e.target.value)}
                placeholder="Filter stations..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-white rounded-[4px] border border-[#dbe0e6] focus:border-[#6c1d7e] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Station List with Line Track Graphic */}
        <div className="p-5 max-h-[460px] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredStations.map((station, index) => (
              <div
                key={station.code}
                className="p-3 rounded-[4px] bg-[#f0f2f5] border border-[#dbe0e6] flex items-center justify-between hover:bg-[#fbf8ff] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-[4px] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0"
                    style={{ backgroundColor: activeLine.color }}
                  >
                    {station.code}
                  </span>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-[#1f1f23]">
                      {station.name}
                    </h5>
                    {station.interchanges && station.interchanges.length > 0 && (
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[#686a73]">Interchange:</span>
                        {station.interchanges.map((ic) => (
                          <span
                            key={ic}
                            className="text-[10px] font-bold font-mono px-1 py-0.2 rounded-[2px] bg-white border border-[#dbe0e6] text-[#500062]"
                          >
                            {ic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#686a73]">
                  Stn #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer advisory */}
        <div className="p-4 bg-[#fbf8ff] border-t border-[#dbe0e6] flex items-center justify-between text-xs text-[#686a73]">
          <span>Track circuit maintenance completed weekly. No track faults reported.</span>
          <span className="text-[#500062] font-semibold">Regulated by SMRT Trains & SBS Transit</span>
        </div>
      </div>
    </div>
  );
};
