import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { HeartPulse, Droplet, Thermometer, Activity, Clock, Bot } from 'lucide-react';

const VitalsHistoryCard = ({ item, isDarkMode }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg border-l-4 border-indigo-500">
    <div className="flex justify-between items-start mb-3">
      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
        <Clock size={14} className="mr-2" />
        {new Date(item.createdAt).toLocaleString()}
      </p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <p><strong className="font-semibold text-gray-700 dark:text-gray-300">BP:</strong> {item.bloodPressure}</p>
      <p><strong className="font-semibold text-gray-700 dark:text-gray-300">Sugar:</strong> {item.sugarLevel} mg/dL</p>
      <p><strong className="font-semibold text-gray-700 dark:text-gray-300">HR:</strong> {item.heartRate} BPM</p>
      <p><strong className="font-semibold text-gray-700 dark:text-gray-300">Temp:</strong> {item.temperature}°F</p>
    </div>
    {item.analysis && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-md flex items-center text-gray-700 dark:text-gray-300">
                <Bot size={16} className="mr-2 text-indigo-500"/> AI Analysis
            </h4>
            <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7 whitespace-pre-wrap">{item.analysis}</p>
        </div>
    )}
  </div>
);


const Vitals = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [vitals, setVitals] = useState({
    bloodPressure: '',
    sugarLevel: '',
    heartRate: '',
    temperature: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchHistory = async () => {
      setIsHistoryLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }
        const res = await axios.get('http://localhost:5000/api/vitals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error("Failed to fetch vitals history:", err);
        setError('Could not load vitals history.');
      } finally {
        setIsHistoryLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const handleChange = (e) => {
    setVitals({ ...vitals, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAnalysisResult(null);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/vitals', vitals, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.data) {
        setAnalysisResult(res.data);
        setHistory(prevHistory => [res.data, ...prevHistory]);
        setVitals({
          bloodPressure: '',
          sugarLevel: '',
          heartRate: '',
          temperature: '',
        });
      } else {
        throw new Error('Failed to save vitals');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}, ${isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)'}), url('https://images.unsplash.com/photo-1555212697-3663a28e1878?auto=format&fit=crop&q=80&w=1974')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/dashboard" className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors mb-8 block">
            &larr; Back to Dashboard
          </Link>

          <div className="bg-white dark:bg-gray-800/50 p-8 rounded-2xl shadow-lg backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Track Your Vitals</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Blood Pressure */}
                <div className="relative">
                  <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Blood Pressure (e.g., 120/80)</label>
                  <div className="flex items-center">
                    <HeartPulse className="absolute left-3 top-10 text-red-500" size={20} />
                    <input
                      type="text"
                      name="bloodPressure"
                      id="bloodPressure"
                      value={vitals.bloodPressure}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="e.g., 120/80"
                      required
                    />
                  </div>
                </div>

                {/* Sugar Level */}
                <div className="relative">
                  <label htmlFor="sugarLevel" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Sugar Level (mg/dL)</label>
                  <div className="flex items-center">
                    <Droplet className="absolute left-3 top-10 text-blue-500" size={20} />
                    <input
                      type="number"
                      name="sugarLevel"
                      id="sugarLevel"
                      value={vitals.sugarLevel}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="e.g., 90"
                      required
                    />
                  </div>
                </div>

                {/* Heart Rate */}
                <div className="relative">
                  <label htmlFor="heartRate" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Heart Rate (BPM)</label>
                  <div className="flex items-center">
                    <Activity className="absolute left-3 top-10 text-pink-500" size={20} />
                    <input
                      type="number"
                      name="heartRate"
                      id="heartRate"
                      value={vitals.heartRate}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="e.g., 72"
                      required
                    />
                  </div>
                </div>

                {/* Temperature */}
                <div className="relative">
                  <label htmlFor="temperature" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Temperature (°F)</label>
                  <div className="flex items-center">
                    <Thermometer className="absolute left-3 top-10 text-orange-500" size={20} />
                    <input
                      type="number"
                      step="0.1"
                      name="temperature"
                      id="temperature"
                      value={vitals.temperature}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="e.g., 98.6"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 disabled:bg-indigo-400"
              >
                {isLoading ? 'Analyzing...' : 'Save & Analyze Vitals'}
              </button>
            </form>

            {error && (
              <div className="mt-6 p-4 rounded-lg text-center bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                {error}
              </div>
            )}

            {analysisResult && (
              <div className="mt-6 p-5 rounded-lg bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3 flex items-center">
                    <Bot size={22} className="mr-3"/> AI Health Suggestions
                </h3>
                <p className="text-green-700 dark:text-green-300 whitespace-pre-wrap">{analysisResult.analysis}</p>
              </div>
            )}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Vitals History</h3>
            {isHistoryLoading && <p className="text-center">Loading history...</p>}
            {!isHistoryLoading && error && <p className="text-red-500 text-center">{error}</p>} 
            {!isHistoryLoading && !error && history.length === 0 && (
              <div className="text-center py-10 bg-white dark:bg-gray-800/50 rounded-xl shadow-md">
                  <HeartPulse size={40} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <p className='text-gray-500 dark:text-gray-400'>You have no vitals history.</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Enter your vitals above to get started.</p>
              </div>
            )}
            {!isHistoryLoading && history.length > 0 && (
              <div className="space-y-4">
                {history.map((item) => (
                  <VitalsHistoryCard key={item._id} item={item} isDarkMode={isDarkMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vitals;
