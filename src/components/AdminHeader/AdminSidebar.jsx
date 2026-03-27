import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <h2>Admin</h2>

      <nav>
        <Link to="/admin">Produtos</Link>
        <Link to="/">Ver Loja</Link>
      </nav>

    </aside>
  );
}