import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Error404Page from "./pages/404";
import FAQPage from "./pages/FAQPage";
import CatalogPage from "./pages/CatalogoPage";
import OffersPage from "./pages/OfertasPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./index.css";
import { CartProvider } from "./components/product/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/ofertas" element={<OffersPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/producto/:id" element={<ProductDetailPage />} />
          <Route path="/404" element={<Error404Page />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
