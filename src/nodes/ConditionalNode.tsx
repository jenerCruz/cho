import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaCode } from 'react-icons/fa';
import './types';
import '../styles/nodes.css';

export function ConditionalNodeComponent({ data }: NodeProps<any>) {
  return (
    <div className="workflow-node conditional-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <FaCode className="node-icon" />
        <span className="node-title">{data.label}</span>
      </div>
      {data.description && <p className="node-description">{data.description}</p>}
      <div className="handles-group">
        <Handle
          type="source"
          position={Position.Bottom}
          id="true"
          style={{ left: '30%', background: '#4ade80' }}
        />
        <span className="handle-label">true</span>
      </div>
      <div className="handles-group">
        <Handle
          type="source"
          position={Position.Bottom}
          id="false"
          style={{ left: '70%', background: '#f87171' }}
        />
        <span className="handle-label">false</span>
      </div>
    </div>
  );
}
