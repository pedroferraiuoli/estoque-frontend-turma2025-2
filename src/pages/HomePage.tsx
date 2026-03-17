import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page">
      <div className="home-hero">
        <h1>Sistema de Controle de Estoque</h1>
        <p className="home-subtitle">
          Gerencie suas entradas, saídas, pedidos e inventário de forma simples e intuitiva
        </p>
      </div>

      <div className="grid-2" style={{ marginTop: "3rem" }}>
        <Link to="/products" className="home-card">
          <div className="home-card-icon">📦</div>
          <h3>Produtos</h3>
          <p>Cadastro e gerenciamento de produtos com código de barras</p>
        </Link>

        <Link to="/orders" className="home-card">
          <div className="home-card-icon">📋</div>
          <h3>Pedidos</h3>
          <p>Criar e acompanhar pedidos de compra de produtos</p>
        </Link>

        <Link to="/inputs" className="home-card">
          <div className="home-card-icon">📥</div>
          <h3>Entradas</h3>
          <p>Registrar entradas de produtos no estoque</p>
        </Link>

        <Link to="/outputs" className="home-card">
          <div className="home-card-icon">📤</div>
          <h3>Saídas</h3>
          <p>Registrar saídas de produtos do estoque</p>
        </Link>
      </div>

      <div className="card" style={{ marginTop: "3rem" }}>
        <h2>Bem-vindo</h2>
        <p style={{ marginTop: "1rem", lineHeight: "1.8", color: "var(--color-text-muted)" }}>
          Use a barra lateral para navegar entre os módulos do sistema. 
          Cada seção permite gerenciar um aspecto diferente do seu estoque:
        </p>
        <ul style={{ marginTop: "1rem", marginLeft: "1.25rem", color: "var(--color-text-muted)", lineHeight: "1.8" }}>
          <li><strong style={{ color: "var(--color-text)" }}>Produtos</strong> — Cadastre novos produtos e busque informações de estoque</li>
          <li><strong style={{ color: "var(--color-text)" }}>Pedidos</strong> — Crie pedidos de compra para seus produtos</li>
          <li><strong style={{ color: "var(--color-text)" }}>Entradas</strong> — Registre quando produtos chegam ao estoque</li>
          <li><strong style={{ color: "var(--color-text)" }}>Saídas</strong> — Registre quando produtos saem do estoque</li>
        </ul>
      </div>
    </div>
  );
}
