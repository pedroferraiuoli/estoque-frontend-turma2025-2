interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className={`toast toast-${type}`} onClick={onClose}>
      <span>{type === "success" ? "✓" : "✕"}</span>
      <p>{message}</p>
    </div>
  );
}
