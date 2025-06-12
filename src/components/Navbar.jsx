import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import SearchBar from './Search'
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishListContext';
import Logo from "../assets/Logo.png"
import { useState } from "react"


const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout, userData } = useAuth();
  const { cartItems, getTotal } = useCart();
  const { wishlistItems } = useWishlist();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const showExtraItems = ['/'].includes(location.pathname)
  return (
    <nav className="bg-gray-900 text-white shadow-lg opacity-95 fixed z-50 w-full">
      <div className=" max-w-7xl md:mx-auto md:px-4 px-2 sm:px-6 lg:px-8 flex md:justify-between justify-between items-center md:h-24 h-20">
        <Link to="/" className="md:text-lg text-md md:font-bold font-semibold flex justify-center items-center"><img src={Logo} alt='' className='md:w-16 w-12' />Vision Tech</Link>

        {/* Desktop Links */}
        <div className="space-x-5 hidden md:flex">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/blog" className='hover:underline'>Blog</Link>
          
        </div>

        <div className='flex items-center md:space-x-2 space-x-3'>
          <div className='hidden md:flex'>
            <SearchBar />
          </div>

          {!currentUser && <Link to="/login" className='hidden md:flex py-1 px-3 bg-blue-600 text-center border-0 shadow-md rounded-2xl'>SignIn</Link>}
          
          {currentUser && (
            <>
            <Link to="/cartPage" className="hover:underline flex">
            <div className='relative'>
              <ShoppingCart className='w-5' />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </div>
            
          </Link>
          <Link to="/wishlist" className="relative hover:text-blue-400 w-5 flex items-center gap-1">
            <Heart   />
            <span className="sr-only">Wishlist</span> {/* For screen readers */}
            {wishlistItems.length > 0 && (
                <span className="absolute  -top-2 -right-1 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                </span>
            )}
          </Link>
          </>
        )}
          {currentUser && (
            <>
              <span className='text-xs md:text'>Hi, {userData?.name || currentUser.email}</span>
              <Link to="/login"><button onClick={logout} className="py-1 px-3 bg-red-600 text-center border-0 shadow-md rounded-2xl  hidden md:flex">
                Logout
              </button>
              </Link>
            </>
          )}
        </div>
        
        <div className="md:hidden  hover:bg-blue-950 hover:rounded-lg hover:py-2 pl-2" onClick={toggleMenu}>
          <div className="relative w-8 h-6 cursor-pointer">
            {/* Top bar */}
            <span
              className={`absolute top-0 right-0 h-0.5 bg-white transition-all duration-300 ${
                isOpen
                  ? 'rotate-45 top-2.5 left-0 right-0 w-6'
                  : 'w-3 ml-auto top-0.5 right-2'
              }`}
            />
            {/* Middle bar */}
            <span
              className={`absolute top-2.5 left-0 h-0.5 bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'w-6 -top-2.5'
              }`}
            />
            {/* Bottom bar */}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                isOpen
                  ? '-rotate-45 bottom-2.5 left-0 right-0 w-6'
                  : 'w-3 mr-auto top-4.5'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='flex flex-col gap-y-3 py-3 mx-5'>
          <div className=" flex flex-col gap-y-4 justify-center items-start"> 
            <Link to="/" className="hover:underline" onClick={toggleMenu}>Home</Link>
            <Link to="/contact" className="hover:underline" onClick={toggleMenu}>Contact</Link>
            <Link to="/blog" className='hover:underline' onClick={toggleMenu}>Blog</Link>
            {!currentUser && <Link to="/login" onClick={toggleMenu}>SignIn</Link>}
          </div>
          <div className='flex justify-start items-center gap-x-3'>
          <SearchBar />
            
          {currentUser && (
            <>
              <Link to="/login" onClick={toggleMenu}><button onClick={logout} className="bg-red-600 w-40 rounded-2xl shadow-md py-1.5 px-2 text-white">
                Logout
              </button>
              </Link>
            </>
          )}
          <div onClick={toggleMenu}>
            {!currentUser && <Link to="/login" className=' flex py-1 px-16 bg-blue-600 text-center border-0 shadow-md rounded-2xl'>SignIn</Link>}
          </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;