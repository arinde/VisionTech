// src/components/FeaturesSection.jsx
import React from 'react';
import { Truck, Headset, ShieldCheck } from 'lucide-react'; // Icons for features

export default function WhyUs() {
  return (
    <section className=" text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">

        <div className="flex flex-col items-center p-6 rounded-lg">
          <div className="bg-gray-800 rounded-full p-4 mb-6 shadow-lg">
            <Truck size={48} className="text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">FREE AND FAST DELIVERY</h3>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Free delivery for all orders over $140
          </p>
        </div>

        
        <div className="flex flex-col items-center p-6 rounded-lg">
          <div className="bg-gray-800 rounded-full p-4 mb-6 shadow-lg">
            <Headset size={48} className="text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            Friendly 24/7 customer support
          </p>
        </div>

        <div className="flex flex-col items-center p-6 rounded-lg">
          <div className="bg-gray-800 rounded-full p-4 mb-6 shadow-lg">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">MONEY BACK GUARANTEE</h3>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            We return money within 30 days
          </p>
        </div>

      </div>
    </section>
  );
}
