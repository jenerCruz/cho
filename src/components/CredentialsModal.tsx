import { useState } from 'react';
import { FaKey, FaPlus, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';
import { CredentialManager, API_KEY_TEMPLATES } from '../utils/credentialManager';
import type { Credential } from '../utils/credentialManager';
import '../styles/credentials.css';

interface CredentialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CredentialManager_Component({ isOpen, onClose }: CredentialModalProps) {
  const [credentials, setCredentials] = useState<Credential[]>(
    CredentialManager.getAllCredentials()
  );
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    provider: 'openai',
    type: 'api_key' as const,
    apiKey: '',
  });
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const handleAddCredential = () => {
    if (!formData.name || !formData.apiKey) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      const newCredential = CredentialManager.saveCredential({
        name: formData.name,
        provider: formData.provider,
        type: formData.type,
        apiKey: formData.apiKey,
      });

      setCredentials([...credentials, newCredential]);
      setFormData({ name: '', provider: 'openai', type: 'api_key', apiKey: '' });
      setShowForm(false);
    } catch (error) {
      alert('Error al guardar credencial: ' + error);
    }
  };

  const handleDeleteCredential = (id: string) => {
    if (CredentialManager.deleteCredential(id)) {
      setCredentials(credentials.filter((c) => c.id !== id));
    }
  };

  const toggleVisibility = (id: string) => {
    const newVisible = new Set(visibleIds);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleIds(newVisible);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content credentials-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            <FaKey /> Credenciales y API Keys
          </h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          {!showForm ? (
            <>
              <div className="credentials-list">
                {credentials.length === 0 ? (
                  <div className="empty-state">
                    <FaKey />
                    <p>No hay credenciales configuradas</p>
                    <small>
                      Agrega una credencial para conectar servicios externos
                    </small>
                  </div>
                ) : (
                  credentials.map((cred) => (
                    <div key={cred.id} className="credential-item">
                      <div className="credential-info">
                        <div className="credential-name">{cred.name}</div>
                        <div className="credential-provider">{cred.provider}</div>
                      </div>
                      <div className="credential-actions">
                        <button
                          className="icon-btn"
                          onClick={() => toggleVisibility(cred.id)}
                          title="Mostrar/Ocultar"
                        >
                          {visibleIds.has(cred.id) ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        {visibleIds.has(cred.id) && (
                          <code className="credential-preview">
                            {cred.apiKey?.substring(0, 8)}...
                          </code>
                        )}
                        <button
                          className="icon-btn delete"
                          onClick={() => handleDeleteCredential(cred.id)}
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <FaPlus /> Agregar Credencial
              </button>
            </>
          ) : (
            <div className="credentials-form">
              <h3>Agregar Nueva Credencial</h3>

              <div className="form-group">
                <label>Nombre descriptivo</label>
                <input
                  type="text"
                  placeholder="Ej: Mi clave OpenAI"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Proveedor</label>
                <select
                  value={formData.provider}
                  onChange={(e) =>
                    setFormData({ ...formData, provider: e.target.value })
                  }
                >
                  {Object.entries(API_KEY_TEMPLATES).map(([key, template]) => (
                    <option key={key} value={key}>
                      {template.name}
                    </option>
                  ))}
                  <option value="custom">Otro Proveedor</option>
                </select>
              </div>

              <div className="form-group">
                <label>API Key</label>
                <input
                  type="password"
                  placeholder={
                    API_KEY_TEMPLATES[
                      formData.provider as keyof typeof API_KEY_TEMPLATES
                    ]?.placeholder || 'Pega tu API key'
                  }
                  value={formData.apiKey}
                  onChange={(e) =>
                    setFormData({ ...formData, apiKey: e.target.value })
                  }
                />
                <small className="form-help">
                  {formData.provider && (
                    <a
                      href={
                        API_KEY_TEMPLATES[
                          formData.provider as keyof typeof API_KEY_TEMPLATES
                        ]?.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Obtener API Key
                    </a>
                  )}
                </small>
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleAddCredential}>
                  <FaPlus /> Guardar Credencial
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
