import React from 'react';
import { Brain, Zap, Target, TrendingUp, GitBranch, Circle, Trees, SeparatorVertical as Separator, ArrowRight, CheckCircle, Star, Users, Award } from 'lucide-react';
import { AnimatedBackground } from '../Dashboard/AnimatedBackground';

export const AboutML: React.FC = () => {
  const mlTypes = [
    {
      title: 'Supervised Learning',
      description: 'Learn from labeled examples to make predictions on new data',
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      examples: ['Classification', 'Regression', 'Prediction'],
      algorithms: ['Linear Regression', 'Decision Trees', 'SVM', 'Neural Networks']
    },
    {
      title: 'Unsupervised Learning',
      description: 'Discover hidden patterns in data without labeled examples',
      icon: Circle,
      color: 'from-purple-500 to-purple-600',
      examples: ['Clustering', 'Dimensionality Reduction', 'Association Rules'],
      algorithms: ['K-Means', 'PCA', 'DBSCAN', 'Hierarchical Clustering']
    },
    {
      title: 'Reinforcement Learning',
      description: 'Learn through interaction with environment using rewards and penalties',
      icon: Zap,
      color: 'from-green-500 to-green-600',
      examples: ['Game Playing', 'Robotics', 'Autonomous Systems'],
      algorithms: ['Q-Learning', 'Policy Gradient', 'Actor-Critic', 'Deep Q-Networks']
    }
  ];

  const mlWorkflow = [
    {
      step: 1,
      title: 'Data Collection',
      description: 'Gather relevant data from various sources',
      icon: '📊',
      details: 'Quality data is the foundation of any successful ML project'
    },
    {
      step: 2,
      title: 'Data Preprocessing',
      description: 'Clean, transform, and prepare data for analysis',
      icon: '🔧',
      details: 'Handle missing values, outliers, and feature engineering'
    },
    {
      step: 3,
      title: 'Model Selection',
      description: 'Choose appropriate algorithm based on problem type',
      icon: '🎯',
      details: 'Consider data size, complexity, and interpretability requirements'
    },
    {
      step: 4,
      title: 'Training',
      description: 'Train the model using prepared dataset',
      icon: '🏋️',
      details: 'Optimize parameters to minimize prediction errors'
    },
    {
      step: 5,
      title: 'Evaluation',
      description: 'Assess model performance using metrics',
      icon: '📈',
      details: 'Use cross-validation and test sets for unbiased evaluation'
    },
    {
      step: 6,
      title: 'Deployment',
      description: 'Deploy model to production environment',
      icon: '🚀',
      details: 'Monitor performance and retrain as needed'
    }
  ];

  const applications = [
    {
      category: 'Healthcare',
      icon: '🏥',
      examples: ['Medical Diagnosis', 'Drug Discovery', 'Personalized Treatment', 'Medical Imaging'],
      color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    },
    {
      category: 'Finance',
      icon: '💰',
      examples: ['Fraud Detection', 'Credit Scoring', 'Algorithmic Trading', 'Risk Assessment'],
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    },
    {
      category: 'Technology',
      icon: '💻',
      examples: ['Recommendation Systems', 'Search Engines', 'Computer Vision', 'Natural Language Processing'],
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
    },
    {
      category: 'Transportation',
      icon: '🚗',
      examples: ['Autonomous Vehicles', 'Route Optimization', 'Traffic Management', 'Predictive Maintenance'],
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
    }
  ];

  const benefits = [
    {
      title: 'Automation',
      description: 'Automate complex decision-making processes',
      icon: Zap
    },
    {
      title: 'Insights',
      description: 'Discover hidden patterns in large datasets',
      icon: Brain
    },
    {
      title: 'Efficiency',
      description: 'Improve operational efficiency and reduce costs',
      icon: TrendingUp
    },
    {
      title: 'Personalization',
      description: 'Deliver personalized experiences to users',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Additional floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '6s' }}></div>
          
          {/* Floating ML symbols */}
          <div className="absolute top-32 right-1/4 text-6xl text-white opacity-20 animate-pulse">∑</div>
          <div className="absolute bottom-32 left-1/3 text-4xl text-white opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>∂</div>
          <div className="absolute top-1/2 right-10 text-7xl text-white opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>θ</div>
          <div className="absolute top-1/4 left-10 text-5xl text-white opacity-20 animate-pulse" style={{ animationDelay: '3s' }}>α</div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white bg-opacity-20 rounded-full animate-bounce" style={{ animationDuration: '3s' }}>
                <Brain className="w-16 h-16 text-white animate-pulse" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
              What is Machine Learning?
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Machine Learning is a subset of artificial intelligence that enables computers to learn 
              and make decisions from data without being explicitly programmed for every scenario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold">6+</div>
                <div className="text-sm text-blue-100">Algorithms Covered</div>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold">Interactive</div>
                <div className="text-sm text-blue-100">Learning Experience</div>
              </div>
              <div className="bg-white bg-opacity-20 px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105">
                <div className="text-2xl font-bold">Step-by-Step</div>
                <div className="text-sm text-blue-100">Explanations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Types of Machine Learning */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Types of Machine Learning</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Understanding the three main categories of machine learning and their applications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {mlTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mb-6 animate-bounce`} style={{ animationDuration: `${3 + index}s` }}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{type.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{type.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {type.examples.map((example, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:scale-105 transition-transform">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Popular Algorithms:</h4>
                    <ul className="space-y-1">
                      {type.algorithms.map((algo, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center animate-fade-in" style={{ animationDelay: `${(index * 0.2) + (idx * 0.1)}s` }}>
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 animate-pulse" />
                          {algo}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ML Workflow */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Machine Learning Workflow</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The typical process of developing and deploying machine learning solutions
            </p>
          </div>

          <div className="relative">
            {/* Workflow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mlWorkflow.map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 animate-pulse">
                        {item.step}
                      </div>
                      <div className="text-2xl animate-bounce" style={{ animationDelay: `${index * 0.2}s`, animationDuration: '2s' }}>{item.icon}</div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.details}</p>
                  </div>
                  
                  {/* Arrow for desktop */}
                  {index < mlWorkflow.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Real-World Applications</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Machine learning is transforming industries and solving complex problems across various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div key={index} className={`${app.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4 animate-bounce" style={{ animationDelay: `${index * 0.3}s`, animationDuration: '3s' }}>{app.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{app.category}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {app.examples.map((example, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:scale-105 transition-transform animate-fade-in" style={{ animationDelay: `${(index * 0.2) + (idx * 0.1)}s` }}>
                      {example}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">Why Machine Learning Matters</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The key benefits that make machine learning essential for modern businesses and research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Getting Started */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center relative overflow-hidden animate-fade-in">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl animate-pulse">∇</div>
            <div className="absolute top-8 right-8 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>∑</div>
            <div className="absolute bottom-4 left-8 text-5xl animate-pulse" style={{ animationDelay: '2s' }}>θ</div>
            <div className="absolute bottom-8 right-4 text-3xl animate-pulse" style={{ animationDelay: '3s' }}>α</div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to Start Learning?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore our interactive algorithm explanations and discover which machine learning 
              techniques work best for your data and use cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Explore Algorithms
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                Upload Dataset
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};