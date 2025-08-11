import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Code size={16} />
            <span className="text-sm">
              Made with 
            </span>
            <Heart size={16} className="text-red-500 animate-pulse-gentle" />
            <span className="text-sm">by <a href="https://gurtuna.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Samet GURTUNA</a></span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span>© 2025 URLShortener</span>
            <div className="flex items-center space-x-4">
              <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105">
                Privacy
              </button>
              <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105">
                Terms of Use
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This application is open source and free for development and contributions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
