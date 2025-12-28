import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaPlay } from 'react-icons/fa';
import '../styles/nodes.css';

export function TriggerNodeComponent({ data }: NodeProps<any>) {
  return (
    <div className="workflow-node trigger-node">
      <div className="node-header">
        <FaPlay className="node-icon" />
        <span className="node-title">{data.label}</span>
      </div>
      {data.description && <p className="node-description">{data.description}</p>}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
