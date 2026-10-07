import React, { useState, useEffect } from 'react';
import { BusStop, BusServiceArrival, BusLoad, BusType } from '../types/transit';
import { getDestinationName, ALL_SINGAPORE_BUS_STOPS, DetailedBusStop } from '../data/singaporeBusStops';
import { 
  Search, 
  RefreshCw, 
  Bookmark, 
  BookmarkCheck, 
  Accessibility, 
  Bus as BusIcon, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  Clock, 
  SlidersHorizontal,
  ChevronDown,
  Info,
  Layers,
  ArrowRight,
  X
} from 'lucide-react';

interface BusArrivalsViewProps {
  busStops: BusStop[];
  favorites: string[];
  onToggleFavorite: (stopCode: string) => void;
}

export const BusArrivalsView: React.FC<BusArrivalsViewProps> = ({
  busStops,
  favorites,
  onToggleFavorite
}) => {
  const [selectedStopCode, setSelectedStopCode] = useState<string>('08057');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [secondsUntilRefresh, setSecondsUntilRefresh] = useState<number>(20);
  const [stopsState, setStopsState] = useState<BusStop[]>(busStops);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);
  const [apiNotice, setApiNotice] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isAllStopsModalOpen, setIsAllStopsModalOpen] = useState<boolean>(false);

  // Synchronize when parent prop updates
  useEffect(() => {
    setStopsState(busStops);
  }, [busStops]);

  const getStopRegion = (code: string) => {
    return ALL_SINGAPORE_BUS_STOPS.find((s) => s.code === code)?.region || 'Central';
  };

  const regionCounts = {
    All: stopsState.length,
    Central: stopsState.filter((s) => getStopRegion(s.code) === 'Central').length,
    West: stopsState.filter((s) => getStopRegion(s.code) === 'West').length,
    North: stopsState.filter((s) => getStopRegion(s.code) === 'North').length,
    East: stopsState.filter((s) => getStopRegion(s.code) === 'East').length,
    'North-East': stopsState.filter((s) => getStopRegion(s.code) === 'North-East').length,
  };

  const stopsInRegion = selectedRegion === 'All'
    ? stopsState
    : stopsState.filter((s) => getStopRegion(s.code) === selectedRegion);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const q = searchQuery.trim();
      if (/^\d{5}$/.test(q)) {
        setSelectedStopCode(q);
        setSearchQuery('');
      } else if (filteredStops.length > 0) {
        setSelectedStopCode(filteredStops[0].code);
        setSearchQuery('');
      }
    }
  };

  // Fetch live telemetry from /api/bus-arrival
  const fetchTelemetry = async (stopCode: string, svcFilter?: string) => {
    setIsRefreshing(true);
    try {
      let url = `/api/bus-arrival?BusStopCode=${encodeURIComponent(stopCode)}`;
      if (svcFilter && svcFilter.trim()) {
        url += `&ServiceNo=${encodeURIComponent(svcFilter.trim())}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.formattedServices && data.formattedServices.length > 0) {
          setIsLiveApi(true);
          setApiNotice('Live LTA DataMall v3 Feed Active');
          setStopsState((prevStops) => {
            const mappedServices: BusServiceArrival[] = data.formattedServices.map((fs: any) => {
              const destCode = fs.destinationCode || fs.nextBus?.destinationCode || fs.nextBus2?.destinationCode || '';
              const resolvedDest = (fs.destinationName && !fs.destinationName.startsWith('Dest Code'))
                ? fs.destinationName
                : getDestinationName(destCode, fs.serviceNo);

              return {
                serviceNo: fs.serviceNo,
                destinationName: resolvedDest,
                operator: (fs.operator === 'SBST' ? 'SBS Transit' : fs.operator === 'SMRT' ? 'SMRT Buses' : fs.operator === 'TTS' ? 'Tower Transit' : 'Go-Ahead') as any,
                nextBus: {
                  estimatedArrivalMin: fs.nextBus?.estimatedArrivalMin ?? 0,
                  load: (fs.nextBus?.load || 'SEA') as any,
                  busType: (fs.nextBus?.type || 'SD') as any,
                  wheelchairAccessible: fs.nextBus?.feature === 'WAB'
                },
                subsequentBus: fs.nextBus2 ? {
                  estimatedArrivalMin: fs.nextBus2?.estimatedArrivalMin ?? 0,
                  load: (fs.nextBus2?.load || 'SEA') as any,
                  busType: (fs.nextBus2?.type || 'SD') as any,
                  wheelchairAccessible: fs.nextBus2?.feature === 'WAB'
                } : undefined,
                thirdBus: fs.nextBus3 ? {
                  estimatedArrivalMin: fs.nextBus3?.estimatedArrivalMin ?? 0,
                  load: (fs.nextBus3?.load || 'SEA') as any,
                  busType: (fs.nextBus3?.type || 'SD') as any,
                  wheelchairAccessible: fs.nextBus3?.feature === 'WAB'
                } : undefined
              };
            });

            const exists = prevStops.some((s) => s.code === stopCode);
            if (exists) {
              return prevStops.map((s) => (s.code === stopCode ? { ...s, services: mappedServices } : s));
            } else {
              const known = ALL_SINGAPORE_BUS_STOPS.find((s) => s.code === stopCode);
              return [
                ...prevStops,
                {
                  code: stopCode,
                  name: known?.name || `Bus Stop ${stopCode}`,
                  roadName: known?.roadName || 'Singapore Transit Network',
                  nearbyLandmarks: known?.nearbyLandmarks,
                  mrtInterchange: known?.mrtInterchange,
                  services: mappedServices
                }
              ];
            }
          });
        }
      } else {
        const err = await res.json().catch(() => ({}));
        setIsLiveApi(false);
        if (res.status === 503) {
          setApiNotice('LTA Endpoint (/api/bus-arrival) ready. Set LTA_ACCOUNT_KEY in Vercel to activate live feed.');
        } else {
          setApiNotice(err.message || 'LTA Telemetry Service Ready');
        }
        // Fallback simulation
        runLocalSimulation(stopCode);
      }
    } catch {
      setIsLiveApi(false);
      runLocalSimulation(stopCode);
    } finally {
      setIsRefreshing(false);
      setSecondsUntilRefresh(20);
    }
  };

  const runLocalSimulation = (stopCode: string) => {
    setStopsState((prevStops) =>
      prevStops.map((stop) => {
        if (stop.code !== stopCode) return stop;
        return {
          ...stop,
          services: stop.services.map((svc) => {
            const nextMin = svc.nextBus.estimatedArrivalMin;
            const updatedMin = nextMin <= 0 ? Math.floor(Math.random() * 4) + 1 : nextMin - 1;
            return {
              ...svc,
              nextBus: {
                ...svc.nextBus,
                estimatedArrivalMin: updatedMin
              }
            };
          })
        };
      })
    );
  };

  // Initial and selected stop fetch
  useEffect(() => {
    fetchTelemetry(selectedStopCode, serviceFilter);
  }, [selectedStopCode]);

  // Live 20-second countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsUntilRefresh((prev) => {
        if (prev <= 1) {
          fetchTelemetry(selectedStopCode, serviceFilter);
          return 20;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedStopCode, serviceFilter]);

  const triggerRefreshTelemetry = () => {
    fetchTelemetry(selectedStopCode, serviceFilter);
  };

  const currentStop = stopsState.find((s) => s.code === selectedStopCode) || stopsState[0];
  const isBookmarked = favorites.includes(currentStop.code);

  // Search filter
  const filteredStops = stopsState.filter((s) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      s.code.includes(query) ||
      s.name.toLowerCase().includes(query) ||
      s.roadName.toLowerCase().includes(query) ||
      s.services.some((svc) => svc.serviceNo.toLowerCase().includes(query))
    );
  });

  const displayedServices = currentStop.services.filter((svc) => {
    if (!serviceFilter.trim()) return true;
    return svc.serviceNo.toLowerCase().includes(serviceFilter.toLowerCase().trim());
  });

  const getLoadBadge = (load: BusLoad) => {
    switch (load) {
      case 'SEA':
        return {
          label: 'Seats Available',
          short: 'SEA',
          dotColor: 'bg-emerald-600',
          textColor: 'text-emerald-800',
          bgColor: 'bg-emerald-50'
        };
      case 'SDA':
        return {
          label: 'Standing Available',
          short: 'SDA',
          dotColor: 'bg-amber-500',
          textColor: 'text-amber-800',
          bgColor: 'bg-amber-50'
        };
      case 'LSD':
        return {
          label: 'Limited Standing',
          short: 'LSD',
          dotColor: 'bg-rose-600',
          textColor: 'text-rose-800',
          bgColor: 'bg-rose-50'
        };
    }
  };

  const getBusTypeLabel = (type: BusType) => {
    switch (type) {
      case 'DD':
        return 'Double Deck';
      case 'SD':
        return 'Single Deck';
      case 'BD':
        return 'Bendy Bus';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Lookup Form Panel */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#e9ecef]">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#500062] tracking-tight">
              Real-Time Bus Arrival Telemetry
            </h2>
            <p className="text-xs text-[#686a73] mt-0.5">
              Instant GPS-tracked arrival countdowns, bus occupancy density, and vehicle specifications.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono text-[#686a73] tabular-nums">
              Auto-refresh in <strong className="text-[#500062]">{secondsUntilRefresh}s</strong>
            </span>
            {/* Primary CTA Button */}
            <button
              onClick={triggerRefreshTelemetry}
              disabled={isRefreshing}
              className="px-4 py-2 bg-[#e05615] hover:bg-[#c8470a] text-white text-xs font-bold font-heading rounded-[4px] uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-xs disabled:opacity-75"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Updating...' : 'Refresh Now'}</span>
            </button>
          </div>
        </div>

        {/* API Integration Telemetry Status Badge */}
        {apiNotice && (
          <div className={`mt-3 px-3 py-2 rounded-[4px] text-xs flex items-center justify-between border ${
            isLiveApi 
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
              : 'bg-[#fbf8ff] text-[#500062] border-[#d2c2d0]'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLiveApi ? 'bg-emerald-600 animate-pulse' : 'bg-[#e05615]'}`} />
              <span className="font-semibold">{apiNotice}</span>
            </div>
            <span className="text-[11px] font-mono opacity-80">
              {isLiveApi ? 'LTA DataMall 20s cycle' : 'GET /api/bus-arrival'}
            </span>
          </div>
        )}

        {/* Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-5">
          <div className="md:col-span-8">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-[#1f1f23] uppercase tracking-wide">
                Search Bus Stops ({stopsState.length} Total)
              </label>
              <button
                type="button"
                onClick={() => setIsAllStopsModalOpen(true)}
                className="text-xs font-bold text-[#6c1d7e] hover:text-[#500062] inline-flex items-center gap-1 underline underline-offset-2"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Browse Full Directory</span>
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-[#686a73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search by 5-digit Stop Code (e.g. 04121, 08057), Name, Road, or Landmark..."
                className="w-full h-11 pl-10 pr-4 text-sm bg-white rounded-[4px] border border-[#dbe0e6] focus:border-2 focus:border-[#6c1d7e] focus:outline-none placeholder:text-[#686a73]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#686a73] hover:text-[#1f1f23]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Direct 5-Digit Bus Stop Lookup Prompt */}
            {/^\d{5}$/.test(searchQuery.trim()) && (
              <div className="mt-2 p-2.5 bg-[#fff3eb] border border-[#fd6b2b] rounded-[4px] flex items-center justify-between">
                <div className="text-xs text-[#1f1f23]">
                  <strong className="text-[#e05615]">Bus Stop Code: {searchQuery.trim()}</strong>
                  <span className="text-[#686a73] ml-2 font-normal">Click to query live LTA telemetry</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStopCode(searchQuery.trim());
                    setSearchQuery('');
                  }}
                  className="px-3 py-1 bg-[#e05615] hover:bg-[#c8470a] text-white text-xs font-bold rounded-[3px] transition-colors"
                >
                  Load Stop {searchQuery.trim()}
                </button>
              </div>
            )}
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-[#1f1f23] uppercase tracking-wide mb-1.5">
              Filter by Bus Service No.
            </label>
            <div className="relative">
              <input
                type="text"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                placeholder="e.g. 124, 143, 174, 190, 7..."
                className="w-full h-11 px-3.5 text-sm bg-white rounded-[4px] border border-[#dbe0e6] focus:border-2 focus:border-[#6c1d7e] focus:outline-none placeholder:text-[#686a73]"
              />
              {serviceFilter && (
                <button
                  onClick={() => setServiceFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#686a73] hover:text-[#1f1f23]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Region Filter Bar & Stop Selector */}
        <div className="mt-4 pt-4 border-t border-[#f0f2f5] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-[#686a73] mr-1">Region:</span>
              {(['All', 'Central', 'West', 'North', 'East', 'North-East'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-2.5 py-1 text-xs rounded-[4px] font-semibold transition-colors border ${
                    selectedRegion === reg
                      ? 'bg-[#500062] text-white border-[#500062]'
                      : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                  }`}
                >
                  {reg === 'All' ? `All (${stopsState.length})` : `${reg} (${regionCounts[reg]})`}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#686a73]">
              Showing {stopsInRegion.length} stops
            </span>
          </div>

          {/* Bus Stop Selector Pills for Current Region */}
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1 bg-[#fbf8ff] rounded-[4px] border border-[#d2c2d0]">
            {stopsInRegion.map((stop) => {
              const isSelected = selectedStopCode === stop.code;
              return (
                <button
                  key={stop.code}
                  type="button"
                  onClick={() => {
                    setSelectedStopCode(stop.code);
                    setSearchQuery('');
                  }}
                  className={`px-2.5 py-1.5 text-xs rounded-[4px] font-medium transition-colors border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#6c1d7e] text-white border-[#6c1d7e] font-bold shadow-xs'
                      : 'bg-white text-[#1f1f23] border-[#dbe0e6] hover:border-[#6c1d7e] hover:bg-[#f4eaf7]'
                  }`}
                >
                  <strong className={isSelected ? 'text-[#fed6ff]' : 'text-[#500062]'}>
                    {stop.code}
                  </strong>
                  <span className="truncate max-w-[150px]">{stop.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* If user searched and found multiple stops, provide selection list */}
        {searchQuery && filteredStops.length > 0 && (
          <div className="mt-3 p-2 bg-white rounded-[4px] border-2 border-[#6c1d7e] max-h-56 overflow-y-auto divide-y divide-[#e9ecef] shadow-sm">
            <div className="px-3 py-1.5 text-[11px] font-bold text-[#500062] bg-[#f4eaf7] uppercase tracking-wider flex justify-between">
              <span>Matching Stops ({filteredStops.length})</span>
              <span>Click to select</span>
            </div>
            {filteredStops.map((stop) => (
              <button
                key={stop.code}
                onClick={() => {
                  setSelectedStopCode(stop.code);
                  setSearchQuery('');
                }}
                className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#fbf8ff] rounded-[3px] transition-colors"
              >
                <div>
                  <strong className="text-[#500062] font-mono mr-2">{stop.code}</strong>
                  <span className="font-semibold text-[#1f1f23]">{stop.name}</span>
                  <span className="text-[#686a73] ml-2 font-normal">({stop.roadName})</span>
                  {stop.mrtInterchange && (
                    <span className="ml-2 text-[10px] text-[#6c1d7e] font-semibold bg-[#f4eaf7] px-1.5 py-0.5 rounded">
                      {stop.mrtInterchange}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-[#6c1d7e] font-semibold shrink-0">
                  {stop.services.length} services
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected Bus Stop Card */}
      <div className="bg-white rounded-[8px] border border-[#dbe0e6] overflow-hidden card-shadow">
        {/* Masthead Banner */}
        <div className="bg-[#5e1770] p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-[4px] bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <BusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="bg-[#fd6b2b] text-white px-2.5 py-0.5 rounded-[4px] font-mono font-bold text-xs tracking-wider">
                  BUS STOP {currentStop.code}
                </span>
                {currentStop.mrtInterchange && (
                  <span className="bg-white/20 text-white px-2 py-0.5 rounded-[4px] text-xs font-semibold">
                    {currentStop.mrtInterchange}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-extrabold text-xl text-white tracking-tight">
                {currentStop.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/80 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentStop.roadName}</span>
                {currentStop.nearbyLandmarks && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="italic">Near {currentStop.nearbyLandmarks.join(', ')}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {/* Secondary Action Button (Purple Outline / White BG) */}
            <button
              onClick={() => onToggleFavorite(currentStop.code)}
              className="px-3.5 py-2 rounded-[4px] text-xs font-bold transition-colors inline-flex items-center gap-1.5 bg-white text-[#6c1d7e] border border-[#6c1d7e] hover:bg-[#f4eaf7]"
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#e05615]" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Bookmark Stop</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Legend for Crowd Density and Features */}
        <div className="bg-[#f5f2fa] px-5 py-3 border-b border-[#dbe0e6] flex flex-wrap items-center justify-between text-xs text-[#686a73] gap-3">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[#1f1f23]">Crowd Levels:</span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span>Seats Available</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Standing Available</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
              <span>Limited Standing</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <Accessibility className="w-3.5 h-3.5 text-[#500062]" />
              <span>Wheelchair Accessible (WAB)</span>
            </span>
          </div>
        </div>

        {/* Live Arrivals Table */}
        <div className="divide-y divide-[#e9ecef]">
          {displayedServices.length === 0 ? (
            <div className="p-8 text-center text-[#686a73]">
              <p className="text-sm">No bus services matching "{serviceFilter}" at this stop.</p>
              <button
                onClick={() => setServiceFilter('')}
                className="mt-2 text-xs text-[#e05615] font-bold underline"
              >
                Clear Service Filter
              </button>
            </div>
          ) : (
            displayedServices.map((svc) => {
              const nextBadge = getLoadBadge(svc.nextBus.load);
              const subBadge = svc.subsequentBus ? getLoadBadge(svc.subsequentBus.load) : null;
              const thirdBadge = svc.thirdBus ? getLoadBadge(svc.thirdBus.load) : null;

              return (
                <div
                  key={svc.serviceNo}
                  className="p-4 sm:p-5 hover:bg-[#fbf8ff] transition-colors grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
                >
                  {/* Service Badge & Operator info (col 1 to 4) */}
                  <div className="lg:col-span-4 flex items-center gap-3">
                    <div className="w-14 h-12 rounded-[4px] bg-[#6c1d7e] text-white flex items-center justify-center font-heading font-extrabold text-lg sm:text-xl shrink-0 shadow-xs">
                      {svc.serviceNo}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[#1f1f23] leading-tight">
                        To {svc.destinationName?.startsWith('Dest Code ')
                          ? getDestinationName(svc.destinationName.replace('Dest Code ', '').trim(), svc.serviceNo)
                          : (svc.destinationName || 'Terminus')}
                      </h4>
                      <p className="text-[11px] text-[#686a73] font-medium mt-0.5">
                        {svc.operator}
                      </p>
                    </div>
                  </div>

                  {/* Next Bus Countdown Card (col 5 to 7) */}
                  <div className="lg:col-span-4 bg-[#f0f2f5] p-3 rounded-[4px] border border-[#dbe0e6] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#686a73] block mb-0.5">
                        NEXT ARRIVAL
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-heading font-extrabold text-2xl text-[#1f1f23] tabular-nums">
                          {svc.nextBus.estimatedArrivalMin === 0 ? (
                            <span className="text-[#e05615] uppercase font-bold animate-pulse">Arr</span>
                          ) : (
                            `${svc.nextBus.estimatedArrivalMin} min`
                          )}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      {/* Density indicator */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-bold ${nextBadge.bgColor} ${nextBadge.textColor}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${nextBadge.dotColor}`} />
                        <span>{nextBadge.label}</span>
                      </span>

                      {/* Bus type & accessibility */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#686a73]">
                        <span>{getBusTypeLabel(svc.nextBus.busType)}</span>
                        {svc.nextBus.wheelchairAccessible && (
                          <span title="Wheelchair Accessible">
                            <Accessibility className="w-3.5 h-3.5 text-[#500062]" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 2nd and 3rd Bus Timings (col 8 to 12) */}
                  <div className="lg:col-span-4 grid grid-cols-2 gap-2 text-xs">
                    {/* 2nd Bus */}
                    <div className="p-2.5 rounded-[4px] bg-white border border-[#dbe0e6]">
                      <span className="text-[10px] text-[#686a73] font-bold uppercase block mb-1">
                        2nd Bus
                      </span>
                      {svc.subsequentBus ? (
                        <>
                          <div className="font-heading font-bold text-base text-[#1f1f23] tabular-nums mb-1">
                            {svc.subsequentBus.estimatedArrivalMin} min
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="inline-flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${subBadge?.dotColor}`} />
                              <span className="text-[#686a73]">{subBadge?.short}</span>
                            </span>
                            <span className="text-[#686a73] font-mono">
                              {svc.subsequentBus.busType}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-[#686a73] italic">No telemetry</span>
                      )}
                    </div>

                    {/* 3rd Bus */}
                    <div className="p-2.5 rounded-[4px] bg-white border border-[#dbe0e6]">
                      <span className="text-[10px] text-[#686a73] font-bold uppercase block mb-1">
                        3rd Bus
                      </span>
                      {svc.thirdBus ? (
                        <>
                          <div className="font-heading font-bold text-base text-[#1f1f23] tabular-nums mb-1">
                            {svc.thirdBus.estimatedArrivalMin} min
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="inline-flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${thirdBadge?.dotColor}`} />
                              <span className="text-[#686a73]">{thirdBadge?.short}</span>
                            </span>
                            <span className="text-[#686a73] font-mono">
                              {svc.thirdBus.busType}
                            </span>
                          </div>
                        </>
                      ) : (
                        <span className="text-[#686a73] italic">--</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info strip */}
        <div className="p-4 bg-[#fbf8ff] border-t border-[#dbe0e6] flex flex-wrap items-center justify-between text-xs text-[#686a73] gap-2">
          <span>Data source: Land Transport Authority Datamall & Telemetry Operations.</span>
          <span>Showing {displayedServices.length} active service routes at this stop.</span>
        </div>
      </div>

      {/* Full Singapore Bus Stops Directory Modal */}
      {isAllStopsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-[8px] max-w-4xl w-full border border-[#dbe0e6] overflow-hidden modal-shadow flex flex-col max-h-[85vh]"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="bg-[#5e1770] p-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#fd6b2b]" />
                <div>
                  <h3 className="font-heading font-bold text-base text-white">
                    Full Singapore Bus Stops Directory ({stopsState.length} Stops)
                  </h3>
                  <p className="text-[11px] text-white/80">
                    Select any bus stop to view real-time arrival telemetry and destination details
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAllStopsModalOpen(false)}
                aria-label="Close directory"
                className="w-8 h-8 rounded-[4px] bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Region Filter Bar in Modal */}
            <div className="p-3 bg-[#f0f2f5] border-b border-[#dbe0e6] flex flex-wrap items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-[#1f1f23] mr-2">Filter Region:</span>
              {(['All', 'Central', 'West', 'North', 'East', 'North-East'] as const).map((reg) => (
                <button
                  key={reg}
                  type="button"
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3 py-1 text-xs rounded-[4px] font-semibold transition-colors border ${
                    selectedRegion === reg
                      ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                      : 'bg-white text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                  }`}
                >
                  {reg === 'All' ? `All (${stopsState.length})` : `${reg} (${regionCounts[reg]})`}
                </button>
              ))}
            </div>

            {/* Stops Grid in Modal */}
            <div className="p-4 overflow-y-auto grow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {stopsInRegion.map((stop) => {
                  const isCurrent = selectedStopCode === stop.code;
                  return (
                    <button
                      key={stop.code}
                      type="button"
                      onClick={() => {
                        setSelectedStopCode(stop.code);
                        setIsAllStopsModalOpen(false);
                      }}
                      className={`p-3 rounded-[6px] border text-left transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-[#6c1d7e] bg-[#fbf8ff] ring-2 ring-[#6c1d7e]/20'
                          : 'border-[#dbe0e6] bg-white hover:border-[#6c1d7e] hover:bg-[#fbf8ff]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs bg-[#500062] text-white px-2 py-0.5 rounded-[3px]">
                            {stop.code}
                          </span>
                          <span className="text-[10px] text-[#6c1d7e] font-semibold">
                            {getStopRegion(stop.code)}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-xs text-[#1f1f23] line-clamp-1 mt-1">
                          {stop.name}
                        </h4>
                        <p className="text-[11px] text-[#686a73] line-clamp-1 mt-0.5">
                          {stop.roadName}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-[#f0f2f5] flex items-center justify-between text-[10px] text-[#686a73]">
                        <span>{stop.services.length} services</span>
                        <span className="text-[#e05615] font-bold inline-flex items-center gap-0.5">
                          Select <ArrowRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#f0f2f5] border-t border-[#dbe0e6] flex items-center justify-between shrink-0 text-xs text-[#686a73]">
              <span>Tip: You can also search by any 5-digit bus stop code directly in the main search bar.</span>
              <button
                type="button"
                onClick={() => setIsAllStopsModalOpen(false)}
                className="px-4 py-1.5 bg-[#500062] hover:bg-[#6c1d7e] text-white font-bold text-xs rounded-[4px] transition-colors"
              >
                Close Directory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
