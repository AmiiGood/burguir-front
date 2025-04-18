import React from "react";
import { ShoppingCart, Star, Clock, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import NeonButton from "../layout/NeonButton";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.price - product.price * (product.discount / 100);

  return (
    <div className="relative">
      <motion.div
        className="relative w-80 bg-gray-800 rounded-lg overflow-hidden shadow-xl group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.03,
          transition: { duration: 0.3 },
        }}
      >
        <div className="relative">
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          />

          {product.discount > 0 && (
            <motion.div
              className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold py-1 px-2 rounded-md shadow-lg z-10"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0 0 rgba(220, 38, 38, 0.7)",
                  "0 0 0 10px rgba(220, 38, 38, 0)",
                  "0 0 0 0 rgba(220, 38, 38, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              -{product.discount}%
            </motion.div>
          )}

          <motion.div
            className="absolute inset-0 overflow-hidden opacity-40"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="w-full h-0.5 bg-cyan-400 absolute top-0"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-0.5 h-full bg-pink-400 absolute right-0"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <div className="p-5 relative">
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.h3
            className="text-xl font-bold text-white mb-2 relative"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {product.title}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1 }}
            />
          </motion.h3>

          <div className="grid grid-cols-2 gap-2 my-4">
            <motion.div
              className="flex items-center text-gray-400"
              whileHover={{ x: 3, color: "#fcd34d" }}
              transition={{ duration: 0.2 }}
            >
              <Trophy size={16} className="mr-2 text-yellow-500" />
              <span className="text-sm">{product.achievements} logros</span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-400"
              whileHover={{ x: 3, color: "#60a5fa" }}
              transition={{ duration: 0.2 }}
            >
              <Clock size={16} className="mr-2 text-blue-400" />
              <span className="text-sm">{product.hoursPlayed}h jugadas</span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-400"
              whileHover={{ x: 3, color: "#c084fc" }}
              transition={{ duration: 0.2 }}
            >
              <Star size={16} className="mr-2 text-purple-400" />
              <span className="text-sm">Nivel {product.accountLevel}</span>
            </motion.div>

            <motion.div
              className="flex items-center text-gray-400"
              whileHover={{ x: 3, color: "#4ade80" }}
              transition={{ duration: 0.2 }}
            >
              <Users size={16} className="mr-2 text-green-400" />
              <span className="text-sm">{product.items} items</span>
            </motion.div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0.9 }}
              whileHover={{ scale: 1.05, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {product.discount > 0 ? (
                <div className="flex flex-col">
                  <span className="text-gray-400 line-through text-sm">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-white font-bold text-xl">
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-white font-bold text-xl">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </motion.div>

            <NeonButton className="py-2 px-4">
              <ShoppingCart size={18} className="mr-2" />
              <span>Comprar</span>
            </NeonButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
