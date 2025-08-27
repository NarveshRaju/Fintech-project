import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Settings, Bell, User, Home, Target, Shield, Zap } from 'lucide-react';

export default function PortfolioDashboard() {
  const [selectedRisk, setSelectedRisk] = useState('moderate');
  const [investmentAmount, setInvestmentAmount] = useState(25000);

  const riskProfiles = {
    conservative: {
      name: 'Conservative',
      color: 'bg-blue-500',
      allocation: [
        { name: 'Fixed Deposits', percentage: 40, color: '#3B82F6' },
        { name: 'Government Bonds', percentage: 30, color: '#60A5FA' },
        { name: 'Corporate Bonds', percentage: 20, color: '#93C5FD' },
        { name: 'Liquid Funds', percentage: 10, color: '#DBEAFE' }
      ],
      expectedReturn: '8-10%',
      riskLevel: 'Low',
      timeHorizon: '1-3 years'
    },
    moderate: {
      name: 'Moderate',
      color: 'bg-purple-500',
      allocation: [
        { name: 'Equity Mutual Funds', percentage: 35, color: '#8B5CF6' },
        { name: 'Debt Funds', percentage: 25, color: '#A78BFA' },
        { name: 'Hybrid Funds', percentage: 25, color: '#C4B5FD' },
        { name: 'Gold ETF', percentage: 15, color: '#E9D5FF' }
      ],
      expectedReturn: '12-15%',
      riskLevel: 'Medium',
      timeHorizon: '3-5 years'
    },
    aggressive: {
      name: 'Aggressive',
      color: 'bg-green-500',
      allocation: [
        { name: 'Large Cap Equity', percentage: 30, color: '#10B981' },
        { name: 'Mid Cap Equity', percentage: 25, color: '#34D399' },
        { name: 'Small Cap Equity', percentage: 20, color: '#6EE7B7' },
        { name: 'International Funds', percentage: 15, color: '#A7F3D0' },
        { name: 'Sector Funds', percentage: 10, color: '#D1FAE5' }
      ],
      expectedReturn: '15-20%',
      riskLevel: 'High',
      timeHorizon: '5+ years'
    }
  };

  const currentProfile = riskProfiles[selectedRisk];
  
  // Calculate projected returns
  const projectedReturns = {
    1: Math.round(investmentAmount * 1.12),
    3: Math.round(investmentAmount * Math.pow(1.12, 3)),
    5: Math.round(investmentAmount * Math.pow(1.12, 5)),
    10: Math.round(investmentAmount * Math.pow(1.12, 10))
  };

  const DonutChart = ({ data, size = 200 }) => {
    let cumulativePercentage = 0;
    
    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 20}
            fill="transparent"
            stroke="#f3f4f6"
            strokeWidth="40"
          />
          {data.map((item, index) => {
            const radius = size / 2 - 20;
            const circumference = 2 * Math.PI * radius;
            const strokeLength = (item.percentage / 100) * circumference;
            const strokeOffset = circumference - cumulativePercentage * circumference / 100;
            
            cumulativePercentage += item.percentage;
            
            return (
              <circle
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth="40"
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={-strokeOffset}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">₹{(investmentAmount / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Total Investment</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft size={20} className="text-gray-600" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">Portfolio Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <User size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{(projectedReturns[1] / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Expected Portfolio Value</div>
            <div className="text-xs text-green-600 mt-1">+12% from investment</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="text-blue-600" size={24} />
              </div>
              <span className="text-sm text-gray-500">YTD</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">{currentProfile.expectedReturn}</div>
            <div className="text-sm text-gray-600">Expected Returns</div>
            <div className="text-xs text-blue-600 mt-1">{currentProfile.riskLevel} Risk</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <span className="text-sm text-green-500">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">₹{((projectedReturns[1] - investmentAmount) / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Projected Gains</div>
            <div className="text-xs text-gray-500 mt-1">1 Year Period</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="text-orange-600" size={24} />
              </div>
              <span className="text-sm text-gray-500">Risk Score</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {selectedRisk === 'conservative' ? '3/10' : selectedRisk === 'moderate' ? '5/10' : '7/10'}
            </div>
            <div className="text-sm text-gray-600">{currentProfile.riskLevel} Risk</div>
            <div className="text-xs text-gray-500 mt-1">{currentProfile.timeHorizon}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Profile Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Select Risk Profile</h3>
              
              <div className="space-y-4 mb-6">
                {Object.entries(riskProfiles).map(([key, profile]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedRisk(key)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedRisk === key 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${profile.color}`}></div>
                        <div className="text-left">
                          <div className="font-medium text-gray-800">{profile.name}</div>
                          <div className="text-sm text-gray-600">{profile.riskLevel} Risk</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-800">{profile.expectedReturn}</div>
                        <div className="text-sm text-gray-600">{profile.timeHorizon}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Investment Amount Input */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount (₹)
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="1000"
                  step="1000"
                />
                <div className="text-xs text-gray-500 mt-1">Minimum: ₹1,000</div>
              </div>
            </div>
          </div>

          {/* Risk Wise Allocation Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Risk Wise Allocation</h3>
              
              <div className="flex justify-center mb-6">
                <DonutChart data={currentProfile.allocation} size={220} />
              </div>

              <div className="space-y-3">
                {currentProfile.allocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-800">{item.percentage}%</span>
                      <span className="text-xs text-gray-500">
                        ₹{((investmentAmount * item.percentage / 100) / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projected Returns */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Projected Returns</h3>
              
              <div className="space-y-6">
                {[
                  { period: '1 Year', value: projectedReturns[1], growth: '+12%' },
                  { period: '3 Years', value: projectedReturns[3], growth: '+40%' },
                  { period: '5 Years', value: projectedReturns[5], growth: '+76%' },
                  { period: '10 Years', value: projectedReturns[10], growth: '+211%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.period}</div>
                      <div className="text-xs text-gray-600">Estimated Value</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        ₹{(item.value / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs text-green-600">{item.growth}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="text-blue-600" size={16} />
                  <span className="text-sm font-medium text-blue-800">Smart Tip</span>
                </div>
                <p className="text-xs text-blue-700">
                  Starting early with small amounts can lead to significant wealth creation through compound interest. 
                  Even ₹2,000/month can grow to substantial amounts over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
            <DollarSign size={20} />
            <span>Start Investing</span>
          </button>
          <button className="flex-1 border-2 border-purple-600 text-purple-600 py-4 px-6 rounded-xl font-semibold hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2">
            <PieChart size={20} />
            <span>Customize Portfolio</span>
          </button>
          <button className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
            <Calendar size={20} />
            <span>Schedule SIP</span>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Shield className="text-yellow-600 mt-0.5" size={16} />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Important Disclaimer</h4>
              <p className="text-xs text-yellow-700 mt-1">
                All projections are estimates based on historical data and assumptions. Actual returns may vary. 
                Past performance does not guarantee future results. Please consult with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}