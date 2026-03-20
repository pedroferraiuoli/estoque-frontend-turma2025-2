import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import type { CreateProductRequest, Product } from "../types/ProductTypes";
import Toast from "../components/Toast";

export default function ProductCreatePage() {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [name, setName] = useState("");
  const [orderReferenceDays, setOrderReferenceDays] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload: CreateProductRequest = {
        barcode,
        name,
        orderReferenceDays: Number(orderReferenceDays),
      };
      const { data: product } = await api.post<Product>("/products", payload);

      navigate(`/products/${encodeURIComponent(product.barcode)}`, {
        state: { toast: { message: "Produto criado com sucesso!", type: "success" as const } },
      });
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <div>
          <h1 className="page-title">Novo Produto</h1>
          <p className="text-muted">Cadastre um produto e siga direto para a página de detalhes após salvar.</p>
        </div>
        <Link to="/products" className="btn btn-secondary">
          Voltar para Produtos
        </Link>
      </div>

      <div className="card form-card">
        <h2>Dados do Produto</h2>
        <form onSubmit={handleCreate} className="form create-product-form">
          <div className="field">
            <label htmlFor="barcode">Código de Barras</label>
            <input
              id="barcode"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Ex: 1234567899"
            />
          </div>

          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Guaravita"
            />
          </div>

          <div className="field">
            <label htmlFor="orderReferenceDays">Dias de Referência</label>
            <input
              id="orderReferenceDays"
              type="number"
              min="1"
              value={orderReferenceDays}
              onChange={(e) => setOrderReferenceDays(e.target.value)}
              placeholder="Ex: 30"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Criando..." : "Criar Produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
