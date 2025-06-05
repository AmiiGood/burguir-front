import React from "react";
import { motion } from "framer-motion";
import { Home, RefreshCw } from "lucide-react";
import Header from "../components/layout/Header";
import NeonButton from "../components/layout/NeonButton";
import Particles from "../components/layout/Particles";
import NeonLine from "../components/layout/NeonLine";
import _404Image from "../assets/images/principalImages/404.jpg";

const Error404Page = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        <div className="absolute inset-0 opacity-20">
          <Particles quantity={40} />
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-20">
          <NeonLine className="top-1/4" />
          <NeonLine className="bottom-1/4" />
          <NeonLine direction="vertical" className="left-1/4" />
          <NeonLine direction="vertical" className="right-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <img
                src={_404Image}
                alt="Error 404 - Página no encontrada"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-purple-500 font-mono mb-2 text-lg"
              >
                ERROR::404_PAGE_NOT_FOUND
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                  404
                </span>
              </h1>

              <motion.h2
                className="text-3xl font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                ¡Misión Fallida!
              </motion.h2>

              <p className="text-gray-300 text-lg mb-8 max-w-lg">
                La página que buscas no existe o ha sido eliminada. Parece que
                te has aventurado en territorio desconocido.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <NeonButton
                  className="px-6 py-3"
                  whileHover={{
                    boxShadow: "0 0 25px 5px rgba(99, 102, 241, 0.6)",
                  }}
                  onClick={() => (window.location.href = "/")}
                >
                  <Home size={18} className="mr-2" />
                  <span>Volver al Inicio</span>
                </NeonButton>

                <NeonButton
                  primary={false}
                  className="px-6 py-3"
                  whileHover={{
                    boxShadow: "0 0 25px 5px rgba(255, 255, 255, 0.4)",
                  }}
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw size={18} className="mr-2" />
                  <span>Reintentar</span>
                </NeonButton>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Error404Page;
