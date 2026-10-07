import { BusStop } from '../types/transit';

// Complete dictionary of Singapore Bus Terminals, Interchanges, and Major Destination Codes
export const DESTINATION_NAMES: Record<string, string> = {
  // Major Interchanges & Terminals
  '01012': 'Hotel Grand Pacific (Victoria St)',
  '01113': 'Bugis Stn Exit A',
  '02049': 'Marina Centre Ter',
  '02059': 'Marina Centre Ter (Raffles Ave)',
  '02089': 'Pan Pacific Hotel',
  '03019': 'Shenton Way Ter',
  '03211': 'Opp The Treasury (High St)',
  '03239': 'Clarke Quay Ter',
  '03509': 'Marina Bay Sands Hotel',
  '03519': 'Bayfront Stn Exit B',
  '04121': 'Clarke Quay Stn Exit E',
  '04179': 'Boat Quay',
  '05019': 'Chinatown Stn Exit E',
  '05419': 'New Bridge Rd Ter',
  '08057': 'Dhoby Ghaut Stn Exit B',
  '09047': 'Orchard Stn / Tang Plaza',
  '09048': 'Orchard Stn / Lucky Plaza',
  '09111': 'Somerset Stn',
  '10009': 'HarbourFront Ter',
  '10499': 'Kampong Bahru Ter',
  '10509': 'Opp Kampong Bahru Ter',
  '14009': 'HarbourFront Int',
  '14141': 'VivoCity',
  '14119': 'Opp VivoCity',
  '16009': 'Bukit Merah Int',
  '17009': 'Clementi Int',
  '19009': 'Buona Vista Ter',
  '20009': 'Ghim Moh Ter',
  '22009': 'Boon Lay Int',
  '25009': 'Joo Koon Int',
  '28009': 'Jurong East Int',
  '40009': 'Bukit Batok Int',
  '43009': 'Choa Chu Kang Int',
  '44009': 'Bukit Panjang Int',
  '46009': 'Woodlands Temp Int',
  '46008': 'Woodlands Int Berth 1',
  '48009': 'Sembawang Int',
  '52009': 'Toa Payoh Int',
  '53009': 'Bishan Stn',
  '54009': 'Bishan Int',
  '55009': 'Ang Mo Kio Int',
  '59009': 'Yishun Int',
  '60009': "St. Michael's Ter",
  '64009': 'Hougang Central Int',
  '65009': 'Sengkang Int',
  '66009': 'Serangoon Int',
  '67009': 'Punggol Temp Int',
  '70009': 'Lor 1 Geylang Ter',
  '75009': 'Tampines Int',
  '76009': 'Tampines Concourse Int',
  '77009': 'Pasir Ris Int',
  '80009': 'Sims Place Ter',
  '84009': 'Bedok Int',
  '85009': 'Eunos Int',
  '92009': 'Marine Parade Ter',
  '95009': 'Changi Airport PTB2',
  '95129': 'Changi Airport PTB1',
  '95109': 'Changi Airport PTB3',
  '95019': 'Changi Airport PTB4',
  '97009': 'Changi Village Ter',
  '99009': 'Tuas Bus Ter'
};

// Helper function to resolve real destination name from 5-digit destination code
export function getDestinationName(destCode?: string, serviceNo?: string): string {
  if (!destCode || destCode === '0' || destCode === '') {
    return 'Loop Service';
  }

  // Check in dictionary
  if (DESTINATION_NAMES[destCode]) {
    return DESTINATION_NAMES[destCode];
  }

  // Check in full stops list
  const foundStop = ALL_SINGAPORE_BUS_STOPS.find((s) => s.code === destCode);
  if (foundStop) {
    return `${foundStop.name} (${foundStop.roadName})`;
  }

  // Common service-specific terminal destinations in Singapore
  const serviceTerminals: Record<string, string> = {
    '7': 'Bedok Int / Clementi Int',
    '14': 'Bedok Int / Clementi Int',
    '16': 'Bedok Int / Bukit Merah Int',
    '65': 'Tampines Int / HarbourFront Int',
    '106': 'Shenton Way Ter / Bukit Batok Int',
    '111': 'Ghim Moh Ter (Loop)',
    '123': 'Bukit Merah Int / HarbourFront',
    '124': "St. Michael's Ter / HarbourFront Int",
    '143': 'Toa Payoh Int / Jurong East Int',
    '147': 'Hougang Central Int / Clementi Int',
    '166': 'Ang Mo Kio Int / Clementi Int',
    '174': 'Boon Lay Int / Kampong Bahru Ter',
    '190': 'Choa Chu Kang Int / Kampong Bahru Ter',
    '502': 'Pioneer Rd North / Suntec City',
    '857': 'Yishun Int / Suntec City',
    '960': 'Woodlands Temp Int / Marina Centre Ter'
  };

  if (serviceNo && serviceTerminals[serviceNo]) {
    return serviceTerminals[serviceNo];
  }

  return `Bus Stop ${destCode}`;
}

