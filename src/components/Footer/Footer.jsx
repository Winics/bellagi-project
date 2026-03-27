import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* LOGO / MARCA */}
        <div className="footer-brand">
          <h2>BellaGi</h2>
          <p>
            Elegância, sensualidade e conforto em cada detalhe.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <div>
            <h4>Institucional</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Contato</a>
            <a href="#">Política de Privacidade</a>
          </div>

          <div>
            <h4>Categorias</h4>
            <a href="#">Conjuntos</a>
            <a href="#">Bodys</a>
            <a href="#">Camisolas</a>
          </div>
        </div>

        {/* SOCIAL */}
        <div className="footer-social">
          <h4>Siga-nos</h4>
          <a href="#">Instagram</a>
          <a href="#">WhatsApp</a>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>© 2026 BellaGi. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}