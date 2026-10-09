import { createContext, useContext, useState, useEffect } from "react";

// A context is a way to share data between components
// without passing props through every level.
// Here we use it to share the cart with the Navbar, Cart page, product cards, etc.
const CartContext = createContext();

// Read the saved cart from localStorage (runs only once when the app starts)
function getSavedCart() {
  try {
    const saved = localStorage.getItem("cart");
    if (saved) {
      const parsed = JSON.parse(saved);
      // make sure the saved value is really a list
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    // if the saved data is broken, we just start with an empty cart
    console.log("Could not read the cart from localStorage", error);
  }
  return [];
}

export function CartProvider({ children }) {
  // each cart item looks like: { id, name, image, price, ..., quantity }
  const [cartItems, setCartItems] = useState(getSavedCart);

  // Every time cartItems changes, save it to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.log("Could not save the cart to localStorage", error);
    }
  }, [cartItems]);

  // Add a product. If it is already in the cart, increase its quantity.
  function addToCart(product) {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  }

  // Remove a product completely
  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
  }

  function increaseQuantity(productId) {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  }

  // Quantity can not go below 1 (use "Remove" to delete the item)
  function decreaseQuantity(productId) {
    const updatedCart = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
  }

  function clearCart() {
    setCartItems([]);
  }

  // These two are calculated from cartItems, so we don't keep them in state
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Everything inside "value" can be used by any component
  const value = {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// A small custom hook so components can write: const { cartItems } = useCart();
export function useCart() {
  return useContext(CartContext);
}
