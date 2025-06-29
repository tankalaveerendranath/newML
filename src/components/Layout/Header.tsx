import React, { useState } from 'react';
import { Brain, Menu, X, Home, BookOpen, Upload, Mail, Info, Moon, Sun, History } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'about', label: 'About ML', icon: BookOpen },
    { id: 'dataset', label: 'Dataset Upload', icon: Upload },
    { id: 'history', label: 'History', icon: History },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg animate-pulse">
              <Brain className="w-6 h-6 text-white animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in">
                ML Algorithms Hub
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block animate-fade-in" style={{ animationDelay: '0.2s' }}>Learn • Explore • Discover</p>
            </div>
          </div>
          
          {/* Desktop Navigation with hover animations */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                    currentView === item.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-lg animate-pulse'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <IconComponent className={`w-4 h-4 ${currentView === item.id ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Menu & Controls with animations */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle with animation */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
            >
              {isDark ? 
                <Sun className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} /> : 
                <Moon className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} />
              }
            </button>

            {user && (
              <div className="hidden sm:flex items-center space-x-3 animate-fade-in">
                <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-white text-sm font-medium">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            )}
            
            {/* Mobile menu button with animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
            >
              {isMobileMenuOpen ? 
                <X className="w-6 h-6 animate-spin" /> : 
                <Menu className="w-6 h-6 animate-pulse" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation with slide animation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 animate-slide-in-down">
            <nav className="space-y-2">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in ${
                      currentView === item.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {user && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 font-medium transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};