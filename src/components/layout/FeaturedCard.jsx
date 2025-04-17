import React from "react";
import { motion } from "framer-motion";
import Particles from "./Particles";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="relative bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.7)",
        borderColor: "rgba(167, 139, 250, 0.5)",
      }}
    >
      <div className="absolute inset-0 opacity-5">
        <Particles quantity={10} />
      </div>

      <div className="relative z-10">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
          <Icon className="text-white" size={24} />
        </div>

        <motion.h3
          className="text-xl font-bold text-white mb-2 relative inline-block"
          whileHover={{ x: 2 }}
        >
          {title}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.h3>

        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
