import { Link } from "react-router-dom";
import "./catalog.css";

export default function Catalog({
  addToCart,
  products,
  allProducts,
  setSelectedCategory,
  setSelectedSize
}) {
  return (
    <section className="catalog">

      <div className="container catalog-wrapper">

        {/* FILTROS */}
        <aside className="filters">

          <h3>Filtrar por</h3>

          {/* CATEGORIA */}
          <div className="filter-group"> 
            <span>Categoria</span>

            {[...new Set(allProducts.map(p => p.category))].map((cat, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="category"
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}

            <button onClick={() => setSelectedCategory("")}>
              Limpar
            </button>
          </div>

          {/* TAMANHO */}
          <div className="filter-group">
            <span>Tamanho</span>

            {[...new Set(allProducts.flatMap(p => p.sizes || []))].map((size, i) => (
              <button key={i} onClick={() => setSelectedSize(size)}>
                {size}
              </button>
            ))}

            <button onClick={() => setSelectedSize("")}>
              Limpar
            </button>
          </div>

        </aside>

        {/* PRODUTOS */}
        <div className="catalog-grid">

          {products.length === 0 && (
            <p className="empty">Nenhum produto encontrado</p>
          )}

          {products.map((item) => (
            <Link
              to={`/produto/${item.id}`}
              key={item.id}
              className="product-card"
            >

              {/* IMAGEM */}
              <div className="image">
                <img src={item.images?.[0]} alt={item.name} />
                <span className="badge">Novo</span>
              </div>

              {/* NOME */}
              <h4>{item.name}</h4>

              {/* CATEGORIA (DINÂMICA) */}
              <span className="category">
                {item.category}
              </span>

              {/* 🎨 CORES */}
              {item.colors?.length > 0 && (
                <div className="card-colors">

                  {item.colors.slice(0, 3).map((color, index) => (
                    <span
                      key={index}
                      className="color-dot"
                      style={{ backgroundColor: color.value }}
                      title={color.name} // 👈 nome aparece no hover
                    />
                  ))}

                  {item.colors.length > 3 && (
                    <span className="more-colors">
                      +{item.colors.length - 3}
                    </span>
                  )}

                </div>
              )}

              {/* 📏 TAMANHOS (100% CUSTOM) */}
              {item.sizes?.length > 0 && (
                <div className="card-sizes">

                  {item.sizes.slice(0, 3).map((size, i) => (
                    <span key={i}>{size}</span>
                  ))}

                  {item.sizes.length > 3 && (
                    <span className="plus">
                      +{item.sizes.length - 3}
                    </span>
                  )}

                </div>
              )}

              {/* PREÇO */}
              <span className="price">
                R$ {item.price}
              </span>

              {/* BOTÃO */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
              >
                Adicionar ao Carrinho
              </button>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}