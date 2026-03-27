import "./sidebar.css";

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`overlay-bg ${open ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <aside className={`sidebar ${open ? "open" : ""}`}>

        <button className="close" onClick={onClose}>✕</button>

        <nav>
          <a href="#">Novidades</a>
          <a onClick={() => onNavigate("catalog")}>Catálogo</a>
          <a href="#">Conjuntos</a>
          <a href="#">Contato</a>
        </nav>

      </aside>
    </>
  );
}