import React, { useState } from 'react';
import { SAMPLE_JOURNEY_PRESETS, SAMPLE_JOURNEY_ROUTES } from '../data/transitData';
import { JourneyRoute } from '../types/transit';
import { 
  ArrowUpDown, 
  MapPin, 
  Navigation, 
  Clock, 
  Footprints, 
  DollarSign, 
  Layers, 
  Sparkles, 
  ChevronRight,
  Train,
  Bus as BusIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const JourneyPlannerView: React.FC = () => {
  const [origin, setOrigin] = useState<string>('Woodlands Temp Int (46009)');
  const [destination, setDestination] = useState<string>('Raffles Place MRT (EW14/NS26)');
  const [preference, setPreference] = useState<'fastest' | 'transfers' | 'rail' | 'bus'>('fastest');
  const [departTimeType, setDepartTimeType] = useState<'now' | 'depart' | 'arrive'>('now');
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-fastest');
  const [routesList, setRoutesList] = useState<JourneyRoute[]>(SAMPLE_JOURNEY_ROUTES.default);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleCalculateJourney = () => {
    setIsCalculating(true);
    setTimeout(() => {
      // Simulate slight variation or recalculation
      setIsCalculating(false);
    }, 450);
  };

  const handleApplyPreset = (preset: { origin: string; destination: string }) => {
    setOrigin(preset.origin);
    setDestination(preset.destination);
  };

  const selectedRoute = routesList.find((r) => r.id === selectedRouteId) || routesList[0];

  return (
    <div className="space-y-6">
      {/* Journey Planning Query Form */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <div className="border-b border-[#e9ecef] pb-4 mb-5">
          <h2 className="font-heading font-extrabold text-xl text-[#500062] tracking-tight">
            Multimodal Commuter Journey Planner
          </h2>
          <p className="text-xs text-[#686a73] mt-0.5">
            Optimize your point-to-point journey across Singapore's integrated rail and bus networks with real-time transfer connections and fare calculations.
          </p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Origin */}
          <div className="lg:col-span-5">
            <label className="block text-xs font-bold text-[#1f1f23] uppercase tracking-wide mb-1.5">
              Origin (Starting Point)
            </label>
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="Enter MRT station, bus stop, or landmark..."
                className="w-full h-11 pl-9 pr-4 text-sm bg-white rounded-[4px] border border-[#dbe0e6] focus:border-2 focus:border-[#6c1d7e] focus:outline-none placeholder:text-[#686a73]"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="lg:col-span-1 flex justify-center pt-5">
            <button
              onClick={handleSwap}
              title="Swap Origin & Destination"
              className="w-10 h-10 rounded-[4px] border border-[#dbe0e6] bg-[#f0f2f5] hover:bg-[#f4eaf7] hover:border-[#6c1d7e] text-[#500062] flex items-center justify-center transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div className="lg:col-span-6">
            <label className="block text-xs font-bold text-[#1f1f23] uppercase tracking-wide mb-1.5">
              Destination (Arrival Point)
            </label>
            <div className="relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e05615] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination stop or station..."
                className="w-full h-11 pl-9 pr-4 text-sm bg-white rounded-[4px] border border-[#dbe0e6] focus:border-2 focus:border-[#6c1d7e] focus:outline-none placeholder:text-[#686a73]"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Timing Row */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-[#f0f2f5]">
          {/* Priority filter */}
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-[#1f1f23] uppercase tracking-wide mb-1.5">
              Routing Preference
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPreference('fastest')}
                className={`px-3 py-2 text-xs font-bold rounded-[4px] transition-colors border ${
                  preference === 'fastest'
                    ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                    : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                }`}
              >
                Fastest Route
              </button>
              <button
                onClick={() => setPreference('transfers')}
                className={`px-3 py-2 text-xs font-bold rounded-[4px] transition-colors border ${
                  preference === 'transfers'
                    ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                    : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                }`}
              >
                Fewest Transfers
              </button>
              <button
                onClick={() => setPreference('rail')}
                className={`px-3 py-2 text-xs font-bold rounded-[4px] transition-colors border ${
                  preference === 'rail'
                    ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                    : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                }`}
              >
                Rail Preferred
              </button>
              <button
                onClick={() => setPreference('bus')}
                className={`px-3 py-2 text-xs font-bold rounded-[4px] transition-colors border ${
                  preference === 'bus'
                    ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                    : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                }`}
              >
                Bus Only
              </button>
            </div>
          </div>

          {/* Primary CTA Button */}
          <div className="md:col-span-4 flex justify-end">
            <button
              onClick={handleCalculateJourney}
              disabled={isCalculating}
              className="w-full md:w-auto min-w-[200px] h-11 px-6 bg-[#e05615] hover:bg-[#c8470a] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-[4px] transition-colors shadow-xs inline-flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              <span>{isCalculating ? 'Computing Options...' : 'Plan My Journey'}</span>
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-[#f0f2f5] flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-[#686a73]">Suggested Presets:</span>
          {SAMPLE_JOURNEY_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-2.5 py-1 rounded-[4px] bg-[#fbf8ff] text-[#500062] border border-[#d2c2d0] hover:bg-[#f4eaf7] font-medium transition-colors"
            >
              {p.origin.split(' ')[0]} → {p.destination.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Route Options Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routesList.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <div
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 rounded-[8px] bg-white border cursor-pointer transition-all card-shadow ${
                isSelected
                  ? 'border-[#6c1d7e] ring-2 ring-[#6c1d7e]/20 bg-[#fbf8ff]'
                  : 'border-[#dbe0e6] hover:border-[#6c1d7e]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                    isSelected
                      ? 'bg-[#6c1d7e] text-white'
                      : 'bg-[#f0f2f5] text-[#686a73]'
                  }`}
                >
                  {route.label}
                </span>
                {isSelected && (
                  <span className="text-xs font-bold text-[#6c1d7e]">Selected</span>
                )}
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-heading font-extrabold text-2xl text-[#1f1f23] tabular-nums">
                  {route.durationMin}
                </span>
                <span className="text-xs text-[#686a73] font-semibold">minutes</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#686a73] border-t border-[#e9ecef] pt-2.5 font-medium">
                <div className="flex items-center justify-between">
                  <span>Adult Card Fare:</span>
                  <strong className="text-[#1f1f23] font-mono">${route.fareAdult.toFixed(2)}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Transfers:</span>
                  <span className="text-[#1f1f23]">{route.transfersCount === 0 ? 'Direct (0)' : `${route.transfersCount} transfer`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Walking:</span>
                  <span className="text-[#1f1f23]">{route.walkDistanceMeters}m</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Itinerary Timeline Card */}
      <div className="bg-white rounded-[8px] border border-[#dbe0e6] overflow-hidden card-shadow">
        {/* Banner */}
        <div className="bg-[#5e1770] p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs text-[#fed6ff] font-bold uppercase tracking-wider block">
              DETAILED ITINERARY
            </span>
            <h3 className="font-heading font-extrabold text-lg text-white">
              {selectedRoute.label} ({selectedRoute.durationMin} mins)
            </h3>
          </div>
          <div className="flex items-center gap-3 text-xs bg-white/10 px-3 py-1.5 rounded-[4px]">
            <span>Adult: <strong className="font-mono">${selectedRoute.fareAdult.toFixed(2)}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Student: <strong className="font-mono">${selectedRoute.fareStudent.toFixed(2)}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Senior: <strong className="font-mono">${selectedRoute.fareSenior.toFixed(2)}</strong></span>
          </div>
        </div>

        {/* Step-by-Step Flow */}
        <div className="p-6">
          <div className="relative border-l-2 border-[#dbe0e6] ml-4 pl-6 space-y-6">
            {/* Origin indicator */}
            <div className="relative">
              <span className="w-4 h-4 rounded-full bg-emerald-600 border-2 border-white absolute -left-[33px] top-1 shadow-xs" />
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  DEPARTURE
                </span>
                <h4 className="font-heading font-bold text-base text-[#1f1f23]">
                  {origin}
                </h4>
                <p className="text-xs text-[#686a73] mt-0.5">Ready to board at platform or berth</p>
              </div>
            </div>

            {/* Travel Steps */}
            {selectedRoute.steps.map((step, idx) => (
              <div key={idx} className="relative">
                <span
                  className="w-4 h-4 rounded-full border-2 border-white absolute -left-[33px] top-1 shadow-xs flex items-center justify-center text-[10px] text-white"
                  style={{
                    backgroundColor: step.lineColor || '#6c1d7e'
                  }}
                />

                <div className="bg-[#f0f2f5] p-3.5 rounded-[4px] border border-[#dbe0e6]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      {step.mode === 'MRT' && (
                        <span
                          className="px-2 py-0.5 rounded-[3px] text-white font-bold text-xs font-mono"
                          style={{ backgroundColor: step.lineColor || '#d42e12' }}
                        >
                          {step.badge || 'MRT'}
                        </span>
                      )}
                      {step.mode === 'BUS' && (
                        <span className="px-2 py-0.5 rounded-[3px] bg-[#6c1d7e] text-white font-bold text-xs font-mono">
                          {step.badge || 'BUS'}
                        </span>
                      )}
                      {step.mode === 'WALK' && (
                        <span className="px-2 py-0.5 rounded-[3px] bg-[#dbe0e6] text-[#1f1f23] font-bold text-xs">
                          WALK
                        </span>
                      )}
                      <span className="text-xs font-bold text-[#1f1f23]">
                        {step.instruction}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-[#500062] tabular-nums shrink-0">
                      ~{step.durationMin} mins
                    </span>
                  </div>

                  {step.subtext && (
                    <p className="text-xs text-[#686a73] pl-0.5">
                      {step.subtext}
                    </p>
                  )}
                  {step.stopsCount && (
                    <div className="mt-2 text-[11px] text-[#500062] font-semibold flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" />
                      <span>Alight after {step.stopsCount} stops/stations</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Destination arrival */}
            <div className="relative">
              <span className="w-4 h-4 rounded-full bg-[#e05615] border-2 border-white absolute -left-[33px] top-1 shadow-xs" />
              <div>
                <span className="text-[11px] font-bold text-[#e05615] uppercase tracking-wider">
                  DESTINATION REACHED
                </span>
                <h4 className="font-heading font-bold text-base text-[#1f1f23]">
                  {destination}
                </h4>
                <p className="text-xs text-[#686a73] mt-0.5">
                  Tap out with transit card. Total travel time approximately {selectedRoute.durationMin} minutes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare and Concession advisory note */}
        <div className="p-4 bg-[#fbf8ff] border-t border-[#dbe0e6] flex items-center justify-between text-xs text-[#686a73]">
          <span>Fares computed according to PTC Distance-Based Fare Structure (DBF).</span>
          <span className="font-semibold text-[#500062]">Transfer grace period: 45 minutes between rail and bus.</span>
        </div>
      </div>
    </div>
  );
};
