import "./hero.css";
import heroImg from "./imagem/model2.png";

export default function Hero() {
  return (
    <section className="hero">

      <div
        className="hero-bg"
        style={{ backgroundImage: `url(${heroImg})` }}
      ></div>

      <div className="hero-content container">
        <span className="tag">/ Coleção Noite</span>

        <h1>
          Elegância que <br />
          <span>abraça</span> <br />
          sua essência
        </h1>

        <p>
          Peças criadas com renda francesa e cetim premium para celebrar cada curva com sofisticação.
        </p>

        <div className="buttons">
          <button className="primary">Explorar Coleção</button>
          <button className="outline">Ver Novidades</button>
        </div>
      </div>

      <div className="hero-overlay-bar">
        <div className="container overlay-content">

          <div className="item">
            <strong>+500</strong>
            <span>Clientes Felizes</span>
          </div>

          <div className="item">
            <strong>100%</strong>
            <span>Qualidade Premium</span>
          </div>

          <div className="item">
            <strong>Grátis</strong>
            <span>Frete acima R$200</span>
          </div>

        </div>
      </div>

    </section>
  );
}