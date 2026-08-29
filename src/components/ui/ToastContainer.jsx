// src/components/ui/ToastContainer.jsx
import React from 'react';
import { useUI } from '../../context/UIContext';
import { CheckCircle, Heart, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useUI();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          {toast.type === 'wishlist' ? (
            <Heart size={16} color="var(--accent-sale)" fill="var(--accent-sale)" />
          ) : toast.type === 'cart' ? (
            <CheckCircle size={16} color="var(--accent-success)" />
          ) : (
            <Info size={16} color="var(--accent-terracotta)" />
          )}

          <span style={{ flex: 1 }}>{toast.message}</span>

          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: 'rgba(255, 255, 255, 0.6)', padding: '2px' }}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
