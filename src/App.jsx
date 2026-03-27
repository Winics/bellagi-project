import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";

import AdminHeader from "./components/AdminHeader/AdminHeader";
import AdminPage from "./pages/AdminPage";

import "./components/styles/colors.css";

function App() {
const location = useLocation(); // 🔥 IMPORTANTE
  
  const isAdmin = location.pathname.startsWith("/Admin");

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
        <Header
          menuOpen={menuOpen}
          onMenu={() => setMenuOpen(!menuOpen)}
          onCart={() => setCartOpen(!cartOpen)}
          cartCount={cartCount}
        />

      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />


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

        {/* 🔥 AQUI DENTRO */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;