import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { BrainCircuit, BookHeart, Bot, LineChart, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: "AI Disease Diagnosis",
    description: "Get a preliminary diagnosis by describing your symptoms and vitals to our advanced AI.",
    icon: <BrainCircuit size={48} className="text-blue-500" />,
    path: "/wellness"
  },
  {
    title: "Mood & Mental Health Journaling",
    description: "Track your mood and write journal entries to understand your mental state better.",
    icon: <BookHeart size={48} className="text-green-500" />,
    path: "/journal"
  },
  {
    title: "Personalized AI Advice",
    description: "Receive personalized advice and coping strategies based on your journal entries.",
    icon: <Bot size={48} className="text-purple-500" />,
    path: "/advice"
  },
  {
    title: "Mood History Viewer",
    description: "Visualize your mood trends over time with intuitive charts and graphs.",
    icon: <LineChart size={48} className="text-yellow-500" />,
    path: "/history"
  },
  {
    title: "Secure Login + Privacy",
    description: "Your data is end-to-end encrypted and securely stored. Your privacy is our priority.",
    icon: <ShieldCheck size={48} className="text-red-500" />,
    path: "/profile"
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <nav className="p-6 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="text-2xl font-bold cursor-pointer" onClick={() => navigate('/')}>WELLNEST</div>
      <div className="hidden md:flex items-center space-x-8">
        <button onClick={() => navigate('/')} className="hover:text-gray-600">Home</button>
        <ScrollLink to="features" smooth={true} duration={500} className="cursor-pointer hover:text-gray-600">Features</ScrollLink>
        {userInfo ? (
          <button 
            onClick={() => navigate('/dashboard')} 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Dashboard
          </button>
        ) : (
          <button 
            onClick={() => navigate('/auth')} 
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Login / Register
          </button>
        )}
      </div>
      <div className="md:hidden">
          <button onClick={() => navigate(userInfo ? '/dashboard' : '/auth')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">Go</button>
      </div>
    </nav>
  );
};

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 text-gray-800">
      <Navbar />
      <div id="features" className="container mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-center mb-4 text-gray-900">Our Features</h1>
        <p className="text-xl text-center text-gray-600 mb-16">Everything you need for a healthier, happier you.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className="mb-6 bg-gray-100 p-4 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
