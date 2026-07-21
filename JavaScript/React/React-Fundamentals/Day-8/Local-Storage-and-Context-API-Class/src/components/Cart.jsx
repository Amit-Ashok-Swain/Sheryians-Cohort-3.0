import React, { useContext } from 'react';
import { MyStore } from '../context/MyContext';

const Cart = () => {

  let {cartItems,setCartItems,setIsCartOpen} = useContext(MyStore)
  // Helper to update item quantity
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 1) + change;
          // Prevent quantity from going below 1
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  // Helper to remove an item entirely
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  const shipping = subtotal > 0 ? 15.0 : 0; // Flat $15 shipping fee
  const tax = subtotal * 0.08; // 8% estimated tax
  const total = subtotal + shipping + tax;

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <svg className="w-24 h-24 text-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button 
          onClick={() => setIsCartOpen && setIsCartOpen(false)}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-white">Shopping Cart</h1>
        <button 
          onClick={() => setIsCartOpen && setIsCartOpen(false)}
          className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>&larr;</span> Continue Shopping
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
            <ul className="divide-y divide-gray-800">
              {cartItems.map((item) => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:bg-gray-800/50 transition-colors">
                  
                  {/* Item Image (White bg because API images have white backgrounds) */}
                  <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg p-2 flex items-center justify-center border border-gray-700">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col w-full">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white line-clamp-2 pr-4">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 uppercase tracking-wide mt-1">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-lg font-bold text-white whitespace-nowrap">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-700 rounded-lg bg-gray-950 overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-4 py-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1.5 font-medium text-white border-x border-gray-700 min-w-[3rem] text-center">
                          {item.quantity || 1}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-4 py-1.5 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-300 flex items-center gap-1.5 text-sm font-medium transition-colors p-2 hover:bg-red-400/10 rounded-lg"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 sticky top-8 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-gray-400 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping estimate</span>
                <span className="font-medium text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax estimate</span>
                <span className="font-medium text-white">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4 mb-6 flex justify-between items-center">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-2xl font-black text-white">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 flex justify-center items-center gap-2">
              Proceed to Checkout
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure 256-bit SSL Encryption
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;