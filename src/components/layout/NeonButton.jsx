import React from "react";
import { motion } from "framer-motion";

const NeonButton = ({ children, primary = true, className = "", onClick }) => {
  return (
    <motion.button
      className={`relative overflow-hidden ${
        primary
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600"
      } px-6 py-3 rounded-md shadow-lg ${className}`}
      whileHover={{
        boxShadow: primary
          ? "0 0 15px 2px rgba(99, 102, 241, 0.6)"
          : "0 0 15px 2px rgba(255, 255, 255, 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        initial={{ x: "-100%" }}
        whileHover={{
          x: "100%",
          opacity: 0.2,
          transition: { duration: 0.5, ease: "easeInOut" },
        }}
      />
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {children}
      </div>
    </motion.button>
  );
};

export default NeonButton;
