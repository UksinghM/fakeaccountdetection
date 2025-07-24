'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AccountFakeChecker = () => {
  const [form, setForm] = useState({
    account_age_days: '',
    has_profile_picture: false,
    followers_count: '',
    following_count: '',
    bio_length: '',
  });
  const [instaUrl, setInstaUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoFillLoading, setAutoFillLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAutoFill = async () => {
    if (!instaUrl || !instaUrl.startsWith('https://www.instagram.com/')) {
      setError('Please enter a valid Instagram profile URL (e.g., https://www.instagram.com/username/).');
      return;
    }
    setAutoFillLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/user/fetch-instagram-profile', { url: instaUrl });
      const data = response.data;
      setForm({
        account_age_days: data.account_age_days || '',
        has_profile_picture: data.has_profile_picture || false,
        followers_count: data.followers_count || '',
        following_count: data.following_count || '',
        bio_length: data.bio_length || '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch Instagram profile data. Please check the URL and try again.');
    } finally {
      setAutoFillLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    // Validate inputs
    if (!form.account_age_days || !form.followers_count || !form.following_count || !form.bio_length) {
      setError('Please fill all required fields with valid numbers.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/user/predict-fake', {
        account_age_days: Number(form.account_age_days) || 0,
        has_profile_picture: form.has_profile_picture,
        followers_count: Number(form.followers_count) || 0,
        following_count: Number(form.following_count) || 0,
        bio_length: Number(form.bio_length) || 0,
      });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900 p-4">
      <div className="w-full max-w-xl bg-black/70 border border-green-600 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-green-400 mb-2">Fake Account Probability Checker</h1>
          <p className="text-green-200">Enter account details or auto-fill from Instagram</p>
        </header>
        <div className="mb-6">
          <label className="block text-green-300 mb-1">Instagram Profile URL:</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={instaUrl}
              onChange={(e) => setInstaUrl(e.target.value)}
              placeholder="https://www.instagram.com/username/"
              className="flex-1 px-4 py-2 rounded bg-black/60 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="button"
              onClick={handleAutoFill}
              disabled={autoFillLoading || !instaUrl}
              className="px-4 py-2 rounded bg-green-500 text-black font-bold hover:bg-green-400 transition-colors disabled:opacity-60"
            >
              {autoFillLoading ? 'Filling...' : 'Auto-fill'}
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-300 mb-1">Account Age (days):</label>
            <input
              type="number"
              name="account_age_days"
              value={form.account_age_days}
              onChange={handleChange}
              min="0"
              placeholder="Enter days or leave blank if unknown"
              className="w-full px-4 py-2 rounded bg-black/60 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="has_profile_picture"
              checked={form.has_profile_picture}
              onChange={handleChange}
              id="has_profile_picture"
            />
            <label htmlFor="has_profile_picture" className="text-green-300">Has Profile Picture</label>
          </div>
          <div>
            <label className="block text-green-300 mb-1">Followers Count:</label>
            <input
              type="number"
              name="followers_count"
              value={form.followers_count}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded bg-black/60 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-300 mb-1">Following Count:</label>
            <input
              type="number"
              name="following_count"
              value={form.following_count}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded bg-black/60 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-green-300 mb-1">Bio Length (characters):</label>
            <input
              type="number"
              name="bio_length"
              value={form.bio_length}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 rounded bg-black/60 border border-green-700 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg bg-green-500 text-black font-bold shadow-lg hover:bg-green-400 transition-colors text-lg font-mono disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Checking...' : 'Check Probability'}
          </button>
          {error && <div className="text-red-400 bg-red-900/30 p-3 rounded-lg text-center font-mono mt-4">{error}</div>}
        </form>
        {result && (
          <div className="mt-8 bg-black/60 rounded-xl p-6">
            <h2 className="text-green-300 font-bold mb-4">Prediction Result</h2>
            <div className="text-2xl font-mono mb-2">
              Probability of Fake Account: <span className="font-bold text-green-400">{Math.round(result.is_fake_probability * 100)}%</span>
            </div>
            <div className="text-green-200 text-sm mt-2">
              <pre>{JSON.stringify(result.features, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountFakeChecker;