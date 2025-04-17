import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonial = ({ quote, author, avatar }) => {
  return (
    <motion.div
      className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        boxShadow: "0 0 25px 5px rgba(94, 234, 212, 0.2)",
        borderColor: "rgba(94, 234, 212, 0.3)",
      }}
    >
      <div className="absolute -top-3 -left-3 text-6xl text-indigo-500/20 font-serif">
        "
      </div>
      <div className="absolute -bottom-8 -right-3 text-6xl text-indigo-500/20 font-serif">
        "
      </div>

      <div className="relative z-10">
        <p className="text-gray-300 italic mb-4">{quote}</p>

        <div className="flex items-center mt-4">
          <div className="w-10 h-10 rounded-full bg-indigo-600 mr-3 overflow-hidden">
            <img
              src={avatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-medium">{author}</p>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Testimonial;
