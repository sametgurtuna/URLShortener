import React, { useEffect, useRef, useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, X, Palette, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import PremiumGate from './PremiumGate';

const PremiumQRGenerator = ({ url, isOpen, onClose }) => {
  const canvasRef = useRef();
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrConfig, setQrConfig] = useState({
    size: 256,
    margin: 2,
    background: '#ffffff',
    foreground: '#000000',
    style: 'squares', // squares, dots, rounded
    logo: null,
    gradient: false,
    gradientStart: '#3b82f6',
    gradientEnd: '#8b5cf6'
  });

  const { isPremium } = useAuth();

  const generateQR = useCallback(async () => {
    try {
      const canvas = canvasRef.current;
      const options = {
        width: qrConfig.size,
        margin: qrConfig.margin,
        color: {
          dark: qrConfig.gradient ? qrConfig.gradientStart : qrConfig.foreground,
          light: qrConfig.background
        },
        errorCorrectionLevel: 'M'
      };

      await QRCode.toCanvas(canvas, url, options);

      // Apply gradient if enabled
      if (qrConfig.gradient && isPremium) {
        applyGradient(canvas);
      }

      // Apply style modifications for premium users
      if (isPremium && qrConfig.style !== 'squares') {
        applyCustomStyle(canvas);
      }
      
      // Convert canvas to data URL for download
      const dataUrl = canvas.toDataURL('image/png');
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR code generation failed:', err);
      toast.error('QR code generation failed');
    }
  }, [url, qrConfig, isPremium]);

  useEffect(() => {
    if (url && canvasRef.current) {
      generateQR();
    }
  }, [url, qrConfig, generateQR]);



  const applyGradient = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, qrConfig.gradientStart);
    gradient.addColorStop(1, qrConfig.gradientEnd);
    
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  };

  const applyCustomStyle = (canvas) => {
    // Bu özellik premium users için gelişmiş QR stilleri uygular
    // Gerçek implementasyonda daha karmaşık pixel manipülasyonu olur
    const ctx = canvas.getContext('2d');
    
    if (qrConfig.style === 'rounded') {
      // Rounded corners effect (simplified)
      ctx.filter = 'blur(0.5px)';
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    }
  };

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      const filename = `qr-code-${qrConfig.style}-${Date.now()}.png`;
      link.download = filename;
      link.href = qrDataUrl;
      link.click();
      toast.success('Premium QR code downloaded!');
    }
  };

  const handleConfigChange = (key, value) => {
    setQrConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const colorPresets = [
    { name: 'Classic', bg: '#ffffff', fg: '#000000' },
    { name: 'Ocean', bg: '#f0f9ff', fg: '#0ea5e9' },
    { name: 'Forest', bg: '#f0fdf4', fg: '#16a34a' },
    { name: 'Sunset', bg: '#fff7ed', fg: '#ea580c' },
    { name: 'Purple', bg: '#faf5ff', fg: '#9333ea' },
    { name: 'Dark', bg: '#111827', fg: '#f9fafb' }
  ];

  const gradientPresets = [
    { name: 'Blue Ocean', start: '#3b82f6', end: '#06b6d4' },
    { name: 'Purple Rain', start: '#8b5cf6', end: '#ec4899' },
    { name: 'Sunset', start: '#f59e0b', end: '#ef4444' },
    { name: 'Forest', start: '#10b981', end: '#059669' },
    { name: 'Space', start: '#6366f1', end: '#1e40af' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <QrCode size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {isPremium ? (
                <span className="flex items-center">
                  <Crown size={18} className="text-yellow-500 mr-2" />
                  Premium QR Generator
                </span>
              ) : (
                'QR Code Generator'
              )}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* QR Code Preview */}
          <div className="text-center">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4 inline-block">
              <canvas 
                ref={canvasRef}
                className="max-w-full h-auto"
              />
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 break-all">
              {url}
            </p>

            <button
              onClick={downloadQR}
              className="btn btn-primary flex items-center justify-center space-x-2 w-full"
            >
              <Download size={16} />
              <span>Download {isPremium ? 'Premium ' : ''}QR Code</span>
            </button>
          </div>

          {/* Customization Panel */}
          <div className="space-y-6">
            {/* Basic Settings */}
            <div>
              <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                Basic Settings
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Size: {qrConfig.size}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={qrConfig.size}
                    onChange={(e) => handleConfigChange('size', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Margin: {qrConfig.margin}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="1"
                    value={qrConfig.margin}
                    onChange={(e) => handleConfigChange('margin', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Color Presets */}
            <div>
              <h4 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
                Color Presets
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleConfigChange('background', preset.bg);
                      handleConfigChange('foreground', preset.fg);
                      handleConfigChange('gradient', false);
                    }}
                    className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    style={{ 
                      background: `linear-gradient(45deg, ${preset.bg} 50%, ${preset.fg} 50%)` 
                    }}
                  >
                    <span className="text-xs font-medium text-gray-700">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Features */}
            <PremiumGate feature="Custom Colors & Gradients">
              <div className="space-y-4">
                {/* Gradient Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Gradient
                  </span>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qrConfig.gradient}
                      onChange={(e) => handleConfigChange('gradient', e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`relative w-10 h-6 rounded-full transition-colors ${qrConfig.gradient ? 'bg-primary-600' : 'bg-gray-300'}`}>
                      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${qrConfig.gradient ? 'translate-x-4' : ''}`}></div>
                    </div>
                  </label>
                </div>

                {/* Gradient Presets */}
                {qrConfig.gradient && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gradient Presets
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {gradientPresets.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleConfigChange('gradientStart', preset.start);
                            handleConfigChange('gradientEnd', preset.end);
                          }}
                          className="p-2 border rounded-lg hover:opacity-80 transition-opacity text-xs text-white font-medium"
                          style={{ 
                            background: `linear-gradient(45deg, ${preset.start}, ${preset.end})` 
                          }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Style Options */}
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    QR Style
                  </h5>
                  <div className="grid grid-cols-3 gap-2">
                    {['squares', 'dots', 'rounded'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handleConfigChange('style', style)}
                        className={`p-2 border rounded-lg text-xs font-medium transition-colors ${
                          qrConfig.style === style 
                            ? 'bg-primary-100 border-primary-300 text-primary-700' 
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </PremiumGate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumQRGenerator;
