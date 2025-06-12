import React from 'react';
import { useWishlist } from '../contexts/WishListContext'; 
import { useCart } from '../contexts/CartContext'; 
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const WishlistPage = () => {
   
    const { wishlistItems, wishlistLoading, wishlistError, removeFromWishlist } = useWishlist();
    
    const { addToCart } = useCart();

    // 1. Handle Loading State
    if (wishlistLoading) {
        return <div className="text-center p-8"><Spinner message="Loading wishlist..." /></div>;
    }

    // 2. Handle Error State
    if (wishlistError) {
        return <div className="text-center p-8 text-red-500 text-xl">{wishlistError}</div>;
    }

    // 3. Render the Wishlist content
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold md:mb-6 mb-0 text-center text-gray-800">Your Wishlist</h1>

            {/* 4. Handle Empty Wishlist State */}
            {wishlistItems.length === 0 ? (
                <div className="text-center md:p-8 p-2 text-gray-600 text-lg">
                    <p>Your wishlist is empty.</p>
                    <p>Start Browse products and add your favorites!</p>
                    <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
                        Go to Home Page
                    </Link>
                </div>
            ) : (
               
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col">
                            {/* Product Image - Link to product detail page */}
                            <Link to={`/product/${product.id}`} className="block relative h-48 overflow-hidden rounded-md mb-4">
                                <img
                                    src={product.imageUrl || 'https://via.placeholder.com/200x200?text=No+Image'}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </Link>
                            {/* Product Name */}
                            <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                <Link to={`/product/${product.id}`} className="hover:text-blue-600">
                                    {product.name}
                                </Link>
                            </h2>
                            {/* Product Price */}
                            <p className="text-xl font-bold text-green-600 mb-4">
                                ₦{product.price ? product.price.toLocaleString() : 'N/A'}
                            </p>

                            {/* Action Buttons: Move to Cart & Remove */}
                            <div className="flex flex-col sm:flex-row gap-2 mt-auto"> {/* mt-auto pushes buttons to bottom */}
                                <button
                                    onClick={() => {
                                        addToCart(product); // Add to cart
                                        removeFromWishlist(product.id); // Remove from wishlist
                                        // Optional: show a toast/notification (e.g., "Item moved to cart!")
                                    }}
                                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                                >
                                    Move to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(product.id)}
                                    className="flex-1 bg-red-500 text-white py-2 px-3 rounded-md text-sm hover:bg-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;