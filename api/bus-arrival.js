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

      return {
        serviceNo: s.ServiceNo,
        operator: s.Operator,
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
