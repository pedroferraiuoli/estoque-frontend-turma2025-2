import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { api } from "../api";
import type { ProductOutput } from "../types/InputTypes";
import Toast from "../components/Toast";

export default function ProductOutputDetailsPage() {
  const { productOutputId = "" } = useParams<{ productOutputId: string }>();
  const location = useLocation();
  const [output, setOutput] = useState<ProductOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const state = location.state as { toast?: { message: string; type: "success" | "error" } } | null;

    if (state?.toast) {
      setToast(state.toast);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    let cancelled = false;

    async function fetchOutput() {
      try {
        const { data } = await api.get<ProductOutput>(`/product-outputs/${encodeURIComponent(productOutputId)}`);
        if (!cancelled) setOutput(data);
      } catch (err) {
        if (!cancelled) setToast({ message: (err as Error).message, type: "error" });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchOutput();
    return () => { cancelled = true; };
  }, [productOutputId]);

  return (
    <div className="page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <h1 className="page-title">Detalhes da Saída</h1>
        <Link to="/outputs" className="btn btn-secondary">Voltar para Saidas</Link>
      </div>

      {loading ? (
        <div className="card"><p className="empty-text">Carregando saída...</p></div>
      ) : !output ? (
        <div className="card"><p className="empty-text">Saída não encontrada.</p></div>
      ) : (
        <div className="card detail-card">
          <div className="detail-list">
            <div className="detail-item">
              <span className="detail-label">UUID</span>
              <strong><div data-testid="output-uuid">{output.uuid}</div></strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Quantidade</span>
              <strong><div data-testid="output-quantity">{output.quantity}</div></strong>
            </div>
            <div className="detail-item">
              <span className="detail-label">Data da Saída</span>
              <strong><div data-testid="output-date">{new Date(output.outputDate).toLocaleString("pt-BR")}</div></strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
