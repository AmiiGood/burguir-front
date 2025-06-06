import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  MinusCircle,
  PlusCircle,
  ArrowLeft,
  ShoppingBag,
  ChevronRight,
  CreditCard,
  Shield,
  Clock,
  TrendingUp,
  Check,
  Info,
} from "lucide-react";
import { useCart } from "../components/product/CartContext";
import NeonButton from "../components/layout/NeonButton";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import GameRecommendation from "../components/product/GameRecommendation";

const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [showCouponMessage, setShowCouponMessage] = useState(false);

  const [showRecommendations, setShowRecommendations] = useState(true);
  const [recommendationType, setRecommendationType] = useState("popular");

  const [highlightedItem, setHighlightedItem] = useState(null);

  const cart = useCart();

  const cartItems = cart?.cartItems || [];
  const totalItems = cart?.getCartTotals ? cart.getCartTotals().totalItems : 0;
  const subTotal = cart?.getCartTotals ? cart.getCartTotals().subTotal : 0;
  const totalSavings = cart?.getCartTotals
    ? cart.getCartTotals().totalSavings
    : 0;
  const total = cart?.getCartTotals ? cart.getCartTotals().total : 0;

  const removeFromCart = (productId) => {
    if (cart?.removeFromCart) {
      cart.removeFromCart(productId);
    } else {
      console.warn("Cart context not available. Cannot remove from cart.");
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (cart?.updateQuantity) {
      setHighlightedItem(productId);
      setTimeout(() => setHighlightedItem(null), 1000);

      cart.updateQuantity(productId, quantity);
    } else {
      console.warn("Cart context not available. Cannot update quantity.");
    }
  };

  const clearCart = () => {
    if (cart?.clearCart) {
      cart.clearCart();
    } else {
      console.warn("Cart context not available. Cannot clear cart.");
    }
  };

  const formatPrice = (price) => {
    if (cart?.formatPrice) {
      return cart.formatPrice(price);
    }
    return "$" + price.toFixed(2).replace(".", ",");
  };

  const calculateFinalPrice = (price, discount) => {
    if (cart?.calculateFinalPrice) {
      return cart.calculateFinalPrice(price, discount);
    }
    return price * (1 - discount / 100);
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "koari") {
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setCouponError(true);
      setCouponApplied(false);
    }
    setShowCouponMessage(true);

    setTimeout(() => {
      setShowCouponMessage(false);
    }, 3000);
  };

  const addRecommendedProduct = (product) => {
    if (cart?.addToCart) {
      cart.addToCart({
        ...product,
        quantity: 1,
      });

      const event = new CustomEvent("productAddedToCart", {
        detail: { ...product, quantity: 1 },
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const couponDiscount = couponApplied ? total * 0.1 : 0;
  const finalTotal = total - couponDiscount;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-10 text-center shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 70%)",
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-24 h-24 rounded-full bg-indigo-900/30 flex items-center justify-center">
                <ShoppingBag size={48} className="text-indigo-400" />
              </div>
              <h2 className="text-white text-2xl font-bold">
                Tu carrito está vacío
              </h2>
              <p className="text-gray-400 max-w-lg">
                Parece que aún no has añadido ningún producto a tu carrito.
                Explora nuestro catálogo para encontrar las mejores cuentas
                premium.
              </p>
              <a href="/catalogo">
                <NeonButton className="mt-4 py-3 px-6">
                  <ArrowLeft size={18} className="mr-2" />
                  Ir al catálogo
                </NeonButton>
              </a>
            </div>
          </motion.div>

          <div className="mt-16">
            {showRecommendations && (
              <GameRecommendation
                title="Recomendados para ti"
                maxItems={3}
                filterType={recommendationType}
                formatPrice={formatPrice}
                calculateFinalPrice={calculateFinalPrice}
                onAddToCart={addRecommendedProduct}
                onClose={() => setShowRecommendations(false)}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div
        className="container mx-auto px-4 py-8 max-w-6xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
        }}
      >
        <motion.h1
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Tu Carrito
        </motion.h1>
        <motion.div
          className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mb-8"
          initial={{ width: 0 }}
          animate={{ width: "5rem" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  Productos ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-300 text-sm flex items-center"
                >
                  <Trash2 size={14} className="mr-1" />
                  Vaciar carrito
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {cartItems.map((item) => {
                  const finalPrice = calculateFinalPrice(
                    item.price,
                    item.discount
                  );
                  const itemTotal = finalPrice * item.quantity;

                  return (
                    <motion.div
                      key={item.id}
                      className={`p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-white/5 transition-colors duration-300 ${
                        highlightedItem === item.id ? "bg-indigo-900/20" : ""
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      layout
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 shadow-lg group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <span className="bg-indigo-900/50 px-2 py-0.5 rounded text-xs text-indigo-300 border border-indigo-700/30">
                            {item.type}
                          </span>
                          <span className="mx-2">•</span>
                          <span>Nivel {item.accountLevel}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-6">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <MinusCircle size={18} />
                          </button>
                          <span className="w-8 text-center text-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <PlusCircle size={18} />
                          </button>
                        </div>

                        <div className="text-right min-w-20">
                          {item.discount > 0 && (
                            <div className="text-gray-400 text-xs line-through">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                          )}
                          <div className="text-white font-bold">
                            {formatPrice(itemTotal)}
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors ml-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-4 flex justify-between items-center border-t border-white/5 bg-gray-800/80">
                <div className="flex items-center">
                  <Info size={16} className="text-indigo-400 mr-2" />
                  <span className="text-gray-300 text-sm">
                    Todas las cuentas están respaldadas por nuestra garantía de
                    30 días
                  </span>
                </div>

                <a
                  href="/catalogo"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center group"
                >
                  <ArrowLeft
                    size={16}
                    className="mr-1 transition-transform duration-300 group-hover:-translate-x-1"
                  />
                  Continuar comprando
                </a>
              </div>
            </motion.div>

            {showRecommendations && (
              <GameRecommendation
                title="Recomendados para ti"
                maxItems={3}
                filterType={recommendationType}
                formatPrice={formatPrice}
                calculateFinalPrice={calculateFinalPrice}
                onAddToCart={addRecommendedProduct}
                onClose={() => setShowRecommendations(false)}
              />
            )}
          </div>

          <div className="lg:w-1/3">
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 sticky top-24 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundImage:
                  "radial-gradient(circle at 90% 0%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)",
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(subTotal)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento productos</span>
                    <span>-{formatPrice(totalSavings)}</span>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-gray-300 text-sm">
                      ¿Tienes un cupón?
                    </label>
                    {couponApplied && (
                      <span className="text-xs bg-green-900/30 text-green-400 py-0.5 px-2 rounded border border-green-700/50 flex items-center">
                        <Check size={12} className="mr-1" />
                        Aplicado
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Código de descuento"
                      className={`flex-grow bg-gray-700/50 border ${
                        couponError ? "border-red-500/50" : "border-white/10"
                      } rounded-l-lg text-white p-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 rounded-r-lg transition-colors duration-300"
                    >
                      Aplicar
                    </button>
                  </div>
                  <AnimatePresence>
                    {showCouponMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`mt-2 text-xs ${
                          couponApplied ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {couponApplied
                          ? "¡Cupón aplicado correctamente! 10% de descuento."
                          : "El código ingresado no es válido. Prueba con KOARI"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Descuento cupón (10%)</span>
                    <span>-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex justify-between text-white font-bold">
                  <span>Total</span>
                  <span className="text-xl">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <NeonButton className="w-full py-3 mt-6 justify-center group">
                <span>Finalizar compra</span>
                <ChevronRight
                  size={16}
                  className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                />
              </NeonButton>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-gray-400 text-xs">
                  <CreditCard size={14} className="text-indigo-400 mr-2" />
                  <span>Aceptamos múltiples métodos de pago</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <Shield size={14} className="text-indigo-400 mr-2" />
                  <span>Todas las cuentas tienen garantía de 30 días</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <Clock size={14} className="text-indigo-400 mr-2" />
                  <span>Entrega instantánea después del pago</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <TrendingUp size={14} className="text-indigo-400 mr-2" />
                  <span>Soporte 24/7 para todas tus compras</span>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-400 text-center">
                Al finalizar la compra aceptas nuestros términos y condiciones
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-gray-300 text-sm mb-3">
                  Métodos de pago
                </div>
                <div className="flex justify-between">
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                  <div className="w-10 h-6 bg-gray-700 rounded"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
