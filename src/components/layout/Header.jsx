import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Search,
  User,
  Bell,
  Menu,
  X,
  ShoppingCart,
  Trash2,
  ChevronRight,
} from "lucide-react";
import NeonButton from "./NeonButton";
import { useCart } from "../product/CartContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const cartModalRef = useRef(null);

  const cart = useCart();
  const cartItems = cart?.cartItems || [];
  const cartItemCount = cart?.getCartTotals ? cart.getCartTotals().totalItems : 0;
  const total = cart?.getCartTotals ? cart.getCartTotals().total : 0;

  const cartUpdateTrigger = cart?.cartUpdateTrigger;
  const cartIconControls = useAnimation();

  const removeFromCart = (productId) => {
    if (cart?.removeFromCart) {
      const item = cartItems.find(i => i.id === productId);
      cart.removeFromCart(productId, item?.title);
    } else {
      console.warn("Cart context not available. Cannot remove from cart.");
    }
  };

  const formatPrice = (price) => {
    if (cart?.formatPrice) {
      return cart.formatPrice(price);
    }
    return "$" + price.toFixed(2).replace(".", ",");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartModalRef.current &&
        !cartModalRef.current.contains(event.target)
      ) {
        setCartModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (cartUpdateTrigger > 0) {
      cartIconControls.start({
        scale: [1, 1.3, 0.9, 1.15, 0.95, 1.05, 1],
        y: [0, -5, 2, -3, 1, -1, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut",
          times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1]
        },
      });
    }
  }, [cartUpdateTrigger, cartIconControls]);

  return (
    <header className="bg-black/10 backdrop-blur-sm sticky top-0 z-50 border-b border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-indigo-900/5"></div>
      <nav className="container mx-auto px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col">
              <span className="text-white font-bold text-xl tracking-wide">
                Koari
              </span>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a href="/" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group">
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/catalogo" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group">
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/ofertas" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group">
              Ofertas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group">
              Soporte
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="/faq" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/5 rounded-lg overflow-hidden flex items-center w-64">
              <input
                type="text"
                placeholder="Buscar juegos o cuentas..."
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-white p-2 text-sm placeholder-gray-400"
                style={{ boxShadow: "none" }}
              />
              <button className="px-3 text-gray-300 hover:text-white">
                <Search size={16} />
              </button>
            </div>

            <button className="text-gray-300 hover:text-white transition-colors duration-300 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
            </button>

            <motion.button
              animate={cartIconControls}
              onClick={() => setCartModalOpen(!cartModalOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-300 relative p-1"
            >
              <ShoppingCart size={20} />
              {cartItemCount > 0 && (
                <motion.span
                  className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  key={cartItemCount}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.button>

            <NeonButton className="py-1.5 px-4">
              <User size={16} className="mr-2" />
              <span>Acceder</span>
            </NeonButton>
          </motion.div>

          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {cartModalOpen && (
             <motion.div
             ref={cartModalRef}
             className="absolute right-0 top-full mt-2 w-96 bg-gray-800/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
             initial={{ opacity: 0, y: -10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -10, scale: 0.95 }}
             transition={{ duration: 0.2 }}
           >
             <div className="p-4 border-b border-white/10 flex justify-between items-center">
               <h3 className="font-bold text-white">
                 Carrito ({cartItemCount})
               </h3>
               <button
                 onClick={() => setCartModalOpen(false)}
                 className="text-gray-400 hover:text-white"
               >
                 <X size={18} />
               </button>
             </div>
              <div className="max-h-80 overflow-y-auto">
               {cartItems.length === 0 ? (
                 <div className="p-6 text-center">
                   <div className="w-16 h-16 rounded-full bg-gray-700/50 mx-auto flex items-center justify-center mb-3">
                     <ShoppingCart size={24} className="text-gray-400" />
                   </div>
                   <p className="text-gray-300 mb-2">Tu carrito está vacío</p>
                   <p className="text-gray-400 text-sm">
                     Explora nuestro catálogo para encontrar tus juegos
                     favoritos
                   </p>
                 </div>
               ) : (
                 <div>
                   {cartItems.map((item) => (
                     <div
                       key={item.id}
                       className="p-3 border-b border-white/5 flex items-center hover:bg-white/5 transition-colors"
                     >
                       <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                         <img
                           src={item.image}
                           alt={item.title}
                           className="w-full h-full object-cover"
                         />
                       </div>
                       <div className="flex-1 min-w-0">
                         <h4 className="text-white text-sm font-medium truncate">
                           {item.title}
                         </h4>
                         <div className="flex items-center mt-1">
                           <span className="text-indigo-400 text-xs font-bold">
                             {formatPrice(
                               item.price * (1 - item.discount / 100)
                             )}
                           </span>
                           {item.discount > 0 && (
                             <span className="text-gray-400 text-xs line-through ml-2">
                               {formatPrice(item.price)}
                             </span>
                           )}
                           <span className="text-gray-400 text-xs ml-auto">
                             x{item.quantity}
                           </span>
                         </div>
                       </div>
                       <button
                         onClick={() => removeFromCart(item.id)}
                         className="text-gray-400 hover:text-red-400 ml-2"
                       >
                         <Trash2 size={14} />
                       </button>
                     </div>
                   ))}
                 </div>
               )}
             </div>
              <div className="p-4 bg-gray-900/50 border-t border-white/10">
               <div className="flex justify-between mb-4">
                 <span className="text-gray-300">Total:</span>
                 <span className="text-white font-bold">
                   {formatPrice(total)}
                 </span>
               </div>
                <div className="flex space-x-3">
                 <a
                   href="/cart"
                   className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 text-center transition-colors duration-300"
                 >
                   Ver carrito
                 </a>
                 <NeonButton className="flex-1 justify-center py-2">
                   <span>Pagar</span>
                   <ChevronRight size={16} className="ml-1" />
                 </NeonButton>
               </div>
             </div>
           </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
            className="md:hidden mt-4 py-4 border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-5">
              <div className="relative mb-4">
                <div className="flex items-center bg-white/5 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Buscar juegos o cuentas..."
                    className="w-full bg-transparent border-none focus:ring-0 text-white p-3 text-sm placeholder-gray-400"
                  />
                  <button className="px-3 py-2 text-gray-300 hover:text-white">
                    <Search size={16} />
                  </button>
                </div>
              </div>
               <a href="/" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center">
                <span className="w-1 h-6 bg-violet-500 rounded-full mr-3"></span>
                Inicio
              </a>
              <a href="/catalogo" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center">
                <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                Catálogo
              </a>
              <a href="/ofertas" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center">
                <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                Ofertas
              </a>
              <a href="#" className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center">
                <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                Soporte
              </a>
               <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartModalOpen(true);
                  }}
                  className="flex-1 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Carrito ({cartItemCount})
                </button>
                <NeonButton className="flex-1 justify-center py-2">
                  <User size={18} className="mr-2" />
                  <span>Acceder</span>
                </NeonButton>
              </div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;