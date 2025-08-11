import React, { useState } from 'react';
import { Crown, Star, Zap, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const PremiumGate = ({ feature, children, fallback = null }) => {
  const { isPremium, upgradeToPremium } = useAuth();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  if (isPremium) {
    return children;
  }

  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
  };

  const handleUpgrade = () => {
    upgradeToPremium();
    setShowUpgradeModal(false);
  };

  return (
    <>
      {fallback || (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-lg blur-sm"></div>
          <div className="relative bg-white dark:bg-gray-800 border-2 border-dashed border-yellow-400 rounded-lg p-6 text-center">
            <div className="mb-4">
              <Crown size={48} className="text-yellow-500 mx-auto mb-2 animate-bounce" />
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                🌟 Premium Feature
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature} is available for Premium users only
              </p>
            </div>
            
            <button
              onClick={handleUpgradeClick}
              className="btn btn-primary bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 px-6 animate-pulse"
            >
              <Crown size={16} className="mr-2" />
              Upgrade to Premium
            </button>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Upgrade to Premium
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Unlock all premium features and boost your productivity!
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {[
                { icon: Zap, text: 'Custom Short Codes', color: 'text-blue-500' },
                { icon: Sparkles, text: 'Custom QR Code Designs', color: 'text-purple-500' },
                { icon: Shield, text: 'Advanced Analytics', color: 'text-green-500' },
                { icon: Star, text: 'Priority Support', color: 'text-yellow-500' },
                { icon: CheckCircle, text: 'No Limits', color: 'text-indigo-500' }
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <feature.icon size={20} className={feature.color} />
                  <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  <span className="line-through text-gray-400 text-xl mr-2">$9.99</span>
                  FREE
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Demo version - All features unlocked!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleUpgrade}
                className="btn btn-primary bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold flex-1 py-3"
              >
                <Crown size={16} className="mr-2" />
                Get Premium Now!
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="btn btn-secondary px-6"
              >
                Later
              </button>
            </div>

            {/* Demo Note */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                💡 This is a demo. In production, this would integrate with a payment processor.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PremiumGate;
