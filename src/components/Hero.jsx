import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Discover the Latest Tech Gadgets</h1>
      <p className="text-lg text-gray-700 mb-6">Shop phones, laptops, accessories and more.</p>
      <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Shop Now</a>
    </section>
  );
};

export default Hero;