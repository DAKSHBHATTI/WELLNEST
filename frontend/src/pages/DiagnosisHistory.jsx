import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, Stethoscope, User, Calendar, Bot } from 'lucide-react';

const DiagnosisHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/diagnosis', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data);
      } catch (err) {
        console.error("Error fetching diagnosis history:", err.response ? err.response.data : err.message);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/auth');
        } else {
          setError('Failed to fetch diagnosis history.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [navigate]);

  const HistoryCard = ({ item }) => (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg border-l-4 border-red-500">
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <Calendar size={14} className="mr-2" />
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
            <h3 className="font-semibold text-lg flex items-center text-gray-700 dark:text-gray-300">
                <User size={18} className="mr-2 text-blue-500"/> Your Symptoms
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7">{item.symptoms}</p>
        </div>
        <div>
            <h3 className="font-semibold text-lg flex items-center text-gray-700 dark:text-gray-300">
                <Bot size={18} className="mr-2 text-indigo-500"/> AI Diagnosis
            </h3>
            <p className="mt-1 text-gray-600 dark:text-gray-300 pl-7 whitespace-pre-wrap">{item.diagnosis}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}, ${isDarkMode ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)'}), url('https://images.unsplash.com/photo-1584515933487-779824d29209?auto=format&fit=crop&q=80&w=2070')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <Stethoscope size={28} className="mr-3 text-red-500"/> Diagnosis History
          </h1>
          <Link to="/dashboard" className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        {loading && <p className="text-center">Loading history...</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!loading && !error && history.length === 0 && (
            <div className="text-center py-16">
                <Stethoscope size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <p className='text-gray-500 dark:text-gray-400'>You have no diagnosis history.</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Use the AI Health Diagnosis tool to get started.</p>
            </div>
        )}

        {!loading && history.length > 0 && (
          <div className="space-y-4">
            {history.map((item) => (
              <HistoryCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisHistory;
