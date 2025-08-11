import React from 'react';
import { Copy, ExternalLink, QrCode, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SocialShare from './Social/SocialShare';

const SuccessCard = ({ result, onQRCode, onCopy }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Shortened URL',
          text: 'Check out this shortened URL:',
          url: result.short_url,
        });
        toast.success('Shared successfully!');
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copy
      onCopy(result.short_url);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied!`);
  };

  return (
    <div className="gradient-border animate-slide-up">
      <div className="gradient-border-inner p-6">
        {/* Header with animated icon */}
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle shadow-lg">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            🎉 Success! Your link is ready
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Your URL has been shortened and is ready to share
          </p>
        </div>

        {/* Short URL Display */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <span className="mr-2">🔗</span>
              Shortened Link
            </label>
            <div className="relative">
              <input
                type="text"
                value={result.short_url}
                readOnly
                className="input pr-12 font-mono text-sm bg-gray-50 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600"
                onClick={() => copyToClipboard(result.short_url, 'URL')}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-2 py-1 rounded">
                  Click to copy
                </span>
              </div>
            </div>
          </div>

          {/* Original URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
              <span className="mr-2">📄</span>
              Original Link
            </label>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-300 break-all font-mono">
                {result.original_url}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => onCopy(result.short_url)}
            className="btn btn-primary flex items-center justify-center space-x-2 py-3"
          >
            <Copy size={18} />
            <span>Copy</span>
          </button>
          
          <button
            onClick={onQRCode}
            className="btn btn-secondary flex items-center justify-center space-x-2 py-3"
          >
            <QrCode size={18} />
            <span>QR Code</span>
          </button>
          
          <a
            href={result.short_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary flex items-center justify-center space-x-2 py-3"
          >
            <ExternalLink size={18} />
            <span>Open</span>
          </a>
          
          <SocialShare 
            url={result.short_url}
            title="Check out this shortened link!"
                            description="Created with URLShortener"
          />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {result.short_code.length}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400">Characters</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">
              {Math.round((1 - result.short_url.length / result.original_url.length) * 100)}%
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Shorter</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {result.expires_at ? '⏰' : '∞'}
            </div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              {result.expires_at ? 'Expires' : 'Permanent'}
            </div>
          </div>
        </div>

        {/* Expiration Warning */}
        {result.expires_at && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg animate-pulse-gentle">
            <div className="flex items-center text-amber-700 dark:text-amber-300 text-sm">
              <span className="mr-2">⚠️</span>
              <span>
                This link will expire on{' '}
                <strong>{new Date(result.expires_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessCard;
