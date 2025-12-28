# Workflow Editor - Editor Visual de Flujos de Trabajo

Un editor visual profesional estilo **n8n** para crear, diseñar y ejecutar flujos de trabajo automatizados con integraciones de IA, APIs REST, Google Workspace y más.

## ✨ Características

### Core Features
- 🎨 **Interfaz Profesional** - Diseño inspirado en n8n con tema oscuro/claro
- 🔗 **Drag & Drop** - Crear flujos arrastrando nodos del sidebar
- 🤖 **Multi-Model AI** - OpenAI, Google Gemini, Mistral, Groq (gratis), HuggingFace
- 🔑 **Gestor de Credenciales** - Almacenamiento seguro de OAuth2 y API keys
- 🌐 **HTTP Request Node** - Llamadas REST a cualquier API externa
- 📊 **Google Workspace** - Integración con Sheets, Docs, Gmail, Calendar
- 💾 **Generador de Código** - Convierte flujos visuales a Google Apps Script
- ✅ **Validación** - Detecta errores en la configuración del flujo

### Nodos Disponibles

| Nodo | Descripción | Color |
|------|-------------|-------|
| **Trigger** | Punto de inicio del flujo | Azul (#4e7cff) |
| **Action** | Google Sheets/Docs/Gmail/Calendar | Verde (#00a870) |
| **AI** | Procesamiento con IA multi-modelo | Naranja |
| **HTTP Request** | Llamadas REST (GET, POST, PUT, DELETE, PATCH) | Dinámico |
| **Conditional** | Lógica IF/THEN para bifurcaciones | Naranja (#ff9f43) |
| **Script** | Código JavaScript personalizado | Púrpura (#a855f7) |
| **Output** | Finalización del flujo | Rojo (#ef4444) |

## 🚀 Quick Start

### Instalación

```bash
# Clonar y configurar
git clone <repo-url>
cd cho
npm install

# Crear archivo .env con tus API keys
cp .env.example .env
# Editar .env con tus credenciales
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo en http://localhost:5173
npm run dev

# Compilar para producción
npm run build

# Probar build en producción
npm run preview
```

## 🏗️ Arquitectura

### Stack Tecnológico

- **Frontend**: React 18 + TypeScript 5
- **Flujos**: @xyflow/react 12.5 (visual flow engine)
- **Estado**: Zustand (lightweight state management)
- **Build**: Vite 5 + esbuild
- **UI**: react-icons + Custom CSS (n8n inspired)
- **HTTP**: axios

### Estructura del Proyecto

```
src/
├── components/          # Componentes React principales
│   ├── Sidebar.tsx      # Paleta de nodos draggables
│   ├── Toolbar.tsx      # Barra de herramientas
│   ├── CredentialsModal.tsx  # Gestor de credenciales
│   ├── CodeModal.tsx    # Visor de código generado
│   └── ValidationModal.tsx   # Validación de flujos
│
├── nodes/               # Componentes de nodos (8 tipos)
│   ├── TriggerNode.tsx
│   ├── ActionNode.tsx
│   ├── AINode.tsx       # ⭐ Multi-modelo IA
│   ├── HTTPRequestNode.tsx  # ⭐ REST API
│   ├── ConditionalNode.tsx
│   ├── ScriptNode.tsx
│   ├── OutputNode.tsx
│   └── types.ts         # Tipos TypeScript compartidos
│
├── edges/               # Conexiones entre nodos
│   └── AnimatedEdge.tsx # Edge con animación y labels
│
├── utils/               # Utilidades
│   ├── credentialManager.ts   # OAuth2 + API key storage
│   ├── codeGenerator.ts       # Workflow → Google Apps Script
│   └── apiClient.ts           # Cliente HTTP
│
├── store.ts             # Estado global (Zustand)
├── App.tsx              # Componente principal
└── styles/              # 7 archivos CSS profesionales
```

### Paleta de Colores (n8n Inspired)

```
Primary Blue:     #4e7cff  (Triggers, GET requests)
Primary Green:    #00a870  (Actions, POST requests)
Primary Orange:   #ff9f43  (Conditionals, PUT requests)
Primary Purple:   #a855f7  (Scripts, PATCH requests)
Primary Red:      #ef4444  (Output, DELETE requests)
Dark BG:          #1e1e1e  (Base)
Light BG:         #f5f6f7  (Cards, Panels)
```

## 📚 Documentación

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía completa de desarrollo
  - Crear nuevos nodos
  - Integrar APIs
  - Testing y deployment
  
- **[README_WORKFLOW.md](./README_WORKFLOW.md)** - Referencia de funcionalidades
  
- **[.env.example](./.env.example)** - Plantilla de variables de ambiente

## 🔐 Sistema de Credenciales

El proyecto incluye un **CredentialManager** que soporta:

### Proveedores de IA Soportados

```javascript
// OpenAI
{
  provider: 'openai',
  name: 'Mi OpenAI Key',
  apiKey: 'sk-...',
  models: ['gpt-4', 'gpt-3.5-turbo']
}

// Google Gemini
{
  provider: 'gemini',
  name: 'Mi Gemini Key',
  apiKey: 'AIza...',
  models: ['gemini-pro']
}

// Mistral AI
{
  provider: 'mistral',
  name: 'Mi Mistral Key',
  apiKey: 'mistral-...',
  models: ['mistral-large']
}

// Groq (GRATIS)
{
  provider: 'groq',
  name: 'Mi Groq Key',
  apiKey: 'gsk-...',
  models: ['mixtral-8x7b-32768']
}

// HuggingFace
{
  provider: 'huggingface',
  name: 'Mi HF Token',
  apiKey: 'hf-...',
  models: ['mistral-7b']
}
```

### Almacenamiento

- **Desarrollo**: localStorage (con TODO para server-side encryption)
- **Producción**: Se recomienda implementar servidor backend con:
  - Encriptación de credenciales
  - Autenticación segura
  - Auditoría de acceso

## 📖 Ejemplos de Uso

### Ejemplo 1: Automatizar envío de emails a Google Sheets

```
Trigger (Email recibido)
    ↓
Action (Google Sheets: Agregar fila)
    ↓
AI Node (OpenAI: Resumir email)
    ↓
Output (Log resultado)
```

### Ejemplo 2: Procesamiento con IA + REST API

```
Trigger (Webhook)
    ↓
AI Node (Gemini: Analizar texto)
    ↓
HTTP Request (POST a API externa)
    ├→ TRUE: Action (Guardar en DB)
    └→ FALSE: Output (Error)
```

### Ejemplo 3: Flujo condicional con Scripts

```
Trigger (Evento)
    ↓
Script (Transformar datos)
    ↓
Conditional (¿Es válido?)
    ├→ TRUE: AI (Mistral: Procesamiento)
    └→ FALSE: Output (Rechazar)
```

## 🛠️ Desarrollo

### Crear un Nuevo Nodo

Ver [CONTRIBUTING.md - Crear Nuevos Nodos](./CONTRIBUTING.md#crear-nuevos-nodos) para guía completa con ejemplos de código.

**Pasos rápidos:**

1. Crear `src/nodes/MyNode.tsx`
2. Exportar en `src/nodes/index.ts`
3. Registrar tipo en `NodeType` union
4. Agregar a `NODE_TEMPLATES` en `Sidebar.tsx`

### Extender el Generador de Código

Editar `src/utils/codeGenerator.ts` para agregar soporte a nuevos tipos de nodos.

### Integraciones Recomendadas

Próximas a implementar:
- [ ] Nodo Database (PostgreSQL, MySQL, MongoDB)
- [ ] Nodo Transform (JSON mapping, filtering)
- [ ] Nodo Loop/Iterator
- [ ] Integración Slack/Discord
- [ ] Integración Stripe/Payment
- [ ] Ejecutor real de workflows (backend)

## 🧪 Testing

```bash
# Ejecutar tests (cuando se implemente)
npm run test

# Coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Recomendado)

```bash
vercel link
vercel deploy
```

### Docker

```bash
docker build -t workflow-editor .
docker run -p 3000:5173 workflow-editor
```

### Configuración Backend (Recomendada)

Para producción, implementar:
1. API server (Node.js/Python/Go)
2. Base de datos (PostgreSQL/MongoDB)
3. Encriptación de credenciales
4. Job queue para ejecución de workflows
5. Webhooks y triggers

## 📄 Licencia

[Ver LICENSE](./LICENSE)

## 🤝 Contribuciones

Ver [CONTRIBUTING.md](./CONTRIBUTING.md) para guía completa de desarrollo.

## 📞 Soporte

- 📖 Documentación: Ver archivos en `/docs` y archivos `.md`
- 🐛 Issues: Crear issue en el repositorio
- 💬 Discussions: Usar GitHub Discussions

---

**Última actualización**: 2024  
**Estado**: ✅ Desarrollo Activo - Funcionalidad Core Completada
