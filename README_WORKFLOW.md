# Workflow Editor - Editor Visual de Workflows

Un editor visual de workflows **tipo Zapier/Make** construido con **React Flow**, diseñado para crear flujos de trabajo visuales que se convierten automáticamente en código **Google Apps Script**.

## 🚀 Características

- ✅ **Editor Visual Drag-and-Drop**: Arrastra nodos desde la barra lateral al canvas
- ✅ **5 Tipos de Nodos**:
  - **Triggers**: Puntos de inicio (Email, Formularios, Eventos programados)
  - **Acciones**: Integración con Google Apps (Sheets, Docs, Gmail, Calendar)
  - **Condicionales**: Lógica IF/THEN para ramificación
  - **Scripts**: Código personalizado JavaScript
  - **Output**: Punto final del workflow

- ✅ **Conexiones Dinámicas**: Une nodos con líneas animadas
- ✅ **Generador de Código**: Convierte el workflow visual a Google Apps Script
- ✅ **Validación**: Verifica la integridad del workflow
- ✅ **Interfaz Moderna**: Diseño limpio con componentes personalizados
- ✅ **Estado Global**: Gestión de estado con Zustand

## 📋 Requisitos

- Node.js 16+
- npm o yarn
- (Opcional) Cuenta de Google para ejecutar scripts en Apps Script

## 🔧 Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd cho

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:5173`

## 📖 Uso

### 1. Crear un Workflow

1. **Abre la aplicación** en el navegador
2. **Nombra tu workflow** en el campo "Nombre del workflow" en la barra superior
3. **Arrastra nodos** desde la barra lateral izquierda:
   - Comienza con un **Trigger** (punto de inicio)
   - Agrega **Acciones** (Google Apps)
   - Opcionalmente agrega **Condicionales** o **Scripts**
   - Termina con **Output** (fin del flujo)

### 2. Conectar Nodos

1. Haz clic y arrastra desde el punto verde de un nodo
2. Suelta sobre el punto rojo de otro nodo
3. Se creará una conexión animada entre ellos

### 3. Validar Workflow

1. Haz clic en el botón **"Validar"** en la barra superior
2. Un modal mostrará si el workflow está correcto o qué errores tiene

### 4. Generar Código

1. Haz clic en **"Código"** en la barra superior
2. Se abrirá un modal con el código Google Apps Script generado
3. Copia el código con el botón **"Copiar Código"**

### 5. Ejecutar Código en Google Apps Script

1. Ve a [Google Apps Script](https://script.google.com)
2. Crea un nuevo proyecto
3. Pega el código generado
4. Ejecuta la función principal
5. Autoriza los permisos necesarios

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Sidebar.tsx      # Barra lateral con nodos arrastrables
│   ├── Toolbar.tsx      # Barra de herramientas superior
│   ├── CodeModal.tsx    # Modal para mostrar código generado
│   └── ValidationModal.tsx # Modal de validación
├── nodes/               # Componentes de nodos
│   ├── TriggerNode.tsx  # Nodo disparador
│   ├── ActionNode.tsx   # Nodo de acción
│   ├── ConditionalNode.tsx # Nodo condicional
│   ├── ScriptNode.tsx   # Nodo de script
│   ├── OutputNode.tsx   # Nodo de salida
│   ├── types.ts         # Tipos TypeScript para nodos
│   └── index.ts         # Exportaciones y nodos iniciales
├── edges/               # Componentes de conexiones
│   ├── AnimatedEdge.tsx # Edge personalizado con animación
│   └── index.ts         # Exportaciones de edges
├── styles/              # Archivos CSS
│   ├── app.css          # Estilos principales
│   ├── nodes.css        # Estilos de nodos
│   ├── edges.css        # Estilos de conexiones
│   ├── sidebar.css      # Estilos de barra lateral
│   ├── toolbar.css      # Estilos de barra superior
│   └── modal.css        # Estilos de modales
├── utils/               # Utilidades
│   └── codeGenerator.ts # Generador de código GAS
├── store.ts             # Store global con Zustand
├── App.tsx              # Componente principal
├── main.tsx             # Entrada de la aplicación
└── index.css            # Estilos globales
```

## 🎨 Tipos de Nodos

### Trigger (Disparador)
```typescript
{
  id: 'trigger-1',
  type: 'trigger',
  data: {
    label: 'Email Recibido',
    type: 'trigger',
    description: 'Se dispara cuando llega un email',
    outputs: ['to', 'subject', 'body']
  }
}
```

