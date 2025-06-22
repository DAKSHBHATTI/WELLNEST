import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { LogOut, BarChart2, User, HeartPulse, BookOpen, ArrowRight, Stethoscope, Sun, Moon, ClipboardList, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [journalEntries, setJournalEntries] = useState([]);
  const [userName, setUserName] = useState('User');
  const [error, setError] = useState('');
  const isDarkMode = document.documentElement.classList.contains('dark');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUserName(decoded.name || 'User');
    } catch (e) {
      console.error('Invalid token', e);
      localStorage.removeItem('token');
      navigate('/auth');
    }

    const fetchJournalData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/journal', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Could not fetch journal data.');
        const data = await res.json();
        setJournalEntries(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJournalData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  const moodToScore = (mood) => {
    const mapping = { happy: 5, content: 4, neutral: 3, sad: 2, anxious: 1 };
    return mapping[mood.toLowerCase()] || 0;
  };

  const recentMoodData = journalEntries.slice(-7).map(entry => ({
    date: new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: moodToScore(entry.mood),
  }));

  const moodColors = {
    happy: '#4ade80', // green-400
    content: '#60a5fa', // blue-400
    neutral: '#a1a1aa', // zinc-400
    sad: '#f87171', // red-400
    anxious: '#facc15', // yellow-400
  };

  const Card = ({ icon, title, description, link, className }) => (
    <Link to={link} className={`group p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between ${className}`}>
      <div>
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{description}</p>
      </div>
      <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-semibold">
        Go <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome back, {userName}! 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Here's your wellness snapshot for today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-6">
          {/* Main Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card 
              icon={<Stethoscope size={32} className="text-red-500" />} 
              title="AI Health Diagnosis" 
              description="Check your symptoms with our AI assistant."
              link="/wellness"
              className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30"
            />
            <Card 
              icon={<BookOpen size={32} className="text-green-500" />} 
              title="Write in Journal" 
              description="Log your thoughts and track your mood."
              link="/wellness"
              className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
            />
            <Card 
              icon={<BarChart2 size={32} className="text-blue-500" />} 
              title="View Mood History" 
              description="Visualize your mood trends over time."
              link="/history"
              className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            />
            <Card 
              icon={<ClipboardList size={32} className="text-yellow-500" />} 
              title="Diagnosis History" 
              description="Review past diagnoses."
              link="/diagnosis-history"
              className="bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
            />
            <Card 
              icon={<User size={32} className="text-purple-500" />} 
              title="My Profile" 
              description="View and manage your account details."
              link="/profile"
              className="bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30"
            />
            <Card 
              icon={<HeartPulse size={32} className="text-pink-500" />} 
              title="Track Vitals" 
              description="Log your blood pressure, sugar, and more."
              link="/vitals"
              className="bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            />
          </div>

          {/* Mood Chart */}
          <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Moods</h3>
            {journalEntries.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={recentMoodData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <XAxis dataKey="date" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                  <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} fontSize={12} domain={[0, 5]} />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: isDarkMode ? '#374151' : '#ffffff', 
                      borderColor: isDarkMode ? '#4b5563' : '#e5e7eb' 
                    }}
                  />
                  <Bar dataKey="score">
                    {recentMoodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={moodColors[journalEntries[journalEntries.length - recentMoodData.length + index].mood.toLowerCase()] || '#a1a1aa'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <BarChart2 size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No mood entries yet.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Start journaling to see your mood chart!</p>
              </div>
            )}
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-8">{error}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
