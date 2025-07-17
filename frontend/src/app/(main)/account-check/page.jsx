'use client'
import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 tracking-tight">
          Fake Account Analyzer
        </h1>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="Enter Facebook/Instagram profile URL"
              className="flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
              required
            />
            <div className="flex gap-3">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-all duration-200"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Analyzing...
                  </span>
                ) : 'Check Account'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Reset
              </button>
            </div>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Results Display */}
        {analysisResult && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden animate-slide-up">
            {/* Risk Summary Banner */}
            <div className={`p-6 text-white text-center ${
              analysisResult.risk_score > 70 ? 'bg-red-600' : 
              analysisResult.risk_score > 40 ? 'bg-orange-500' : 'bg-green-600'
            } transition-all duration-300`}>
              <h2 className="text-2xl font-bold mb-2">
                {analysisResult.risk_score > 70 ? 'HIGH RISK' : 
                 analysisResult.risk_score > 40 ? 'MEDIUM RISK' : 'LOW RISK'}
              </h2>
              <p className="text-lg font-medium">
                {analysisResult.risk_score}% Probability of Being Fake
              </p>
            </div>

            {/* Detailed Analysis */}
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Analysis Details</h3>

              {/* Account Age */}
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500 transition-all duration-200">
                <h4 className="font-medium text-lg text-gray-800">Account Age</h4>
                <p className={`font-medium ${analysisResult.account_age.verdict === 'SUSPICIOUS' ? 'text-red-600' : 'text-gray-600'}`}>
                  {analysisResult.account_age.value} - {analysisResult.account_age.verdict}
                </p>
                <p className="text-gray-600 mt-1">{analysisResult.account_age.explanation}</p>
              </div>

              {/* Follower Ratio */}
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500 transition-all duration-200">
                <h4 className="font-medium text-lg text-gray-800">Follower Ratio</h4>
                <p className={`font-medium ${analysisResult.follower_ratio.verdict === 'HIGH RISK' ? 'text-red-600' : 'text-gray-600'}`}>
                  Followers: {analysisResult.follower_ratio.followers} | Following: {analysisResult.follower_ratio.following}
                </p>
                <p className="text-gray-600 mt-1">{analysisResult.follower_ratio.explanation}</p>
              </div>

              {/* Profile Photo */}
              <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500 transition-all duration-200">
                <h4 className="font-medium text-lg text-gray-800">Profile Photo</h4>
                <div className="flex items-center mt-2 gap-4">
                  <img 
                    src={analysisResult.profile_photo.url} 
                    alt="Profile" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                  />
                  <div>
                    <p className={`font-medium ${analysisResult.profile_photo.verdict === 'FAKE' ? 'text-red-600' : 'text-gray-600'}`}>
                      {analysisResult.profile_photo.verdict}
                    </p>
                    <ul className="list-disc pl-5 mt-1 text-gray-600">
                      {analysisResult.profile_photo.evidence.map((item, index) => (
                        <li key={index} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Activity Patterns */}
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500 transition-all duration-200">
                <h4 className="font-medium text-lg text-gray-800">Activity Patterns</h4>
                <p className={`font-medium ${analysisResult.activity_patterns.verdict.includes('BOT') ? 'text-red-600' : 'text-gray-600'}`}>
                  {analysisResult.activity_patterns.verdict}
                </p>
                <p className="text-gray-600 mt-1">{analysisResult.activity_patterns.evidence}</p>
              </div>

              {/* Recommendations */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-lg text-gray-800 mb-2">Recommendations</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {analysisResult.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!analysisResult && !loading && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-xl animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Enter a Profile URL to Analyze</h3>
            <p className="text-gray-500 mt-2">We'll check for signs of fake accounts across multiple parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountChecker;