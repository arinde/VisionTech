import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase/firebaseConfig'; // Adjust path if needed
import { useWishlist } from '../contexts/WishListContext';
import Spinner from "../components/Spinner";
import { useCart } from '../contexts/CartContext'; // Import useCart for Add to Cart functionality
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL (e.g., /product/abc123def)
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToWishlist, wishlistItems } = useWishlist();

    const { addToCart } = useCart(); // Access addToCart from your CartContext

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) { // If no ID is present in the URL, something is wrong
                setError("Product ID is missing from URL.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null); // Clear previous errors

                const productRef = doc(db, 'products', id); // Reference to the specific document
                const productSnap = await getDoc(productRef); // Fetch the document

                if (productSnap.exists()) {
                    setProduct({ id: productSnap.id, ...productSnap.data() });
                } else {
                    setError("Product not found.");
                }
            } catch (err) {
                console.error("Error fetching product details:", err);
                setError("Failed to load product details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Re-run effect if the product ID in the URL changes

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            if (showToast) {
               showToast(`${product.name} added to cart!`);
             }
        }
    };

    const handleAddToWishlist = () => {
        if (product) {
            addToWishlist(product);
            toast.success('added to Wishlist')
        }
    };

    const isInWishlist = wishlistItems.some(item => item.id === product?.id);

    if (loading) {
        return <Spinner message="Loading product details..." />;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500 text-xl">{error}</div>;
    }

    if (!product) {
        // This case should ideally be caught by 'error' if ID is invalid,
        // or by 'loading' if still fetching. But as a fallback.
        return <div className="text-center p-8 text-gray-500">Product data unavailable.</div>;
    }

    return (
            <div className="flex flex-col items-center justify-center mt-2 md:flex-row md:gap-8">
                
                <div className="md:w-1/2 ">
                    <img
                        src={product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image'}
                        alt={product.name}
                        className=''
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="md:text-4xl text-2xl font-extrabold text-gray-900 mb-1 md:mb-3">{product.name}</h1>
                    {product.category && (
                        <p className="text-md text-gray-500 mb-0 md:mb-2">Category: {product.category}</p>
                    )}
                    <p className=" text-xl md:text-3xl font-bold text-green-600 md:mb-4 mb-1">
                        Price: ₦{product.price ? product.price.toLocaleString() : 'N/A'}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-1 md:mb-6">{product.description}</p>

                    <button
                        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <div className=' mt-4 rounded-full  w-fit p-2 hover:bg-gray-200 transition ease-in-out bg-gray-100' onClick={handleAddToWishlist} 
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
                      <Heart
                          size={24}
                          fill={isInWishlist ? "currentColor" : "none"}
                          strokeWidth={isInWishlist ? 0 : 2}
                          disabled={isInWishlist}
                          className={`text-green-300`}
                          
                      />
                    </div>
                </div>
            </div>
    );
};

export default ProductDetail;