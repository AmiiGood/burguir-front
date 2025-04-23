import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  User,
  ArrowRight,
  Shield,
  Zap,
  Clock,
  Award,
  Heart,
} from "lucide-react";
import Header from "../components/layout/Header";
import ProductGrid from "../components/product/ProductGrid";
import { products } from "../data/products";
import FeaturedCarousel from "../components/layout/FeaturedCarousel";
import Testimonial from "../components/layout/Testimonios";
import FeatureCard from "../components/layout/FeaturedCard";
import AnimatedCounter from "../components/layout/AnimatedCounter";
import Footer from "../components/layout/Footer";
import PreFooter from "../components/layout/PreFooter";

const HomePage = () => {
  const handleProductClick = (productId) => {
    console.log(`Producto clickeado: ${productId}`);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testimonials = [
    {
      id: 1,
      quote:
        "La mejor tienda para comprar cuentas de Steam. Entrega rápida y nunca he tenido problemas con ninguna cuenta.",
      author: "Carlos R.",
      avatar: "https://placehold.co/200x200/4f46e5/FFFFFF?text=CR",
    },
    {
      id: 2,
      quote:
        "Precios increíbles y un servicio al cliente excepcional. Mi nueva cuenta de Red Dead funciona perfectamente.",
      author: "Laura M.",
      avatar: "https://placehold.co/200x200/4f46e5/FFFFFF?text=LM",
    },
    {
      id: 3,
      quote:
        "He comprado varias cuentas y todas han funcionado sin problemas. Recomiendo totalmente este servicio.",
      author: "Miguel P.",
      avatar: "https://placehold.co/200x200/4f46e5/FFFFFF?text=MP",
    },
  ];

  const stats = [
    { value: 5000, label: "Clientes Satisfechos", icon: User },
    { value: 12000, label: "Cuentas Vendidas", icon: ShoppingCart },
    { value: 98, label: "Valoración Positiva", icon: Heart },
    { value: 24, label: "Soporte 24/7", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-1">
        <section>
          <FeaturedCarousel
            filterType="AAA-discount"
            limit={5}
            autoplaySpeed={6000}
            showControls={true}
            showIndicators={true}
            height="600px"
            onProductClick={handleProductClick}
          />
        </section>

        <section className="container mx-auto px-6 py-12">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 className="text-3xl font-bold text-white mb-4 relative inline-block">
              Por qué elegirnos
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </motion.h2>
            <p className="text-gray-300 text-lg">
              Ofrecemos las mejores cuentas de Steam con garantía total y
              soporte premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Shield}
              title="100% Seguro y Confiable"
              description="Todas nuestras cuentas son verificadas y ofrecemos garantía de reemplazo si hay algún problema."
            />
            <FeatureCard
              icon={Zap}
              title="Entrega Inmediata"
              description="Recibe tus credenciales de forma instantánea después de completar tu compra."
            />
            <FeatureCard
              icon={Award}
              title="Precios Imbatibles"
              description="Ofrecemos los mejores precios del mercado con descuentos exclusivos para clientes frecuentes."
            />
          </div>
        </section>

        <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">
                  Cuentas Destacadas
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded" />
              </motion.div>

              <motion.a
                href="#"
                className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ x: 5 }}
              >
                <span className="mr-1">Ver todas</span>
                <ArrowRight size={16} />
              </motion.a>
            </div>

            <ProductGrid products={products} />
          </div>
        </section>

        <section className="bg-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <AnimatedCounter
                  key={index}
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4 relative inline-block">
              Lo que dicen nuestros clientes
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </h2>
            <p className="text-gray-300 text-lg">
              Miles de personas confían en nosotros para sus cuentas de Steam
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </section>
        <PreFooter></PreFooter>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
