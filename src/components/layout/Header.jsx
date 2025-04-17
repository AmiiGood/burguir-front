import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Bell,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  Star,
  Tag,
  Gamepad,
} from "lucide-react";

const NeonButton = ({ children, className = "", ...props }) => {
  return (
    <motion.button
      className={`relative overflow-hidden group px-4 py-2 rounded-lg bg-transparent text-white font-medium ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-violet-600/70 to-indigo-600/70 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-violet-600/50 to-indigo-600/50 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
      <span className="relative flex items-center justify-center z-10">
        {children}
      </span>
    </motion.button>
  );
};

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) {
      const handleClickOutside = (event) => {
        if (
          searchInputRef.current &&
          !searchInputRef.current.contains(event.target)
        ) {
          setSearchOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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
              href="#"
              className="text-white font-medium hover:text-violet-300 transition-colors duration-300 relative group"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white font-medium hover:text-violet-300 transition-colors duration-300">
                <span>Catálogo</span>
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-2 w-56 bg-black/40 backdrop-blur-sm rounded-lg shadow-lg border border-white/5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  <Star size={14} className="inline mr-2 text-violet-400" />
                  Cuentas Premium
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  <Gamepad size={14} className="inline mr-2 text-violet-400" />
                  Cuentas con Juegos
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                >
                  <Tag size={14} className="inline mr-2 text-violet-400" />
                  Ofertas Especiales
                </a>
              </div>
            </div>
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
          </motion.div>

          <motion.div
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative" ref={searchInputRef}>
              <button
                className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                  searchOpen ? "text-white" : ""
                }`}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-72"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-black/30 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-white/5">
                      <div className="flex items-center bg-white/5 rounded-md overflow-hidden">
                        <input
                          type="text"
                          placeholder="Buscar juegos o cuentas..."
                          className="w-full bg-transparent border-none focus:ring-0 text-white p-2 text-sm placeholder-gray-400"
                          autoFocus
                        />
                        <button className="px-3 text-gray-300 hover:text-white">
                          <Search size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                  <NeonButton className="flex-1 justify-center">
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
