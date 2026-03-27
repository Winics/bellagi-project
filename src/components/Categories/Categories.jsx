import "./categories.css";

export default function Categories() {
  return (
    <section className="categories">

      <div className="container">

        <span className="subtitle">Explore por categoria</span>
        <h2>Encontre Sua Favorita</h2>

        <div className="track">

          <div className="cat">
            <img src="https://placehold.co/600x800" />
            <div className="info">
              <h3>Sutiãs</h3>
              <span>12 peças</span>
            </div>
          </div>

          <div className="cat">
            <img src="https://placehold.co/600x800" />
            <div className="info">
              <h3>Conjuntos</h3>
              <span>8 peças</span>
            </div>
          </div>

          <div className="cat">
            <img src="https://placehold.co/600x800" />
            <div className="info">
              <h3>Camisolas</h3>
              <span>6 peças</span>
            </div>
          </div>

          <div className="cat">
            <img src="https://placehold.co/600x800" />
            <div className="info">
              <h3>Bodys</h3>
              <span>5 peças</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}