### Action (Acción)
```typescript
{
  id: 'action-1',
  type: 'action',
  data: {
    label: 'Google Sheets - Agregar Fila',
    type: 'action',
    description: 'Agrega una fila a una hoja',
    config: { spreadsheet: 'Mi Sheet' },
    inputs: ['data'],
    outputs: ['id']
  }
}
```

### Conditional (Condicional)
```typescript
{
  id: 'cond-1',
  type: 'conditional',
  data: {
    label: 'Si/Entonces',
    type: 'conditional',
    description: 'Rama el flujo según una condición'
  }
}
```

### Script (Script Personalizado)
```typescript
{
  id: 'script-1',
  type: 'script',
  data: {
    label: 'Script Personalizado',
    type: 'script',
    code: 'const result = input * 2;'
  }
}
```

### Output (Salida)
```typescript
{
  id: 'output-1',
  type: 'output',
  data: {
    label: 'Fin del Workflow',
    type: 'output'
  }
}
```

## 💻 Código Generado

El sistema genera código Google Apps Script con la siguiente estructura:

```javascript
/**
 * Workflow: Mi Workflow
 * Generated by Workflow Editor
 * 2024-01-15T10:30:00.000Z
 */

function MiWorkflow() {
  // Obtener información de disparo
  const trigger = getTriggerData();
  const email = trigger.email;
  const subject = trigger.subject;

  // Google Sheets - Agregar Fila
  const result_action_1 = executeGoogleSheetsAgregarFila({
    data: email
  });
  const id = result_action_1.id;

  return { status: 'success' };
}

function getTriggerData() {
  // Obtener datos del disparo
  return {};
}

function executeGoogleSheetsAgregarFila(inputs) {
  // Implementar acción: Google Sheets - Agregar Fila
  Logger.log('Ejecutando: Google Sheets - Agregar Fila');
  return {};
}
```

## 🔄 Flujo de Trabajo Típico

```
Trigger (Email) → Action (Google Sheets) → Output
      ↓                    ↓
   Extrae datos        Agrega fila        Finaliza
                       con datos
```

## 🛠️ Personalización

### Agregar Nuevo Tipo de Nodo

1. Crea el componente en `src/nodes/`:
```tsx
// src/nodes/CustomNode.tsx
export function CustomNodeComponent({ data }: NodeProps<CustomNode>) {
  return (
    <div className="workflow-node">
      {/* Contenido */}
    </div>
  );
}
```

2. Agrega el tipo en `src/nodes/types.ts`:
```typescript
export type CustomNode = Node<WorkflowNodeData, 'custom'>;
export type AppNode = /* ... */ | CustomNode;
```

3. Registra en `src/nodes/index.ts`:
```typescript
export const nodeTypes = {
  custom: CustomNodeComponent,
  // ... otros tipos
} satisfies NodeTypes;
```

4. Agrega a la plantilla en `src/components/Sidebar.tsx`:
```typescript
{
  id: 'custom-1',
  label: 'Mi Nodo Personalizado',
  type: 'custom',
  description: 'Descripción',
  icon: <FaIcon />,
  category: 'Personalizado',
}
```

## 📦 Dependencias

- **@xyflow/react** - Librería de flujos visuales
- **react** - Librería de UI
- **zustand** - Gestión de estado
- **react-icons** - Iconos
- **axios** - Cliente HTTP (preparado para integración con API)

## 🚀 Próximas Mejoras

- [ ] Persistencia de workflows en base de datos
- [ ] Integración directa con Google Apps Script API
- [ ] Más tipos de triggers y acciones
- [ ] Editor visual de propiedades de nodos
- [ ] Historial de cambios (undo/redo)
- [ ] Exportar/Importar workflows en JSON
- [ ] Ejecución en tiempo real con preview
- [ ] Librerías de workflows reutilizables
- [ ] Sistema de usuarios y permisos

## 📝 Licencia

MIT

## 👤 Autor

[Tu Nombre]

---

## 💡 Ejemplo Completo: Email a Google Sheets

1. **Crea trigger**: "Email Recibido"
2. **Agrega acción**: "Google Sheets - Agregar Fila"
3. **Configura**: mapea `email.remitente` → `hoja.columnaA`
4. **Valida**: Haz clic en "Validar"
5. **Genera código**: Haz clic en "Código"
6. **Ejecuta**: Copia en Google Apps Script y ejecuta

El workflow automáticamente agregará cada email recibido a tu hoja de cálculo.

---

¿Necesitas ayuda? Revisa la documentación de [React Flow](https://reactflow.dev) para más detalles sobre el editor visual.
