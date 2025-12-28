import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaStop } from 'react-icons/fa';
import './types';
import '../styles/nodes.css';

export function OutputNodeComponent({ data }: NodeProps<any>) {
  return (
    <div className="workflow-node output-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <FaStop className="node-icon" />
        <span className="node-title">{data.label}</span>
      </div>
      {data.description && <p className="node-description">{data.description}</p>}
    </div>
  );
}
