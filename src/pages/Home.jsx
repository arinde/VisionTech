import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
// import { db } from '../services/firebase'; // Uncomment when Firebase is ready
// import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  
  return (
    <div>
      <Hero />
      <section className="px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <ProductCard />
      </section>
    </div>
  );
};

export default Home;