export type BusLoad = 'SEA' | 'SDA' | 'LSD'; // Seats Available, Standing Available, Limited Standing
export type BusType = 'SD' | 'DD' | 'BD'; // Single Deck, Double Deck, Bendy

export interface BusArrivalInfo {
  estimatedArrivalMin: number; // 0 means 'Arr'
  load: BusLoad;
  busType: BusType;
  wheelchairAccessible: boolean;
}

export interface BusServiceArrival {
  serviceNo: string;
  destinationName: string;
  operator: 'SBS Transit' | 'SMRT Buses' | 'Tower Transit' | 'Go-Ahead';
  nextBus: BusArrivalInfo;
  subsequentBus?: BusArrivalInfo;
  thirdBus?: BusArrivalInfo;
}

export interface BusStop {
  code: string;
  name: string;
  roadName: string;
  services: BusServiceArrival[];
  nearbyLandmarks?: string[];
  mrtInterchange?: string;
}

export type RailStatus = 'Normal Service' | 'Minor Delays' | 'Maintenance Work' | 'Bridging Bus Active';

export interface MrtLine {
  code: string;
  name: string;
  color: string;
  textColor: string;
  status: RailStatus;
  statusMessage?: string;
  peakFrequency: string;
  offPeakFrequency: string;
  firstTrain: string;
  lastTrain: string;
  terminalA: string;
  terminalB: string;
  stations: {
    code: string;
    name: string;
    interchanges?: string[];
  }[];
}

export interface JourneyStep {
  mode: 'WALK' | 'BUS' | 'MRT';
  instruction: string;
  subtext?: string;
  durationMin: number;
  lineColor?: string;
  badge?: string; // e.g. "EW24", "Bus 14"
  stopsCount?: number;
}

export interface JourneyRoute {
  id: string;
  label: string; // e.g. "Fastest Route", "Fewest Transfers"
  durationMin: number;
  fareAdult: number;
  fareStudent: number;
  fareSenior: number;
  walkDistanceMeters: number;
  transfersCount: number;
  steps: JourneyStep[];
}

export interface InterchangeBerth {
  berthNumber: string;
  services: string[];
  destination: string;
  queueType: 'Single' | 'Double' | 'Wheelchair-priority';
}

export interface InterchangeFacility {
  name: string;
  available: boolean;
  notes: string;
}

export interface InterchangeHub {
  id: string;
  name: string;
  code: string;
  address: string;
  operatingHours: string;
  passengerServicePhone: string;
  connectedMrt: string[];
  berths: InterchangeBerth[];
  facilities: InterchangeFacility[];
  description: string;
}

export interface CivicAnnouncement {
  id: string;
  title: string;
  date: string;
  category: 'Service Advisory' | 'Route Diversion' | 'Facility Upgrade' | 'Civic Notice';
  urgent: boolean;
  summary: string;
  content: string;
  affectedRoutes?: string[];
}

export type ActiveTab = 'bus' | 'journey' | 'rail' | 'interchanges' | 'fares';
