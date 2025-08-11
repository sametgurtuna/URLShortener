import React, { useState, useEffect } from 'react';
import { Copy, ExternalLink, Trash2, BarChart3, Clock, AlertCircle, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../services/api';
import URLPreview from './URLPreview';
import QRCodeGenerator from './QRCodeGenerator';

const UrlList = ({ onRefresh }) => {
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const response = await api.getUrls();
      setUrls(response.data);
    } catch (error) {
      toast.error('Error loading URLs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied!');
  };

  const handleDelete = async (shortCode) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) {
      return;
    }

    setDeleteLoading(shortCode);
    try {
      await api.deleteUrl(shortCode);
      setUrls(urls.filter(url => url.short_code !== shortCode));
      toast.success('URL deleted successfully');
      if (onRefresh) onRefresh();
    } catch (error) {
      toast.error('Error deleting URL');
    } finally {
      setDeleteLoading(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const isExpired = (expiresAt) => {
    return expiresAt && new Date(expiresAt) < new Date();
  };

  const handleMouseEnter = (e, url) => {
    const rect = e.target.getBoundingClientRect();
    setPreviewPosition({ 
      x: rect.left, 
      y: rect.top 
    });
    setPreviewUrl(url);
  };

  const handleMouseLeave = () => {
    setPreviewUrl(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-16">
        <BarChart3 size={64} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          No Shortened Links Yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Use the \"Shorten Link\" tab to create your first shortened URL.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          Shortened Links ({urls.length})
        </h2>
        <button
          onClick={fetchUrls}
          className="btn btn-secondary"
        >
          Refresh
        </button>
      </div>

      <div className="grid gap-4">
        {urls.map((url, index) => (
          <div 
            key={url.id} 
            className="card animate-fade-in" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* URL Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 
                    className="font-medium text-gray-800 dark:text-white truncate cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    onMouseEnter={(e) => handleMouseEnter(e, url)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {url.short_url}
                  </h3>
                  {isExpired(url.expires_at) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <AlertCircle size={12} className="mr-1" />
                      Expired
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 break-all mb-2">
                  {url.original_url}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span>Created: {formatDate(url.created_at)}</span>
                  <span className="flex items-center">
                    <BarChart3 size={12} className="mr-1" />
                    {url.clicks} clicks
                  </span>
                  {url.expires_at && !isExpired(url.expires_at) && (
                    <span className="flex items-center text-amber-600">
                      <Clock size={12} className="mr-1" />
                      Expires: {formatDate(url.expires_at)}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(url.short_url)}
                  className="btn btn-secondary scale-on-hover"
                  title="Copy"
                >
                  <Copy size={16} />
                </button>
                
                <button
                  onClick={() => setQrUrl(url.short_url)}
                  className="btn btn-secondary scale-on-hover"
                  title="Generate QR Code"
                >
                  <QrCode size={16} />
                </button>
                
                <a
                  href={url.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary scale-on-hover"
                  title="Open"
                >
                  <ExternalLink size={16} />
                </a>
                
                <button
                  onClick={() => handleDelete(url.short_code)}
                  disabled={deleteLoading === url.short_code}
                  className="btn btn-danger scale-on-hover"
                  title="Delete"
                >
                  {deleteLoading === url.short_code ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 size={16} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* URL Preview */}
      {previewUrl && (
        <URLPreview
          url={previewUrl.original_url}
          shortUrl={previewUrl.short_url}
          clicks={previewUrl.clicks}
          createdAt={previewUrl.created_at}
          isVisible={!!previewUrl}
          position={previewPosition}
        />
      )}

      {/* QR Code Modal */}
      <QRCodeGenerator 
        url={qrUrl}
        isOpen={!!qrUrl}
        onClose={() => setQrUrl(null)}
      />
    </div>
  );
};

export default UrlList;
