import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedCounter = ({ value, label, icon: Icon }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startValue = 0;
      const endValue = value;
      const duration = 2000;
      const startTime = performance.now();

      const updateCounter = (timestamp) => {
        const elapsedTime = timestamp - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(easeOutExpo * endValue);

        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setDisplayValue(endValue);
        }
      };

      requestAnimationFrame(updateCounter);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={counterRef}
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
