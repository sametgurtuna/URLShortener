const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');

// Analytics endpoint
router.get('/', async (req, res) => {
  try {
    const { timeRange = '7d' } = req.query;
    const db = req.db;
    
    // Time range calculation
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '24h':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get overview stats
    const overview = await db.getAnalyticsOverview(startDate);
    
    // Get clicks over time
    const clicksOverTime = await db.getClicksOverTime(startDate, timeRange);
    
    // Get top countries (demo data for now)
    const topCountries = [
      { country: 'Turkey', clicks: Math.floor(Math.random() * 500), flag: '🇹🇷' },
      { country: 'United States', clicks: Math.floor(Math.random() * 300), flag: '🇺🇸' },
      { country: 'Germany', clicks: Math.floor(Math.random() * 200), flag: '🇩🇪' },
      { country: 'France', clicks: Math.floor(Math.random() * 150), flag: '🇫🇷' },
      { country: 'United Kingdom', clicks: Math.floor(Math.random() * 100), flag: '🇬🇧' }
    ].sort((a, b) => b.clicks - a.clicks);

    // Get device breakdown (demo data)
    const devices = [
      { name: 'Mobile', value: 65, color: '#3b82f6' },
      { name: 'Desktop', value: 30, color: '#10b981' },
      { name: 'Tablet', value: 5, color: '#f59e0b' }
    ];

    // Get time of day data (demo)
    const timeOfDay = Array.from({ length: 12 }, (_, i) => ({
      hour: String(i * 2).padStart(2, '0'),
      clicks: Math.floor(Math.random() * 100)
    }));

    // Get top URLs
    const topUrls = await db.getTopUrls(startDate);

    res.json({
      overview,
      clicksOverTime,
      topCountries,
      devices,
      timeOfDay,
      topUrls
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Record click analytics
router.post('/click', async (req, res) => {
  try {
    const { shortCode, userAgent, ip } = req.body;
    const db = req.db;
    
    // Get geo data
    const geo = geoip.lookup(ip) || { country: 'Unknown', city: 'Unknown' };
    
    // Detect device type
    const deviceType = detectDeviceType(userAgent);
    
    // Record analytics
    await db.recordClickAnalytics({
      shortCode,
      ip,
      userAgent,
      country: geo.country,
      city: geo.city,
      deviceType,
      timestamp: new Date()
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Click analytics error:', error);
    res.status(500).json({ error: 'Failed to record analytics' });
  }
});

// Device detection helper
function detectDeviceType(userAgent) {
  if (!userAgent) return 'Unknown';
  
  const ua = userAgent.toLowerCase();
  
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'Mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'Tablet';
  } else {
    return 'Desktop';
  }
}

module.exports = router;
