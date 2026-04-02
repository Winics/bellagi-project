import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useAuth } from "./context/AuthContext"; // 🔥 IMPORTANTE

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage"; // 🔥 NOVO

import AdminPage from "./pages/AdminPage";

import "./components/styles/colors.css";

function App() {
  const location = useLocation();
  const { user } = useAuth(); // 🔐

  const isAdminRoute = location.pathname.startsWith("/admin");

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems(prev => {
      const exist = prev.find(item => item.name === product.name);

      if (exist) {
        return prev.map(item =>
          item.name === product.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  }

  return (
    <>
      {/* 🔥 ESCONDE HEADER NO ADMIN */}
      {!isAdminRoute && (
        <Header
          menuOpen={menuOpen}
          onMenu={() => setMenuOpen(!menuOpen)}
          onCart={() => setCartOpen(!cartOpen)}
          cartCount={cartCount}
        />
      )}

      {!isAdminRoute && (
        <Sidebar
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {!isAdminRoute && (
        <Cart
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      )}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />

        <Route
          path="/catalogo"
          element={<CatalogPage addToCart={addToCart} />}
        />

        <Route
          path="/produto/:id"
          element={<ProductPage addToCart={addToCart} />}
        />

        {/* 🔐 PROTEÇÃO REAL */}
        <Route
          path="/admin"
          element={user ? <AdminPage /> : <LoginPage />}
        />
      </Routes>

      {/* 🔥 ESCONDE FOOTER NO ADMIN */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;