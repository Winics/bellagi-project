import { useState } from "react";
import { useParams } from "react-router-dom";
import "./product.css";

export default function ProductPage({ addToCart }) {
  const { id } = useParams();

  const products =
    JSON.parse(localStorage.getItem("products")) || [];

  const product = products.find((p) => p.id == id);

  // 🔥 proteção total
  if (!product) {
    return <h2 style={{ padding: "120px" }}>Produto não encontrado</h2>;
  }

  // 🔥 garante imagens
  const images = product.images?.length
    ? product.images.slice(0, 4)
    : ["https://placehold.co/600x800"];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  function handleAddToCart() {
    if (product.sizes?.length && !selectedSize) {
      alert("Selecione um tamanho");
      return;
    }

    if (product.colors?.length && !selectedColor) {
      alert("Selecione uma cor");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor,
    });
  }

  return (
    <section className="product-page container">

      {/* GALERIA */}
      <div className="gallery">

        <div className="thumbs">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              className={selectedImage === img ? "active" : ""}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>

      </div>

      {/* INFO */}
      <div className="info">

        <h1>{product.name}</h1>

        <span className="category">
          {product.category}
        </span>

        <span className="price">
          R$ {Number(product.price).toFixed(2)}
        </span>

        {/* CORES */}
        <div className="color-options">
          {product.colors.map((c, i) => (
            <span
              key={i}
              className={`color ${selectedColor === c.value ? "active" : ""
                }`}
              style={{ background: c.value }}
              title={c.name} // 🔥 nome no hover
              onClick={() => setSelectedColor(c.value)}
            />
          ))}
        </div>

        {/* TAMANHOS */}
        {product.sizes?.length > 0 && (
          <div className="sizes">
            <p>Tamanho</p>

            <div className="size-options">
              {product.sizes.map((s, i) => (
                <button
                  key={i}
                  className={selectedSize === s ? "active" : ""}
                  onClick={() => setSelectedSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BOTÃO */}
        <button className="add-cart" onClick={handleAddToCart}>
          Adicionar à sacola
        </button>

        {/* DESCRIÇÃO */}
        <div className="description">
          <h3>Descrição</h3>

          <p style={{ whiteSpace: "pre-line" }}>
            {product.description || "Sem descrição"}
          </p>
        </div>

      </div>

    </section>
  );
}