import { FaTimes, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import '../styles/modal.css';

interface ValidationModalProps {
  validation: { valid: boolean; errors: string[] } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ValidationModal({
  validation,
  isOpen,
  onClose,
}: ValidationModalProps) {
  if (!isOpen || !validation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content validation-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {validation.valid ? (
              <>
                <FaCheck className="icon-success" /> Workflow Válido
              </>
            ) : (
              <>
                <FaExclamationTriangle className="icon-error" /> Errores
                Encontrados
              </>
            )}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {validation.valid ? (
            <div className="validation-success">
              <p>El workflow está correctamente configurado y listo para usar.</p>
            </div>
          ) : (
            <div className="validation-errors">
              <ul>
                {validation.errors.map((error, index) => (
                  <li key={index}>
                    <FaExclamationTriangle /> {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
