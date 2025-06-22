import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowLeft, BookOpen, BarChart2, Calendar, Smile, Frown, Meh, Angry } from 'lucide-react';

const History = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/journal', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sortedData = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setJournalEntries(sortedData);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        } else {
          setError('Failed to fetch mood history.');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const moodToScore = (mood) => {
    const mapping = { happy: 5, content: 4, neutral: 3, sad: 2, anxious: 1 };
    return mapping[mood.toLowerCase()] || 0;
  };

  const chartData = journalEntries.map(entry => ({
    date: new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: moodToScore(entry.mood),
    mood: entry.mood,
  }));

  const moodConfig = {
    happy: { icon: <Smile className="text-green-500" />, color: '#4ade80' },
    content: { icon: <Smile className="text-blue-500" />, color: '#60a5fa' },
    neutral: { icon: <Meh className="text-gray-500" />, color: '#a1a1aa' },
    sad: { icon: <Frown className="text-red-500" />, color: '#f87171' },
    anxious: { icon: <Angry className="text-yellow-500" />, color: '#facc15' },
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const { mood, score } = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border dark:border-gray-700">
          <p className="label font-semibold text-gray-800 dark:text-gray-200">{label}</p>
          <p className="intro capitalize" style={{ color: moodConfig[mood.toLowerCase()]?.color || '#8884d8' }}>
            {`Mood: ${mood} (Score: ${score})`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}, ${isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)'}), url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mood History</h1>
          <Link to="/dashboard" className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center"><BarChart2 size={24} className="mr-3 text-indigo-500" />Your Mood Timeline</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} domain={[0, 5]} tickFormatter={(v) => ['','Anxious','Sad','Neutral','Content','Happy'][v]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="score" name="Mood Score" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-16"><p className='text-gray-500 dark:text-gray-400'>No mood data to display.</p></div>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center"><BookOpen size={24} className="mr-3 text-green-500" />Journal Entries</h2>
          <div className="space-y-4">
            {[...journalEntries].reverse().map((entry) => (
              <div key={entry._id} className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg border-l-4"
                   style={{ borderLeftColor: moodConfig[entry.mood.toLowerCase()]?.color || '#a1a1aa' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg capitalize flex items-center" style={{ color: moodConfig[entry.mood.toLowerCase()]?.color || 'inherit' }}>
                      {moodConfig[entry.mood.toLowerCase()]?.icon}
                      <span className="ml-2">{entry.mood}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-gray-600 dark:text-gray-300 break-words">{entry.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
