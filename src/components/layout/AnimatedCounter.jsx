import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedCounter = ({ value, label, icon: Icon }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp;
    const duration = 1500;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="bg-indigo-600/20 rounded-full p-4 mb-3">
        <Icon className="w-8 h-8 text-indigo-400" />
      </div>
      <motion.h3
        className="text-3xl font-bold text-white"
        initial={{ scale: 1 }}
        whileInView={{ scale: [1, 1.2, 1] }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {displayValue}+
      </motion.h3>
      <p className="text-gray-400">{label}</p>
    </motion.div>
  );
};

export default AnimatedCounter;
