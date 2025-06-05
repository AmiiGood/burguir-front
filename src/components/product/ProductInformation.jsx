import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Clock,
  Trophy,
  Package,
  Check,
  Shield,
  Zap,
  Info,
} from "lucide-react";
import NeonButton from "../layout/NeonButton";
import DetailItem from "./DetailItem";

const ProductInformation = ({
  product,
  finalPrice,
  isInCart,
  showAddedToCartMessage,
  onAddToCart,
  formatPrice,
  descriptionText,
}) => {
  if (!product) return null;

  const defaultFormatPrice = (price) => `$${price.toFixed(2)}`;
  const displayFormatPrice = formatPrice || defaultFormatPrice;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gray-800/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-xl border border-gray-700/60"
    >
      <span
        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
          product.type === "AAA"
            ? "bg-purple-600 text-purple-100"
            : product.type === "AA"
            ? "bg-indigo-600 text-indigo-100"
            : "bg-teal-600 text-teal-100"
        }`}
      >
        {product.type}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        {product.title}
      </h1>

      <div className="flex items-baseline space-x-3 mb-6">
        <p className="text-3xl font-bold text-indigo-400">
          {displayFormatPrice(finalPrice)}
        </p>
        {product.discount > 0 && (
          <p className="text-xl text-gray-500 line-through">
            {displayFormatPrice(product.price)}
          </p>
        )}
        {product.discount > 0 && (
          <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-md">
            -{product.discount}% OFF
          </span>
        )}
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed">
        {product.longDescription || descriptionText}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <DetailItem
          icon={Star}
          label="Nivel de Cuenta"
          value={product.accountLevel}
          colorClass="text-purple-400"
        />
        <DetailItem
          icon={Clock}
          label="Horas Jugadas"
          value={`${product.hoursPlayed}h`}
          colorClass="text-sky-400"
        />
        <DetailItem
          icon={Package}
          label="Ítems en Cuenta"
          value={product.items}
          colorClass="text-emerald-400"
        />
        <DetailItem
          icon={Trophy}
          label="Logros Desbloqueados"
          value={product.achievements}
          colorClass="text-yellow-400"
        />
      </div>

      <NeonButton
        onClick={onAddToCart}
        disabled={isInCart || showAddedToCartMessage}
        className="w-full py-3 text-lg justify-center group"
      >
        {isInCart ? (
          <>
            <Check size={20} className="mr-2" /> Ya en el carrito
          </>
        ) : showAddedToCartMessage ? (
          <>
            <Check size={20} className="mr-2" /> Añadido
          </>
        ) : (
          <>
            <ShoppingCart size={20} className="mr-2" /> Añadir al Carrito
          </>
        )}
      </NeonButton>
      {showAddedToCartMessage && !isInCart && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-green-400 text-center mt-2"
        >
          ¡Producto añadido al carrito!
        </motion.p>
      )}

      <div className="mt-6 space-y-2 text-sm text-gray-400">
        <p className="flex items-center">
          <Shield size={16} className="mr-2 text-green-400" /> Compra 100%
          Segura y Garantizada
        </p>
        <p className="flex items-center">
          <Zap size={16} className="mr-2 text-yellow-400" /> Entrega Inmediata
          de Credenciales
        </p>
        <p className="flex items-center">
          <Info size={16} className="mr-2 text-sky-400" /> Soporte Técnico 24/7
        </p>
      </div>
    </motion.div>
  );
};

export default ProductInformation;
