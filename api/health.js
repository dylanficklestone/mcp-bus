// /api/health.js
// Health check and system diagnostic endpoint for Vercel Serverless Functions

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, AccountKey');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only GET requests are supported on this endpoint'
    });
  }

  const hasLtaKey = Boolean(process.env.LTA_ACCOUNT_KEY && process.env.LTA_ACCOUNT_KEY.trim().length > 0);

  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime ? Math.floor(process.uptime()) : undefined,
    apis: {
      busArrival: {
        path: '/api/bus-arrival',
        description: 'LTA DataMall v3 Bus Arrival Telemetry',
        accountKeyConfigured: hasLtaKey,
        targetEndpoint: 'https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival'
      }
    },
    message: hasLtaKey
      ? 'All APIs configured and ready'
      : 'API server is running. LTA_ACCOUNT_KEY environment variable pending configuration in Vercel.'
  };

  return res.status(200).json(healthData);
}
