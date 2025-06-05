import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Tag,
  Star,
  Clock,
  Trophy,
  ArrowLeft,
  Zap,
  Shield,
  Package,
  Check,
  Info,
} from "lucide-react";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PreFooter from "../components/layout/PreFooter";
import NeonButton from "../components/layout/NeonButton";
import ProductCard from "../components/product/ProductCard";
import BundleCard from "../components/ofertas/BundlesCard";

import { products as allProducts, offers as allOffers } from "../data/products";
import { useCart } from "../components/product/CartContext";

const getProductDescription = (productIdParam) => {
  if (!allProducts || allProducts.length === 0) {
    return "Descripción no disponible (error de datos).";
  }
  const product = allProducts.find(
    (p) => p.id.toString() === productIdParam?.toString()
  );
  return (
    product?.description ||
    "Descripción detallada no disponible para este producto. ¡Pero confía, es una gran oferta!"
  );
};

const ProductDetailPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const cart = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [bundlesContainingProduct, setBundlesContainingProduct] = useState([]);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const isInCart =
    cart?.cartItems?.some((item) => item.id === product?.id) || false;

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) {
      if (productId !== undefined) navigate("/404", { replace: true });
      return;
    }

    if (productId === undefined) {
      navigate("/404", { replace: true });
      return;
    }

    window.scrollTo(0, 0);
    const currentProduct = allProducts.find(
      (p) => p.id.toString() === productId
    );

    if (currentProduct) {
      setProduct(currentProduct);

      const initialGalleryImages = [
        currentProduct.image,
        currentProduct.image2,
        currentProduct.image3,
      ].filter(Boolean);
      setCurrentImage(
        initialGalleryImages.length > 0
          ? initialGalleryImages[0]
          : currentProduct.image
      );

      const related = allProducts
        .filter(
          (p) => p.type === currentProduct.type && p.id !== currentProduct.id
        )
        .slice(0, 4);
      setRelatedProducts(related);

      const bundles = allOffers
        .filter(
          (offer) =>
            offer.type === "bundle" &&
            offer.products.includes(currentProduct.id)
        )
        .slice(0, 3);
      setBundlesContainingProduct(bundles);
    } else {
      navigate("/404", { replace: true });
    }
  }, [productId, navigate]);

  if (productId === undefined && !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-white text-2xl">Cargando...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-white text-2xl">
            Cargando producto o producto no encontrado...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  const galleryImages = [product.image, product.image2, product.image3].filter(
    Boolean
  );

  const handleAddToCart = () => {
    if (cart && cart.addToCart) {
      cart.addToCart(product);
      setShowAddedToCartMessage(true);
      setTimeout(() => {
        setShowAddedToCartMessage(false);
      }, 2000);
    }
  };

  const finalPrice = cart?.calculateFinalPrice
    ? cart.calculateFinalPrice(product.price, product.discount)
    : product.price * (1 - (product.discount || 0) / 100);

  const descriptionText = getProductDescription(productId);

  const DetailItem = ({
    icon: Icon,
    label,
    value,
    colorClass = "text-indigo-400",
  }) => (
    <div className="flex items-center space-x-3 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
      <Icon size={24} className={colorClass} />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </motion.button>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 mb-8 lg:mb-0"
            >
              {/* Imagen principal */}
              <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-indigo-500/30">
                <img
                  src={currentImage || product.image}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Miniaturas */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(img)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        currentImage === img
                          ? "border-indigo-500 scale-105"
                          : "border-gray-700 hover:border-indigo-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Video de YouTube */}
              {product.youtubeVideoId && (
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border border-gray-700">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${product.youtubeVideoId}?autoplay=0&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`${product.title} Gameplay Video`}
                  ></iframe>
                </div>
              )}
            </motion.div>

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
                  {cart?.formatPrice
                    ? cart.formatPrice(finalPrice)
                    : `$${finalPrice.toFixed(2)}`}
                </p>
                {product.discount > 0 && (
                  <p className="text-xl text-gray-500 line-through">
                    {cart?.formatPrice
                      ? cart.formatPrice(product.price)
                      : `$${product.price.toFixed(2)}`}
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
                onClick={handleAddToCart}
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
                    <ShoppingCart size={20} className="mr-2" /> Añadir al
                    Carrito
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
                  <Shield size={16} className="mr-2 text-green-400" /> Compra
                  100% Segura y Garantizada
                </p>
                <p className="flex items-center">
                  <Zap size={16} className="mr-2 text-yellow-400" /> Entrega
                  Inmediata de Credenciales
                </p>
                <p className="flex items-center">
                  <Info size={16} className="mr-2 text-sky-400" /> Soporte
                  Técnico 24/7
                </p>
              </div>
            </motion.div>
          </div>

          {relatedProducts.length > 0 && (
            <motion.section
              className="mt-16 pt-10 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative inline-block">
                También te podría interesar
                <span className="block h-1 w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 mt-1"></span>
              </h2>
              <p className="text-gray-400 mb-8">
                Otros jugadores también vieron estos productos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </motion.section>
          )}

          {bundlesContainingProduct.length > 0 && (
            <motion.section
              className="mt-16 pt-10 border-t border-gray-700/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative inline-block">
                Disponible en estos Bundles
                <span className="block h-1 w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 mt-1"></span>
              </h2>
              <p className="text-gray-400 mb-8">
                Ahorra más llevando este producto en un paquete.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bundlesContainingProduct.map((bundle) => {
                  const bundleProducts = bundle.products
                    .map((prodId) => allProducts.find((p) => p.id === prodId))
                    .filter(Boolean);
                  return (
                    <BundleCard
                      key={bundle.id}
                      bundle={bundle}
                      bundleProducts={bundleProducts}
                    />
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
