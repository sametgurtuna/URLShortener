import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, MessageCircle, Copy, Mail, Link } from 'lucide-react';
import toast from 'react-hot-toast';

const SocialShare = ({ url, title = 'Check out this link!', description = 'Shortened with URLShortener' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title,
    text: description,
    url
  };

  // Native Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setIsOpen(true);
    }
  };

  // Platform-specific shares
  const shareToTwitter = () => {
    const text = `${title} ${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
    toast.success('Opened Twitter share!');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
    toast.success('Opened Facebook share!');
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
    toast.success('Opened LinkedIn share!');
  };

  const shareToWhatsApp = () => {
    const text = `${title} ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Opened WhatsApp share!');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(emailUrl);
    toast.success('Opened email client!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard!');
    setIsOpen(false);
  };

  const ShareButton = ({ onClick, icon: Icon, label, color, bgColor }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg ${bgColor} hover:opacity-90 transition-all duration-200 hover:scale-105`}
    >
      <Icon size={20} className={`text-${color}`} />
      <span className={`text-${color} font-medium`}>{label}</span>
    </button>
  );

  return (
    <div className="relative">
      {/* Share Trigger Button */}
      <button
        onClick={handleNativeShare}
        className="btn btn-secondary flex items-center space-x-2"
        title="Share this URL"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      {/* Custom Share Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
                <Share2 className="mr-2" size={24} />
                Share Link
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <span className="text-gray-500 dark:text-gray-400 text-xl">×</span>
              </button>
            </div>

            {/* URL Display */}
            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300 break-all font-mono">
                {url}
              </p>
            </div>

            {/* Share Options */}
            <div className="space-y-3">
              <ShareButton
                onClick={shareToTwitter}
                icon={Twitter}
                label="Share on Twitter"
                color="white"
                bgColor="bg-blue-500"
              />
              
              <ShareButton
                onClick={shareToFacebook}
                icon={Facebook}
                label="Share on Facebook"
                color="white"
                bgColor="bg-blue-600"
              />
              
              <ShareButton
                onClick={shareToLinkedIn}
                icon={Linkedin}
                label="Share on LinkedIn"
                color="white"
                bgColor="bg-blue-700"
              />
              
              <ShareButton
                onClick={shareToWhatsApp}
                icon={MessageCircle}
                label="Share on WhatsApp"
                color="white"
                bgColor="bg-green-500"
              />
              
              <ShareButton
                onClick={shareViaEmail}
                icon={Mail}
                label="Share via Email"
                color="white"
                bgColor="bg-gray-600"
              />
              
              <ShareButton
                onClick={copyToClipboard}
                icon={Copy}
                label="Copy Link"
                color="white"
                bgColor="bg-primary-600"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-secondary w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Quick Share Buttons (for inline use)
export const QuickShareButtons = ({ url, title, description }) => {
  const shareToTwitter = () => {
    const text = `${title} ${url}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied!');
  };

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
        title="Share on Twitter"
      >
        <Twitter size={16} className="text-white" />
      </button>
      
      <button
        onClick={shareToFacebook}
        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
        title="Share on Facebook"
      >
        <Facebook size={16} className="text-white" />
      </button>
      
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition-colors"
        title="Copy Link"
      >
        <Copy size={16} className="text-white" />
      </button>
    </div>
  );
};

export default SocialShare;
