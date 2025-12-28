import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes, nodeTypes } from './nodes';
import { initialEdges, edgeTypes } from './edges';
import { Sidebar } from './components/Sidebar';
import { Toolbar } from './components/Toolbar';
import { CodeModal } from './components/CodeModal';
import { ValidationModal } from './components/ValidationModal';
import { CredentialManager_Component } from './components/CredentialsModal';
import { useWorkflowStore } from './store';
import type { AppNode } from './nodes/types';
import './styles/app.css';

let nodeIdCounter = 0;

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as AppNode[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [validationModalOpen, setValidationModalOpen] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: string[];
  } | null>(null);
  const [credentialsModalOpen, setCredentialsModalOpen] = useState(false);

  const { setNodes: storeSetNodes, setEdges: storeSetEdges } =
    useWorkflowStore();

  // Sincronizar con el store
  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
      setNodes((nds) => {
        storeSetNodes(nds);
        return nds;
      });
    },
    [onNodesChange, setNodes, storeSetNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: any) => {
      onEdgesChange(changes);
      setEdges((eds) => {
        storeSetEdges(eds);
        return eds;
      });
    },
    [onEdgesChange, setEdges, storeSetEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => {
        const newEdges = addEdge(
          {
            ...connection,
            animated: true,
            type: 'animated',
            data: { label: '' },
          },
          eds
        );
        storeSetEdges(newEdges);
        return newEdges;
      });
    },
    [setEdges, storeSetEdges]
  );

  const handleDragStart = useCallback(
    (
      event: React.DragEvent<HTMLDivElement>,
      template: {
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
      }
    ) => {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData(
        'application/reactflow',
        JSON.stringify({
          type: template.type,
          label: template.label,
          description: template.description,
        })
      );
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const data = JSON.parse(
        event.dataTransfer.getData('application/reactflow')
      );
      const { type, label, description } = data;

      // Obtener posición relativa al canvas
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newNode: AppNode = {
        id: `${type}-${++nodeIdCounter}`,
        type,
        position: { x: x - 100, y: y - 50 },
        data: {
          label,
          type,
          description,
          config: {},
          inputs: [],
          outputs: [],
        },
      } as AppNode;

      setNodes((nds) => {
        const updated = [...nds, newNode];
        storeSetNodes(updated);
        return updated;
      });
    },
    [setNodes, storeSetNodes]
  );

  const handleShowCode = (code: string) => {
    setGeneratedCode(code);
    setCodeModalOpen(true);
  };

  const handleShowValidation = (validation: {
    valid: boolean;
    errors: string[];
  }) => {
    setValidationResult(validation);
    setValidationModalOpen(true);
  };

  return (
    <div className="app-container">
      <Sidebar onDragStart={handleDragStart} />

      <div className="main-content">
        <Toolbar
          onShowCode={handleShowCode}
          onShowValidation={handleShowValidation}
          onShowCredentials={() => setCredentialsModalOpen(true)}
        />

        <div
          className="react-flow-container"
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={handleNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            onEdgesChange={handleEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background />
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
      </div>

      <CodeModal
        code={generatedCode}
        isOpen={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />

      <ValidationModal
        validation={validationResult}
        isOpen={validationModalOpen}
        onClose={() => setValidationModalOpen(false)}
      />

      <CredentialManager_Component
        isOpen={credentialsModalOpen}
        onClose={() => setCredentialsModalOpen(false)}
      />
    </div>
  );
}
