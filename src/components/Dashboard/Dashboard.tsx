import React, { useState } from 'react';
import { Upload, Sparkles, TrendingUp, Users, Award, BookOpen, Brain, Zap, Target, BarChart3, Database, Code, Lightbulb } from 'lucide-react';
import { Header } from '../Layout/Header';
import { Footer } from '../Layout/Footer';
import { AlgorithmCard } from './AlgorithmCard';
import { AlgorithmExplainer } from '../Algorithms/AlgorithmExplainer';
import { DatasetUpload } from '../DatasetUpload/DatasetUpload';
import { DatasetHistory } from '../DatasetUpload/DatasetHistory';
import { AboutML } from '../Pages/AboutML';
import { Contact } from '../Pages/Contact';
import { AnimatedBackground } from './AnimatedBackground';
import { algorithms } from '../../data/algorithms';
import { Algorithm } from '../../types';

type ViewType = 'dashboard' | 'algorithm' | 'dataset' | 'history' | 'about' | 'contact';

export const Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);

  const handleAlgorithmClick = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
    setCurrentView('algorithm');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
    setSelectedAlgorithm(null);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedAlgorithm(null);
  };

  if (currentView === 'algorithm' && selectedAlgorithm) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <AlgorithmExplainer 
            algorithm={selectedAlgorithm} 
            onBack={handleBackToDashboard}
          />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'dataset') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <DatasetUpload onBack={handleBackToDashboard} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'history') {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <DatasetHistory onBack={handleBackToDashboard} />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <AboutML />
        </div>
        <Footer />
      </div>
    );
  }

  if (currentView === 'contact') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header currentView={currentView} onNavigate={handleNavigate} />
        <div className="flex-1">
          <Contact />
        </div>
        <Footer />
      </div>
    );
  }

  const features = [
    {
      icon: Brain,
      title: 'Interactive Learning',
      description: 'Step-by-step algorithm explanations with animated visualizations',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Mathematical Examples',
      description: 'Real dataset calculations showing exactly how algorithms work',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'Smart Dataset Analysis',
      description: 'Upload your data and get AI-powered algorithm recommendations',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Code,
      title: 'Implementation Ready',
      description: 'Pseudocode and implementation guidance for each algorithm',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const stats = [
    { number: '6+', label: 'ML Algorithms', icon: Brain },
    { number: '4', label: 'Categories', icon: Target },
    { number: '100%', label: 'Interactive', icon: Zap },
    { number: '∞', label: 'Learning', icon: TrendingUp }
  ];

  const learningPath = [
    {
      step: 1,
      title: 'Start with Basics',
      description: 'Begin with Linear Regression to understand fundamental concepts',
      algorithms: ['Linear Regression'],
      difficulty: 'Beginner'
    },
    {
      step: 2,
      title: 'Tree-Based Methods',
      description: 'Learn decision-making algorithms and ensemble methods',
      algorithms: ['Decision Tree', 'Random Forest'],
      difficulty: 'Intermediate'
    },
    {
      step: 3,
      title: 'Unsupervised Learning',
      description: 'Discover patterns in data without labeled examples',
      algorithms: ['K-Means Clustering'],
      difficulty: 'Intermediate'
    },
    {
      step: 4,
      title: 'Advanced Techniques',
      description: 'Master complex algorithms for sophisticated problems',
      algorithms: ['SVM', 'Neural Networks'],
      difficulty: 'Advanced'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Additional floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            
            {/* Floating ML symbols */}
            <div className="absolute top-32 right-1/4 text-4xl text-white opacity-20 animate-pulse">∑</div>
            <div className="absolute bottom-32 left-1/3 text-3xl text-white opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>∂</div>
            <div className="absolute top-1/2 right-10 text-5xl text-white opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>θ</div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
                Master Machine Learning
                <span className="block text-blue-200">Through Interactive Examples</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Discover how ML algorithms work with step-by-step mathematical explanations, 
                interactive visualizations, and real dataset examples. From linear regression 
                to neural networks - learn by doing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => setCurrentView('dataset')}
                  className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Analyze Your Dataset
                </button>
                <button 
                  onClick={() => setCurrentView('about')}
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Learn ML Fundamentals
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-blue-200 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{stat.number}</div>
                      <div className="text-sm text-blue-200">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          {/* Features Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Platform?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We make machine learning accessible through interactive learning, mathematical clarity, and practical examples
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Learning Path */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your Learning Journey</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Follow our structured path from beginner to advanced machine learning concepts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {learningPath.map((path, index) => (
                <div key={index} className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                        {path.step}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        path.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        path.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {path.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{path.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{path.description}</p>
                    <div className="space-y-1">
                      {path.algorithms.map((algo, idx) => (
                        <div key={idx} className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                          {algo}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < learningPath.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* What You'll Learn */}
          <section className="mb-20">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 text-6xl">∇</div>
                <div className="absolute top-8 right-8 text-4xl">∑</div>
                <div className="absolute bottom-4 left-8 text-5xl">θ</div>
                <div className="absolute bottom-8 right-4 text-3xl">α</div>
              </div>
              
              <div className="text-center mb-8 relative z-10">
                <h2 className="text-3xl font-bold mb-4">What You'll Master</h2>
                <p className="text-xl text-blue-100">
                  Comprehensive understanding of machine learning through practical examples
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="text-center">
                  <Lightbulb className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Mathematical Foundation</h3>
                  <p className="text-blue-100">
                    Step-by-step calculations with real datasets showing exactly how algorithms compute results
                  </p>
                </div>
                <div className="text-center">
                  <BookOpen className="w-12 h-12 text-green-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Practical Implementation</h3>
                  <p className="text-blue-100">
                    Pseudocode and implementation guidance to help you code these algorithms yourself
                  </p>
                </div>
                <div className="text-center">
                  <Award className="w-12 h-12 text-purple-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Real-World Application</h3>
                  <p className="text-blue-100">
                    Upload your own datasets and get personalized algorithm recommendations
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Algorithm Categories */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Explore Algorithm Categories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dive deep into different types of machine learning algorithms with interactive examples
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {['Supervised Learning', 'Unsupervised Learning', 'Ensemble Learning', 'Deep Learning'].map((category) => {
                const count = algorithms.filter(algo => algo.category === category).length;
                const colors = {
                  'Supervised Learning': 'from-blue-500 to-blue-600',
                  'Unsupervised Learning': 'from-purple-500 to-purple-600',
                  'Ensemble Learning': 'from-emerald-500 to-emerald-600',
                  'Deep Learning': 'from-orange-500 to-orange-600'
                };
                
                return (
                  <div key={category} className={`bg-gradient-to-r ${colors[category as keyof typeof colors]} text-white p-6 rounded-xl hover:shadow-lg transition-shadow`}>
                    <h4 className="font-semibold mb-2">{category}</h4>
                    <p className="text-sm opacity-90">{count} algorithm{count !== 1 ? 's' : ''}</p>
                    <div className="mt-3 text-xs opacity-75">
                      {category === 'Supervised Learning' && 'Learn from labeled data'}
                      {category === 'Unsupervised Learning' && 'Discover hidden patterns'}
                      {category === 'Ensemble Learning' && 'Combine multiple models'}
                      {category === 'Deep Learning' && 'Neural network approaches'}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Algorithms Grid */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Interactive Algorithm Library</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Click on any algorithm to explore its mathematical foundations and see it in action
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {algorithms.map((algorithm) => (
                <AlgorithmCard
                  key={algorithm.id}
                  algorithm={algorithm}
                  onClick={() => handleAlgorithmClick(algorithm)}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};