import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaPython } from 'react-icons/fa';
import './types';
import '../styles/nodes.css';

export function ScriptNodeComponent({ data }: NodeProps<any>) {
  return (
    <div className="workflow-node script-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <FaPython className="node-icon" />
        <span className="node-title">{data.label}</span>
      </div>
      {data.description && <p className="node-description">{data.description}</p>}
      {data.code && (
        <div className="node-code">
          <pre className="code-preview">{data.code.substring(0, 80)}...</pre>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
