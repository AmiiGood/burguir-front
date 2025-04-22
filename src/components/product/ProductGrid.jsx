import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  const discountedAaaProducts = products
    .filter((product) => product.type === "AAA" && product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 8);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {discountedAaaProducts.map((product) => (
          <div className="w-full" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
