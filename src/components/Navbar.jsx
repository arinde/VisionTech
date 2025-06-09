import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import SearchBar from './Search'
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';


const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout, userData } = useAuth();

  const showExtraItems = ['/'].includes(location.pathname)
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-evenly items-center">
      <Link to="/" className="text-xl font-bold">Vision Tech</Link>

      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/" className='hover:underline'>Blog</Link>
        {currentUser ? (
          <>
            <span>Hi, {userData?.name || currentUser.email}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded text-white">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
      <div className='flex items-center space-x-4'>
        <SearchBar />
        <Link to="/cartPage" className="hover:underline flex">
          <ShoppingCart className='w-5' />
        </Link>
        <Link to="/" className='w-5'><Heart /></Link>
      </div>
    </nav>
  );
};

export default Navbar;