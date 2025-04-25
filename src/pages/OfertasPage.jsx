import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Percent } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PreFooter from "../components/layout/PreFooter";
import BundleGrid from "../components/ofertas/BundleGrid";

const OffersHeader = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-900/80 to-gray-900 py-16 lg:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ofertas y Promociones
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-6"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p
            className="text-gray-300 text-lg max-w-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Descubre increíbles ofertas, bundles exclusivos y promociones
            especiales. Ahorra en grande con descuentos de hasta el 60%.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Bundles
              <Package size={18} className="ml-2" />
            </motion.button>
            <motion.button
              className="bg-transparent border border-indigo-500 text-indigo-400 hover:bg-indigo-900/30 font-medium px-6 py-3 rounded-lg flex items-center transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Promociones
              <Percent size={18} className="ml-2" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const OffersPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1">
        <OffersHeader />
        <BundleGrid />
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
