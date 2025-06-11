import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Adjust path as needed
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useAuth } from './AuthContext'; // We'll need access to the current user's ID

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const { currentUser } = useAuth(); // Get the current user from your AuthContext
    const [wishlistItems, setWishlistItems] = useState([]);
    const [wishlistLoading, setWishlistLoading] = useState(true);
    const [wishlistError, setWishlistError] = useState(null);

    // --- Effect to load wishlist from Firestore when user logs in ---
    useEffect(() => {
        const loadWishlist = async () => {
            if (!currentUser) {
                setWishlistItems([]); // Clear wishlist if no user is logged in
                setWishlistLoading(false);
                return;
            }

            setWishlistLoading(true);
            setWishlistError(null);
            try {
                const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
                const docSnap = await getDoc(userWishlistRef);

                if (docSnap.exists()) {
                    setWishlistItems(docSnap.data().items || []);
                } else {
                    // If no wishlist document exists, create an empty one
                    await setDoc(userWishlistRef, { items: [] });
                    setWishlistItems([]);
                }
            } catch (err) {
                console.error("Error loading wishlist:", err);
                setWishlistError("Failed to load wishlist.");
            } finally {
                setWishlistLoading(false);
            }
        };

        loadWishlist();
    }, [currentUser]); // Re-run when currentUser changes (login/logout)

    // --- Function to add item to wishlist ---
    const addToWishlist = async (product) => {
        if (!currentUser) {
            alert("Please log in to add items to your wishlist."); // Or show a toast/modal
            return;
        }

        const isItemInWishlist = wishlistItems.some(item => item.id === product.id);

        if (isItemInWishlist) {
            console.log("Item already in wishlist:", product.name);
            // Optional: Provide feedback to the user that it's already there
            return;
        }

        try {
            const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
            await updateDoc(userWishlistRef, {
                items: arrayUnion({ // Use arrayUnion to add product if not already present
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    // Add other relevant product details needed for display
                })
            });
            setWishlistItems(prevItems => [...prevItems, {
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
            }]); // Update local state immediately
            console.log(`${product.name} added to wishlist!`);
            // Optional: show a toast/notification
        } catch (err) {
            console.error("Error adding to wishlist:", err);
            setWishlistError("Failed to add item to wishlist.");
        }
    };

    // --- Function to remove item from wishlist ---
    const removeFromWishlist = async (productId) => {
        if (!currentUser) return; // Should not happen if button is conditional on login

        try {
            const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
            const itemToRemove = wishlistItems.find(item => item.id === productId);

            if (itemToRemove) {
                await updateDoc(userWishlistRef, {
                    items: arrayRemove(itemToRemove) // Use arrayRemove to remove the specific item
                });
                setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId)); // Update local state
                console.log(`Item with ID ${productId} removed from wishlist.`);
                // Optional: show a toast/notification
            }
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            setWishlistError("Failed to remove item from wishlist.");
        }
    };

    const value = {
        wishlistItems,
        wishlistLoading,
        wishlistError,
        addToWishlist,
        removeFromWishlist,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};