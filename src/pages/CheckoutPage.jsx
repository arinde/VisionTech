// src/pages/CheckoutPage.jsx (or src/components/CheckoutPage.jsx)
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, DollarSign, CreditCard, CheckCircle, XCircle } from 'lucide-react'; // Import icons

// Assuming CartContext and Firebase/EmailJS setup are correctly imported
import { useCart } from '../contexts/CartContext';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import emailjs from '@emailjs/browser';
import Visa from "../assets/Visa.png"
import Mastercard from "../assets/Mastercard.png"
import Paypal from "../assets/Paypal.png"
import Stripe from "../assets/Stripe.png"

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', phone: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState({ type: '', text: '' }); // 'success' | 'error'
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Ensure current user email is pre-filled if available
  useEffect(() => {
    if (currentUser && currentUser.email) {
      setShippingInfo(prev => ({ ...prev, email: currentUser.email }));
    }
  }, [currentUser]);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = 10.00; // Example fixed shipping cost
  const taxRate = 0.03; // Example 5% tax rate
  const taxAmount = subtotal * taxRate;
  const totalAmount = subtotal + shippingCost + taxAmount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrder = async () => {
    setSubmissionMessage({ type: '', text: '' }); // Clear previous messages

    // Basic client-side validation
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone || !shippingInfo.email) {
      setSubmissionMessage({ type: 'error', text: 'Please fill in all required shipping fields.' });
      return;
    }
    if (cartItems.length === 0) {
      setSubmissionMessage({ type: 'error', text: 'Your cart is empty. Please add items before checking out.' });
      return;
    }
    if (!currentUser) {
      setSubmissionMessage({ type: 'error', text: 'You must be logged in to place an order.' });
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        userId: currentUser.uid,
        items: cartItems,
        shippingInfo,
        subtotal,
        shippingCost,
        taxAmount,
        totalAmount,
        createdAt: serverTimestamp(),
      };

      const orderRef = await addDoc(collection(db, 'orders'), orderData);

      // Prepare order details for email
      const orderHTML = cartItems.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px 0; display: flex; align-items: center;">
            <img src="${item.imageUrl}" alt="${item.name}" height="64" style="border-radius: 4px; margin-right: 10px;" />
            <div>
              <div style="font-weight: bold; color: #333;">${item.name}</div>
              <div style="font-size: 14px; color: #888; padding-top: 4px;">QTY: ${item.quantity}</div>
            </div>
          </td>
          <td style="padding: 10px 0; text-align: right; font-weight: bold;">$${item.price.toFixed(1)}</td>
        </tr>
      `).join('');

      const emailParams = {
        order_id: orderRef.id,
        orders: orderHTML,
        'cost.shipping': shippingCost.toFixed(2),
        'cost.tax': taxAmount.toFixed(2),
        'cost.total': totalAmount.toFixed(2),
        email: currentUser.email, // Use email from current user, as per previous request
        full_name: shippingInfo.name, // Pass customer name for email personalization
      };

      await emailjs.send(
        'service_71c2pvj', // Your EmailJS Service ID
        'template_iu47ype', // Your EmailJS Template ID
        emailParams,
        '2cHjbpRsfGi-TXfqT' // Your EmailJS Public Key
      );

      clearCart();
      setSubmissionMessage({ type: 'success', text: 'Your order has been placed successfully! Redirecting...' });
      setTimeout(() => navigate('/success'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Order error:', err);
      setSubmissionMessage({ type: 'error', text: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
        {/* Left Section: Order Summary */}
        <div className="md:w-1/2 p-8 md:p-10 bg-gray-50 border-r border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
              <ShoppingCart size={28} className="mr-3 text-blue-600" />
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-600 text-lg text-center py-8">Your cart is empty. <br/> <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Start shopping!</button></p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-white rounded-lg shadow-sm">
                    <img
                      src={item.imageUrl || `https://placehold.co/80x80/e2e8f0/000000?text=Product`}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-lg">${(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(1)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span className="font-medium">$0</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax ({taxRate * 100}%):</span>
              <span className="font-medium">${taxAmount.toFixed(1)}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-gray-900 pt-3 border-t border-gray-300 mt-3">
              <span>Order Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Right Section: Shipping and Payment */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
              <Package size={28} className="mr-3 text-blue-600" />
              Shipping Details
            </h2>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={shippingInfo.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Shipping Address</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Anytown, USA"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={shippingInfo.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out text-gray-900"
                  required
                />
              </div>
            </form>

            <h2 className="text-3xl font-extrabold text-gray-900 mt-10 mb-6 flex items-center">
              <CreditCard size={28} className="mr-3 text-blue-600" />
              Payment Method
            </h2>
            <div className="bg-gray-100 p-6 rounded-lg text-gray-700">
              <p className="font-semibold text-lg mb-3">Card Payment (Coming Soon)</p>
              <p className="text-sm">
                For this demo, payment will be simulated upon clicking "Place Order".
                In a live application, you'd integrate a payment gateway like Stripe, PayPal, or others here.
              </p>
              {/* You'd integrate payment gateway elements here */}
              <div className="flex flex-wrap gap-4 mt-4">
                <img src={Visa} alt="Visa" className="h-8" />
                <img src={Mastercard} alt="Mastercard" className="h-8" />
                <img src={Paypal} alt="PayPal" className="h-8" />
                <img src={Stripe} alt="Stripe" className="h-8" />
                
              </div>
            </div>
          </div>

          {/* Submission Messages */}
          {submissionMessage.type === 'success' && (
            <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
              <CheckCircle size={20} className="mr-2" />
              <span>{submissionMessage.text}</span>
            </div>
          )}
          {submissionMessage.type === 'error' && (
            <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
              <XCircle size={20} className="mr-2" />
              <span>{submissionMessage.text}</span>
            </div>
          )}

          <button
            onClick={handleOrder}
            className="w-full mt-8 py-4 px-6 rounded-lg text-xl font-semibold text-white bg-blue-600 hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out flex items-center justify-center"
            disabled={loading || cartItems.length === 0 || !currentUser}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
