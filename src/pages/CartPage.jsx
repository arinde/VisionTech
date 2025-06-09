import React from "react";
import { useCart } from "../contexts/CartContext";
;

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, increaseQuantity, decreaseQuantity, getTotal} = useCart();

    return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="mb-4 border p-4 rounded">
            <h3 className="font-semibold">{item.name}</h3>
            <p>Price: ${item.price}</p>
            <div className="flex items-center gap-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
              </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Total: ${getTotal()}</h4>
        </div>
      )}

      <button className="bg-red-500 text-white px-3 py-1 rounded-lg">Proceed To checkout</button>
    </div>
  );
};

export default CartPage;