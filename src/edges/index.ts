import type { Edge, EdgeTypes } from '@xyflow/react';
import { AnimatedEdge } from './AnimatedEdge';

export const initialEdges: Edge[] = [
  {
    id: 'trigger-1->action-1',
    source: 'trigger-1',
    target: 'action-1',
    animated: true,
    data: { label: 'email' },
  },
  {
    id: 'action-1->output-1',
    source: 'action-1',
    target: 'output-1',
    animated: true,
    data: { label: 'resultado' },
  },
];

export const edgeTypes = {
  animated: AnimatedEdge,
} satisfies EdgeTypes;
