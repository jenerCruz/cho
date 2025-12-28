import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaBrain } from 'react-icons/fa';
import '../styles/nodes.css';

/**
 * Nodo de IA multi-modelo
 * 
 * Soporta:
 * - OpenAI (GPT-4, GPT-3.5-turbo)
 * - Google Gemini
 * - Mistral AI
 * - Groq (gratis)
 * - Hugging Face
 * 
 * @example
 * ```tsx
 * <AINode 
 *   data={{
 *     label: 'Procesar con IA',
 *     model: 'gpt-4',
 *     provider: 'openai',
 *     prompt: 'Analiza el siguiente texto: {text}',
 *     temperature: 0.7
 *   }}
 * />
 * ```
 */

const PROVIDERS = {
  openai: {
    label: 'OpenAI',
    models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
    color: '#10a37f',
  },
  gemini: {
    label: 'Google Gemini',
    models: ['gemini-pro', 'gemini-pro-vision'],
    color: '#4285f4',
  },
  mistral: {
    label: 'Mistral AI',
    models: ['mistral-large', 'mistral-medium', 'mistral-small'],
    color: '#ff6600',
  },
  groq: {
    label: 'Groq (Gratis)',
    models: ['mixtral-8x7b-32768', 'llama2-70b-4096'],
    color: '#6200ea',
  },
  huggingface: {
    label: 'Hugging Face',
    models: ['mistral-7b', 'neural-chat-7b', 'zephyr-7b'],
    color: '#fcc624',
  },
};

export function AINodeComponent({ data }: NodeProps<any>) {
  const provider = PROVIDERS[data.provider as keyof typeof PROVIDERS];

  return (
    <div className="workflow-node ai-node">
      <Handle type="target" position={Position.Top} />
      
      <div className="node-header">
        <div className="node-icon" style={{ background: provider?.color }}>
          <FaBrain />
        </div>
        <span className="node-title">{data.label}</span>
      </div>

      <div className="node-config">
        <div className="config-item">
          <span className="config-key">Provider:</span>
          <span className="config-value">{provider?.label}</span>
        </div>
        <div className="config-item">
          <span className="config-key">Modelo:</span>
          <span className="config-value">{data.model}</span>
        </div>
        {data.temperature !== undefined && (
          <div className="config-item">
            <span className="config-key">Temp:</span>
            <span className="config-value">{data.temperature}</span>
          </div>
        )}
      </div>

      {data.prompt && (
        <div className="node-code">
          <pre className="code-preview">{String(data.prompt).substring(0, 60)}...</pre>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
