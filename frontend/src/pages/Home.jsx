import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 text-gray-800">
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">WELLNEST</Link>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/features" className="hover:text-gray-600">Features</Link>
          {isLoggedIn ? (
            <button 
              onClick={() => navigate('/dashboard')} 
              className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Go to Dashboard
            </button>
          ) : (
            <button 
              onClick={() => navigate('/auth')} 
              className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Login / Register
            </button>
          )}
        </div>
        <div className="md:hidden">
            <button onClick={handleGetStartedClick} className="bg-white text-gray-800 font-bold py-2 px-4 rounded-full shadow-lg">Go</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4" style={{ minHeight: 'calc(100vh - 100px)' }}>
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            Your Journey to Wellness Starts Here
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            AI-powered platform for mental & physical health support
          </p>
          <button 
            onClick={handleGetStartedClick} 
            className="bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-xl hover:bg-blue-600 transition duration-300 transform hover:scale-105"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
