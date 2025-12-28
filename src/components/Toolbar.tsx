import { FaSave, FaPlay, FaCode, FaCheck, FaUndo, FaKey } from 'react-icons/fa';
import { useWorkflowStore } from '../store';
import { generateWorkflowCode, validateWorkflow } from '../utils/codeGenerator';
import { useState } from 'react';
import '../styles/toolbar.css';

interface ToolbarProps {
  onShowCode: (code: string) => void;
  onShowValidation: (validation: {
    valid: boolean;
    errors: string[];
  }) => void;
  onShowCredentials: () => void;
}

export function Toolbar({ onShowCode, onShowValidation, onShowCredentials }: ToolbarProps) {
  const {
    nodes,
    edges,
    workflowName,
    setWorkflowName,
    resetWorkflow,
  } = useWorkflowStore();

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Aquí se guardaría el workflow en el servidor
      const workflow = {
        name: workflowName,
        nodes,
        edges,
        timestamp: new Date().toISOString(),
      };
      console.log('Workflow guardado:', workflow);
      // localStorage.setItem('workflows', JSON.stringify([workflow]));
      setTimeout(() => setIsSaving(false), 1000);
    } catch (error) {
      console.error('Error al guardar:', error);
      setIsSaving(false);
    }
  };

  const handleGenerateCode = () => {
    const code = generateWorkflowCode(nodes, edges, {
      workflowName,
      includeComments: true,
    });
    onShowCode(code);
  };

  const handleValidate = () => {
    const validation = validateWorkflow(nodes, edges);
    onShowValidation(validation);
  };

  const handleReset = () => {
    if (
      confirm(
        '¿Estás seguro de que deseas limpiar el workflow? Esta acción no se puede deshacer.'
      )
    ) {
      resetWorkflow();
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <input
          type="text"
          value={workflowName}
          onChange={(e) => setWorkflowName(e.target.value)}
          className="workflow-name-input"
          placeholder="Nombre del workflow"
        />
      </div>

      <div className="toolbar-center">
        <span className="node-count">
          {nodes.length} nodo{nodes.length !== 1 ? 's' : ''} |{' '}
          {edges.length} conexión{edges.length !== 1 ? 'es' : ''}
        </span>
      </div>

      <div className="toolbar-right">
        <button
          className="toolbar-btn credentials-btn"
          onClick={onShowCredentials}
          title="Gestionar credenciales y API keys"
        >
          <FaKey /> Credenciales
        </button>

        <button
          className="toolbar-btn validate-btn"
          onClick={handleValidate}
          title="Validar workflow"
        >
          <FaCheck /> Validar
        </button>

        <button
          className="toolbar-btn code-btn"
          onClick={handleGenerateCode}
          title="Generar código Google Apps Script"
        >
          <FaCode /> Código
        </button>

        <button
          className="toolbar-btn execute-btn"
          title="Ejecutar workflow"
          disabled={nodes.length === 0}
        >
          <FaPlay /> Ejecutar
        </button>

        <button
          className="toolbar-btn save-btn"
          onClick={handleSave}
          disabled={isSaving}
          title="Guardar workflow"
        >
          <FaSave /> {isSaving ? 'Guardando...' : 'Guardar'}
        </button>

        <button
          className="toolbar-btn reset-btn"
          onClick={handleReset}
          title="Limpiar canvas"
        >
          <FaUndo />
        </button>
      </div>
    </div>
  );
}
