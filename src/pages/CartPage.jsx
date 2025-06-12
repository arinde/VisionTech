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
    clearCart,
  } = useCart();

  if (isLoading) {
    return <div className="text-center mt-10">Loading your cart...</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-lg">
      <p className="font-sans text-sm tracking-wider font-medium my-5 px-2 sm:px-0">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="mx-1">/</span>
        <Link to="/cartPage" className="text-gray-900 font-bold">Cart</Link>
      </p>

      {cartItems.length === 0 ? (
        <div className="text-center p-12 text-gray-600 text-xl">
          Your cart is currently empty.
          <p className="mt-4">
            <Link to="/" className="text-blue-600 hover:underline">
              Start shopping!
            </Link>
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-separate border-spacing-y-4">
              <thead className="bg-gray-100 shadow-md hidden md:table-header-group"> {/* Hidden on small screens */}
                <tr>
                  <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  <th className="px-3 py-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group"> {/* Make tbody a block on small screens */}
                {cartItems.map((item) => {
                  const itemSubtotal = item.price * item.quantity;
                  return (
                    <tr
                      key={item.id}
                      className="bg-gray-50 shadow-sm rounded-lg mb-4 block md:table-row" // Each row becomes a block/card on mobile
                    >
                      {/* Product Column */}
                      <td className="p-3 md:py-4 md:px-3 border-b md:border-0 block md:table-cell">
                        <div className="flex md:flex-row flex-col gap-y-2 items-center md:items-start text-left">
                          {item.imageUrl && (
                            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md md:mr-4" />
                          )}
                          <div className="flex-1">
                            <span className="md:hidden font-semibold text-gray-600 text-sm">Product: </span>
                            <h3 className="font-semibold text-base text-gray-900 inline md:block">{item.name}</h3>
                          </div>
                        </div>
                      </td>

                      {/* Price Column */}
                      <td className="p-3 md:py-4 md:px-3 border-b md:border-0 block md:table-cell">
                        <span className="md:hidden font-semibold text-gray-600 text-sm">Price: </span>
                        <p className="text-sm text-gray-800 inline md:block">₦{item.price.toLocaleString()}</p>
                      </td>

                      {/* Quantity Column */}
                      <td className="p-3 md:py-4 md:px-3 border-b md:border-0 block md:table-cell">
                        <span className="md:hidden font-semibold text-gray-600 text-sm">Quantity: </span>
                        <div className=" items-center gap-2 mt-1 md:mt-0 inline-flex md:flex">
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

                      {/* Subtotal Column */}
                      <td className="p-3 md:py-4 md:px-3 border-b md:border-0 block md:table-cell">
                        <span className="md:hidden font-semibold text-gray-600 text-sm">Subtotal: </span>
                        <p className="font-semibold text-base text-gray-900 inline md:block">₦{itemSubtotal.toLocaleString()}</p>
                      </td>

                      {/* Actions Column */}
                      <td className="p-3 md:py-4 md:px-3 block md:table-cell text-center md:text-left">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-100 hidden md:table-footer-group"> {/* Hide on mobile */}
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

          {/* Mobile-specific Total & Actions Section */}
          <div className="md:hidden mt-6 bg-gray-100 p-4 rounded-lg shadow-sm">
            <p className="font-serif font-medium text-lg mb-3">Cart Summary</p>
            <div className="flex justify-between items-center text-base tracking-wide py-1">
              <p>SubTotal:</p>
              <p>₦{getTotal().toLocaleString()}</p>
            </div>
            <div className="border border-gray-300 w-full my-2"></div>
            <div className="flex justify-between items-center text-base tracking-wide py-1">
              <p>Shipping:</p>
              <p>Free</p>
            </div>
            <div className="border border-gray-300 w-full my-2"></div>
            <div className="flex justify-between items-center text-lg font-bold tracking-wide py-1">
              <p>Total:</p>
              <p>₦{getTotal().toLocaleString()}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-200 font-semibold hover:bg-gray-300 transition-colors duration-200 text-gray-800"
              >
                Clear Cart
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                    to="/history"
                    className="inline-block w-full text-center sm:w-auto bg-blue-200 px-4 py-2 font-semibold rounded hover:bg-gray-300 transition text-gray-800"
                >
                    Order History
                </Link>
                {cartItems.length > 0 && (
                    <Link to="/checkout" className="w-full sm:w-auto">
                        <button className="w-full bg-red-600 text-white px-5 py-2 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200">
                            Proceed to Checkout
                        </button>
                    </Link>
                )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;