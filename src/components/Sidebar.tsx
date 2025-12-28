import { FaPlay, FaCog, FaCode, FaStop, FaBrain, FaGlobe } from 'react-icons/fa';
import { useCallback } from 'react';
import '../styles/sidebar.css';

interface NodeTemplate {
  id: string;
  label: string;
  type:
    | 'trigger'
    | 'action'
    | 'conditional'
    | 'script'
    | 'output'
    | 'ai'
    | 'http-request';
  description: string;
  icon: JSX.Element;
  category: string;
}

const NODE_TEMPLATES: NodeTemplate[] = [
  // Triggers
  {
    id: 'trigger-email',
    label: 'Email Recibido',
    type: 'trigger',
    description: 'Se dispara cuando llega un email',
    icon: <FaPlay />,
    category: 'Triggers',
  },
  {
    id: 'trigger-form',
    label: 'Envío de Formulario',
    type: 'trigger',
    description: 'Se dispara cuando se envía un formulario',
    icon: <FaPlay />,
    category: 'Triggers',
  },
  {
    id: 'trigger-schedule',
    label: 'Programado',
    type: 'trigger',
    description: 'Se dispara en un horario específico',
    icon: <FaPlay />,
    category: 'Triggers',
  },

  // Google Actions
  {
    id: 'action-sheets',
    label: 'Google Sheets - Agregar Fila',
    type: 'action',
    description: 'Agrega una fila a una hoja de cálculo',
    icon: <FaCog />,
    category: 'Google Apps',
  },
  {
    id: 'action-docs',
    label: 'Google Docs - Crear Documento',
    type: 'action',
    description: 'Crea un nuevo documento',
    icon: <FaCog />,
    category: 'Google Apps',
  },
  {
    id: 'action-gmail',
    label: 'Gmail - Enviar Email',
    type: 'action',
    description: 'Envía un email',
    icon: <FaCog />,
    category: 'Google Apps',
  },
  {
    id: 'action-calendar',
    label: 'Google Calendar - Crear Evento',
    type: 'action',
    description: 'Crea un evento en el calendario',
    icon: <FaCog />,
    category: 'Google Apps',
  },

  // Advanced Actions
  {
    id: 'http-request',
    label: 'HTTP Request',
    type: 'http-request',
    description: 'Realiza llamadas HTTP a APIs externas',
    icon: <FaGlobe />,
    category: 'Integraciones',
  },

  // IA & Logic
  {
    id: 'ai-process',
    label: 'Procesar con IA',
    type: 'ai',
    description: 'Usa IA (GPT, Gemini, Mistral, Groq)',
    icon: <FaBrain />,
    category: 'IA',
  },
  {
    id: 'conditional-if',
    label: 'Si/Entonces',
    type: 'conditional',
    description: 'Ejecuta acciones condicionalmente',
    icon: <FaCode />,
    category: 'Lógica',
  },
  {
    id: 'script-custom',
    label: 'Script Personalizado',
    type: 'script',
    description: 'Ejecuta código JavaScript personalizado',
    icon: <FaCode />,
    category: 'Scripts',
  },

  // Output
  {
    id: 'output-end',
    label: 'Fin del Workflow',
    type: 'output',
    description: 'Finaliza el flujo de trabajo',
    icon: <FaStop />,
    category: 'Final',
  },
];

interface SidebarProps {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    template: NodeTemplate
  ) => void;
}

export function Sidebar({ onDragStart }: SidebarProps) {
  const categories = Array.from(new Set(NODE_TEMPLATES.map((t) => t.category)));

  const getTemplatesByCategory = useCallback(
    (category: string) => NODE_TEMPLATES.filter((t) => t.category === category),
    []
  );

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Nodos</h2>
        <p className="sidebar-subtitle">Arrastra para crear</p>
      </div>

      <div className="sidebar-content">
        {categories.map((category) => (
          <div key={category} className="node-category">
            <h3 className="category-title">{category}</h3>
            <div className="node-list">
              {getTemplatesByCategory(category).map((template) => (
                <div
                  key={template.id}
                  className={`node-item node-item-${template.type}`}
                  draggable
                  onDragStart={(e) => onDragStart(e, template)}
                >
                  <div className="node-item-icon">{template.icon}</div>
                  <div className="node-item-content">
                    <div className="node-item-label">{template.label}</div>
                    <div className="node-item-description">
                      {template.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
