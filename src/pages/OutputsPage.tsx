import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { ProductOutput } from "../types/InputTypes";
import Toast from "../components/Toast";

export default function OutputsPage() {
  const [outputs, setOutputs] = useState<ProductOutput[]>([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const fetchOutputs = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get<ProductOutput[]>("/product-outputs");
      setOutputs(Array.isArray(data) ? data : []);
    } catch (err) {
      setToast({ message: (err as Error).message, type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutputs();
  }, [fetchOutputs]);

  return (
    <div className="page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="page-header">
        <div>
          <h1 className="page-title">Todas as Saidas</h1>
          <p className="text-muted">Acompanhe as saidas de produtos cadastradas e abra os detalhes individuais.</p>
        </div>
        <Link to="/outputs/new" className="btn btn-primary">
          Nova Saida
        </Link>
      </div>

      <div className="card">
        {loading ? (
          <p className="empty-text">Carregando...</p>
        ) : outputs.length === 0 ? (
          <p className="empty-text">Nenhuma saída cadastrada.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>UUID</th>
                  <th>Quantidade</th>
                  <th>Data da Saída</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {outputs.map((output) => (
                  <tr key={output.uuid}>
                    <td><strong>{output.uuid}</strong></td>
                    <td><strong>{output.quantity}</strong></td>
                    <td><strong>{new Date(output.outputDate).toLocaleDateString("pt-BR")}</strong></td>
                    <td>
                      <div className="table-actions">
                        <Link to={`/outputs/${encodeURIComponent(output.uuid)}`} className="btn btn-secondary btn-sm">
                          Detalhes
                        </Link>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => {}}>
                          Apagar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
