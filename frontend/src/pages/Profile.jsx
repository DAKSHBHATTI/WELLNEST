import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, BookText, BarChart3, Calendar, LogOut, ArrowLeft, Sun, Moon } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState({ email: '', name: '' });
  const [journalStats, setJournalStats] = useState({ count: 0, lastEntry: null, moodDistribution: {} });
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
        setUser({ name: data.name, email: data.email });
      } catch (e) {
        console.error("Failed to fetch user profile:", e);
        if (e.response && (e.response.status === 401 || e.response.status === 403)) {
          localStorage.removeItem('token');
          navigate('/auth');
        } else {
          setError('Could not fetch user profile.');
        }
      }
    };

    const fetchJournalData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/journal', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const entries = response.data;
        const lastEntry = entries.length > 0 ? entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] : null;
        
        const moodDistribution = entries.reduce((acc, entry) => {
          const mood = entry.mood.toLowerCase();
          acc[mood] = (acc[mood] || 0) + 1;
          return acc;
        }, {});

        setJournalStats({ count: entries.length, lastEntry, moodDistribution });
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        } else {
          setError('Could not fetch journal data.');
        }
      }
    };

    fetchUserProfile();
    fetchJournalData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const StatCard = ({ icon, label, value, colorClass }) => (
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl flex items-center">
      <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-8">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
            <div className="relative mb-4 sm:mb-0 sm:mr-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                <User size={48} />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start mt-1">
                <Mail size={16} className="mr-2" />
                {user.email}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          </div>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          {/* Stats Grid */}
          <div>
            <h3 className="text-xl font-bold mb-4">Your Wellness Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard 
                icon={<BookText size={24} className="text-white" />} 
                label="Total Journal Entries" 
                value={journalStats.count}
                colorClass="bg-blue-500"
              />
              <StatCard 
                icon={<BarChart3 size={24} className="text-white" />} 
                label="Moods Recorded" 
                value={Object.keys(journalStats.moodDistribution).length}
                colorClass="bg-green-500"
              />
              <StatCard 
                icon={<Calendar size={24} className="text-white" />} 
                label="Last Active" 
                value={journalStats.lastEntry ? new Date(journalStats.lastEntry.createdAt).toLocaleDateString() : 'N/A'}
                colorClass="bg-purple-500"
              />
            </div>
          </div>

          {/* Last Entry */}
          {journalStats.lastEntry && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Most Recent Entry</h3>
              <div className="bg-gray-50 dark:bg-gray-700/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <p className="font-semibold capitalize text-indigo-500 dark:text-indigo-400">{journalStats.lastEntry.mood}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(journalStats.lastEntry.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{journalStats.lastEntry.content}</p>
              </div>
            </div>
          )}
        </div>
        {error && <p className="text-red-500 text-center pt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Profile;
