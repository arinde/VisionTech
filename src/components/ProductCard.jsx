import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';
import Spinner from './Spinner';
import { useWishlist } from '../contexts/WishListContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Get addToCart from CartContext
    const [loading, setLoading] = React.useState(false)
    const { addToWishlist, wishlistItems } = useWishlist();

    if (!product) {
        return null; // Or a placeholder if needed
    }

    const handleAddToCart = () => {
        addToCart(product);
        if (showToast) showToast(`${product.name} added to cart!`);
    };

    const handleAddToWishlist = () => { // NEW: Handler for adding to wishlist
        addToWishlist(product);
        toast.success("added to wish list")
    };
    const isInWishlist = wishlistItems.some(item => item.id === product.id);

    const formattedPrice = product.price ? `₦${product.price.toLocaleString()}` : 'N/A';
    if (loading) return <Spinner message="Loading..." />;

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col w-full h-full"> {/* Added w-full h-full */}
            {/* Product Image - Link to product detail page */}
            <div className="block relative w-full h-48 overflow-hidden">
                <img
                    src={product.imageUrl || 'https://via.placeholder.com/200x200?text=No+Image'} // Fallback image
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />

                <button
                    onClick={handleAddToWishlist}
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 backdrop-blur-sm z-10 transition-colors duration-200
                                ${isInWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}
                                ${isInWishlist ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={isInWishlist} // Disable if already in wishlist
                >
                    <Heart
                        size={24}
                        fill={isInWishlist ? "currentColor" : "none"} // Fill if in wishlist
                        strokeWidth={isInWishlist ? 0 : 2} // No stroke if filled
                    />
                </button>
            </div>

            {/* Product Details */}
            <div className="p-4 flex-grow flex flex-col justify-between"> {/* flex-grow and flex flex-col justify-between are key here */}
                <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2 truncate">
                        Name: {product.name}
                    </h2>
                    {product.category && (
                        <p className="text-gray-600 text-sm">Category: {product.category}</p>
                    )}
                    <p className="text-green-600 font-semibold text-xl mt-1">
                        Price: {formattedPrice}
                    </p>

                    {/* Star Rating */}
                    <div className="flex items-center my-2">
                        {Array(5).fill().map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={`mr-1 ${i < 4 ? "text-yellow-400" : "text-gray-300"}`}
                                fill={i < 4 ? "#facc15" : "none"}
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4 gap-2">
                    <button
                        className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md text-sm hover:bg-blue-700 transition-colors"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >
                        View Product
                    </button>

                    <button
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md text-sm hover:bg-green-700 transition-colors"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;


