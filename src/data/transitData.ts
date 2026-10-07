import { BusStop, MrtLine, InterchangeHub, CivicAnnouncement, JourneyRoute } from '../types/transit';

export const INITIAL_BUS_STOPS: BusStop[] = [
  {
    code: '08057',
    name: 'Dhoby Ghaut Stn Exit B',
    roadName: 'Orchard Rd',
    nearbyLandmarks: ['Plaza Singapura', 'The Atrium@Orchard', 'Istana Park'],
    mrtInterchange: 'NS24 / NE6 / CC1 Dhoby Ghaut',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int via Victoria St',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 8, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 17, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Bedok Int via Mountbatten Rd',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 22, load: 'LSD', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '16',
        destinationName: 'Marine Parade via Nicoll Hwy',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 15, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 24, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'Tampines Int via MacPherson',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'LSD', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 9, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 18, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Shenton Way Ter via Marina Bay',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 14, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '111',
        destinationName: 'Ghim Moh Ter (Loop)',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 9, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 19, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '174',
        destinationName: 'New Bridge Rd Ter',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 13, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '190',
        destinationName: 'Kampong Bahru Ter via Clarke Quay',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'LSD', busType: 'BD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 10, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 16, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '09047',
    name: 'Orchard Stn / Tang Plaza',
    roadName: 'Orchard Blvd',
    nearbyLandmarks: ['Tang Plaza', 'ION Orchard', 'Wisma Atria'],
    mrtInterchange: 'NS22 / TE14 Orchard',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Bedok Int via Dhoby Ghaut',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 11, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Clementi Int via Dover Rd',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 9, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '65',
        destinationName: 'HarbourFront Int via Lower Delta',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 14, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Bukit Batok Int via Holland Rd',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 16, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '123',
        destinationName: 'Bukit Merah Int via Havelock',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '502',
        destinationName: 'Pioneer Rd North via Jurong East',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 7, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 19, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '01113',
    name: 'Bugis Stn Exit A',
    roadName: 'Victoria St',
    nearbyLandmarks: ['Bugis Junction', 'Bugis+', 'National Library'],
    mrtInterchange: 'EW12 / DT14 Bugis',
    services: [
      {
        serviceNo: '2',
        destinationName: 'Changi Village Ter via Tanah Merah',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 10, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '12',
        destinationName: 'Pasir Ris Int via Mountbatten',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 6, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 14, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '33',
        destinationName: 'Bedok Int via Joo Chiat Rd',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 16, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '130',
        destinationName: 'Ang Mo Kio Int via Thomson',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'LSD', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      },
      {
        serviceNo: '851',
        destinationName: 'Yishun Int via Marymount',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 15, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '960',
        destinationName: 'Woodlands Temp Int via Bt Panjang',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 3, load: 'SEA', busType: 'BD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'BD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '03509',
    name: 'Marina Bay Sands Hotel',
    roadName: 'Bayfront Ave',
    nearbyLandmarks: ['MBS Hotel Towers', 'Gardens by the Bay', 'Marina Bay Waterfront'],
    mrtInterchange: 'CE1 / DT16 Bayfront',
    services: [
      {
        serviceNo: '97',
        destinationName: 'Jurong East Int via AYE',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 13, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '106',
        destinationName: 'Bukit Batok Int via Orchard',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 9, load: 'SDA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '133',
        destinationName: 'Ang Mo Kio Int via Lavender',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 17, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '518',
        destinationName: 'Pasir Ris Int via Suntec & TPE',
        operator: 'Go-Ahead',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 16, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '28009',
    name: 'Jurong East Int Berth 1',
    roadName: 'Jurong Gateway Rd',
    nearbyLandmarks: ['Westgate', 'Jem', 'IMM', 'Ng Teng Fong General Hospital'],
    mrtInterchange: 'NS1 / EW24 / JE5 Jurong East',
    services: [
      {
        serviceNo: '51',
        destinationName: 'Hougang Central Int via Pasir Panjang',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 1, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 10, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '52',
        destinationName: 'Bishan Int via Upper Bukit Timah',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 15, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '105',
        destinationName: 'Serangoon Int via Commonwealth',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '143',
        destinationName: 'Toa Payoh Int via Pasir Panjang & Orchard',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 0, load: 'LSD', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 8, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        thirdBus: { estimatedArrivalMin: 16, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '334',
        destinationName: 'Jurong West Ave 1 (Loop Feeder)',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 6, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '46009',
    name: 'Woodlands Temp Int Berth 2',
    roadName: 'Woodlands Sq',
    nearbyLandmarks: ['Causeway Point', 'Woodlands Civic Centre', 'Woods Square'],
    mrtInterchange: 'NS9 / TE2 Woodlands',
    services: [
      {
        serviceNo: '168',
        destinationName: 'Bedok Int via SLE / TPE / Tampines',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 3, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 11, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '856',
        destinationName: 'Yishun Int via Senoko Industrial',
        operator: 'Tower Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 12, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '903',
        destinationName: 'Woodlands Train Checkpoint (Loop)',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 1, load: 'LSD', busType: 'BD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 6, load: 'SDA', busType: 'BD', wheelchairAccessible: true }
      },
      {
        serviceNo: '960',
        destinationName: 'Marina Centre Ter via Bugis',
        operator: 'SMRT Buses',
        nextBus: { estimatedArrivalMin: 7, load: 'SEA', busType: 'BD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 18, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      }
    ]
  },
  {
    code: '84009',
    name: 'Bedok Int Berth 3',
    roadName: 'Bedok North Ave 1',
    nearbyLandmarks: ['Bedok Mall', 'Bedok Interchange Hawker Centre', 'Heartbeat@Bedok'],
    mrtInterchange: 'EW5 Bedok',
    services: [
      {
        serviceNo: '7',
        destinationName: 'Clementi Int via Orchard & Holland',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 2, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 9, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '14',
        destinationName: 'Clementi Int via East Coast & Orchard',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 5, load: 'SEA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 13, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '28',
        destinationName: 'Toa Payoh Int via Bartley',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 4, load: 'SDA', busType: 'DD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 15, load: 'SEA', busType: 'DD', wheelchairAccessible: true }
      },
      {
        serviceNo: '66',
        destinationName: 'Beauty World Stn via Bukit Timah',
        operator: 'SBS Transit',
        nextBus: { estimatedArrivalMin: 8, load: 'SEA', busType: 'SD', wheelchairAccessible: true },
        subsequentBus: { estimatedArrivalMin: 20, load: 'SEA', busType: 'SD', wheelchairAccessible: true }
      }
    ]
  }
];

export const MRT_LINES: MrtLine[] = [
  {
    code: 'NSL',
    name: 'North-South Line',
    color: '#d42e12',
    textColor: '#ffffff',
    status: 'Normal Service',
    peakFrequency: '2–3 mins',
    offPeakFrequency: '4–5 mins',
    firstTrain: '05:30 (Jurong East) / 05:48 (Marina South Pier)',
    lastTrain: '23:55 (Terminal departures)',
    terminalA: 'Jurong East (NS1)',
    terminalB: 'Marina South Pier (NS28)',
    stations: [
      { code: 'NS1', name: 'Jurong East', interchanges: ['EWL', 'JRL'] },
      { code: 'NS2', name: 'Bukit Batok' },
      { code: 'NS3', name: 'Bukit Gombak' },
      { code: 'NS4', name: 'Choa Chu Kang', interchanges: ['BPLRT'] },
      { code: 'NS5', name: 'Yew Tee' },
      { code: 'NS7', name: 'Kranji' },
      { code: 'NS8', name: 'Marsiling' },
      { code: 'NS9', name: 'Woodlands', interchanges: ['TEL'] },
      { code: 'NS10', name: 'Admiralty' },
      { code: 'NS11', name: 'Sembawang' },
      { code: 'NS12', name: 'Canberra' },
      { code: 'NS13', name: 'Yishun' },
      { code: 'NS14', name: 'Khatib' },
      { code: 'NS15', name: 'Yio Chu Kang' },
      { code: 'NS16', name: 'Ang Mo Kio', interchanges: ['CRL'] },
      { code: 'NS17', name: 'Bishan', interchanges: ['CCL'] },
      { code: 'NS18', name: 'Braddell' },
      { code: 'NS19', name: 'Toa Payoh' },
      { code: 'NS20', name: 'Novena' },
      { code: 'NS21', name: 'Newton', interchanges: ['DTL'] },
      { code: 'NS22', name: 'Orchard', interchanges: ['TEL'] },
      { code: 'NS23', name: 'Somerset' },
      { code: 'NS24', name: 'Dhoby Ghaut', interchanges: ['NEL', 'CCL'] },
      { code: 'NS25', name: 'City Hall', interchanges: ['EWL'] },
      { code: 'NS26', name: 'Raffles Place', interchanges: ['EWL'] },
      { code: 'NS27', name: 'Marina Bay', interchanges: ['CCL', 'TEL'] },
      { code: 'NS28', name: 'Marina South Pier' }
    ]
  },
  {
    code: 'EWL',
    name: 'East-West Line',
    color: '#009530',
    textColor: '#ffffff',
    status: 'Normal Service',
    peakFrequency: '2–3 mins',
    offPeakFrequency: '4–5 mins',
    firstTrain: '05:16 (Pasir Ris) / 05:26 (Tuas Link)',
    lastTrain: '23:30 (Tuas Link) / 23:51 (Pasir Ris)',
    terminalA: 'Pasir Ris (EW1)',
    terminalB: 'Tuas Link (EW33)',
    stations: [
      { code: 'EW1', name: 'Pasir Ris', interchanges: ['CRL'] },
      { code: 'EW2', name: 'Tampines', interchanges: ['DTL'] },
      { code: 'EW3', name: 'Simei' },
      { code: 'EW4', name: 'Tanah Merah', interchanges: ['CGL'] },
      { code: 'EW5', name: 'Bedok' },
      { code: 'EW6', name: 'Kembangan' },
      { code: 'EW7', name: 'Eunos' },
      { code: 'EW8', name: 'Paya Lebar', interchanges: ['CCL'] },
      { code: 'EW9', name: 'Aljunied' },
      { code: 'EW10', name: 'Kallang' },
      { code: 'EW11', name: 'Lavender' },
      { code: 'EW12', name: 'Bugis', interchanges: ['DTL'] },
      { code: 'EW13', name: 'City Hall', interchanges: ['NSL'] },
      { code: 'EW14', name: 'Raffles Place', interchanges: ['NSL'] },
      { code: 'EW15', name: 'Tanjong Pagar' },
      { code: 'EW16', name: 'Outram Park', interchanges: ['NEL', 'TEL'] },
      { code: 'EW17', name: 'Tiong Bahru' },
      { code: 'EW18', name: 'Redhill' },
      { code: 'EW19', name: 'Queenstown' },
      { code: 'EW20', name: 'Commonwealth' },
      { code: 'EW21', name: 'Buona Vista', interchanges: ['CCL'] },
      { code: 'EW22', name: 'Dover' },
      { code: 'EW23', name: 'Clementi' },
      { code: 'EW24', name: 'Jurong East', interchanges: ['NSL'] },
      { code: 'EW25', name: 'Chinese Garden' },
      { code: 'EW26', name: 'Lakeside' },
      { code: 'EW27', name: 'Boon Lay' },
      { code: 'EW28', name: 'Pioneer' },
      { code: 'EW29', name: 'Joo Koon' },
      { code: 'EW30', name: 'Gul Circle' },
      { code: 'EW31', name: 'Tuas Crescent' },
      { code: 'EW32', name: 'Tuas West Road' },
      { code: 'EW33', name: 'Tuas Link' }
    ]
  },
  {
    code: 'NEL',
    name: 'North-East Line',
    color: '#7b1fa2',
    textColor: '#ffffff',
    status: 'Normal Service',
    peakFrequency: '2.5–3.5 mins',
    offPeakFrequency: '4–5 mins',
    firstTrain: '05:45 (Punggol Coast) / 06:00 (HarbourFront)',
    lastTrain: '23:54 (Terminal departures)',
    terminalA: 'HarbourFront (NE1)',
    terminalB: 'Punggol Coast (NE18)',
    stations: [
      { code: 'NE1', name: 'HarbourFront', interchanges: ['CCL'] },
      { code: 'NE3', name: 'Outram Park', interchanges: ['EWL', 'TEL'] },
      { code: 'NE4', name: 'Chinatown', interchanges: ['DTL'] },
      { code: 'NE5', name: 'Clarke Quay' },
      { code: 'NE6', name: 'Dhoby Ghaut', interchanges: ['NSL', 'CCL'] },
      { code: 'NE7', name: 'Little India', interchanges: ['DTL'] },
      { code: 'NE8', name: 'Farrer Park' },
      { code: 'NE9', name: 'Boon Keng' },
      { code: 'NE10', name: 'Potong Pasir' },
      { code: 'NE11', name: 'Woodleigh' },
      { code: 'NE12', name: 'Serangoon', interchanges: ['CCL'] },
      { code: 'NE13', name: 'Kovan' },
      { code: 'NE14', name: 'Hougang', interchanges: ['CRL'] },
      { code: 'NE15', name: 'Buangkok' },
      { code: 'NE16', name: 'Sengkang', interchanges: ['SKLRT'] },
      { code: 'NE17', name: 'Punggol', interchanges: ['PGLRT', 'CRL'] },
      { code: 'NE18', name: 'Punggol Coast' }
    ]
  },
  {
    code: 'CCL',
    name: 'Circle Line',
    color: '#fa9e0d',
    textColor: '#1f1f23',
    status: 'Normal Service',
    peakFrequency: '3–3.5 mins',
    offPeakFrequency: '5 mins',
    firstTrain: '05:30 (Dhoby Ghaut) / 05:32 (HarbourFront)',
    lastTrain: '23:30 (Terminal to terminal)',
    terminalA: 'Dhoby Ghaut (CC1)',
    terminalB: 'HarbourFront (CC29)',
    stations: [
      { code: 'CC1', name: 'Dhoby Ghaut', interchanges: ['NSL', 'NEL'] },
      { code: 'CC2', name: 'Bras Basah' },
      { code: 'CC3', name: 'Esplanade' },
      { code: 'CC4', name: 'Promenade', interchanges: ['DTL'] },
      { code: 'CC5', name: 'Nicoll Highway' },
      { code: 'CC6', name: 'Stadium' },
      { code: 'CC7', name: 'Mountbatten' },
      { code: 'CC8', name: 'Dakota' },
      { code: 'CC9', name: 'Paya Lebar', interchanges: ['EWL'] },
      { code: 'CC10', name: 'MacPherson', interchanges: ['DTL'] },
      { code: 'CC11', name: 'Tai Seng' },
      { code: 'CC12', name: 'Bartley' },
      { code: 'CC13', name: 'Serangoon', interchanges: ['NEL'] },
      { code: 'CC14', name: 'Lorong Chuan' },
      { code: 'CC15', name: 'Bishan', interchanges: ['NSL'] },
      { code: 'CC16', name: 'Marymount' },
      { code: 'CC17', name: 'Caldecott', interchanges: ['TEL'] },
      { code: 'CC19', name: 'Botanic Gardens', interchanges: ['DTL'] },
      { code: 'CC20', name: 'Farrer Road' },
      { code: 'CC21', name: 'Holland Village' },
      { code: 'CC22', name: 'Buona Vista', interchanges: ['EWL'] },
      { code: 'CC23', name: 'one-north' },
      { code: 'CC24', name: 'Kent Ridge' },
      { code: 'CC25', name: 'Haw Par Villa' },
      { code: 'CC26', name: 'Pasir Panjang' },
      { code: 'CC27', name: 'Labrador Park' },
      { code: 'CC28', name: 'Telok Blangah' },
      { code: 'CC29', name: 'HarbourFront', interchanges: ['NEL'] }
    ]
  },
  {
    code: 'DTL',
    name: 'Downtown Line',
    color: '#005ec4',
    textColor: '#ffffff',
    status: 'Normal Service',
    peakFrequency: '2.5–3 mins',
    offPeakFrequency: '4–5 mins',
    firstTrain: '05:32 (Bukit Panjang) / 05:36 (Expo)',
    lastTrain: '23:45 (Terminal departures)',
    terminalA: 'Bukit Panjang (DT1)',
    terminalB: 'Expo (DT35)',
    stations: [
      { code: 'DT1', name: 'Bukit Panjang', interchanges: ['BPLRT'] },
      { code: 'DT2', name: 'Cashew' },
      { code: 'DT3', name: 'Hillview' },
      { code: 'DT5', name: 'Beauty World' },
      { code: 'DT6', name: 'King Albert Park' },
      { code: 'DT7', name: 'Sixth Avenue' },
      { code: 'DT8', name: 'Tan Kah Kee' },
      { code: 'DT9', name: 'Botanic Gardens', interchanges: ['CCL'] },
      { code: 'DT10', name: 'Stevens', interchanges: ['TEL'] },
      { code: 'DT11', name: 'Newton', interchanges: ['NSL'] },
      { code: 'DT12', name: 'Little India', interchanges: ['NEL'] },
      { code: 'DT13', name: 'Rochor' },
      { code: 'DT14', name: 'Bugis', interchanges: ['EWL'] },
      { code: 'DT15', name: 'Promenade', interchanges: ['CCL'] },
      { code: 'DT16', name: 'Bayfront', interchanges: ['CCL'] },
      { code: 'DT17', name: 'Downtown' },
      { code: 'DT18', name: 'Telok Ayer' },
      { code: 'DT19', name: 'Chinatown', interchanges: ['NEL'] },
      { code: 'DT20', name: 'Fort Canning' },
      { code: 'DT21', name: 'Bencoolen' },
      { code: 'DT22', name: 'Jalan Besar' },
      { code: 'DT23', name: 'Bendemeer' },
      { code: 'DT24', name: 'Geylang Bahru' },
      { code: 'DT25', name: 'Mattar' },
      { code: 'DT26', name: 'MacPherson', interchanges: ['CCL'] },
      { code: 'DT27', name: 'Ubi' },
      { code: 'DT28', name: 'Kaki Bukit' },
      { code: 'DT29', name: 'Bedok North' },
      { code: 'DT30', name: 'Bedok Reservoir' },
      { code: 'DT31', name: 'Tampines West' },
      { code: 'DT32', name: 'Tampines', interchanges: ['EWL'] },
      { code: 'DT33', name: 'Tampines East' },
      { code: 'DT34', name: 'Upper Changi' },
      { code: 'DT35', name: 'Expo', interchanges: ['EWL'] }
    ]
  },
  {
    code: 'TEL',
    name: 'Thomson-East Coast Line',
    color: '#9d5b25',
    textColor: '#ffffff',
    status: 'Normal Service',
    peakFrequency: '3–4 mins',
    offPeakFrequency: '5 mins',
    firstTrain: '05:38 (Woodlands North) / 05:42 (Bayshore)',
    lastTrain: '23:40 (Terminal departures)',
    terminalA: 'Woodlands North (TE1)',
    terminalB: 'Bayshore (TE29)',
    stations: [
      { code: 'TE1', name: 'Woodlands North' },
      { code: 'TE2', name: 'Woodlands', interchanges: ['NSL'] },
      { code: 'TE3', name: 'Woodlands South' },
      { code: 'TE4', name: 'Springleaf' },
      { code: 'TE5', name: 'Lentor' },
      { code: 'TE6', name: 'Mayflower' },
      { code: 'TE7', name: 'Bright Hill' },
      { code: 'TE8', name: 'Upper Thomson' },
      { code: 'TE9', name: 'Caldecott', interchanges: ['CCL'] },
      { code: 'TE11', name: 'Stevens', interchanges: ['DTL'] },
      { code: 'TE12', name: 'Napier' },
      { code: 'TE13', name: 'Orchard Boulevard' },
      { code: 'TE14', name: 'Orchard', interchanges: ['NSL'] },
      { code: 'TE15', name: 'Great World' },
      { code: 'TE16', name: 'Havelock' },
      { code: 'TE17', name: 'Outram Park', interchanges: ['EWL', 'NEL'] },
      { code: 'TE18', name: 'Maxwell' },
      { code: 'TE19', name: 'Shenton Way' },
      { code: 'TE20', name: 'Marina Bay', interchanges: ['NSL', 'CCL'] },
      { code: 'TE22', name: 'Gardens by the Bay' },
      { code: 'TE23', name: 'Tanjong Rhu' },
      { code: 'TE24', name: 'Katong Park' },
      { code: 'TE25', name: 'Tanjong Katong' },
      { code: 'TE26', name: 'Marine Parade' },
      { code: 'TE27', name: 'Marine Terrace' },
      { code: 'TE28', name: 'Siglap' },
      { code: 'TE29', name: 'Bayshore' }
    ]
  }
];

export const INTERCHANGE_HUBS: InterchangeHub[] = [
  {
    id: 'jurong-east',
    name: 'Jurong East Integrated Transport Hub',
    code: 'JEITH',
    address: '60 Jurong Gateway Road, Singapore 608548',
    operatingHours: '05:00 – 01:15 Daily',
    passengerServicePhone: '+65 6563 8812',
    connectedMrt: ['NS1 North-South Line', 'EW24 East-West Line'],
    description: 'Major multimodal gateway in the west, directly integrated with Westgate, Jem, and Jurong East MRT station concourses with air-conditioned passenger waiting areas.',
    berths: [
      { berthNumber: 'Berth 1', services: ['41', '49', '51'], destination: 'Jalan Anak Bukit / Hougang Central', queueType: 'Double' },
      { berthNumber: 'Berth 2', services: ['52', '66', '78'], destination: 'Bishan / Beauty World / Clementi', queueType: 'Wheelchair-priority' },
      { berthNumber: 'Berth 3', services: ['79', '97', '97e'], destination: 'Boon Lay / Marina Centre', queueType: 'Single' },
      { berthNumber: 'Berth 4', services: ['98', '98M', '105'], destination: 'Jurong Island / Serangoon', queueType: 'Double' },
      { berthNumber: 'Berth 5', services: ['143', '143M'], destination: 'Toa Payoh Int via Pasir Panjang', queueType: 'Double' },
      { berthNumber: 'Berth 6', services: ['160', '170X'], destination: 'JB Sentral Terminal (Cross-Border)', queueType: 'Double' },
      { berthNumber: 'Berth 7', services: ['183', '197'], destination: 'Science Park II / Bedok Int', queueType: 'Single' },
      { berthNumber: 'Berth 8', services: ['333', '334', '335'], destination: 'Jurong East & West Feeders', queueType: 'Wheelchair-priority' }
    ],
    facilities: [
      { name: 'Nursing Room with Water Dispenser', available: true, notes: 'Level 1 near Berth 3 (Keycard via Service Counter)' },
      { name: 'Barrier-Free Wheelchair Ramps & Lifts', available: true, notes: 'Full barrier-free connection to MRT mezzanine' },
      { name: 'SimplyGo Ticket Office & Add Value Machines', available: true, notes: 'Operating 08:00 – 21:00 daily' },
      { name: 'Bicycle Parking Racks (Dual-tier)', available: true, notes: '120 sheltered bays adjacent to Exit D' },
      { name: 'Passenger Service Office & Lost & Found', available: true, notes: 'Open during all operating hours' },
      { name: 'Priority Commuter Seating Area', available: true, notes: 'Air-conditioned priority seats at all berths' }
    ]
  },
  {
    id: 'woodlands',
    name: 'Woodlands Integrated Transport Hub',
    code: 'WITH',
    address: '30 Woodlands Square, Singapore 737712',
    operatingHours: '05:15 – 01:25 Daily',
    passengerServicePhone: '+65 6368 4410',
    connectedMrt: ['NS9 North-South Line', 'TE2 Thomson-East Coast Line'],
    description: 'Northern regional transport hub situated underground beneath Causeway Point, providing seamless air-conditioned transfers between rail and 28 trunk/feeder bus services.',
    berths: [
      { berthNumber: 'Berth 1', services: ['161', '168'], destination: 'Hougang Central / Bedok Int via SLE/TPE', queueType: 'Double' },
      { berthNumber: 'Berth 2', services: ['178', '187'], destination: 'Boon Lay / Boon Lay via Bukit Batok', queueType: 'Single' },
      { berthNumber: 'Berth 3', services: ['856', '858'], destination: 'Yishun / Changi Airport Terminal 1-4', queueType: 'Wheelchair-priority' },
      { berthNumber: 'Berth 4', services: ['900', '901', '901M'], destination: 'Woodlands Ring / Champions Way', queueType: 'Double' },
      { berthNumber: 'Berth 5', services: ['903', '904'], destination: 'Woodlands Train Checkpoint / Crescent', queueType: 'Single' },
      { berthNumber: 'Berth 6', services: ['911', '912', '913'], destination: 'Woodlands Intratown Feeders', queueType: 'Wheelchair-priority' },
      { berthNumber: 'Berth 7', services: ['925', '950'], destination: 'Choa Chu Kang / JB Kotaraya', queueType: 'Single' },
      { berthNumber: 'Berth 8', services: ['960', '961', '963'], destination: 'Marina Centre / Geylang / HarbourFront', queueType: 'Double' }
    ],
    facilities: [
      { name: 'Nursing Room with Diaper Changing Station', available: true, notes: 'Concourse Level opposite Berth 4' },
      { name: 'Direct Underpass to Causeway Point', available: true, notes: 'Level B1 step-free connection' },
      { name: 'SimplyGo Transit Ticketing Kiosks', available: true, notes: '6 units available at main foyer' },
      { name: 'Heartbeat First Aid & AED Station', available: true, notes: 'Mounted at Customer Counter' },
      { name: 'Sheltered Bicycle Parking', available: true, notes: '180 spaces with CCTV coverage' },
      { name: 'Sensory Relief Room for Commuters', available: true, notes: 'Quiet space for special needs commuters' }
    ]
  },
  {
    id: 'bedok',
    name: 'Bedok Integrated Transport Hub',
    code: 'BITH',
    address: '20A Bedok North Drive, Singapore 465492',
    operatingHours: '05:15 – 01:00 Daily',
    passengerServicePhone: '+65 6443 7091',
    connectedMrt: ['EW5 East-West Line'],
    description: 'Premier eastern integrated hub connected to Bedok Mall, featuring air-conditioned concourses, LED destination guidance, and eco-friendly natural ventilation towers.',
    berths: [
      { berthNumber: 'Berth 1', services: ['7', '9', '14'], destination: 'Clementi / Changi Airfreight / Orchard', queueType: 'Double' },
      { berthNumber: 'Berth 2', services: ['16', '17', '18'], destination: 'Marine Parade / Bedok North Loop / Tampines', queueType: 'Single' },
      { berthNumber: 'Berth 3', services: ['26', '28', '30'], destination: 'Toa Payoh / Boon Lay via Telok Blangah', queueType: 'Double' },
      { berthNumber: 'Berth 4', services: ['32', '33', '35'], destination: 'Buona Vista / Kent Ridge / ALPS Ave', queueType: 'Single' },
      { berthNumber: 'Berth 5', services: ['40', '60', '66'], destination: 'Tanjong Katong / Eunos / Beauty World', queueType: 'Single' },
      { berthNumber: 'Berth 6', services: ['69', '87', '168'], destination: 'Tampines / Sengkang / Woodlands Int', queueType: 'Double' },
      { berthNumber: 'Berth 7', services: ['222', '225G', '225W'], destination: 'Chai Chee & Bedok South Feeders', queueType: 'Wheelchair-priority' }
    ],
    facilities: [
      { name: 'Air-conditioned Passenger Concourse', available: true, notes: 'Fully enclosed with automatic boarding doors' },
      { name: 'Nursing Room with Privacy Curtain', available: true, notes: 'Located near Berth 2' },
      { name: 'Wheelchair Charging Point', available: true, notes: 'Complimentary power plug at Berth 5' },
      { name: 'Direct Link to Bedok MRT & Bedok Mall', available: true, notes: 'Step-free level 1 walk' },
      { name: 'Passenger Service Office & Lost Property', available: true, notes: 'Operates 05:30 – 00:30' }
    ]
  },
  {
    id: 'tampines',
    name: 'Tampines Bus Interchange',
    code: 'TBI',
    address: '512 Tampines Central 1, Singapore 520512',
    operatingHours: '05:00 – 01:20 Daily',
    passengerServicePhone: '+65 6788 1201',
    connectedMrt: ['EW2 East-West Line', 'DT32 Downtown Line'],
    description: 'High-capacity regional interchange serving the eastern town centre, situated between Tampines 1 and Tampines Mall.',
    berths: [
      { berthNumber: 'Berth 1', services: ['3', '4', '8'], destination: 'Punggol / Changi Prison / Toa Payoh', queueType: 'Double' },
      { berthNumber: 'Berth 2', services: ['10', '19', '20'], destination: 'Kent Ridge / Changi Cargo / Changi Airport', queueType: 'Single' },
      { berthNumber: 'Berth 3', services: ['22', '23', '28'], destination: 'Ang Mo Kio / Rochor / Toa Payoh', queueType: 'Double' },
      { berthNumber: 'Berth 4', services: ['29', '31', '37'], destination: 'Changi Village / Toa Payoh / Changi North', queueType: 'Single' },
      { berthNumber: 'Berth 5', services: ['65', '67', '72'], destination: 'HarbourFront / Choa Chu Kang / Yio Chu Kang', queueType: 'Double' },
      { berthNumber: 'Berth 6', services: ['291', '292', '293'], destination: 'Tampines East, West & North Feeders', queueType: 'Wheelchair-priority' }
    ],
    facilities: [
      { name: 'Nursing Room & Infant Amenities', available: true, notes: 'Main concourse adjacent to Berth 3' },
      { name: 'Customer Service Centre', available: true, notes: 'SBS Transit customer assistance desk' },
      { name: 'Top-Up Machines (Nets / Credit / Cash)', available: true, notes: '8 self-service kiosks' },
      { name: 'Accessible Public Restrooms', available: true, notes: 'Upgraded with anti-slip flooring and panic buttons' }
    ]
  }
];

export const CIVIC_ANNOUNCEMENTS: CivicAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Early Morning Rail Discount Scheme Extended',
    date: '04 Oct 2026',
    category: 'Civic Notice',
    urgent: false,
    summary: 'Commuters who tap into any MRT or LRT station before 7:45 AM on weekdays continue to enjoy up to $0.50 discount off their fare.',
    content: 'The Public Transport Council (PTC) confirms the continuation of the Early Morning Rail Travel Discount. Commuters using stored-value transit cards or contactless bank cards who tap in at any MRT or LRT station across the network before 07:45 hrs on Mondays to Fridays (excluding public holidays) will enjoy up to $0.50 off their rail fare. If the rail fare is $0.50 or less, the journey will be free of charge.',
    affectedRoutes: ['All MRT & LRT Lines']
  },
  {
    id: 'ann-2',
    title: 'Thomson-East Coast Line Stage 4 Full Operations Update',
    date: '28 Sep 2026',
    category: 'Facility Upgrade',
    urgent: false,
    summary: 'TEL Stage 4 stations (Tanjong Rhu to Bayshore) now operating with 3-minute peak train intervals.',
    content: 'All seven stations from Tanjong Rhu to Bayshore are fully operational with enhanced signage and barrier-free linkways. Bus routes 11, 30, and 36 have been optimized to offer direct feeder connections to TEL stations along Marine Parade and Marine Terrace.',
    affectedRoutes: ['TEL Line', 'Bus 11', 'Bus 30', 'Bus 36']
  },
  {
    id: 'ann-3',
    title: 'Planned Track Maintenance on East-West Line (Kallang to Bugis)',
    date: '02 Oct 2026',
    category: 'Service Advisory',
    urgent: true,
    summary: 'Early closure at 23:00 hrs on selected Fridays and Saturdays for power rail sleeper renewals.',
    content: 'To facilitate scheduled power rail and track switch renewal works, train services on the East-West Line between EW10 Kallang and EW12 Bugis will end earlier at 23:00 hrs on upcoming Friday and Saturday evenings. Shuttle Bus Service 6 will operate along the affected stretch connecting Bugis, Lavender, and Kallang stations at 3 to 5-minute frequencies.',
    affectedRoutes: ['EWL Kallang – Bugis', 'Shuttle Bus 6']
  },
  {
    id: 'ann-4',
    title: 'Route Diversion for Civic District Cultural Night Festival',
    date: '15 Sep 2026',
    category: 'Route Diversion',
    urgent: false,
    summary: 'Bus services 75, 77, 106, 167, and 171 will temporarily skip bus stops along Connaught Drive and St. Andrew’s Road.',
    content: 'In conjunction with the annual cultural festivities in the Civic District, Connaught Drive and St. Andrew’s Road will be closed to vehicular traffic. Commuters are advised to board affected services at alternative stops along North Bridge Road or Raffles Avenue.',
    affectedRoutes: ['Bus 75', 'Bus 77', 'Bus 106', 'Bus 167', 'Bus 171']
  }
];

export const SAMPLE_JOURNEY_PRESETS = [
  { origin: 'Woodlands Temp Int (46009)', destination: 'Raffles Place MRT (EW14/NS26)' },
  { origin: 'Dhoby Ghaut Stn (08057)', destination: 'Changi Airport Terminal 3' },
  { origin: 'Jurong East Int (28009)', destination: 'Orchard Stn / Tang Plaza (09047)' },
  { origin: 'Marina Bay Sands (03509)', destination: 'Bugis Stn Exit A (01113)' }
];

export const SAMPLE_JOURNEY_ROUTES: Record<string, JourneyRoute[]> = {
  default: [
    {
      id: 'route-fastest',
      label: 'Fastest Route (Rail Direct)',
      durationMin: 28,
      fareAdult: 1.84,
      fareStudent: 0.88,
      fareSenior: 1.08,
      walkDistanceMeters: 280,
      transfersCount: 0,
      steps: [
        {
          mode: 'WALK',
          instruction: 'Walk 120m to Station Concourse',
          subtext: 'Take Escalator to North-South Line Platform A',
          durationMin: 3
        },
        {
          mode: 'MRT',
          instruction: 'Board North-South Line (Red)',
          subtext: 'Toward Marina South Pier (11 Stations)',
          lineColor: '#d42e12',
          badge: 'NSL',
          stopsCount: 11,
          durationMin: 22
        },
        {
          mode: 'WALK',
          instruction: 'Alight at Destination Platform and Exit via Gantry 2',
          subtext: 'Underground pedestrian link to destination',
          durationMin: 3
        }
      ]
    },
    {
      id: 'route-bus-express',
      label: 'Feeder Bus + Express Transit',
      durationMin: 34,
      fareAdult: 2.12,
      fareStudent: 0.95,
      fareSenior: 1.15,
      walkDistanceMeters: 180,
      transfersCount: 1,
      steps: [
        {
          mode: 'WALK',
          instruction: 'Walk 80m to Bus Berth',
          subtext: 'Berth 2 sheltered walkway',
          durationMin: 2
        },
        {
          mode: 'BUS',
          instruction: 'Board Bus 190 (Express via PIE)',
          subtext: 'Towards Kampong Bahru Ter (6 Stops)',
          lineColor: '#6c1d7e',
          badge: 'Bus 190',
          stopsCount: 6,
          durationMin: 24
        },
        {
          mode: 'WALK',
          instruction: 'Transfer: Walk 60m to connecting service or destination',
          durationMin: 3
        },
        {
          mode: 'BUS',
          instruction: 'Board Bus 7 (Connecting Trunk)',
          subtext: 'Towards Bedok Int (3 Stops)',
          lineColor: '#5e1770',
          badge: 'Bus 7',
          stopsCount: 3,
          durationMin: 5
        }
      ]
    },
    {
      id: 'route-scenic',
      label: 'Fewest Transfers (Trunk Bus Direct)',
      durationMin: 42,
      fareAdult: 1.62,
      fareStudent: 0.75,
      fareSenior: 0.98,
      walkDistanceMeters: 120,
      transfersCount: 0,
      steps: [
        {
          mode: 'WALK',
          instruction: 'Walk 60m to Roadside Bus Stop',
          durationMin: 1
        },
        {
          mode: 'BUS',
          instruction: 'Board Bus 65 (Direct Trunk)',
          subtext: 'Towards Tampines Int via MacPherson (18 Stops)',
          lineColor: '#5e1770',
          badge: 'Bus 65',
          stopsCount: 18,
          durationMin: 39
        },
        {
          mode: 'WALK',
          instruction: 'Alight and walk 60m to final destination',
          durationMin: 2
        }
      ]
    }
  ]
};
