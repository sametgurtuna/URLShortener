import React, { useState } from 'react';
import { Link2, Settings, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import QRCodeGenerator from './QRCodeGenerator';
import PremiumQRGenerator from './Premium/PremiumQRGenerator';
import SuccessCard from './SuccessCard';
import PremiumGate from './Premium/PremiumGate';
import SocialShare from './Social/SocialShare';
import { useAuth } from '../contexts/AuthContext';

const UrlShortener = ({ onUrlCreated }) => {
  const [formData, setFormData] = useState({
    url: '',
    customCode: '',
    expiresIn: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const { isPremium } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.shortenUrl(formData);
      setResult(response.data);
      toast.success('Link shortened successfully!');
      setFormData({ url: '', customCode: '', expiresIn: '' });
      if (onUrlCreated) onUrlCreated();
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Main Form */}
      <div className="card">
        <div className="text-center mb-6">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 floating-icon glow-effect">
            <Link2 size={32} className="text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            URL Shortener
          </h2>
          <p className="text-gray-600 dark:text-[#9CA3AF] mb-2">
            Transform your long URLs into short and shareable links
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL to Shorten
            </label>
            <input
              type="url"
              placeholder="https://example.com/very-long-url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="input"
              required
            />
          </div>

          {/* Advanced Options */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              <Settings size={16} />
              <span>Advanced Options</span>
            </button>
          </div>

          {showAdvanced && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg animate-slide-up">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Short Code (Optional)
                </label>
                <input
                  type="text"
                  placeholder="my-custom-link"
                  value={formData.customCode}
                  onChange={(e) => handleInputChange('customCode', e.target.value)}
                  className="input"
                  pattern="[a-zA-Z0-9_-]+"
                  minLength="3"
                  maxLength="20"
                />
                <p className="text-xs text-gray-500 mt-1">
                  3-20 characters, only letters, numbers, _ and - allowed
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock size={16} className="inline mr-1" />
                  Expiration Time (Hours)
                </label>
                <select
                  value={formData.expiresIn}
                  onChange={(e) => handleInputChange('expiresIn', e.target.value)}
                  className="input"
                >
                  <option value="">No Expiration</option>
                  <option value="1">1 Hour</option>
                  <option value="24">1 Day</option>
                  <option value="168">1 Week</option>
                  <option value="720">1 Month</option>
                  <option value="8760">1 Year</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full py-3 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Shortening...</span>
              </div>
            ) : (
              'Shorten Link'
            )}
          </button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <SuccessCard 
          result={result}
          onQRCode={() => setShowQR(true)}
          onCopy={handleCopy}
        />
      )}

      {/* QR Code Modal - Premium or Basic */}
      {result && (
        isPremium ? (
          <PremiumQRGenerator 
            url={result.short_url}
            isOpen={showQR}
            onClose={() => setShowQR(false)}
          />
        ) : (
          <QRCodeGenerator 
            url={result.short_url}
            isOpen={showQR}
            onClose={() => setShowQR(false)}
          />
        )
      )}
    </div>
  );
};

export default UrlShortener;
