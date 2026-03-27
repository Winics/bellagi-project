import { useState, useEffect } from "react";
import Catalog from "../components/Catalog/Catalog";
import "../components/Catalog/catalog.css";

export default function CatalogPage({ addToCart }) {

  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // 🔥 carregar produtos
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // 🎯 FILTRO
  const filteredProducts = products.filter((p) => {

    const matchCategory =
      !selectedCategory || p.category === selectedCategory;

    const matchSize =
      !selectedSize || p.sizes?.includes(selectedSize);

    return matchCategory && matchSize;
  });

  return (
    <>
      {/* HERO */}
      <section className="catalog-hero">
        <div className="container catalog-hero-inner">

          <div>
            <span className="subtitle">BELLAGI LINGERIE</span>
            <h1>Catálogo Completo</h1>
          </div>

          {/* 🔥 DINÂMICO */}
          <span className="catalog-count">
            {filteredProducts.length} produtos encontrados
          </span>

        </div>
      </section>

      {/* 🔥 PASSANDO TUDO */}
      <Catalog
        addToCart={addToCart}
        products={filteredProducts}
        allProducts={products}
        setSelectedCategory={setSelectedCategory}
        setSelectedSize={setSelectedSize}
      />
    </>
  );
}