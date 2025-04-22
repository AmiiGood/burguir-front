import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import NeonButton from "./NeonButton";
import Particles from "./Particles";
import NeonLine from "./NeonLine";

const PreFooter = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
      <div className="absolute inset-0 opacity-20">
        <Particles quantity={30} />
      </div>

      <div className="absolute inset-0 overflow-hidden opacity-20">
        <NeonLine className="top-0" />
        <NeonLine className="bottom-0" />
        <NeonLine direction="vertical" className="left-0" />
        <NeonLine direction="vertical" className="right-0" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Listo para elevar tu experiencia?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Descubre nuestra selección de cuentas premium con garantía y
            servicio técnico incluido.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <NeonButton
              className="px-8 py-4 text-lg"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(99, 102, 241, 0.6)",
              }}
            >
              <ShoppingCart size={20} className="mr-2" />
              <span>Explorar Catálogo</span>
            </NeonButton>

            <NeonButton
              primary={false}
              className="px-8 py-4 text-lg"
              whileHover={{
                boxShadow: "0 0 25px 5px rgba(255, 255, 255, 0.4)",
              }}
            >
              <span>Contactar Soporte</span>
            </NeonButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreFooter;
