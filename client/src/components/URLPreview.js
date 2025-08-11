import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, Calendar, MousePointer } from 'lucide-react';

const URLPreview = ({ url, shortUrl, clicks, createdAt, isVisible, position }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsLoaded(true);
    } else {
      const timer = setTimeout(() => setIsLoaded(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible && !isLoaded) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'Invalid URL';
    }
  };

  const getFavicon = (url) => {
    try {
      const domain = new URL(url).origin;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <div
      className={`fixed z-50 pointer-events-none transition-all duration-200 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 max-w-xs">
        {/* Header */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex-shrink-0">
            {getFavicon(url) ? (
              <img
                src={getFavicon(url)}
                alt=""
                className="w-8 h-8 rounded"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded flex items-center justify-center">
                <Globe size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
              {getDomain(url)}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {shortUrl}
            </p>
          </div>
        </div>

        {/* URL */}
        <div className="mb-3">
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 break-all">
            {url}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MousePointer size={12} />
            <span>{clicks} clicks</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>{formatDate(createdAt)}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center text-xs text-gray-400 dark:text-gray-500">
            <ExternalLink size={12} className="mr-1" />
            Click to open
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLPreview;
