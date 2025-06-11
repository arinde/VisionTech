// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../contexts/CartContext"; 
import { Link } from "react-router-dom";

const CartPage = () => {
    
    const {
        cartItems,
        isLoading,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        getTotal,
        clearCart 
    } = useCart();

    if (isLoading) {
        return <div className="text-center mt-10">Loading your cart...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
          <p className="font-sans text-sm tracking-wider font-medium my-5"><Link to="/" className="text-gray-500">Home</Link>/<Link to="/cartPage">Cart</Link></p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-spacing-y-4 border-separate">
                    <thead className="bg-gray-100 shadow-md ">
                        <tr>
                            <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                            <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {cartItems.length === 0 ? (
                            <tr> 
                                <td colSpan="5" className="text-center p-12 text-gray-600 text-xl">
                                    Your cart is currently empty.
                                </td>
                            </tr>
                        ) : (
                            cartItems.map((item, index) => {
                                const itemSubtotal = item.price * item.quantity;
                                return (
                                    <tr
                                        key={item.id}
                                        className="bg-gray-50 shadow-sm rounded-lg"
                                        style={{ display: 'table-row' }}
                                    >
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {item.imageUrl && ( // Conditionally render image if available
                                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                                                )}
                                                <h3 className="font-semibold text-base text-gray-900">{item.name}</h3>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <p className="text-sm text-gray-800">₦{item.price.toLocaleString()}</p>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                                                    onClick={() => decreaseQuantity(item.id)}
                                                >
                                                    −
                                                </button>
                                                <span className="px-2 py-1 text-gray-800 font-medium">{item.quantity}</span>
                                                <button
                                                    className="px-2 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-200 transition-colors"
                                                    onClick={() => increaseQuantity(item.id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <p className="font-semibold text-base text-gray-900">₦{itemSubtotal.toLocaleString()}</p>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap text-left"> 
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                    <tfoot className="bg-gray-100"> {/* Footer for total */}
                        <tr>
                            <td colSpan="3" className="px-3 py-4 whitespace-nowrap text-right text-lg font-bold text-gray-800">
                                Total:
                            </td>
                            <td colSpan="2" className="px-3 py-4 whitespace-nowrap text-left text-xl font-bold text-gray-700">
                                ₦{getTotal().toLocaleString()}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="flex justify-between">
              {cartItems.length > 0 && ( 
                  <button
                      onClick={clearCart}
                      className="px-6 py-3  rounded-lg  bg-blue-200 font-semibold hover:bg-gray-300 transition-colors duration-200"
                  >
                      Clear Cart
                  </button>
              )}
              
              <Link
                  to="/history"
                  className="inline-block bg-blue-200 px-4 py-2 font-semibold rounded hover:bg-gray-300 transition"
              >
                  History Page
              </Link>
            </div>

                <div className=" border-[1.5px]  px-4 py-4 w-80 flex mt-7 flex-col ml-auto gap-y-2 justify-start">
                  <p className="font-serif font-medium">Cart Total</p>
                  <div className="flex justify-between items-center text-sm tracking-wide">
                    <p>SubTotal:</p>
                    <p>₦{getTotal().toLocaleString()}</p>
                  </div>
                  <div className="border border-gray-400 w-full"></div>
                  <div className="flex justify-between items-center text-sm tracking-wide">
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="border border-gray-400 w-full"></div>
                  <div className="flex justify-between items-center text-sm tracking-wide">
                    <p>Total:</p>
                    <p>₦{getTotal().toLocaleString()}</p>
                  </div>
                  {cartItems.length > 0 && (
                    <Link to="/checkout">
                      <button className="bg-red-600 text-white px-5 py-1 mt-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                          Proceed to Checkout
                      </button>
                    </Link>
                  )}

                </div>
            
        </div>
    );
};

export default CartPage;