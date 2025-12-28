import type { NodeTypes } from '@xyflow/react';

import { PositionLoggerNode } from './PositionLoggerNode';
import { TriggerNodeComponent } from './TriggerNode';
import { ActionNodeComponent } from './ActionNode';
import { ConditionalNodeComponent } from './ConditionalNode';
import { ScriptNodeComponent } from './ScriptNode';
import { OutputNodeComponent } from './OutputNode';
import { AINodeComponent } from './AINode';
import { HTTPRequestNodeComponent } from './HTTPRequestNode';
import type { AppNode } from './types';

export const initialNodes: AppNode[] = [
  {
    id: 'trigger-1',
    type: 'trigger',
    position: { x: 100, y: 50 },
    data: {
      label: 'Activador: Envío de Email',
      type: 'trigger',
      description: 'Se dispara cuando se envía un email',
      outputs: ['to', 'subject', 'body'],
    },
  },
  {
    id: 'action-1',
    type: 'action',
    position: { x: 100, y: 200 },
    data: {
      label: 'Google Sheets: Agregar fila',
      type: 'action',
      description: 'Agrega datos a una hoja de cálculo',
      config: { spreadsheet: 'Mi Sheet', sheet: 'Datos' },
      inputs: ['data'],
      outputs: ['id'],
    },
  },
  {
    id: 'output-1',
    type: 'output',
    position: { x: 100, y: 350 },
    data: {
      label: 'Fin del Workflow',
      type: 'output',
      description: 'Finaliza el flujo de trabajo',
    },
  },
];

export const nodeTypes = {
  'position-logger': PositionLoggerNode,
  trigger: TriggerNodeComponent,
  action: ActionNodeComponent,
  conditional: ConditionalNodeComponent,
  script: ScriptNodeComponent,
  output: OutputNodeComponent,
  ai: AINodeComponent,
  'http-request': HTTPRequestNodeComponent,
} as unknown as NodeTypes;

export type { AppNode } from './types';
