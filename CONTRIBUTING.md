# 🛠️ Guía de Desarrollo - Workflow Editor

Bienvenido! Esta guía te ayudará a continuar desarrollando el Workflow Editor. Está diseñado para ser extensible y modular.

## 📋 Tabla de Contenidos

1. [Arquitectura](#arquitectura)
2. [Crear Nuevos Nodos](#crear-nuevos-nodos)
3. [Sistema de Credenciales](#sistema-de-credenciales)
4. [Integración de APIs](#integración-de-apis)
5. [Generación de Código](#generación-de-código)
6. [Testing](#testing)
7. [Deployment](#deployment)

---

## 🏗️ Arquitectura

### Estructura del Proyecto

```
src/
├── components/          # Componentes React reutilizables
│   ├── Sidebar.tsx              # Panel lateral con nodos draggables
│   ├── Toolbar.tsx              # Barra de herramientas principal
│   ├── CodeModal.tsx            # Modal para mostrar código generado
│   ├── ValidationModal.tsx       # Modal de validación
│   └── CredentialsModal.tsx      # Gestor de credenciales OAuth2 y API keys
│
├── nodes/               # Componentes de nodos del workflow
│   ├── TriggerNode.tsx          # Nodo disparador (punto de inicio)
│   ├── ActionNode.tsx           # Nodo de acción
│   ├── ConditionalNode.tsx       # Nodo condicional (IF/THEN)
│   ├── ScriptNode.tsx           # Nodo de script personalizado
│   ├── OutputNode.tsx           # Nodo de salida (fin del flujo)
│   ├── AINode.tsx               # Nodo de IA (GPT, Gemini, Mistral, Groq)
│   ├── HTTPRequestNode.tsx       # Nodo de solicitud HTTP
│   ├── types.ts                 # Tipos TypeScript compartidos
│   └── index.ts                 # Exportaciones y nodos iniciales
│
├── edges/               # Componentes de conexiones entre nodos
│   ├── AnimatedEdge.tsx         # Edge personalizado con animación
│   └── index.ts                 # Configuración de edges
│
├── utils/               # Utilidades y servicios
│   ├── codeGenerator.ts         # Generador de código Google Apps Script
│   ├── credentialManager.ts      # Gestor de credenciales y OAuth2
│   └── apiClient.ts             # Cliente HTTP para APIs externas
│
├── styles/              # Estilos CSS
│   ├── app.css                  # Estilos principales (tema n8n)
│   ├── nodes.css                # Estilos de nodos
│   ├── edges.css                # Estilos de conexiones
│   ├── sidebar.css              # Estilos del sidebar
│   ├── toolbar.css              # Estilos de la toolbar
│   ├── modal.css                # Estilos de modales
│   └── credentials.css          # Estilos del gestor de credenciales
│
├── store.ts             # Store global (Zustand)
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

### Stack Tecnológico

- **React 18** - Framework de UI
- **React Flow** (@xyflow/react) - Engine para flujos visuales
- **TypeScript** - Type safety
- **Zustand** - Estado global ligero
- **Vite** - Build tool rápido
- **Tailwind CSS** + CSS Modules - Estilos

---

## 🎨 Crear Nuevos Nodos

### Paso 1: Definir el Tipo

Edita `src/nodes/types.ts`:

```typescript
import type { Node } from '@xyflow/react';

// Agregar tu tipo de nodo
export interface DatabaseNodeData {
  label: string;
  type: 'database';
  dbType: 'postgres' | 'mysql' | 'mongodb';
  query: string;
  config?: Record<string, any>;
}

export type DatabaseNode = Node<DatabaseNodeData, 'database'>;

// Actualizar AppNode
export type AppNode = 
  | BuiltInNode 
  | TriggerNode 
  | ActionNode 
  | DatabaseNode  // ← Agregar aquí
  | /* ... otros tipos ... */;
```

### Paso 2: Crear Componente del Nodo

Crea `src/nodes/DatabaseNode.tsx`:

```typescript
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { FaDatabase } from 'react-icons/fa';
import type { DatabaseNode } from './types';
import '../styles/nodes.css';

/**
 * Nodo de Base de Datos
 * 
 * Ejecuta queries en bases de datos SQL o NoSQL
 * 
 * @example
 * ```tsx
 * <DatabaseNodeComponent 
 *   data={{
 *     label: 'Obtener usuarios',
 *     type: 'database',
 *     dbType: 'postgres',
 *     query: 'SELECT * FROM users WHERE active = true'
 *   }}
 * />
 * ```
 */

export function DatabaseNodeComponent({ data }: NodeProps<DatabaseNode>) {
  const colorMap = {
    postgres: '#336791',
    mysql: '#00758f',
    mongodb: '#13aa52',
  };

  return (
    <div className="workflow-node action-node">
      <Handle type="target" position={Position.Top} />

      <div className="node-header">
        <div
          className="node-icon"
          style={{
            background: colorMap[data.dbType] + '20',
            color: colorMap[data.dbType],
          }}
        >
          <FaDatabase />
        </div>
        <span className="node-title">{data.label}</span>
      </div>

      <div className="node-config">
        <div className="config-item">
          <span className="config-key">BD:</span>
          <span className="config-value">{data.dbType}</span>
        </div>
        {data.query && (
          <div className="config-item">
            <span className="config-key">Query:</span>
            <span className="config-value">
              {data.query.substring(0, 20)}...
            </span>
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
```

### Paso 3: Registrar en Index

Edita `src/nodes/index.ts`:

```typescript
import { DatabaseNodeComponent } from './DatabaseNode';

export const nodeTypes = {
  // ... nodos existentes
  database: DatabaseNodeComponent, // ← Agregar aquí
} satisfies NodeTypes;
```

### Paso 4: Agregar al Sidebar

Edita `src/components/Sidebar.tsx`:

```typescript
const NODE_TEMPLATES: NodeTemplate[] = [
  // ... otros templates
  {
    id: 'database-query',
    label: 'Query Base de Datos',
    type: 'database',
    description: 'Ejecuta queries SQL o NoSQL',
    icon: <FaDatabase />,
    category: 'Bases de Datos',
  },
];
```

---

## 🔐 Sistema de Credenciales

### Usar Credenciales en Nodos

```typescript
import { CredentialManager } from '../utils/credentialManager';

// En tu componente
const credentials = CredentialManager.getByProvider('openai');

if (!credentials || credentials.length === 0) {
  console.warn('No hay credenciales configuradas para OpenAI');
}

const selected = credentials[0];
const apiKey = selected.apiKey;

// Usar para llamadas a API
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
  },
});
```

### Agregar Nuevo Proveedor

Edita `src/utils/credentialManager.ts`:

```typescript
export const API_KEY_TEMPLATES = {
  // ... templates existentes
  supabase: {
    name: 'Supabase API Key',
    placeholder: 'eyJ...',
    url: 'https://app.supabase.com/account/tokens',
  },
};

export const OAUTH_CONFIGS = {
  // ... configs existentes
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    scopes: ['repo', 'gist'],
  },
};
```

---

## 🌐 Integración de APIs

### Crear Cliente HTTP Personalizado

Crea `src/utils/apiClient.ts`:

```typescript
import axios from 'axios';
import { CredentialManager } from './credentialManager';

/**
 * Cliente HTTP para realizar llamadas a APIs externas
 * Maneja automáticamente credenciales y errores
 */

export class APIClient {
  static async request(
    method: string,
    url: string,
    data?: any,
    provider?: string,
    credentialId?: string
  ) {
    try {
      const headers: Record<string, string> = {};

      // Agregar credencial si se proporciona
      if (provider && credentialId) {
        const credential = CredentialManager.getCredential(credentialId);
        if (credential?.apiKey) {
          headers['Authorization'] = `Bearer ${credential.apiKey}`;
        }
      }

      const response = await axios({
        method,
        url,
        data,
        headers,
        timeout: 30000,
      });

      return response.data;
    } catch (error) {
      console.error(`Error calling API: ${url}`, error);
      throw new Error(`API Error: ${error.message}`);
    }
  }

  // Métodos específicos
  static get(url: string, credentialId?: string) {
    return this.request('GET', url, undefined, undefined, credentialId);
  }

  static post(url: string, data: any, credentialId?: string) {
    return this.request('POST', url, data, undefined, credentialId);
  }
}
```

### Usar en Nodos

```typescript
import { APIClient } from '../utils/apiClient';

// En tu nodo
const result = await APIClient.post(
  'https://api.openai.com/v1/chat/completions',
  {
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  },
  credentialId
);
```

---

## 📝 Generación de Código

### Mejorar el Generador

Edita `src/utils/codeGenerator.ts` para soportar nuevos nodos:

```typescript
private generateNodeCode(node: AppNode): string {
  const data = node.data as any;
  let code = `  // ${data.label}\n`;

  switch (node.type) {
    case 'database':
      code += `  const result_${node.id} = queryDatabase({\n`;
      code += `    dbType: '${data.dbType}',\n`;
      code += `    query: '${data.query}'\n`;
      code += `  });\n`;
      break;

    // ... otros tipos
  }

  return code;
}

// Agregar funciones helper
private generateHelperFunctions(): string {
  let helpers = '';
  
  helpers += `function queryDatabase(config) {\n`;
  helpers += `  // Implementar conexión a BD\n`;
  helpers += `  Logger.log('Ejecutando query: ' + config.query);\n`;
  helpers += `  return [];\n`;
  helpers += `}\n\n`;

  return helpers;
}
```

---

## 🧪 Testing

### Test de Nodos

Crea `src/__tests__/nodes.test.ts`:

```typescript
import { render } from '@testing-library/react';
import { AINodeComponent } from '../nodes/AINode';

describe('AINodeComponent', () => {
  it('should render AI node with correct provider', () => {
    const { container } = render(
      <AINodeComponent
        data={{
          label: 'Test AI',
          type: 'ai',
          provider: 'openai',
          model: 'gpt-4',
          prompt: 'Test prompt',
        }}
        id="test-1"
        isConnectable={true}
      />
    );

    expect(container.textContent).toContain('OpenAI');
    expect(container.textContent).toContain('gpt-4');
  });
});
```

### Test de Code Generator

```typescript
import { WorkflowCodeGenerator } from '../utils/codeGenerator';

describe('WorkflowCodeGenerator', () => {
  it('should validate workflow correctly', () => {
    const nodes = [
      { id: '1', type: 'trigger', data: { label: 'Test' } },
      { id: '2', type: 'output', data: { label: 'End' } },
    ];
    const edges = [{ id: 'e1', source: '1', target: '2' }];

    const generator = new WorkflowCodeGenerator(nodes, edges);
    const validation = generator.validateWorkflow();

    expect(validation.valid).toBe(true);
  });
});
```

---

## 🚀 Deployment

### Variables de Entorno

Crea `.env.example`:

```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_client_id_here

# APIs
VITE_OPENAI_API_KEY=sk-...
VITE_MISTRAL_API_KEY=...
VITE_GROQ_API_KEY=gsk_...

# Backend (si aplica)
VITE_API_URL=https://api.ejemplo.com
```

### Build para Producción

```bash
npm run build
npm run preview
```

### Checklist de Deployment

- [ ] Variables de entorno configuradas
- [ ] Credenciales en servidor seguro (NO en código)
- [ ] Tests pasando
- [ ] TypeScript sin errores (`npm run build`)
- [ ] Performance optimizado (bundles pequeños)
- [ ] Error handling mejorado
- [ ] Logging configurado

---

## 📚 Recursos Útiles

- [React Flow Documentation](https://reactflow.dev/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Google Apps Script Reference](https://developers.google.com/apps-script/reference)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

## 🤝 Contribuir

### Flujo de Contribución

1. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/nombre-feature
   ```

2. **Desarrolla con commits claros:**
   ```bash
   git commit -m "feat: descripción clara del cambio"
   ```

3. **Asegúrate que no hay errores:**
   ```bash
   npm run build
   npm run lint
   ```

4. **Push y abre un PR:**
   ```bash
   git push origin feature/nombre-feature
   ```

### Convenciones de Código

- **Nombres claros:** `getUserData`, `fetchWorkflow`, `validateNode`
- **Comments en español:** Documentar funciones complejas
- **TypeScript**: Siempre tipado, no `any`
- **CSS**: Seguir estructura BEM: `.block__element--modifier`

---

## 🐛 Debugging

### Logs en Desarrollo

```typescript
// En cualquier nodo o componente
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', { nodes, edges });
}
```

### React DevTools

Usa la extensión de React DevTools para:
- Inspeccionar props
- Verificar re-renders
- Profiling de performance

### Network Tab

En DevTools (Network), verifica:
- Llamadas a APIs
- Payloads de credenciales (¡nunca loguear!)
- Performance de requests

---

## 📞 Soporte

¿Preguntas?
- Revisa los comments en el código
- Consulta la documentación oficial de dependencias
- Abre un issue en GitHub

---

**¡Feliz desarrollo!** 🚀
