import React, { createContext, useContext, useState, useEffect } from "react";
import ToastNotification from "../layout/Notification";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const showToast = (message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        showToast(`Cantidad de "${product.title}" aumentada`, "cart");
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        showToast(`"${product.title}" añadido al carrito`, "cart");
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId, productName) => {
    setCartItems((prevItems) => {
      const items = prevItems.filter((item) => item.id !== productId);
      if (items.length < prevItems.length && productName) {
        showToast(`"${productName}" eliminado del carrito`, "error");
      }
      return items;
    });
  };

  const updateQuantity = (productId, quantity, productName) => {
    if (quantity <= 0) {
      removeFromCart(productId, productName);
      return;
    }

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );

      const updatedItem = updatedItems.find((item) => item.id === productId);
      if (updatedItem && productName) {
        showToast(`Cantidad de "${productName}" actualizada`, "cart");
      }

      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    showToast("Carrito vaciado", "error");
  };

  const calculateFinalPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const getCartTotals = () => {
    return cartItems.reduce(
      (totals, item) => {
        const finalPrice = calculateFinalPrice(item.price, item.discount);
        const itemTotal = finalPrice * item.quantity;
        return {
          totalItems: totals.totalItems + item.quantity,
          subTotal: totals.subTotal + item.price * item.quantity,
          totalSavings:
            totals.totalSavings +
            ((item.price * item.discount) / 100) * item.quantity,
          total: totals.total + itemTotal,
        };
      },
      { totalItems: 0, subTotal: 0, totalSavings: 0, total: 0 }
    );
  };

  const formatPrice = (price) => {
    return "$" + price.toFixed(2).replace(".", ",");
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotals,
    formatPrice,
    calculateFinalPrice,
    showToast,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <ToastNotification
        isVisible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </CartContext.Provider>
  );
};

export default CartContext;
