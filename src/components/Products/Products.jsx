import "./products.css";
import { Link } from "react-router-dom";

export default function Products({ addToCart }) {

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const featured = products
    .filter(p => p.featured)
    .slice(0, 3);

  return (
    <section id="products" className="products">

      <div className="container">

        <div className="titleproducts">
          <h4>Atualizadas Semanalmente</h4>
          <h2>Recém-Chegadas</h2>
        </div>

        <div className="grid">

          {featured.map((item) => (
            <Link
              to={`/produto/${item.id}`}
              key={item.id}
              className="card"
            >

              <img src={item.images[0]} alt={item.name} />

              <p className="name">{item.name}</p>

              <span className="category">{item.category}</span>

              {/* CORES */}
              <div className="card-colors">
                {item.colors.slice(0, 3).map((color, i) => (
                  <span
                    key={i}
                    className="color-dot"
                    style={{ backgroundColor: color.value }}
                  />
                ))}

                {item.colors.length > 3 && (
                  <span className="more-colors">
                    +{item.colors.length - 3}
                  </span>
                )}
              </div>

              {/* TAMANHOS */}
              <div className="card-sizes">
                {["P", "M", "G"].map((size) => (
                  <span key={size}>{size}</span>
                ))}

                {item.sizes.some(
                  (s) => !["P", "M", "G"].includes(s)
                ) && <span className="plus">Plus Size</span>}
              </div>

              <span className="price">R$ {item.price}</span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
              >
                Comprar
              </button>

            </Link>
          ))}

        </div>

      </div>

    </section>
  );
}