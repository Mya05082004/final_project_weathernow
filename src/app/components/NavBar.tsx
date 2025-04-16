'use client';
import React, { useEffect, useState } from 'react';
import { BsFillCloudSunFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Define user type for TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Function to update user from localStorage
    const updateUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    // Initial check
    updateUser();

    // Listen for userLogin and userLogout events
    window.addEventListener('userLogin', updateUser);
    window.addEventListener('userLogout', updateUser);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('userLogin', updateUser);
      window.removeEventListener('userLogout', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userLogout')); // Dispatch logout event
    router.push('/user'); // Redirect to login/signup page
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full p-4 bg-sky-300 font-mono">
      {/* Logo Section */}
      <div className="flex items-center mb-4 sm:mb-0">
        <h1 className="text-3xl">WeatherNow</h1>
        <BsFillCloudSunFill className="text-3xl text-yellow-400 ml-2" />
      </div>

      {/* Links Section */}
      <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center text-white text-lg">
        <li>
          <Link href="/" className="px-3 py-2 hover:bg-sky-400 rounded transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/search" className="px-3 py-2 hover:bg-sky-400 rounded transition">
            Search
          </Link>
        </li>
        <li>
          <Link href="/forecast" className="px-3 py-2 hover:bg-sky-400 rounded transition">
            Forecast
          </Link>
        </li>

        {/* Show user name if logged in */}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-white">Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded transition text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/user" className="px-3 py-2 hover:bg-sky-500 rounded transition">
            Sign In / Sign Up
          </Link>
        )}
      </ul>
    </div>
  );
}