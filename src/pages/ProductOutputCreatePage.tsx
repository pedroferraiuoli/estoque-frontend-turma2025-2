import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import Toast from "../components/Toast";

export default function ProductOutputCreatePage() {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [outputDate, setOutputDate] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { data } = await api.post<{ productOutputId: string }>("/product-outputs", {
        barcode,
        quantity: Number(quantity),
        outputDate,
      });

      navigate(`/outputs/${encodeURIComponent(data.productOutputId)}`, {
        state: { toast: { message: "Saída criada com sucesso!", type: "success" as const } },
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
          <h1 className="page-title">Nova Saída</h1>
          <p className="text-muted">Cadastre uma saída e veja os detalhes após salvar.</p>
        </div>
        <Link to="/outputs" className="btn btn-secondary">Voltar para Saidas</Link>
      </div>

      <div className="card form-card">
        <h2>Dados da Saída</h2>
        <form onSubmit={handleCreate} className="form create-product-form" noValidate>
          <div className="field">
            <label htmlFor="barcode">Código de Barras do Produto</label>
            <input
              id="barcode"
              type="text"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              placeholder="Ex: 1234567899"
            />
          </div>

          <div className="field">
            <label htmlFor="quantity">Quantidade</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 10"
            />
          </div>

          <div className="field">
            <label htmlFor="outputDate">Data da Saída</label>
            <input
              id="outputDate"
              type="datetime-local"
              value={outputDate}
              onChange={(e) => setOutputDate(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Criando..." : "Criar Saída"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
