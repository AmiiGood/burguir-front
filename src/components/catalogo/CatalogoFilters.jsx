import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-700 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        className="flex justify-between items-center w-full text-left py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-white font-medium">{title}</h3>
        {isOpen ? (
          <ChevronUp size={18} className="text-gray-400" />
        ) : (
          <ChevronDown size={18} className="text-gray-400" />
        )}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const CatalogFilters = ({ filters, onFilterChange }) => {
  const gameTypes = ["AAA", "AA", "A"];

  const handlePriceRangeChange = (index, value) => {
    const newRange = [...filters.priceRange];
    newRange[index] = parseInt(value);
    onFilterChange({ priceRange: newRange });
  };

  const handleTypeChange = (type) => {
    let newTypes = [...filters.types];
    if (newTypes.includes(type)) {
      newTypes = newTypes.filter((t) => t !== type);
    } else {
      newTypes.push(type);
    }
    onFilterChange({ types: newTypes });
  };

  const handleDiscountedChange = () => {
    onFilterChange({ discounted: !filters.discounted });
  };

  const resetFilters = () => {
    onFilterChange({
      searchTerm: "",
      priceRange: [0, 100],
      types: [],
      discounted: false,
      sortBy: "popularity",
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-white font-bold">Filtros</h2>
        <button
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          onClick={resetFilters}
        >
          Reiniciar
        </button>
      </div>

      <FilterSection title="Precio">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-gray-400 text-sm">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
          <div className="relative">
            <div className="absolute h-1 bg-gray-700 rounded-full w-full top-2"></div>
            <div
              className="absolute h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full top-2"
              style={{
                left: `${(filters.priceRange[0] / 100) * 100}%`,
                width: `${
                  ((filters.priceRange[1] - filters.priceRange[0]) / 100) * 100
                }%`,
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(0, e.target.value)}
              className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer"
              style={{
                height: "20px",
                WebkitAppearance: "none",
                background: "transparent",
              }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(1, e.target.value)}
              className="absolute w-full appearance-none bg-transparent pointer-events-auto cursor-pointer"
              style={{
                height: "20px",
                WebkitAppearance: "none",
                background: "transparent",
              }}
            />
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex-1">
              <input
                type="number"
                min="0"
                max={filters.priceRange[1]}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white text-sm"
              />
            </div>
            <div className="flex-1">
              <input
                type="number"
                min={filters.priceRange[0]}
                max="100"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded text-white text-sm"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Tipo de Juego">
        <div className="space-y-2">
          {gameTypes.map((type) => (
            <label key={type} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-600 bg-gray-700 focus:ring-indigo-500"
                checked={filters.types.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <span className="ml-2 text-gray-300">{type}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Ofertas">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-indigo-500 rounded border-gray-600 bg-gray-700 focus:ring-indigo-500"
            checked={filters.discounted}
            onChange={handleDiscountedChange}
          />
          <span className="ml-2 text-gray-300">Solo con descuento</span>
        </label>
      </FilterSection>

      <div className="mt-8 flex justify-center">
        <motion.div
          className="h-1 w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "66%" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

export default CatalogFilters;
