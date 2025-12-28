import type { Node, BuiltInNode } from '@xyflow/react';

// Tipos de nodos en el workflow
export type NodeType = 'trigger' | 'action' | 'conditional' | 'script' | 'output' | 'ai' | 'http-request';

// Estructura base de datos para un nodo
export interface WorkflowNodeData {
  label: string;
  type: NodeType;
  description?: string;
  [key: string]: any;
}

// Tipos de nodos personalizados
export type TriggerNode = Node<WorkflowNodeData, 'trigger'>;
export type ActionNode = Node<WorkflowNodeData, 'action'>;
export type ConditionalNode = Node<WorkflowNodeData, 'conditional'>;
export type ScriptNode = Node<WorkflowNodeData, 'script'>;
export type OutputNode = Node<WorkflowNodeData, 'output'>;
export type AINode = Node<WorkflowNodeData, 'ai'>;
export type HTTPRequestNode = Node<WorkflowNodeData, 'http-request'>;

// Unión de todos los tipos
export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type AppNode = BuiltInNode | TriggerNode | ActionNode | ConditionalNode | ScriptNode | OutputNode | AINode | HTTPRequestNode | PositionLoggerNode;
