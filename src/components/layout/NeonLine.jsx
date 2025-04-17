import React from "react";
import { motion } from "framer-motion";

const NeonLine = ({ className = "", direction = "horizontal" }) => {
  return (
    <motion.div
      className={`${
        direction === "horizontal" ? "w-full h-0.5" : "w-0.5 h-full"
      } bg-gradient-to-r from-cyan-400 to-purple-500 absolute ${className}`}
      animate={{
        [direction === "horizontal" ? "x" : "y"]: ["-100%", "100%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

export default NeonLine;
