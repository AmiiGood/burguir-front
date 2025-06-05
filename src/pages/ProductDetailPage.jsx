import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PreFooter from "../components/layout/PreFooter";
import BackButton from "../components/product/BackButton";
import ProductGallery from "../components/product/ProductGallery";
import ProductInformation from "../components/product/ProductInformation";
import RelatedProductsSection from "../components/product/RelatedProductsSection";
import LoadingState from "../components/product/LoadingState";
import { products as allProducts, offers as allOffers } from "../data/products";
import { useCart } from "../components/product/CartContext";

const getProductDescription = (productIdParam, productsData) => {
  if (!productsData || productsData.length === 0) {
    return "Descripción no disponible (error de datos).";
  }
  const product = productsData.find(
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

      const initialGalleryImages =
        currentProduct.galleryImages && currentProduct.galleryImages.length > 0
          ? currentProduct.galleryImages
          : [currentProduct.image].filter(Boolean);

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

  const handleAddToCart = () => {
    if (cart && cart.addToCart && product) {
      cart.addToCart(product);
      setShowAddedToCartMessage(true);
      setTimeout(() => {
        setShowAddedToCartMessage(false);
      }, 2000);
    }
  };

  const finalPrice = product
    ? cart?.calculateFinalPrice
      ? cart.calculateFinalPrice(product.price, product.discount)
      : product.price * (1 - (product.discount || 0) / 100)
    : 0;

  if (productId === undefined && !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <LoadingState message="Cargando..." />
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
          <LoadingState message="Cargando producto o producto no encontrado..." />
        </main>
        <Footer />
      </div>
    );
  }

  const imagesForGallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image].filter(Boolean);

  const descriptionForInfo =
    product.longDescription || getProductDescription(productId, allProducts);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 pt-8 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <BackButton onClick={() => navigate(-1)} />

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 items-start">
            <div className="space-y-6 mb-8 lg:mb-0">
              <ProductGallery
                images={imagesForGallery}
                productTitle={product.title}
                currentImage={currentImage}
                onImageSelect={setCurrentImage}
                youtubeVideoId={product.youtubeVideoId}
              />
            </div>

            <ProductInformation
              product={product}
              finalPrice={finalPrice}
              isInCart={isInCart}
              showAddedToCartMessage={showAddedToCartMessage}
              onAddToCart={handleAddToCart}
              formatPrice={cart?.formatPrice}
              descriptionText={descriptionForInfo}
            />
          </div>

          <RelatedProductsSection products={relatedProducts} />
        </div>
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
