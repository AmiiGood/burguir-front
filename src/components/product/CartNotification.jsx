import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShoppingCart } from "lucide-react";
import NeonButton from "../layout/NeonButton";

const CartNotification = ({ product, isVisible, onClose, onViewCart }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-20 right-4 z-50 w-80 bg-gray-800/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl overflow-hidden"
          initial={{ opacity: 0, x: 50, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
        >
          <div className="p-4 flex items-start">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mr-3">
              <Check size={20} className="text-green-400" />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-white font-medium mb-1">
                    ¡Añadido al carrito!
                  </h4>
                  <p className="text-gray-300 text-sm">{product.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={onClose}
                  className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors duration-300"
                >
                  Seguir comprando
                </button>
                <NeonButton
                  className="flex-1 justify-center py-1.5 text-sm"
                  onClick={onViewCart}
                >
                  <ShoppingCart size={14} className="mr-1" />
                  Ver carrito
                </NeonButton>
              </div>
            </div>
          </div>

          <motion.div
            className="h-1 bg-green-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartNotification;
