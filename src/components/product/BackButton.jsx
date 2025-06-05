import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ onClick, text = "Volver" }) => (
  <motion.button
    onClick={onClick}
    className="mb-6 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
    whileHover={{ x: -5 }}
  >
    <ArrowLeft size={20} className="mr-2" />
    {text}
  </motion.button>
);

export default BackButton;
