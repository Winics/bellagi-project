import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./header.css";

export default function Header({ onMenu, onCart, menuOpen, cartCount }) {
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const solidPages = ["/catalogo", "/admin"];

const isSolidPage =
  solidPages.includes(location.pathname) ||
  location.pathname.startsWith("/produto");

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`header ${scrolled || isSolidPage ? "scrolled" : ""}`}
    >

      <div className="container header-inner">

        {/* MENU MOBILE */}
        <button className="menu-btn mobile-only" onClick={onMenu}>
          {menuOpen ? <X /> : <Menu />}
        </button>

        {/* NAV ESQUERDA */}
        <div className="nav-left desktop-only">
          <NavLink to="/">Novidades</NavLink>
          <NavLink to="/catalogo">Catálogo</NavLink>
        </div>

        {/* LOGO */}
        <div className="logo">
          BellaGi
        </div>

        {/* NAV DIREITA */}
        <div className="nav-right">
          <div className="desktop-only nav-links">
            <a href="#">Conjuntos</a>
            <a href="#">Contato</a>
          </div>

          <Instagram size={20} className="desktop-only" />

          {/* CARRINHO */}
          <button className="cart-btn" onClick={onCart}>
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}