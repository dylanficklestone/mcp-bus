// /api/bus-arrival.js
// Proxies and formats LTA DataMall v3 Bus Arrival API requests
// Documentation: GET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
// Required Header: AccountKey: <process.env.LTA_ACCOUNT_KEY>

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');
  // Cache for 20 seconds as recommended by LTA DataMall (data refreshes every 20 seconds)
  res.setHeader('Cache-Control', 'public, s-maxage=20, stale-while-revalidate=10');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only GET requests are supported on this endpoint'
    });
  }

  const { BusStopCode, busStopCode, ServiceNo, serviceNo } = req.query || {};
  const stopCode = BusStopCode || busStopCode;
  const svcNo = ServiceNo || serviceNo;

  if (!stopCode) {
    return res.status(400).json({
      error: 'Missing Required Parameter',
      message: 'BusStopCode is the only required parameter (e.g., /api/bus-arrival?BusStopCode=04121)'
    });
  }

  const accountKey = process.env.LTA_ACCOUNT_KEY?.trim();

  if (!accountKey) {
    return res.status(503).json({
      error: 'LTA_ACCOUNT_KEY Not Configured',
      message: 'The LTA_ACCOUNT_KEY environment variable is not set. Please add LTA_ACCOUNT_KEY to your Vercel project environment variables.',
      docs: 'https://datamall.lta.gov.sg/content/datamall/en/request-for-api.html',
      requestedStop: stopCode,
      requestedService: svcNo || null
    });
  }

  try {
    let ltaUrl = `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${encodeURIComponent(stopCode)}`;
    if (svcNo) {
      ltaUrl += `&ServiceNo=${encodeURIComponent(svcNo)}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(ltaUrl, {
      method: 'GET',
      headers: {
        'AccountKey': accountKey,
        'accept': 'application/json',
        'User-Agent': 'PublicTransitPortal-SG/1.0'
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({
        error: 'LTA DataMall API Error',
        statusCode: response.status,
        statusText: response.statusText,
        details: errText
      });
    }

    const data = await response.json();

    // Destination resolution dictionary for Singapore Bus Terminals & Interchanges
    const DESTINATION_NAMES = {
      '01012': 'Hotel Grand Pacific (Victoria St)',
      '01113': 'Bugis Stn Exit A',
      '02049': 'Marina Centre Ter',
      '02059': 'Marina Centre Ter (Raffles Ave)',
      '03019': 'Shenton Way Ter',
      '03211': 'Opp The Treasury (High St)',
      '03509': 'Marina Bay Sands Hotel',
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
      '14009': 'HarbourFront Int',
      '14141': 'VivoCity',
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
      '48009': 'Sembawang Int',
      '52009': 'Toa Payoh Int',
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

    const SERVICE_TERMINALS = {
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

    const resolveDestination = (destCode, serviceNo) => {
      if (!destCode || destCode === '0' || destCode === '') return 'Loop Service';
      if (DESTINATION_NAMES[destCode]) return DESTINATION_NAMES[destCode];
      if (serviceNo && SERVICE_TERMINALS[serviceNo]) return SERVICE_TERMINALS[serviceNo];
      return `Terminus (${destCode})`;
    };

    // Helper to calculate minutes difference from ISO 8601 string
    const calcMinutesRemaining = (estimatedIso) => {
      if (!estimatedIso) return null;
      const targetTime = new Date(estimatedIso).getTime();
      const now = Date.now();
      const diffMs = targetTime - now;
      if (isNaN(diffMs)) return null;
      const diffMin = Math.round(diffMs / 60000);
      return Math.max(0, diffMin);
    };

    // Transform services for frontend convenience
    const formattedServices = (data.Services || []).map((s) => {
      const parseBus = (busObj) => {
        if (!busObj || !busObj.EstimatedArrival) return null;
        return {
          estimatedArrival: busObj.EstimatedArrival,
          estimatedArrivalMin: calcMinutesRemaining(busObj.EstimatedArrival),
          load: busObj.Load || 'SEA', // SEA, SDA, LSD
          feature: busObj.Feature || '', // WAB
          type: busObj.Type || 'SD', // SD, DD, BD
          latitude: busObj.Latitude ? parseFloat(busObj.Latitude) : null,
          longitude: busObj.Longitude ? parseFloat(busObj.Longitude) : null,
          originCode: busObj.OriginCode,
          destinationCode: busObj.DestinationCode
        };
      };

      const destCode = s.NextBus?.DestinationCode || s.NextBus2?.DestinationCode || s.NextBus3?.DestinationCode || '';

      return {
        serviceNo: s.ServiceNo,
        operator: s.Operator,
        destinationCode: destCode,
        destinationName: resolveDestination(destCode, s.ServiceNo),
        nextBus: parseBus(s.NextBus),
        nextBus2: parseBus(s.NextBus2),
        nextBus3: parseBus(s.NextBus3)
      };
    });

    return res.status(200).json({
      odata_metadata: data['odata.metadata'],
      BusStopCode: data.BusStopCode || stopCode,
      Services: data.Services || [],
      formattedServices,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    if (err.name === 'AbortError') {
      return res.status(504).json({
        error: 'Gateway Timeout',
        message: 'LTA DataMall API did not respond within 8 seconds'
      });
    }

    return res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'Failed to fetch bus arrival data from LTA DataMall'
    });
  }
}
