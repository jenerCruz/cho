import { FaCopy, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import '../styles/modal.css';

interface CodeModalProps {
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

export function CodeModal({ code, isOpen, onClose }: CodeModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content code-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Código Google Apps Script Generado</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          <div className="code-container">
            <pre className="code-block">
              <code>{code}</code>
            </pre>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleCopy}>
            <FaCopy /> {copied ? 'Copiado!' : 'Copiar Código'}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
