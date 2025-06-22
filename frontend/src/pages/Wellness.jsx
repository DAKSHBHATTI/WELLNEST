import React, { useState, useEffect } from 'react';
import { Sun, Moon, Bot, User, Send, Activity, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const Wellness = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [symptoms, setSymptoms] = useState('');
  const [journalEntry, setJournalEntry] = useState('');
  const [diagnosisResponse, setDiagnosisResponse] = useState(null);
  const [journalResponse, setJournalResponse] = useState(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);
  const [isLoadingJournal, setIsLoadingJournal] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleDiagnosisSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setIsLoadingDiagnosis(true);
    setDiagnosisResponse(null);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post('http://localhost:5000/api/diagnosis', { symptoms }, config);
      setDiagnosisResponse(data.diagnosis);
    } catch (error) {
      setDiagnosisResponse(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  const handleJournalSubmit = async (e) => {
    e.preventDefault();
    if (!journalEntry.trim()) return;
    setIsLoadingJournal(true);
    setJournalResponse(null);

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5000/api/journal', { content: journalEntry }, config);
      setJournalResponse('Journal entry saved successfully! Your mood has been recorded.');
      setJournalEntry('');
    } catch (error) {
      setJournalResponse(`Error: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setIsLoadingJournal(false);
    }
  };

  const ResponseMessage = ({ icon, children, sender }) => (
    <div className={`flex items-start space-x-3 p-3 my-4 rounded-lg ${sender === 'user' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-700/50'}`}>
      {icon}
      <p className="text-sm text-gray-700 dark:text-gray-300">{children}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
        <Link to="/dashboard" className="text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
            &larr; Back to Dashboard
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-indigo-200 dark:bg-gray-700 text-indigo-600 dark:text-yellow-400 hover:shadow-lg transition-all duration-300"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Diagnosis Section */}
          <div 
            className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:-translate-y-1 transition-transform duration-300"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}), url('https://images.unsplash.com/photo-1579684385127-6ab18a5d7814?auto=format&fit=crop&q=80&w=1974')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                <Activity className="text-red-500 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Health Diagnosis</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Describe your symptoms, and our AI will provide a preliminary analysis.</p>
            
            <form onSubmit={handleDiagnosisSubmit}>
              <div className="relative">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., 'I have a headache, fever, and a persistent cough...'"
                  className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-400 rounded-lg resize-none transition-colors"
                  rows="4"
                />
                <button type="submit" disabled={isLoadingDiagnosis} className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 disabled:bg-indigo-300 transition-all">
                  <Send size={20} />
                </button>
              </div>
            </form>

            {isLoadingDiagnosis && <div className="text-center p-4">Analyzing...</div>}
            
            {symptoms && !isLoadingDiagnosis && (
              <ResponseMessage icon={<User size={24} className="text-blue-500" />} sender="user">
                {symptoms}
              </ResponseMessage>
            )}
            {diagnosisResponse && !isLoadingDiagnosis && (
              <ResponseMessage icon={<Bot size={24} className="text-indigo-500" />}>
                {diagnosisResponse}
              </ResponseMessage>
            )}
          </div>

          {/* Mood Journal Section */}
          <div 
            className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200 dark:border-gray-700 p-6 transform hover:-translate-y-1 transition-transform duration-300"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${isDarkMode ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)'}, ${isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)'}), url('https://images.unsplash.com/photo-1491841550275-5b462bf975db?auto=format&fit=crop&q=80&w=2070')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <Smile className="text-green-500 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mood Journal</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Log your thoughts and feelings. We'll analyze the mood of your entry.</p>
            
            <form onSubmit={handleJournalSubmit}>
              <div className="relative">
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="e.g., 'Feeling great today! Accomplished a lot at work and enjoyed a walk in the park...'"
                  className="w-full p-4 pr-12 bg-gray-100 dark:bg-gray-700 border-2 border-transparent focus:border-green-500 dark:focus:border-green-400 rounded-lg resize-none transition-colors"
                  rows="4"
                />
                <button type="submit" disabled={isLoadingJournal} className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-green-500 text-white rounded-full hover:bg-green-600 disabled:bg-green-300 transition-all">
                  <Send size={20} />
                </button>
              </div>
            </form>

            {isLoadingJournal && <div className="text-center p-4">Saving...</div>}
            
            {journalResponse && !isLoadingJournal && (
              <ResponseMessage icon={<Bot size={24} className="text-green-500" />}>
                {journalResponse}
              </ResponseMessage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wellness;
