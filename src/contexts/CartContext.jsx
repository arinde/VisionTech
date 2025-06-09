import { createContext, useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'; // Assuming you have this
import { db } from '../firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';


const CartContext = createContext();

export const useCart = () =>  useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        const cartRef = doc(db, 'carts', currentUser.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        }
      } else {
        setCartItems([]); // Clear cart for unauthenticated users
      }
    };

        loadCart();
    }, [currentUser]);

    const saveCartToFirestore = async (updatedCart) => {
        if (currentUser) {
        const cartRef = doc(db, 'carts', currentUser.uid);
        await setDoc(cartRef, { items: updatedCart });
        }
    };

    const addToCart = (product) => {
        if (!currentUser) {
            alert('Please log in to add items to cart');
            return;
        }

        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id)
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        } )
    }

    const removeFromCart = (productId) => {
        if (!currentUser) return;
        setCartItems((prev) => prev.filter((item) => item.id !== productId))
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

    const increaseQuantity = (productId) => {
        if (!currentUser) return;

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

        const updatedCart = cartItems
            .map((item) =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                : item
            );

        setCartItems(updatedCart);
        saveCartToFirestore(updatedCart);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, getTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}