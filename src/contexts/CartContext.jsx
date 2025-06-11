import { createContext, useContext, useState, useEffect, useRef} from 'react'
import { useAuth } from './AuthContext'; // Assuming you have this
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';


const CartContext = createContext();

export const useCart = () =>  useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const cartLoaded = useRef(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    const loadCart = async () => {
        if (currentUser) {
            setIsLoading(true);
            try {
                const cartRef = doc(db, 'carts', currentUser.uid);
                const cartSnap = await getDoc(cartRef);

                if (cartSnap.exists()) {
                setCartItems(cartSnap.data().items || []);
                toast.success('Cart loaded successfully!');
                } else {
                    setCartItems([]); // Clear cart for unauthenticated users
                }
            } catch (err) {
                toast.error('Failed to load cart!');
            console.error(err);
            } finally {
                setIsLoading(false);
            }
        } else {
            setCartItems([]);
        }
        cartLoaded.current = true;
    }
        loadCart();
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && cartLoaded.current) {
        saveCartToFirestore(cartItems);
        }
    }, [cartItems]);

    const saveCartToFirestore = async (updatedCart) => {
        if (currentUser) {
        const cartRef = doc(db, 'carts', currentUser.uid);
        await setDoc(cartRef, { items: updatedCart });
        }
    };

    const addToCart = (product) => {
        if (!currentUser) {
            toast.error('Please log in to add items to cart');
            return;
        }

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                toast.success('Increased quantity');
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                toast.success('Item added to cart');
                return [...prev, { ...product, quantity: 1 }];
            }
        } )
    }

    const removeFromCart = (productId) => {
        if (!currentUser) return;
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
        toast.success('Item removed from cart');
    }

    // Update quantity
    const updateQuantity = (productId, quantity) => {
        if (!currentUser) return;

        setCartItems((prev) =>
        prev.map((item) =>
            item.id === productId ? { ...item, quantity: Number(quantity) } : item
        )
        );
    };

     // Calculate total
    const getTotal = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const getSubTotal = () => cartItems.reduce((item) => item.price * item.quantity, 0)

    const increaseQuantity = (productId) => {
        if (!currentUser) return;
        toast.success('Item increased from cart');

        const updatedCart = cartItems.map((item) =>
            item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        setCartItems(updatedCart);
        saveCartToFirestore(updatedCart);
    };

    const decreaseQuantity = (productId) => {
        if (!currentUser) return;
        toast.success('Item decreased from cart');

        const updatedCart = cartItems
            .map((item) =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            );

        setCartItems(updatedCart);
        saveCartToFirestore(updatedCart);
    };

    const clearCart = () => {
        setCartItems([]);
        if (currentUser) {
            const cartRef = doc(db, 'carts', currentUser.uid);
            setDoc(cartRef, { items: [] });
        }
    };

    return (
        <CartContext.Provider
            value={{ cartItems, 
                    addToCart,
                    isLoading, 
                    removeFromCart, 
                    updateQuantity, 
                    increaseQuantity, 
                    decreaseQuantity,
                    clearCart,
                    getSubTotal, 
                    getTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}