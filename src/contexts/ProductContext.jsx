import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Adjust this path as needed

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [allProducts, setAllProducts] = useState([]); // Stores all products fetched from Firestore
    const [filteredProducts, setFilteredProducts] = useState([]); // Stores products after applying search/filters
    const [searchTerm, setSearchTerm] = useState(''); // The current search query
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState(null);

    
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setProductsLoading(true);
                const productsCollectionRef = collection(db, 'products');
                const querySnapshot = await getDocs(productsCollectionRef);
                const fetchedProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() 
                }));
                setAllProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                setProductsLoading(false);
            } catch (err) {
                console.error("Error fetching all products for search:", err);
                setProductsError("Failed to load products for search. Please try again later.");
                setProductsLoading(false);
            }
        };

        fetchAllProducts();
    }, []); // Empty dependency array: runs only once on component mount

    // --- Filter products whenever searchTerm or allProducts change ---
    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase().trim(); // Trim whitespace
        if (lowercasedSearchTerm === '') {
            setFilteredProducts(allProducts); // If search term is empty, show all products
        } else {
            const results = allProducts.filter(product =>
                // You can search across multiple fields (e.g., name, description, category)
                (product.name && product.name.toLowerCase().includes(lowercasedSearchTerm)) ||
                (product.description && product.description.toLowerCase().includes(lowercasedSearchTerm)) ||
                (product.category && product.category.toLowerCase().includes(lowercasedSearchTerm))
            );
            setFilteredProducts(results);
        }
    }, [searchTerm, allProducts]); // Re-run filtering when search term or product list changes

    const value = {
        allProducts,
        filteredProducts,
        searchTerm,
        setSearchTerm, // Function to update the search term from Navbar
        productsLoading,
        productsError,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};