import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Bitcoin,
  Linkedin,
  Shield,
  Clock,
  ChevronRight,
} from "lucide-react";
import NeonLine from "./NeonLine";

const Footer = () => {
  const footerLinks = [
    {
      title: "Productos",
      links: [
        { name: "Cuentas de Steam", href: "#" },
        { name: "Cuentas de juegos AAA", href: "#" },
        { name: "Cuentas con descuento", href: "#" },
        { name: "Paquetes especiales", href: "#" },
        { name: "Ofertas del mes", href: "#" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { name: "Centro de ayuda", href: "#" },
        { name: "Preguntas frecuentes", href: "#" },
        { name: "Garantía de cuentas", href: "#" },
        { name: "Proceso de compra", href: "#" },
        { name: "Contacto", href: "#" },
      ],
    },
    {
      title: "Compañía",
      links: [
        { name: "Sobre nosotros", href: "#" },
        { name: "Términos y condiciones", href: "#" },
        { name: "Política de privacidad", href: "#" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "soporte@gamevault.com",
      href: "redireccion",
    },
    {
      icon: Phone,
      text: "+52 472 137 9165",
      href: "tel:+34612345678",
    },
  ];

  const paymentMethods = [
    { icon: Bitcoin, label: "Crypto" },
    { icon: Shield, label: "PayPal" },
    { icon: Clock, label: "Pago fácil" },
  ];

  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <NeonLine className="top-12" />
        <NeonLine className="bottom-12" />
        <NeonLine direction="vertical" className="left-12" />
        <NeonLine direction="vertical" className="right-12" />
      </div>

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                Game
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                  Vault
                </span>
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-4" />
              <p className="text-gray-400 mb-6">
                Tu destino confiable para cuentas de juegos premium a precios
                increíbles. Entrega instantánea y soporte 24/7 para la mejor
                experiencia.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span className="bg-gray-800 p-2 rounded-lg mr-4">
                      <item.icon size={18} className="text-indigo-400" />
                    </span>
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                      whileHover={{ x: 5 }}
                    >
                      <ChevronRight
                        size={16}
                        className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span>{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 p-6 rounded-lg bg-gradient-to-r from-gray-800/70 to-gray-900/70 backdrop-blur-sm border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h4 className="text-xl font-bold text-white mb-2">
                Únete a nuestra comunidad
              </h4>
              <p className="text-gray-400">
                Recibe ofertas exclusivas, noticias y descuentos especiales
              </p>
            </div>
            <div className="flex flex-1 max-w-md">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="bg-gray-700 border-0 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <motion.button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-r-md transition-all duration-300"
                whileHover={{
                  boxShadow: "0 0 15px 2px rgba(99, 102, 241, 0.6)",
                }}
              >
                Suscribirse
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8">
          <div className="flex space-x-6 mb-6 md:mb-0">
            {[Instagram, Facebook, Linkedin].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-indigo-600 transition-colors duration-300"
                whileHover={{
                  y: -5,
                  boxShadow: "0 0 15px 2px rgba(99, 102, 241, 0.6)",
                }}
              >
                <Icon size={20} className="text-white" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {paymentMethods.map((method, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 px-3 py-1 rounded-md"
              >
                <method.icon size={16} className="text-indigo-400 mr-2" />
                <span className="text-gray-300 text-sm">{method.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} GameVault. Todos los derechos
            reservados. Diseñado con esfuerzo para nuestra comunidad.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
