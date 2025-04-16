'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setError('');
    setSuccess(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    console.log('Submitting:', { name, email, password });

    const url = isRegister ? '/api/register' : '/api/login';
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (res.ok) {
        setError('');
        setSuccess(true);

        if (isRegister) {
          setIsRegister(false);
          setPassword('');
          setName('');
          setEmail('');
        } else {
          localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new Event('userLogin'));
          router.push('/');
        }
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to connect to server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isRegister ? 'Register' : 'Login'}
      </h2>

      {success && (
        <p className="text-green-600 text-center mb-4">
          {isRegister ? 'Registration successful! Please log in.' : 'Login successful!'}
        </p>
      )}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white rounded-md transition duration-300 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Processing...' : isRegister ? 'Register' : 'Login'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-sm">
          {isRegister ? 'Already have an account?' : 'Don’t have an account?'}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 hover:underline ml-1"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;