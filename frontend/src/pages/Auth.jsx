import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';

// Moved InputField outside the Auth component to prevent re-rendering on state change
const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
  <div className="relative mb-4">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
      required
    />
  </div>
);

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/register';
    const body = isLogin ? { email: formData.email, password: formData.password } : formData;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        // Get error message from response body, if possible
        const errorData = await res.json().catch(() => ({ message: 'Something went wrong' }));
        throw new Error(errorData.message || 'An unknown error occurred');
      }

      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-violet-100 to-indigo-200 dark:from-slate-900 dark:to-violet-900 p-4">
      <Link to="/" className="absolute top-6 left-6 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 font-semibold flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Home
      </Link>
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Side - Welcome Message */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <h1 className="text-4xl font-bold text-center">Welcome to WELLNEST</h1>
            <p className="mt-4 text-center text-indigo-100">Your personal sanctuary for health and mindfulness.</p>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{isLogin ? 'Sign In' : 'Create Account'}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline ml-2">
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <InputField icon={<User size={20} />} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            )}
            <InputField icon={<Mail size={20} />} type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <InputField icon={<Lock size={20} />} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button type="submit" className="w-full flex items-center justify-center p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={20} className="ml-2" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                </div>
            </div>
            <button className="mt-6 w-full flex items-center justify-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-3" />
                Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
