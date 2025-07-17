'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const AccountChecker = () => {
  const [profileUrl, setProfileUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/analyze-profile', 
        { url: profileUrl }
      );
      setAnalysisResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProfileUrl('');
    setAnalysisResult(null);
    setError('');
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-pink-900/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image 
              src="/scan-icon.svg" 
              alt="Scanner" 
              width={80} 
              height={80} 
              className="filter-purple animate-pulse"
            />
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Account Analyzer
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
            Detect fake social media profiles with our AI-powered verification tool
          </p>
        </div>

        {/* Input Form */}
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-black/60 to-black/80 border border-purple-900/50 rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-purple-500/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="Enter Facebook/Instagram/Twitter profile URL"
                className="flex-grow px-5 py-4 bg-black/50 border border-purple-800/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400 font-mono"
                required
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl hover:shadow-purple-500/40 disabled:opacity-70 transition-all duration-300 flex items-center justify-center min-w-[150px]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Scanning...
                    </>
                  ) : 'Analyze'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-4 bg-black/50 border border-purple-800/30 text-purple-300 font-medium rounded-xl hover:bg-purple-900/20 transition-all duration-200"
                >
                  Reset
                </button>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-pink-900/30 border border-pink-700/50 text-pink-200 rounded-lg animate-fade-in font-mono">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* Results Display */}
        {analysisResult && (
          <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-b from-black/50 to-black/70 border border-purple-900/50 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm animate-slide-up">
            {/* Risk Summary Banner */}
            <div className={`p-8 text-center bg-gradient-to-r ${
              analysisResult.risk_score > 70 ? 'from-red-900/80 to-pink-900/80' : 
              analysisResult.risk_score > 40 ? 'from-orange-900/80 to-purple-900/80' : 'from-green-900/80 to-teal-900/80'
            } transition-all duration-500`}>
              <h2 className="text-2xl font-bold mb-2 text-white">
                {analysisResult.risk_score > 70 ? 'HIGH RISK ACCOUNT' : 
                 analysisResult.risk_score > 40 ? 'MEDIUM RISK ACCOUNT' : 'LOW RISK ACCOUNT'}
              </h2>
              <div className="w-full bg-black/30 h-4 rounded-full mt-4 overflow-hidden">
                <div 
                  className={`h-full ${
                    analysisResult.risk_score > 70 ? 'bg-red-500' : 
                    analysisResult.risk_score > 40 ? 'bg-orange-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${analysisResult.risk_score}%` }}
                ></div>
              </div>
              <p className="text-xl font-medium mt-4">
                {analysisResult.risk_score}% Probability of Being Fake
              </p>
            </div>

            {/* Detailed Analysis */}
            <div className="p-6 md:p-8 space-y-8">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Analysis Details
              </h3>

              {/* Analysis Cards */}
              {[
                {
                  title: "Account Age",
                  data: analysisResult.account_age,
                  color: "blue",
                  icon: "/time-icon.svg"
                },
                {
                  title: "Follower Ratio",
                  data: analysisResult.follower_ratio,
                  color: "purple",
                  icon: "/users-icon.svg"
                },
                {
                  title: "Profile Photo",
                  data: analysisResult.profile_photo,
                  color: "pink",
                  icon: "/image-icon.svg"
                },
                {
                  title: "Activity Patterns",
                  data: analysisResult.activity_patterns,
                  color: "green",
                  icon: "/activity-icon.svg"
                }
              ].map((section, index) => (
                <div 
                  key={index} 
                  className={`p-6 bg-black/40 border ${
                    section.color === 'blue' ? 'border-blue-900/50' :
                    section.color === 'purple' ? 'border-purple-900/50' :
                    section.color === 'pink' ? 'border-pink-900/50' : 'border-green-900/50'
                  } rounded-xl transition-all duration-200 hover:shadow-lg ${
                    section.color === 'blue' ? 'hover:shadow-blue-500/10' :
                    section.color === 'purple' ? 'hover:shadow-purple-500/10' :
                    section.color === 'pink' ? 'hover:shadow-pink-500/10' : 'hover:shadow-green-500/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${
                      section.color === 'blue' ? 'from-blue-900/50 to-blue-500/30' :
                      section.color === 'purple' ? 'from-purple-900/50 to-purple-500/30' :
                      section.color === 'pink' ? 'from-pink-900/50 to-pink-500/30' : 'from-green-900/50 to-green-500/30'
                    }`}>
                      <Image 
                        src={section.icon} 
                        alt={section.title} 
                        width={24} 
                        height={24} 
                        className="filter-purple"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-white mb-3">{section.title}</h4>
                      
                      {section.title === "Profile Photo" ? (
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                          <img 
                            src={section.data.url} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover border-2 border-purple-900/50 shadow-lg"
                          />
                          <div>
                            <p className={`font-mono ${
                              section.data.verdict === 'FAKE' ? 'text-pink-400' : 'text-green-400'
                            }`}>
                              {section.data.verdict}
                            </p>
                            <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                              {section.data.evidence.map((item, i) => (
                                <li key={i} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className={`font-mono ${
                            section.data.verdict.includes('SUSPICIOUS') || 
                            section.data.verdict.includes('HIGH RISK') ? 'text-pink-400' : 'text-green-400'
                          }`}>
                            {section.data.value || `${section.data.followers} followers | ${section.data.following} following`} - {section.data.verdict}
                          </p>
                          <p className="text-gray-300 mt-2 text-sm">
                            {section.data.explanation || section.data.evidence}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommendations */}
              <div className="p-6 bg-black/40 border border-gray-800 rounded-xl">
                <h4 className="text-xl font-semibold text-white mb-4">Recommendations</h4>
                <ul className="space-y-3">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <span className="text-gray-300">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysisResult && !loading && (
          <div className="max-w-2xl mx-auto mt-12 text-center bg-black/40 border border-purple-900/30 rounded-2xl p-12 backdrop-blur-sm animate-fade-in">
            <Image 
              src="/search-icon.svg" 
              alt="Search" 
              width={80} 
              height={80} 
              className="mx-auto filter-purple opacity-70"
            />
            <h3 className="text-2xl font-semibold text-white mt-6">Enter a Profile URL to Analyze</h3>
            <p className="text-gray-400 mt-3 max-w-md mx-auto font-mono">
              We'll check for signs of fake accounts across multiple parameters including activity patterns, follower ratios, and profile authenticity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountChecker;