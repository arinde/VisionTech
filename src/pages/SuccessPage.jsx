import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const SuccessPage = () => {
  const { width, height } = useWindowSize();

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <Confetti width={width} height={height} numberOfPieces={250} recycle={false} />
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-700 mb-2">Order Successful!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Continue Shopping
        </Link>
        
      </div>
    </div>
  );
};

export default SuccessPage;
