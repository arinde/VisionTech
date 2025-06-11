import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import { useProducts } from '../contexts/ProductContext'; // Import useProducts hook
import ProductCard from '../components/ProductCard'; // Import your ProductCard component
import Spinner from '../components/Spinner';
import Featured from '../components/Featured';
import WhyUs from '../components/WhyUs';

const Home = () => {
  // Consume the product context to get filtered products, loading state, etc.
    const { filteredProducts, productsLoading, productsError, searchTerm } = useProducts();

    if (productsLoading) {
        return <div className="text-center p-8"><Spinner message="Loading products..." /></div>;
    }

    if (productsError) {
        return <div className="text-center p-8 text-red-500">{productsError}</div>;
    }
  return (
    <div className=' pt-12'>
      <Hero />
      <section className="px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {searchTerm ? `Search Results for "${searchTerm}"` : "Featured Products"}
            </h1>

            {filteredProducts.length === 0 && searchTerm ? (
                <div className="text-center p-8 text-gray-500">
                    No products found matching "{searchTerm}".
                </div>
            ) : filteredProducts.length === 0 && !searchTerm ? (
                 <div className="text-center p-8 text-gray-500">
                    No products available. Please check back later.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
        
      </section>
      <Featured />
      <WhyUs />
    </div>
  );
};

export default Home;