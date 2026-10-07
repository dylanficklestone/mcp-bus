// /api/bus-stops.js
// Provides Singapore bus stops directory, supporting live LTA DataMall proxying or built-in comprehensive directory

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { search, region, skip } = req.query || {};
  const accountKey = process.env.LTA_ACCOUNT_KEY?.trim();

  // If LTA_ACCOUNT_KEY is configured and client explicitly requested live DataMall fetch
  if (accountKey && req.query.live === 'true') {
    try {
      const skipCount = parseInt(skip, 10) || 0;
      const ltaUrl = `https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skipCount}`;
      const response = await fetch(ltaUrl, {
        headers: {
          'AccountKey': accountKey,
          'accept': 'application/json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        return res.status(200).json(data);
      }
    } catch {
      // Fall through to built-in directory
    }
  }

  // Built-in directory of major stops
  const stops = [
    { code: '08057', name: 'Dhoby Ghaut Stn Exit B', roadName: 'Orchard Rd', region: 'Central' },
    { code: '09047', name: 'Orchard Stn / Tang Plaza', roadName: 'Orchard Blvd', region: 'Central' },
    { code: '09048', name: 'Orchard Stn / Lucky Plaza', roadName: 'Orchard Rd', region: 'Central' },
    { code: '09111', name: 'Somerset Stn', roadName: 'Somerset Rd', region: 'Central' },
    { code: '04121', name: 'Clarke Quay Stn Exit E', roadName: 'Eu Tong Sen St', region: 'Central' },
    { code: '04179', name: 'Boat Quay', roadName: 'South Bridge Rd', region: 'Central' },
    { code: '01113', name: 'Bugis Stn Exit A', roadName: 'Victoria St', region: 'Central' },
    { code: '01012', name: 'Hotel Grand Pacific', roadName: 'Victoria St', region: 'Central' },
    { code: '03509', name: 'Marina Bay Sands Hotel', roadName: 'Bayfront Ave', region: 'Central' },
    { code: '03019', name: 'Shenton Way Ter', roadName: 'Shenton Way', region: 'Central' },
    { code: '05019', name: 'Chinatown Stn Exit E', roadName: 'Eu Tong Sen St', region: 'Central' },
    { code: '10499', name: 'Kampong Bahru Ter', roadName: 'Spooner Rd', region: 'Central' },
    { code: '14009', name: 'HarbourFront Int', roadName: 'Seah Im Rd', region: 'Central' },
    { code: '14141', name: 'VivoCity', roadName: 'Telok Blangah Rd', region: 'Central' },
    { code: '28009', name: 'Jurong East Int', roadName: 'Jurong Gateway Rd', region: 'West' },
    { code: '17009', name: 'Clementi Int', roadName: 'Clementi Ave 3', region: 'West' },
    { code: '22009', name: 'Boon Lay Int', roadName: 'Jurong West Central 3', region: 'West' },
    { code: '40009', name: 'Bukit Batok Int', roadName: 'Bukit Batok Central', region: 'West' },
    { code: '43009', name: 'Choa Chu Kang Int', roadName: 'Choa Chu Kang Loop', region: 'West' },
    { code: '46009', name: 'Woodlands Temp Int', roadName: 'Woodlands Sq', region: 'North' },
    { code: '59009', name: 'Yishun Int', roadName: 'Yishun Ave 2', region: 'North' },
    { code: '48009', name: 'Sembawang Int', roadName: 'Sembawang Vista', region: 'North' },
    { code: '84009', name: 'Bedok Int', roadName: 'Bedok North Ave 1', region: 'East' },
    { code: '75009', name: 'Tampines Int', roadName: 'Tampines Central 1', region: 'East' },
    { code: '77009', name: 'Pasir Ris Int', roadName: 'Pasir Ris Central', region: 'East' },
    { code: '95009', name: 'Changi Airport PTB2', roadName: 'PTB2 Basement', region: 'East' },
    { code: '52009', name: 'Toa Payoh Int', roadName: 'Lor 6 Toa Payoh', region: 'North-East' },
    { code: '54009', name: 'Bishan Int', roadName: 'Bishan Place', region: 'North-East' },
    { code: '55009', name: 'Ang Mo Kio Int', roadName: 'Ang Mo Kio Ave 8', region: 'North-East' },
    { code: '64009', name: 'Hougang Central Int', roadName: 'Hougang Central', region: 'North-East' },
    { code: '65009', name: 'Sengkang Int', roadName: 'Sengkang Square', region: 'North-East' },
    { code: '66009', name: 'Serangoon Int', roadName: 'Serangoon Ave 2', region: 'North-East' },
    { code: '67009', name: 'Punggol Temp Int', roadName: 'Punggol Place', region: 'North-East' }
  ];

  let filtered = stops;
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(s => s.code.includes(q) || s.name.toLowerCase().includes(q) || s.roadName.toLowerCase().includes(q));
  }
  if (region && region !== 'All') {
    filtered = filtered.filter(s => s.region === region);
  }

  return res.status(200).json({
    total: filtered.length,
    busStops: filtered
  });
}
