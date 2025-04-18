import React, { useState } from "react";
import ProductCard from "./ProductCard";
import NeonButton from "../layout/NeonButton";

const ProductGrid = ({ products }) => {
  const initialLimit = 8;
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  const displayedProducts = products.slice(0, displayLimit);
  const hasMoreProducts = displayLimit < products.length;

  const handleLoadMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + initialLimit);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {displayedProducts.map((product) => (
          <div className="w-full" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {hasMoreProducts && (
        <div className="flex justify-center mt-8">
          <NeonButton onClick={handleLoadMore} className="py-2 px-4">
            <span>Cargar más...</span>
          </NeonButton>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
