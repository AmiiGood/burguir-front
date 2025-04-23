import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Bell, Menu, X, ShoppingCart } from "lucide-react";
import NeonButton from "./NeonButton";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                GameVault
              </span>
              <span className="text-indigo-300 text-xs tracking-wider -mt-1">
                CUENTAS PREMIUM
              </span>
            </div>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a
              href="/"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/catalogo"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
              Catálogo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
              Ofertas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
              Soporte
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="/faq"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
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

            <button className="text-gray-300 hover:text-white transition-colors duration-300 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </button>

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

                <a
                  href="#"
                  className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-6 bg-violet-500 rounded-full mr-3"></span>
                  Inicio
                </a>
                <a
                  href="#"
                  className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                  Catálogo
                </a>
                <a
                  href="#"
                  className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                  Ofertas
                </a>
                <a
                  href="#"
                  className="text-white font-medium hover:text-violet-300 transition-colors duration-300 flex items-center"
                >
                  <span className="w-1 h-6 bg-transparent rounded-full mr-3"></span>
                  Soporte
                </a>

                <div className="flex space-x-3 pt-2">
                  <button className="flex-1 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors duration-300 flex items-center justify-center">
                    <ShoppingCart size={18} className="mr-2" />
                    Carrito (2)
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
