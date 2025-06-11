import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "./contexts/AuthContext.jsx"
import { CartProvider } from './contexts/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import { ProductProvider } from './contexts/ProductContext.jsx'
import { WishlistProvider } from './contexts/WishListContext.jsx'

createRoot(document.getElementById('root')).render(
  <>
  <Toaster position="top-right" reverseOrder={false} />
  <AuthProvider>
    <CartProvider>
      <ProductProvider>
        <WishlistProvider>
          <StrictMode>
            <App />
          </StrictMode> 
        </WishlistProvider>
      </ProductProvider>
    </CartProvider>
  </AuthProvider>
  </>
)
