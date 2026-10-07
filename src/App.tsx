import React, { useState, useEffect } from 'react';
import { ActiveTab, BusStop, CivicAnnouncement } from './types/transit';
import { INITIAL_BUS_STOPS, CIVIC_ANNOUNCEMENTS } from './data/transitData';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { WhatsNewWidget } from './components/WhatsNewWidget';
import { BusArrivalsView } from './components/BusArrivalsView';
import { JourneyPlannerView } from './components/JourneyPlannerView';
import { TrainStatusView } from './components/TrainStatusView';
import { InterchangeDirectoryView } from './components/InterchangeDirectoryView';
import { FareCalculatorView } from './components/FareCalculatorView';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { BookmarksModal } from './components/BookmarksModal';
import { 
  Bus, 
  MapPin, 
  Train, 
  Building2, 
  Calculator, 
  ShieldCheck, 
  ExternalLink,
  Phone,
  Info
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('bus');
  const [textScale, setTextScale] = useState<'sm' | 'base' | 'lg'>('base');
  const [busStops, setBusStops] = useState<BusStop[]>(INITIAL_BUS_STOPS);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sg_transit_favorites');
      return saved ? JSON.parse(saved) : ['08057', '09047'];
    } catch {
      return ['08057', '09047'];
    }
  });

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<CivicAnnouncement | null>(null);
  const [isBookmarksModalOpen, setIsBookmarksModalOpen] = useState<boolean>(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sg_transit_favorites', JSON.stringify(favorites));
    } catch {
      // storage unavailable
    }
  }, [favorites]);

  const toggleFavorite = (stopCode: string) => {
    setFavorites((prev) =>
      prev.includes(stopCode) ? prev.filter((c) => c !== stopCode) : [...prev, stopCode]
    );
  };

  const removeFavorite = (stopCode: string) => {
    setFavorites((prev) => prev.filter((c) => c !== stopCode));
  };

  const scaleClass =
    textScale === 'sm' ? 'text-scale-sm' : textScale === 'lg' ? 'text-scale-lg' : 'text-scale-base';

  return (
    <div className={`min-h-screen bg-[#f0f2f5] text-[#1f1f23] flex flex-col ${scaleClass}`}>
      {/* 3-Zone Top Bar Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        textScale={textScale}
        onTextScaleChange={setTextScale}
      />

      {/* Main Container */}
      <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 grow flex flex-col gap-6">
        {/* Civic Hero Banner */}
        <section className="relative rounded-[8px] overflow-hidden bg-[#500062] border border-[#dbe0e6] card-shadow">
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/transit_portal_banner_1791347678381.jpg"
              alt="Singapore Public Transport Operations Hub"
              className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#500062] via-[#500062]/90 to-[#6c1d7e]/80" />
          </div>

          <div className="relative p-6 sm:p-8 text-white max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider bg-white/15 px-2.5 py-1 rounded-[4px] text-[#fed6ff]">
                CIVIC TRANSIT OPERATIONS
              </span>
              <span className="text-xs text-white/80">
                · Updated Every 15 Seconds
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white leading-tight">
              Singapore Public Transport & Commuter Information System
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed">
              Official multimodal journey coordination providing live bus arrival telemetry, MRT network status monitoring, interchange guides, and distance-based fare calculations.
            </p>
          </div>
        </section>

        {/* Segmented Search Tabs (Top-pinned, 4px top radii, square bottom) */}
        <div className="flex flex-wrap items-end gap-1 border-b-2 border-[#6c1d7e]">
          <button
            onClick={() => setActiveTab('bus')}
            className={`px-4 sm:px-6 py-3 font-heading font-bold text-xs sm:text-sm rounded-t-[4px] transition-colors inline-flex items-center gap-2 ${
              activeTab === 'bus'
                ? 'bg-[#6c1d7e] text-white shadow-none'
                : 'bg-[#eaedf1] text-[#1f1f23] hover:bg-[#dfe3e8]'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>Bus Arrivals</span>
          </button>

          <button
            onClick={() => setActiveTab('journey')}
            className={`px-4 sm:px-6 py-3 font-heading font-bold text-xs sm:text-sm rounded-t-[4px] transition-colors inline-flex items-center gap-2 ${
              activeTab === 'journey'
                ? 'bg-[#6c1d7e] text-white shadow-none'
                : 'bg-[#eaedf1] text-[#1f1f23] hover:bg-[#dfe3e8]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Journey Planner</span>
          </button>

          <button
            onClick={() => setActiveTab('rail')}
            className={`px-4 sm:px-6 py-3 font-heading font-bold text-xs sm:text-sm rounded-t-[4px] transition-colors inline-flex items-center gap-2 ${
              activeTab === 'rail'
                ? 'bg-[#6c1d7e] text-white shadow-none'
                : 'bg-[#eaedf1] text-[#1f1f23] hover:bg-[#dfe3e8]'
            }`}
          >
            <Train className="w-4 h-4" />
            <span>Train & MRT Status</span>
          </button>

          <button
            onClick={() => setActiveTab('interchanges')}
            className={`px-4 sm:px-6 py-3 font-heading font-bold text-xs sm:text-sm rounded-t-[4px] transition-colors inline-flex items-center gap-2 ${
              activeTab === 'interchanges'
                ? 'bg-[#6c1d7e] text-white shadow-none'
                : 'bg-[#eaedf1] text-[#1f1f23] hover:bg-[#dfe3e8]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Interchange Facilities</span>
          </button>

          <button
            onClick={() => setActiveTab('fares')}
            className={`px-4 sm:px-6 py-3 font-heading font-bold text-xs sm:text-sm rounded-t-[4px] transition-colors inline-flex items-center gap-2 ${
              activeTab === 'fares'
                ? 'bg-[#6c1d7e] text-white shadow-none'
                : 'bg-[#eaedf1] text-[#1f1f23] hover:bg-[#dfe3e8]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Fare Calculator</span>
          </button>
        </div>

        {/* 2-Column Content Layout: Main Workspace + Civic Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Primary Panel (col 1 to 8 or 9) */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'bus' && (
              <BusArrivalsView
                busStops={busStops}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
              />
            )}

            {activeTab === 'journey' && <JourneyPlannerView />}

            {activeTab === 'rail' && <TrainStatusView />}

            {activeTab === 'interchanges' && <InterchangeDirectoryView />}

            {activeTab === 'fares' && <FareCalculatorView />}
          </div>

          {/* Right Civic Sidebar (col 9 to 12) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Side Navigation List */}
            <SidebarNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              favoritesCount={favorites.length}
              onOpenFavorites={() => setIsBookmarksModalOpen(true)}
              onOpenDisruptions={() => setSelectedAnnouncement(CIVIC_ANNOUNCEMENTS[2])}
              disruptionsCount={1}
            />

            {/* Announcement Widget ("What's New") */}
            <WhatsNewWidget
              announcements={CIVIC_ANNOUNCEMENTS}
              onSelectAnnouncement={setSelectedAnnouncement}
            />

            {/* Commuter Accessibility Notice Card */}
            <div className="bg-white rounded-[8px] p-4 border border-[#dbe0e6] card-shadow text-xs text-[#686a73] space-y-2">
              <div className="flex items-center gap-2 text-[#500062] font-heading font-bold text-xs">
                <Info className="w-4 h-4 text-[#5e1770]" />
                <span>Commuter Accessibility Standards</span>
              </div>
              <p className="leading-relaxed">
                All public buses operating on basic services in Singapore feature step-free boarding and dedicated wheelchair berths. Real-time crowding telemetry conforms to LTA Datamall standards.
              </p>
              <div className="pt-1 border-t border-[#e9ecef] flex items-center justify-between font-semibold text-[11px] text-[#1f1f23]">
                <span>SimplyGo Support: 1800-2255-663</span>
                <span className="text-[#e05615]">Toll-Free</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Official Civic Footer */}
      <footer className="bg-white border-t border-[#dbe0e6] mt-12 py-8 text-xs text-[#686a73]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#500062] text-white flex items-center justify-center font-bold text-xs font-heading">
              SG
            </div>
            <div>
              <p className="font-heading font-bold text-[#1f1f23]">
                Singapore Public Transit & Commuter Portal
              </p>
              <p className="text-[11px]">
                Operated in collaboration with SBS Transit, SMRT, Tower Transit, and Go-Ahead Singapore.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#500062]">
              Privacy Statement
            </a>
            <span aria-hidden="true">·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#500062]">
              Terms of Use
            </a>
            <span aria-hidden="true">·</span>
            <a href="#rate-card" onClick={(e) => { e.preventDefault(); setActiveTab('fares'); }} className="hover:text-[#500062]">
              Fare Guidelines
            </a>
            <span aria-hidden="true">·</span>
            <a href="#contact" onClick={(e) => e.preventDefault()} className="hover:text-[#500062]">
              Contact Transit Authority
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />

      <BookmarksModal
        isOpen={isBookmarksModalOpen}
        onClose={() => setIsBookmarksModalOpen(false)}
        favorites={favorites}
        busStops={busStops}
        onSelectStop={(code) => {
          setActiveTab('bus');
        }}
        onRemoveFavorite={removeFavorite}
      />
    </div>
  );
}
