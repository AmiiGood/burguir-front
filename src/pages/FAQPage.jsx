import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ShoppingCart,
  Shield,
  Clock,
  HelpCircle,
  DollarSign,
  Key,
  Lock,
  User,
  UserCheck,
  AlertTriangle,
  RefreshCw,
  CreditCard,
  Mail,
  ChevronRight,
} from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import NeonButton from "../components/layout/NeonButton";
import Particles from "../components/layout/Particles";
import NeonLine from "../components/layout/NeonLine";
import PreFooter from "../components/layout/PreFooter";

const FAQPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState("general");
  const [expandedQuestions, setExpandedQuestions] = useState({});

  const toggleQuestion = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const categories = [
    {
      id: "general",
      name: "General",
      icon: HelpCircle,
      questions: [
        {
          id: "que-es",
          question: "¿Qué es exactamente lo que ofrecen?",
          answer:
            "Ofrecemos acceso a cuentas de Steam con juegos. Nuestro servicio permite disfrutar de títulos premium a precios reducidos. Cada cuenta viene con garantía y soporte técnico incluido.",
        },
        {
          id: "como-funciona",
          question: "¿Cómo funciona el proceso de compra?",
          answer:
            "El proceso es simple: selecciona la cuenta que deseas, realiza el pago a través de nuestros métodos seguros, y recibirás automáticamente los datos de acceso en tu correo. Todo el proceso es inmediato y completamente digital.",
        },
        {
          id: "ventajas",
          question: "¿Cuáles son las ventajas de comprar en esta tienda?",
          answer:
            "Ofrecemos precios imbatibles, entrega inmediata, garantía en todas las cuentas, soporte técnico 24/7, y una amplia selección de juegos. Además, contamos con un sistema de recompensas para clientes frecuentes.",
        },
      ],
    },
    {
      id: "cuentas",
      name: "Cuentas y Accesos",
      icon: Key,
      questions: [
        {
          id: "uso-cuenta",
          question: "¿Puedo cambiar la contraseña de la cuenta?",
          answer:
            "No es posible el cambio de contraseña. Esto podría afectar la garantía del servicio. Nuestras cuentas están configuradas para ofrecer una experiencia óptima sin necesidad de modificaciones.",
        },
        {
          id: "compartir-cuenta",
          question: "¿Puedo compartir la cuenta con amigos?",
          answer:
            "No es posible compartir la cuenta con otros usuarios. A menos que compren múltiples accesos.",
        },
        {
          id: "duracion-acceso",
          question: "¿Cuánto tiempo tendré acceso a la cuenta?",
          answer:
            "Nuestras cuentas ofrecen acceso permanente según los términos de cada producto. Mientras se respeten las condiciones de uso, podrás disfrutar de todos los juegos incluidos sin límite de tiempo.",
        },
        {
          id: "juegos-nuevos",
          question: "¿Puedo agregar nuevos juegos a la cuenta?",
          answer:
            "Por motivos de seguridad y para mantener la integridad del servicio, no recomendamos agregar nuevos juegos a la cuenta. Si deseas acceso a otros títulos, te sugerimos explorar nuestro catálogo de cuentas disponibles.",
        },
      ],
    },
    {
      id: "pagos",
      name: "Pagos y Precios",
      icon: DollarSign,
      questions: [
        {
          id: "metodos-pago",
          question: "¿Qué métodos de pago aceptan?",
          answer:
            "Aceptamos múltiples métodos de pago, incluyendo PayPal, transferencias bancarias, y diversas criptomonedas. Todos nuestros métodos de pago están protegidos con sistemas de seguridad avanzados.",
        },
        {
          id: "descuentos",
          question: "¿Ofrecen descuentos para compras múltiples?",
          answer:
            "¡Sí! Contamos con un programa de fidelidad que ofrece descuentos progresivos según el número de compras realizadas. Además, periódicamente lanzamos promociones especiales y códigos de descuento a través de nuestras redes sociales.",
        },
        {
          id: "reembolsos",
          question: "¿Cuál es su política de reembolsos?",
          answer:
            "Ofrecemos reembolso completo dentro de las primeras 24 horas si la cuenta presenta problemas técnicos que nuestro equipo no pueda resolver. Para solicitar un reembolso, simplemente contacta a nuestro servicio de atención al cliente.",
        },
      ],
    },
    {
      id: "garantia",
      name: "Garantía y Soporte",
      icon: Shield,
      questions: [
        {
          id: "problemas-acceso",
          question: "¿Qué sucede si no puedo acceder a la cuenta?",
          answer:
            "Si experimentas problemas de acceso, nuestro equipo de soporte técnico está disponible 24/7 para asistirte. En caso de que el problema persista, te proporcionaremos una cuenta de reemplazo sin costo adicional según nuestra política de garantía.",
        },
        {
          id: "duracion-garantia",
          question: "¿Cuánto tiempo dura la garantía?",
          answer:
            "Todas nuestras cuentas incluyen garantía de funcionamiento según lo especificado en cada producto. La duración estándar es de 24 horas, pero ofrecemos extensiones de garantía que pueden adquirirse al momento de la compra.",
        },
        {
          id: "tiempo-respuesta",
          question: "¿Cuál es el tiempo de respuesta del soporte técnico?",
          answer:
            "Nuestro equipo de soporte técnico responde en un plazo máximo de 6 horas. Para casos urgentes, contamos con un múltiples redes sociales que ofrece asistencia inmediata durante nuestro horario de atención ampliado.",
        },
      ],
    },
    {
      id: "seguridad",
      name: "Seguridad",
      icon: Lock,
      questions: [
        {
          id: "seguridad-datos",
          question: "¿Cómo protegen mis datos personales?",
          answer:
            "Utilizamos encriptación SSL avanzada para todas las transacciones. Tus datos personales y de pago nunca se almacenan en nuestros servidores. Cumplimos estrictamente con las normativas de protección de datos y tenemos una política de privacidad transparente.",
        },
        {
          id: "riesgo-baneo",
          question: "¿Existe algún riesgo de que la cuenta sea baneada?",
          answer:
            "Nuestras cuentas son adquiridas por medios legítimos y configuradas siguiendo las mejores prácticas de seguridad. Para minimizar cualquier riesgo, proporcionamos instrucciones detalladas de uso que recomendamos seguir cuidadosamente.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1">
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90"></div>
          <div className="absolute inset-0 opacity-20">
            <Particles quantity={20} />
          </div>

          <div className="absolute inset-0 overflow-hidden opacity-20">
            <NeonLine className="top-0" />
            <NeonLine className="bottom-0" />
            <NeonLine direction="vertical" className="left-0" />
            <NeonLine direction="vertical" className="right-0" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Preguntas Frecuentes
              </motion.h1>

              <motion.p
                className="text-xl text-gray-200 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Encuentra respuestas a todas tus dudas sobre nuestro servicio de
                cuentas Steam
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <NeonButton
                  className="px-6 py-3 text-base"
                  whileHover={{
                    boxShadow: "0 0 25px 5px rgba(99, 102, 241, 0.6)",
                  }}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  <span>Ver Catálogo</span>
                </NeonButton>

                <NeonButton
                  primary={false}
                  className="px-6 py-3 text-base"
                  whileHover={{
                    boxShadow: "0 0 25px 5px rgba(255, 255, 255, 0.4)",
                  }}
                >
                  <Mail size={18} className="mr-2" />
                  <span>Contactar Soporte</span>
                </NeonButton>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  className={`flex items-center justify-center p-4 rounded-lg transition-all ${
                    openCategory === category.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => toggleCategory(category.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="mr-2" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence>
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openCategory === category.id ? "auto" : 0,
                    opacity: openCategory === category.id ? 1 : 0,
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-4 mt-4 mb-10">
                    {category.questions.map((faq) => (
                      <motion.div
                        key={faq.id}
                        className="bg-gray-800 rounded-lg overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <button
                          className="w-full px-6 py-4 flex justify-between items-center text-left text-white"
                          onClick={() => toggleQuestion(faq.id)}
                        >
                          <span className="font-medium text-lg">
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{
                              rotate: expandedQuestions[faq.id] ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown
                              size={20}
                              className="text-indigo-400"
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {expandedQuestions[faq.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 py-4 border-t border-gray-700 text-gray-300">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <section className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
          <div className="container mx-auto px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                ¿Todavía tienes dudas?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Nuestro equipo de soporte está disponible 24/7 para resolver
                todas tus consultas
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <motion.div
                  className="bg-gray-800 p-6 rounded-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                  }}
                >
                  <Mail size={36} className="text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Correo Electrónico
                  </h3>
                  <p className="text-gray-400 mb-3">
                    Respuesta en menos de 6 horas
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 flex items-center justify-center"
                  >
                    soporte@koari.com
                  </a>
                </motion.div>

                <motion.div
                  className="bg-gray-800 p-6 rounded-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                  }}
                >
                  <User size={36} className="text-indigo-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Redes sociales
                  </h3>
                  <p className="text-gray-400 mb-3">Asistencia inmediata</p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 flex items-center justify-center"
                  >
                    Ver redes sociales
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </motion.div>

                <motion.div
                  className="bg-gray-800 p-6 rounded-lg"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)",
                  }}
                >
                  <HelpCircle
                    size={36}
                    className="text-indigo-400 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Centro de Ayuda
                  </h3>
                  <p className="text-gray-400 mb-3">
                    Tutoriales y guías detalladas
                  </p>
                  <a
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300 flex items-center justify-center"
                  >
                    Ver Recursos <ChevronRight size={16} className="ml-1" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
