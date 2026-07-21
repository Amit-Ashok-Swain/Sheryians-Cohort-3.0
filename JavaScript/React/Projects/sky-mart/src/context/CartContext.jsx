import { createContext, useContext, useState, useEffect } from "react";

const Cart = createContext(null);

export const useCart = () => {
  const context = useContext(Cart);
  if (!context) {
    throw new Error("useCart must be within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart-items");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const incQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decQuantity = (id) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => setCartItems([]);

  const totalAmount = Number(
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2),
  );

  const totalNumberOfItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <Cart.Provider
      value={{
        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        cartItems,
        addToCart,
        removeFromCart,
        incQuantity,
        decQuantity,
        clearCart,
        totalAmount,
        totalNumberOfItems,
      }}
    >
      {children}
    </Cart.Provider>
  );
};
