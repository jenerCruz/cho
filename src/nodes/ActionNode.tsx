import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaCog } from 'react-icons/fa';
import './types';
import '../styles/nodes.css';

export function ActionNodeComponent({ data }: NodeProps<any>) {
  return (
    <div className="workflow-node action-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <FaCog className="node-icon" />
        <span className="node-title">{data.label}</span>
      </div>
      {data.description && <p className="node-description">{data.description}</p>}
      {data.config && Object.entries(data.config).length > 0 && (
        <div className="node-config">
          {Object.entries(data.config).map(([key, value]) => (
            <div key={key} className="config-item">
              <span className="config-key">{key}:</span>
              <span className="config-value">{String(value)}</span>
            </div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