export interface DetailedBusStop extends BusStop {
  region: 'Central' | 'East' | 'West' | 'North' | 'North-East';
  description?: string;
}

// Comprehensive database of Singapore Bus Stops
export const ALL_SINGAPORE_BUS_STOPS: DetailedBusStop[] = [
  // --- CENTRAL / ORCHARD / DOWNTOWN ---
  {
    code: '08057',
    name: 'Dhoby Ghaut Stn Exit B',
    roadName: 'Orchard Rd',
    region: 'Central',
    nearbyLandmarks: ['Plaza Singapura', 'The Atrium@Orchard', 'Istana Park'],
    mrtInterchange: 'NS24 / NE6 / CC1 Dhoby Ghaut',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 8, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '16',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'LSD', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Shenton Way Ter',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '111',
        destinationName: 'Ghim Moh Ter (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 9, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'LSD', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '09047',
    name: 'Orchard Stn / Tang Plaza',
    roadName: 'Orchard Blvd',
    region: 'Central',
    nearbyLandmarks: ['Tang Plaza', 'ION Orchard', 'Wisma Atria'],
    mrtInterchange: 'NS22 / TE14 Orchard',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'HarbourFront Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Bukit Batok Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '123',
        destinationName: 'Bukit Merah Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '502',
        destinationName: 'Pioneer Rd North',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 7, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '09048',
    name: 'Orchard Stn / Lucky Plaza',
    roadName: 'Orchard Rd',
    region: 'Central',
    nearbyLandmarks: ['Lucky Plaza', 'Paragon', 'Ngee Ann City'],
    mrtInterchange: 'NS22 / TE14 Orchard',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '124',
        destinationName: 'HarbourFront Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Toa Payoh Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '09111',
    name: 'Somerset Stn',
    roadName: 'Somerset Rd',
    region: 'Central',
    nearbyLandmarks: ['313@Somerset', 'Orchard Gateway', 'TripleOne Somerset'],
    mrtInterchange: 'NS23 Somerset',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '16',
        destinationName: 'Marine Parade',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '123',
        destinationName: 'HarbourFront Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '04121',
    name: 'Clarke Quay Stn Exit E',
    roadName: 'Eu Tong Sen St',
    region: 'Central',
    nearbyLandmarks: ['Clarke Quay Central', 'The Riverfront', 'Hong Lim Park'],
    mrtInterchange: 'NE5 Clarke Quay',
    services: [
      {
        serviceNo: '2',
        destinationName: 'Changi Village Ter',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '12',
        destinationName: 'Pasir Ris Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '33',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '54',
        destinationName: 'Bishan Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '147',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Choa Chu Kang Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 2, load: 'SDA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '04179',
    name: 'Boat Quay',
    roadName: 'South Bridge Rd',
    region: 'Central',
    nearbyLandmarks: ['Boat Quay', 'Parliament House', 'Fuk Tak Chi'],
    services: [
      {
        serviceNo: '51',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '61',
        destinationName: 'Eunos Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '63',
        destinationName: 'Eunos Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '80',
        destinationName: 'Sengkang Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '124',
        destinationName: "St. Michael's Ter",
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '145',
        destinationName: 'Toa Payoh Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '166',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '01113',
    name: 'Bugis Stn Exit A',
    roadName: 'Victoria St',
    region: 'Central',
    nearbyLandmarks: ['Bugis Junction', 'Bugis+', 'National Library'],
    mrtInterchange: 'EW12 / DT14 Bugis',
    services: [
      {
        serviceNo: '2',
        destinationName: 'Changi Village Ter',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '12',
        destinationName: 'Pasir Ris Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 6, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '33',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '130',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'LSD', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '851',
        destinationName: 'Yishun Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '960',
        destinationName: 'Woodlands Temp Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '01012',
    name: 'Hotel Grand Pacific',
    roadName: 'Victoria St',
    region: 'Central',
    nearbyLandmarks: ['Hotel Grand Pacific', 'Singapore Art Museum', 'SMU'],
    mrtInterchange: 'CC2 Bras Basah / DT21 Bencoolen',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '12',
        destinationName: 'Pasir Ris Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '16',
        destinationName: 'Marine Parade',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '175',
        destinationName: 'Geylang Lor 1 Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '03509',
    name: 'Marina Bay Sands Hotel',
    roadName: 'Bayfront Ave',
    region: 'Central',
    nearbyLandmarks: ['MBS Hotel Towers', 'Gardens by the Bay', 'Marina Bay Waterfront'],
    mrtInterchange: 'CE1 / DT16 Bayfront',
    services: [
      {
        serviceNo: '97',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Bukit Batok Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '133',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '518',
        destinationName: 'Pasir Ris Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '03019',
    name: 'Shenton Way Ter',
    roadName: 'Shenton Way',
    region: 'Central',
    nearbyLandmarks: ['Marina Bay Financial Centre', 'Asia Square', 'Singapore Conference Hall'],
    mrtInterchange: 'TE19 Shenton Way',
    services: [
      {
        serviceNo: '10',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '70',
        destinationName: 'Yio Chu Kang Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '97',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Bukit Batok Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '196',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '05019',
    name: 'Chinatown Stn Exit E',
    roadName: 'Eu Tong Sen St',
    region: 'Central',
    nearbyLandmarks: ['Chinatown Point', 'Hong Lim Complex', 'People’s Park Centre'],
    mrtInterchange: 'NE4 / DT19 Chinatown',
    services: [
      {
        serviceNo: '2',
        destinationName: 'Changi Village Ter',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '12',
        destinationName: 'Pasir Ris Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '33',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Toa Payoh Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '147',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Choa Chu Kang Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '10499',
    name: 'Kampong Bahru Ter',
    roadName: 'Spooner Rd',
    region: 'Central',
    nearbyLandmarks: ['Spooner Road HDB Estate', 'Old Tanjong Pagar Railway Station'],
    services: [
      {
        serviceNo: '120',
        destinationName: 'New Bridge Rd (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '121',
        destinationName: 'Telok Blangah Rise (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Boon Lay Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Choa Chu Kang Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '14009',
    name: 'HarbourFront Int',
    roadName: 'Seah Im Rd',
    region: 'Central',
    nearbyLandmarks: ['HarbourFront Centre', 'VivoCity', 'Mount Faber Cable Car'],
    mrtInterchange: 'NE1 / CC29 HarbourFront',
    services: [
      {
        serviceNo: '65',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '80',
        destinationName: 'Sengkang Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '93',
        destinationName: 'Eunos Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '124',
        destinationName: "St. Michael's Ter",
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '188',
        destinationName: 'Choa Chu Kang Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '855',
        destinationName: 'Yishun Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '963',
        destinationName: 'Woodlands Temp Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '14141',
    name: 'VivoCity',
    roadName: 'Telok Blangah Rd',
    region: 'Central',
    nearbyLandmarks: ['VivoCity Mall', 'Sentosa Gateway', 'St James Power Station'],
    mrtInterchange: 'NE1 / CC29 HarbourFront',
    services: [
      {
        serviceNo: '10',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '30',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '57',
        destinationName: 'Bishan Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '97',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '100',
        destinationName: 'Serangoon Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '166',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },

  // --- WEST REGION ---
  {
    code: '28009',
    name: 'Jurong East Int',
    roadName: 'Jurong Gateway Rd',
    region: 'West',
    nearbyLandmarks: ['Westgate', 'Jem', 'IMM', 'Ng Teng Fong General Hospital'],
    mrtInterchange: 'NS1 / EW24 / JE5 Jurong East',
    services: [
      {
        serviceNo: '51',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '52',
        destinationName: 'Bishan Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '105',
        destinationName: 'Serangoon Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Toa Payoh Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'LSD', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '334',
        destinationName: 'Jurong West Ave 1 (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '17009',
    name: 'Clementi Int',
    roadName: 'Clementi Ave 3',
    region: 'West',
    nearbyLandmarks: ['The Clementi Mall', 'Clementi Town Centre', '321 Clementi'],
    mrtInterchange: 'EW23 Clementi',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '147',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '166',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '284',
        destinationName: 'Clementi Ave 4 (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '22009',
    name: 'Boon Lay Int',
    roadName: 'Jurong West Central 3',
    region: 'West',
    nearbyLandmarks: ['Jurong Point Shopping Centre', 'Boon Lay Community Club'],
    mrtInterchange: 'EW27 Boon Lay',
    services: [
      {
        serviceNo: '30',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '198',
        destinationName: 'Bukit Merah Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '240',
        destinationName: 'Kang Ching Rd (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '40009',
    name: 'Bukit Batok Int',
    roadName: 'Bukit Batok Central',
    region: 'West',
    nearbyLandmarks: ['West Mall', 'Bukit Batok Polyclinic'],
    mrtInterchange: 'NS2 Bukit Batok',
    services: [
      {
        serviceNo: '61',
        destinationName: 'Eunos Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Shenton Way Ter',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '173',
        destinationName: 'Clementi Int (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '43009',
    name: 'Choa Chu Kang Int',
    roadName: 'Choa Chu Kang Loop',
    region: 'West',
    nearbyLandmarks: ['Lot One Shoppers’ Mall', 'Keat Hong Community Club'],
    mrtInterchange: 'NS4 Choa Chu Kang / BP1',
    services: [
      {
        serviceNo: '67',
        destinationName: 'Tampines Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '188',
        destinationName: 'HarbourFront Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Kampong Bahru Ter',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 1, load: 'LSD', busType: 'BD', wheelchairAccessible: true }
      },
      {
        serviceNo: '307',
        destinationName: 'Yew Tee Stn (Loop)',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },

  // --- NORTH REGION ---
  {
    code: '46009',
    name: 'Woodlands Temp Int',
    roadName: 'Woodlands Sq',
    region: 'North',
    nearbyLandmarks: ['Causeway Point', 'Woodlands Civic Centre', 'Woods Square'],
    mrtInterchange: 'NS9 / TE2 Woodlands',
    services: [
      {
        serviceNo: '168',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '856',
        destinationName: 'Yishun Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '903',
        destinationName: 'Woodlands Train Checkpoint',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 1, load: 'LSD', busType: 'BD', wheelchairAccessible: true }
      },
      {
        serviceNo: '960',
        destinationName: 'Marina Centre Ter',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '59009',
    name: 'Yishun Int',
    roadName: 'Yishun Ave 2',
    region: 'North',
    nearbyLandmarks: ['Northpoint City', 'Yishun Community Hospital'],
    mrtInterchange: 'NS13 Yishun',
    services: [
      {
        serviceNo: '851',
        destinationName: 'Bukit Merah Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '857',
        destinationName: 'Suntec City (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '811',
        destinationName: 'Yishun Ave 5 (Intratown Loop)',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '48009',
    name: 'Sembawang Int',
    roadName: 'Sembawang Vista',
    region: 'North',
    nearbyLandmarks: ['Sun Plaza Shopping Mall', 'Sembawang Public Library'],
    mrtInterchange: 'NS11 Sembawang',
    services: [
      {
        serviceNo: '117',
        destinationName: 'Punggol Temp Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '858',
        destinationName: 'Changi Airport PTB2 (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '882',
        destinationName: 'Sembawang Park (Loop)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  },

  // --- EAST REGION ---
  {
    code: '84009',
    name: 'Bedok Int',
    roadName: 'Bedok North Ave 1',
    region: 'East',
    nearbyLandmarks: ['Bedok Mall', 'Heartbeat@Bedok', 'Bedok Hawker Centre'],
    mrtInterchange: 'EW5 Bedok',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '28',
        destinationName: 'Toa Payoh Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '66',
        destinationName: 'Beauty World Stn',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '168',
        destinationName: 'Woodlands Temp Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '75009',
    name: 'Tampines Int',
    roadName: 'Tampines Central 1',
    region: 'East',
    nearbyLandmarks: ['Tampines Mall', 'Tampines 1', 'Century Square', 'Our Tampines Hub'],
    mrtInterchange: 'EW2 / DT32 Tampines',
    services: [
      {
        serviceNo: '10',
        destinationName: 'Kent Ridge Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '23',
        destinationName: 'Rochor Stn (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'HarbourFront Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '67',
        destinationName: 'Choa Chu Kang Int',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '291',
        destinationName: 'Tampines St 81 (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '77009',
    name: 'Pasir Ris Int',
    roadName: 'Pasir Ris Central',
    region: 'East',
    nearbyLandmarks: ['White Sands Shopping Mall', 'Pasir Ris Town Park'],
    mrtInterchange: 'EW1 Pasir Ris',
    services: [
      {
        serviceNo: '12',
        destinationName: 'Kampong Bahru Ter',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '21',
        destinationName: 'St. Michael’s Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '58',
        destinationName: 'Bishan Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '358',
        destinationName: 'Pasir Ris Dr 4 (Loop)',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '95009',
    name: 'Changi Airport PTB2',
    roadName: 'PTB2 Basement',
    region: 'East',
    nearbyLandmarks: ['Changi Airport Terminal 2', 'Jewel Changi', 'Skytrain to T1/T3'],
    mrtInterchange: 'CG2 Changi Airport',
    services: [
      {
        serviceNo: '24',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '27',
        destinationName: 'Hougang Central Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '34',
        destinationName: 'Punggol Temp Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '36',
        destinationName: 'Tomlinson Rd / Orchard (Loop)',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '858',
        destinationName: 'Woodlands Temp Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },

  // --- NORTH-EAST REGION ---
  {
    code: '52009',
    name: 'Toa Payoh Int',
    roadName: 'Lor 6 Toa Payoh',
    region: 'North-East',
    nearbyLandmarks: ['HDB Hub', 'Toa Payoh Public Library', 'Toa Payoh Central Mall'],
    mrtInterchange: 'NS19 Toa Payoh',
    services: [
      {
        serviceNo: '28',
        destinationName: 'Tampines Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '73',
        destinationName: 'Ang Mo Kio Ave 8 (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Jurong East Int',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '145',
        destinationName: 'Buona Vista Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '238',
        destinationName: 'Toa Payoh East (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '54009',
    name: 'Bishan Int',
    roadName: 'Bishan Place',
    region: 'North-East',
    nearbyLandmarks: ['Junction 8 Shopping Centre', 'Bishan Community Club'],
    mrtInterchange: 'NS17 / CC15 Bishan',
    services: [
      {
        serviceNo: '52',
        destinationName: 'Jurong East Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '53',
        destinationName: 'Changi Airport PTB2 (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '54',
        destinationName: 'New Bridge Rd Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '55',
        destinationName: 'Siglap Rd (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '55009',
    name: 'Ang Mo Kio Int',
    roadName: 'Ang Mo Kio Ave 8',
    region: 'North-East',
    nearbyLandmarks: ['AMK Hub', 'Ang Mo Kio Town Centre'],
    mrtInterchange: 'NS16 Ang Mo Kio',
    services: [
      {
        serviceNo: '24',
        destinationName: 'Changi Airport PTB2',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '25',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '73',
        destinationName: 'Toa Payoh Int (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '133',
        destinationName: 'Shenton Way Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '166',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '64009',
    name: 'Hougang Central Int',
    roadName: 'Hougang Central',
    region: 'North-East',
    nearbyLandmarks: ['Hougang Mall', 'Hougang Central Bus Hub'],
    mrtInterchange: 'NE14 Hougang',
    services: [
      {
        serviceNo: '51',
        destinationName: 'Jurong East Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '72',
        destinationName: 'Yio Chu Kang Int (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '87',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '147',
        destinationName: 'Clementi Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '65009',
    name: 'Sengkang Int',
    roadName: 'Sengkang Square',
    region: 'North-East',
    nearbyLandmarks: ['Compass One', 'Sengkang Community Hub'],
    mrtInterchange: 'NE16 Sengkang / STC',
    services: [
      {
        serviceNo: '80',
        destinationName: 'HarbourFront Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '85',
        destinationName: 'Yishun Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '86',
        destinationName: 'Ang Mo Kio Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '87',
        destinationName: 'Bedok Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '66009',
    name: 'Serangoon Int',
    roadName: 'Serangoon Ave 2',
    region: 'North-East',
    nearbyLandmarks: ['NEX Mall', 'Serangoon Central'],
    mrtInterchange: 'NE12 / CC13 Serangoon',
    services: [
      {
        serviceNo: '100',
        destinationName: 'Ghim Moh Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '105',
        destinationName: 'Jurong East Int',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '109',
        destinationName: 'Changi Village Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '315',
        destinationName: 'Serangoon North Ave 1 (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '67009',
    name: 'Punggol Temp Int',
    roadName: 'Punggol Place',
    region: 'North-East',
    nearbyLandmarks: ['Waterway Point', 'Punggol Town Square'],
    mrtInterchange: 'NE17 Punggol / PTC',
    services: [
      {
        serviceNo: '3',
        destinationName: 'Tampines Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '34',
        destinationName: 'Changi Airport PTB2',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '83',
        destinationName: 'Sengkang Int (Loop)',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '136',
        destinationName: 'Ang Mo Kio Int',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 5, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  }
];
