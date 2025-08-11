import React, { useState } from 'react';
import { Link2, BarChart3, History, User } from 'lucide-react';
import UrlShortener from './components/UrlShortener';
import UrlList from './components/UrlList';
import Header from './components/Header';
import Footer from './components/Footer';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import LoginModal from './components/Auth/LoginModal';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [activeTab, setActiveTab] = useState('shorten');
  const [urls, setUrls] = useState([]);
  const [refreshUrls, setRefreshUrls] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const { currentUser } = useAuth();

  const tabs = [
    { id: 'shorten', label: 'Shorten Link', icon: Link2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const handleUrlCreated = () => {
    setRefreshUrls(prev => prev + 1);
    setActiveTab('history');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 transform ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-sm animate-pulse-gentle'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
                  }`}
                >
                  <IconComponent size={20} className={activeTab === tab.id ? 'animate-bounce-gentle' : 'scale-on-hover'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {activeTab === 'shorten' && (
            <div className="max-w-2xl mx-auto">
              <UrlShortener onUrlCreated={handleUrlCreated} />
            </div>
          )}
          
          {activeTab === 'history' && (
            <UrlList 
              key={refreshUrls} 
              urls={urls} 
              setUrls={setUrls}
              onRefresh={() => setRefreshUrls(prev => prev + 1)}
            />
          )}
          
          {activeTab === 'analytics' && (
            <AnalyticsDashboard />
          )}
        </div>
      </main>

      <Footer />
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}

export default App;
