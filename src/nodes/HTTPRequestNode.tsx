import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaGlobe } from 'react-icons/fa';
import '../styles/nodes.css';

/**
 * Nodo HTTP Request
 * Realiza llamadas HTTP a APIs externas
 * 
 * @example
 * ```tsx
 * <HTTPRequestNode 
 *   data={{
 *     label: 'Llamar API',
 *     method: 'POST',
 *     url: 'https://api.ejemplo.com/datos',
 *     headers: { 'Authorization': 'Bearer token' },
 *     bodyType: 'json'
 *   }}
 * />
 * ```
 */

export function HTTPRequestNodeComponent({
  data,
}: NodeProps<any>) {
  const methodColors: Record<string, string> = {
    GET: '#4e7cff',
    POST: '#00a870',
    PUT: '#ff9f43',
    DELETE: '#ef4444',
    PATCH: '#a855f7',
  };

  const method = String(data.method || 'GET');
  const url = String(data.url || '');

  return (
    <div className="workflow-node action-node">
      <Handle type="target" position={Position.Top} />

      <div className="node-header">
        <div
          className="node-icon"
          style={{ background: methodColors[method] + '20', color: methodColors[method] }}
        >
          <FaGlobe />
        </div>
        <span className="node-title">{data.label}</span>
      </div>

      <div className="node-config">
        <div className="config-item">
          <span className="config-key">Método:</span>
          <span
            className="config-value"
            style={{
              color: methodColors[method],
              fontWeight: 600,
            }}
          >
            {method}
          </span>
        </div>
        <div className="config-item">
          <span className="config-key">URL:</span>
          <span className="config-value" title={url}>
            {url.substring(0, 30)}...
          </span>
        </div>
        {data.headers && Object.keys(data.headers).length > 0 && (
          <div className="config-item">
            <span className="config-key">Headers:</span>
            <span className="config-value">{Object.keys(data.headers).length}</span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
