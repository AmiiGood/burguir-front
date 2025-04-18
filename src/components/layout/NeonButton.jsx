import React from "react";
import { motion } from "framer-motion";

const NeonButton = ({ children, primary = true, className = "", onClick }) => {
  const primaryColors = {
    bg: "bg-indigo-600",
    hoverBg: "hover:bg-indigo-700",
    text: "text-white",
    glow: "0 0 20px 4px rgba(79, 70, 229, 0.7), 0 0 40px 1px rgba(79, 70, 229, 0.4)",
    innerGlow: "from-indigo-400 via-violet-300 to-indigo-400",
  };

  const secondaryColors = {
    bg: "bg-transparent",
    border: "border-2 border-white",
    text: "text-white",
    hoverBg: "hover:bg-white/10",
    hoverText: "hover:text-white",
    glow: "0 0 20px 4px rgba(255, 255, 255, 0.5), 0 0 40px 1px rgba(255, 255, 255, 0.2)",
    innerGlow: "from-white/0 via-white/40 to-white/0",
  };

  const colors = primary ? primaryColors : secondaryColors;

  return (
    <motion.button
      className={`relative overflow-hidden font-medium py-2.5 px-6 cursor-pointer ${
        primary
          ? `${colors.bg} ${colors.text} ${colors.hoverBg}`
          : `${colors.bg} ${colors.border} ${colors.text} ${colors.hoverBg} ${colors.hoverText}`
      } rounded-lg shadow-lg transition-all duration-300 ${className}`}
      whileHover={{
        boxShadow: colors.glow,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.97,
        boxShadow: colors.glow,
      }}
      initial={{
        boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.innerGlow} opacity-0`}
        initial={{ x: "-110%" }}
        whileHover={{
          x: "110%",
          opacity: 0.4,
          transition: {
            duration: 0.8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            repeatDelay: 0.2,
          },
        }}
      />

      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.innerGlow} opacity-0`}
        animate={{
          opacity: [0, 0.15, 0],
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "mirror",
          },
        }}
      />

      <div className="relative z-10 flex items-center justify-center space-x-2 font-medium tracking-wide">
        {children}
      </div>
    </motion.button>
  );
};

export default NeonButton;
