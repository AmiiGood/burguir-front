import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PreFooter from "../components/layout/PreFooter";
import ProductCard from "../components/product/ProductCard";
import CatalogFilters from "../components/catalogo/CatalogoFilters";
import CatalogPaginator from "../components/catalogo/CatalogoPaginator";
import { products } from "../data/products";

const CatalogPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    searchTerm: "",
    priceRange: [0, 100],
    types: [],
    discounted: false,
    sortBy: "popularity",
  });

  const productsPerPage = 12;

  useEffect(() => {
    let result = [...products];

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter((product) =>
        product.title.toLowerCase().includes(term)
      );
    }

    result = result.filter((product) => {
      const finalPrice = product.price * (1 - product.discount / 100);
      return (
        finalPrice >= filters.priceRange[0] &&
        finalPrice <= filters.priceRange[1]
      );
    });

    if (filters.types.length > 0) {
      result = result.filter((product) => filters.types.includes(product.type));
    }

    if (filters.discounted) {
      result = result.filter((product) => product.discount > 0);
    }

    switch (filters.sortBy) {
      case "priceAsc":
        result.sort(
          (a, b) =>
            a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100)
        );
        break;
      case "priceDesc":
        result.sort(
          (a, b) =>
            b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100)
        );
        break;
      case "nameAsc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "nameDesc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "discount":
        result.sort((a, b) => b.discount - a.discount);
        break;
        result.sort((a, b) => b.hoursPlayed - a.hoursPlayed);
        break;
    }

    setFilteredProducts(result);
  }, [filters]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="flex-1 pt-16">
        <section className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Buscar juegos..."
                className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filters.searchTerm}
                onChange={(e) =>
                  handleFilterChange({ searchTerm: e.target.value })
                }
              />
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={18}
              />
            </div>
            <div className="flex items-center">
              <label className="text-gray-300 mr-2">Ordenar por:</label>
              <select
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
              >
                <option value="popularity">Popularidad</option>
                <option value="priceAsc">Precio: Menor a Mayor</option>
                <option value="priceDesc">Precio: Mayor a Menor</option>
                <option value="nameAsc">Nombre: A-Z</option>
                <option value="nameDesc">Nombre: Z-A</option>
                <option value="discount">Mayor Descuento</option>
              </select>
            </div>
            <button
              className="md:hidden flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-all duration-300"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter size={18} className="mr-2" />
              Filtros
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="hidden md:block w-64 flex-shrink-0">
              <CatalogFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
            {mobileFiltersOpen && (
              <motion.div
                className="md:hidden bg-gray-800 p-6 rounded-lg shadow-lg mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CatalogFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </motion.div>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-300">
                  Mostrando{" "}
                  <span className="font-medium text-white">
                    {filteredProducts.length}
                  </span>{" "}
                  resultados
                </p>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-10 text-center">
                  <h3 className="text-xl text-white font-medium mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-gray-400">
                    Intenta con otros filtros de búsqueda
                  </p>
                </div>
              ) : (
                <>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`product-grid-${currentPage}-${filteredProducts.length}`}
                  >
                    {currentProducts.map((product) => (
                      <motion.div key={product.id} variants={productVariants}>
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="mt-12">
                    <CatalogPaginator
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        <PreFooter />
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
