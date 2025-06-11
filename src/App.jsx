import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WishlistPage from './pages/WishList';
import ProtectedRoute from './components/ProtectedRoute';
import ContactUsPage from './pages/ContactUs';
import { Footer } from './components/Footer';
import { BlogPage } from './pages/Blog';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProtectedRoute><div className='md:pt-36 p-24'><ProductDetail /></div></ProtectedRoute>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path='/blog' element={<div className='pt-24'><BlogPage /></div>} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/cartPage" element={<ProtectedRoute><div className='pt-24'><CartPage /></div></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><div className='pt-24'><CheckoutPage /></div></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><div className='pt-24'><OrderHistoryPage /></div></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute> <div className='md:pt-24 pt-6'><WishlistPage /></div> </ProtectedRoute>} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;