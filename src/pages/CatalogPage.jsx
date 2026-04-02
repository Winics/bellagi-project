import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Catalog from "../components/Catalog/Catalog";
import "../components/Catalog/catalog.css";

export default function CatalogPage({ addToCart }) {

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // 🔥 BUSCAR DO BANCO
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*");

      if (!error) setProducts(data);
    }

    fetchProducts();
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
      <section className="catalog-hero">
        <div className="container catalog-hero-inner">

          <div>
            <span className="subtitle">BELLAGI LINGERIE</span>
            <h1>Catálogo Completo</h1>
          </div>

          <span className="catalog-count">
            {filteredProducts.length} produtos encontrados
          </span>

        </div>
      </section>

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