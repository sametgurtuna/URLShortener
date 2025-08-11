import React, { useEffect, useRef, useState, useCallback } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, X } from 'lucide-react';
import toast from 'react-hot-toast';

const QRCodeGenerator = ({ url, isOpen, onClose }) => {
  const canvasRef = useRef();
  const [qrDataUrl, setQrDataUrl] = useState('');

  const generateQR = useCallback(async () => {
    try {
      const canvas = canvasRef.current;
      await QRCode.toCanvas(canvas, url, {
        width: 256,
        margin: 2,
        color: {
          dark: '#1f2937', // Dark gray
          light: '#ffffff' // White
        },
        errorCorrectionLevel: 'M'
      });
      
      // Convert canvas to data URL for download
      const dataUrl = canvas.toDataURL('image/png');
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error('QR code generation failed:', err);
      toast.error('QR code generation failed');
    }
  }, [url]);

  useEffect(() => {
    if (url && canvasRef.current) {
      generateQR();
    }
  }, [url, generateQR]);

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = `qr-code-${Date.now()}.png`;
      link.href = qrDataUrl;
      link.click();
      toast.success('QR code downloaded!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <QrCode size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              QR Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

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

          <div className="flex space-x-3">
            <button
              onClick={downloadQR}
              className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <Download size={16} />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
