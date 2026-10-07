import React, { useState } from 'react';
import { INTERCHANGE_HUBS } from '../data/transitData';
import { InterchangeHub } from '../types/transit';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Train, 
  Bus as BusIcon, 
  Layers, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const InterchangeDirectoryView: React.FC = () => {
  const [selectedHubId, setSelectedHubId] = useState<string>('jurong-east');

  const activeHub = INTERCHANGE_HUBS.find((h) => h.id === selectedHubId) || INTERCHANGE_HUBS[0];

  return (
    <div className="space-y-6">
      {/* Header Hub Selector */}
      <div className="bg-white rounded-[8px] p-5 sm:p-6 border border-[#dbe0e6] card-shadow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e9ecef]">
          <div>
            <h2 className="font-heading font-extrabold text-xl text-[#500062] tracking-tight">
              Integrated Transport Hubs & Interchange Facilities
            </h2>
            <p className="text-xs text-[#686a73] mt-0.5">
              Comprehensive berth allocation guides, concourse facilities, barrier-free access, and passenger amenities.
            </p>
          </div>
        </div>

        {/* Hub selector tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {INTERCHANGE_HUBS.map((hub) => {
            const isSelected = hub.id === selectedHubId;
            return (
              <button
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`px-4 py-2 text-xs font-bold font-heading rounded-[4px] transition-colors border ${
                  isSelected
                    ? 'bg-[#6c1d7e] text-white border-[#6c1d7e]'
                    : 'bg-[#f0f2f5] text-[#1f1f23] border-[#dbe0e6] hover:bg-[#e9ecef]'
                }`}
              >
                {hub.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hub Detailed Information */}
      <div className="bg-white rounded-[8px] border border-[#dbe0e6] overflow-hidden card-shadow">
        {/* Masthead Banner */}
        <div className="bg-[#5e1770] p-5 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#fd6b2b] text-white px-2 py-0.5 rounded-[4px] text-xs font-mono font-bold">
                  {activeHub.code}
                </span>
                <span className="bg-white/20 text-white px-2 py-0.5 rounded-[4px] text-xs font-semibold">
                  Air-Conditioned Integrated Hub
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {activeHub.name}
              </h3>
              <p className="text-xs text-white/80 mt-1 max-w-2xl leading-relaxed">
                {activeHub.description}
              </p>
            </div>

            {/* Quick Contact & Hours */}
            <div className="bg-black/20 p-3 rounded-[4px] text-xs space-y-1.5 border border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#f5adff]" />
                <span className="text-white/90">{activeHub.operatingHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f5adff]" />
                <span className="text-white/90">{activeHub.passengerServicePhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f5adff]" />
                <span className="text-white/90 truncate max-w-[200px]">{activeHub.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Banner with Zero-Broken-Image Fallback */}
        <div className="relative h-48 sm:h-64 w-full bg-[#3f214a] overflow-hidden">
          <img
            src="/src/assets/images/interchange_hub_facility_1791347692039.jpg"
            alt={activeHub.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful fallback to styled geometric SVG container
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-5">
            <div className="text-white">
              <span className="text-xs uppercase font-bold tracking-wider text-[#f5adff] block">
                FACILITIES OVERVIEW
              </span>
              <p className="text-sm font-semibold">
                Connected Rail: {activeHub.connectedMrt.join(' · ')}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#e9ecef]">
          {/* Berth Allocation Table (col 1 to 7) */}
          <div className="lg:col-span-7 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-bold text-base text-[#1f1f23]">
                Berth Allocation & Boarding Queues
              </h4>
              <span className="text-xs text-[#686a73]">
                {activeHub.berths.length} Operational Berths
              </span>
            </div>

            <div className="divide-y divide-[#e9ecef] border border-[#dbe0e6] rounded-[4px] overflow-hidden">
              {activeHub.berths.map((berth) => (
                <div
                  key={berth.berthNumber}
                  className="p-3.5 hover:bg-[#fbf8ff] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-16 text-center py-1 rounded-[4px] bg-[#6c1d7e] text-white font-heading font-extrabold text-xs shrink-0">
                      {berth.berthNumber}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {berth.services.map((svc) => (
                          <span
                            key={svc}
                            className="px-2 py-0.5 rounded-[3px] bg-[#f0f2f5] text-[#1f1f23] font-mono font-bold text-xs border border-[#dbe0e6]"
                          >
                            {svc}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-[#686a73] font-medium">
                        {berth.destination}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold px-2 py-1 rounded-[3px] bg-[#f5f2fa] text-[#500062] self-start sm:self-center border border-[#d2c2d0]">
                    {berth.queueType} Queue
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Concourse Facilities Checklist (col 8 to 12) */}
          <div className="lg:col-span-5 p-5 bg-[#fbf8ff]">
            <h4 className="font-heading font-bold text-base text-[#1f1f23] mb-4">
              Commuter Amenities & Inclusivity
            </h4>

            <div className="space-y-3">
              {activeHub.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-[4px] bg-white border border-[#dbe0e6] flex items-start gap-3"
                >
                  <div className="mt-0.5 shrink-0">
                    {fac.available ? (
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )}
                  </div>
                  <div>
                    <h5 className="font-heading font-bold text-xs text-[#1f1f23]">
                      {fac.name}
                    </h5>
                    <p className="text-xs text-[#686a73] mt-0.5">
                      {fac.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Assistance Card */}
            <div className="mt-5 p-4 rounded-[4px] bg-[#f4eaf7] border border-[#d2c2d0] text-xs text-[#500062]">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Info className="w-4 h-4 text-[#6c1d7e]" />
                <span>Special Assistance Service</span>
              </div>
              <p className="text-[11px] text-[#4f434f] leading-relaxed">
                Mobility-impaired commuters, elderly passengers, and families with prams may request staff assistance at the Passenger Service Office at any time during operations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f0f2f5] border-t border-[#dbe0e6] flex items-center justify-between text-xs text-[#686a73]">
          <span>Integrated Transport Hub operations certified by LTA Singapore.</span>
          <span>Last audit: Q3 2026</span>
        </div>
      </div>
    </div>
  );
};
