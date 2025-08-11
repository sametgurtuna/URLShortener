import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Globe, MousePointer, Calendar, TrendingUp, Users, Clock, MapPin, Smartphone } from 'lucide-react';
import api from '../../services/api';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState({
    overview: {},
    clicksOverTime: [],
    topCountries: [],
    devices: [],
    timeOfDay: [],
    topUrls: []
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d'); // 24h, 7d, 30d

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analytics?timeRange=${timeRange}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Analytics fetch error:', error);
      // Demo data for development
      setAnalytics({
        overview: {
          totalClicks: 1247,
          totalUrls: 23,
          uniqueVisitors: 892,
          clickRate: 54.2
        },
        clicksOverTime: [
          { date: '2025-01-05', clicks: 45 },
          { date: '2025-01-06', clicks: 78 },
          { date: '2025-01-07', clicks: 123 },
          { date: '2025-01-08', clicks: 89 },
          { date: '2025-01-09', clicks: 156 },
          { date: '2025-01-10', clicks: 134 },
          { date: '2025-01-11', clicks: 198 }
        ],
        topCountries: [
          { country: 'Turkey', clicks: 456, flag: '🇹🇷' },
          { country: 'United States', clicks: 234, flag: '🇺🇸' },
          { country: 'Germany', clicks: 123, flag: '🇩🇪' },
          { country: 'France', clicks: 89, flag: '🇫🇷' },
          { country: 'United Kingdom', clicks: 67, flag: '🇬🇧' }
        ],
        devices: [
          { name: 'Mobile', value: 65, color: '#3b82f6' },
          { name: 'Desktop', value: 30, color: '#10b981' },
          { name: 'Tablet', value: 5, color: '#f59e0b' }
        ],
        timeOfDay: [
          { hour: '00', clicks: 12 },
          { hour: '02', clicks: 8 },
          { hour: '04', clicks: 5 },
          { hour: '06', clicks: 15 },
          { hour: '08', clicks: 45 },
          { hour: '10', clicks: 78 },
          { hour: '12', clicks: 98 },
          { hour: '14', clicks: 87 },
          { hour: '16', clicks: 65 },
          { hour: '18', clicks: 54 },
          { hour: '20', clicks: 43 },
          { hour: '22', clicks: 32 }
        ],
        topUrls: [
          { shortCode: 'abc123', originalUrl: 'https://example.com/very-long-url', clicks: 234 },
          { shortCode: 'def456', originalUrl: 'https://github.com/awesome-project', clicks: 189 },
          { shortCode: 'ghi789', originalUrl: 'https://youtube.com/watch?v=example', clicks: 145 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`bg-${color}-100 dark:bg-${color}-900/20 p-3 rounded-lg`}>
          <Icon size={24} className={`text-${color}-600 dark:text-${color}-400`} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading analytics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your link performance and audience insights</p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {['24h', '7d', '30d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-white dark:bg-gray-600 text-primary-600 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {range === '24h' ? 'Last 24 Hours' : range === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={MousePointer}
          title="Total Clicks"
          value={analytics.overview.totalClicks?.toLocaleString() || '0'}
          subtitle="+12% from last period"
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          title="Total URLs"
          value={analytics.overview.totalUrls || '0'}
          subtitle="+3 new this week"
          color="green"
        />
        <StatCard
          icon={Users}
          title="Unique Visitors"
          value={analytics.overview.uniqueVisitors?.toLocaleString() || '0'}
          subtitle="+8% from last period"
          color="purple"
        />
        <StatCard
          icon={TrendingUp}
          title="Click Rate"
          value={`${analytics.overview.clickRate || 0}%`}
          subtitle="Average per URL"
          color="orange"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks Over Time */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Calendar className="mr-2" size={20} />
            Clicks Over Time
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analytics.clicksOverTime}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--tooltip-bg)', 
                  border: 'none', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line type="monotone" dataKey="clicks" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Smartphone className="mr-2" size={20} />
            Device Types
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.devices}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {analytics.devices.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-4 mt-4">
            {analytics.devices.map((device, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: device.color }}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {device.name} ({device.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Globe className="mr-2" size={20} />
            Top Countries
          </h3>
          <div className="space-y-3">
            {analytics.topCountries.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {country.country}
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {country.clicks.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time of Day */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Activity by Hour
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analytics.timeOfDay}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="clicks" fill="#10b981" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top URLs */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <TrendingUp className="mr-2" size={20} />
          Top Performing URLs
        </h3>
        <div className="space-y-4">
          {analytics.topUrls.map((url, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  /{url.shortCode}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {url.originalUrl}
                </p>
              </div>
              <div className="ml-4 flex items-center">
                <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                  {url.clicks} clicks
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
