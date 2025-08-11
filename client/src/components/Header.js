import React, { useState } from 'react';
import { Link2, Github, Star, Sun, Moon, User, LogOut, Crown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './Auth/LoginModal';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout, isPremium } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg floating-icon glow-effect">
              <Link2 size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">URLShortener</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Fast and secure URL shortener</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star size={16} className="text-yellow-500" />
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <Github size={16} />
                <span>Open Source</span>
              </div>
            </div>
            
            {/* User Authentication */}
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {isPremium && (
                    <Crown size={16} className="text-yellow-500" title="Premium User" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-all duration-200 hover:scale-110 hover:shadow-md bounce-on-hover"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={20} className="animate-scale-in" /> : <Moon size={20} className="animate-scale-in" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};

export default Header;
