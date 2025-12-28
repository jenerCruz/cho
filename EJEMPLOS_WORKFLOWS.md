# Ejemplos de Workflows

## 1. Automatizar Emails a Google Sheets

### Caso: Registrar cada email recibido en una hoja de cálculo

**Pasos:**
1. Trigger: "Email Recibido"
2. Action: "Google Sheets - Agregar Fila"
3. Output: "Fin del Workflow"

**Código generado:**
```javascript
function EmailAGoogleSheets() {
  // Obtener información de disparo
  const trigger = getTriggerData();
  const to = trigger.to;
  const subject = trigger.subject;
  const body = trigger.body;

  // Google Sheets - Agregar Fila
  const result_action_sheets = executeGoogleSheetsAgregarFila({
    data: to,
    subject: subject,
    body: body
  });

  return { status: 'success' };
}

function executeGoogleSheetsAgregarFila(inputs) {
  const sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([inputs.data, inputs.subject, inputs.body]);
  return { id: sheet.getLastRow() };
}
```

---

## 2. Crear Documento desde Formulario

### Caso: Cuando alguien completa un formulario, crear un documento

**Pasos:**
1. Trigger: "Envío de Formulario"
2. Action: "Google Docs - Crear Documento"
3. Output: "Fin del Workflow"

**Lógica:**
```
Formulario enviado 
    ↓
Extraer datos del formulario
    ↓
Crear documento de Google
    ↓
Rellenar datos en documento
    ↓
Fin
```

---

## 3. Workflow Condicional: Email con Filtro

### Caso: Solo procesar emails de ciertos dominios

**Pasos:**
1. Trigger: "Email Recibido"
2. Conditional: "¿Es del dominio @empresa.com?"
   - TRUE → Action: "Agregar a Sheets"
   - FALSE → Output: "Ignorar"

**Código:**
```javascript
function EmailConFiltro() {
  const trigger = getTriggerData();
  const email = trigger.to;

  if (email.includes('@empresa.com')) {
    // Rama verdadera
    const result = executeGoogleSheetsAgregarFila({ email: email });
  } else {
    // Rama falsa
    Logger.log('Email ignorado: ' + email);
  }

  return { status: 'success' };
}
```

---

## 4. Script Personalizado: Validar Datos

### Caso: Validar emails antes de guardar

**Pasos:**
1. Trigger: "Email Recibido"
2. Script: "Validar formato de email"
3. Conditional: "¿Email válido?"
   - TRUE → Action: "Guardar en Sheets"
   - FALSE → Output: "Error"

**Script personalizado:**
```javascript
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

---

## 5. Crear Evento en Calendar desde Sheets

### Caso: Leer eventos de Sheet y crearlos en Calendar

**Pasos:**
1. Trigger: "Programado (diariamente)"
2. Action: "Leer Google Sheets"
3. Loop (Script): "Para cada fila"
4. Action: "Google Calendar - Crear Evento"
5. Output: "Fin"

**Flujo:**
```
Trigger diario
    ↓
Leer hoja de cálculo
    ↓
Para cada evento:
  ├→ Crear en Calendar
  └→ Marcar como procesado
    ↓
Fin
```

---

## 6. Notificar por Email

### Caso: Enviar email cuando se agrega un registro a Sheets

**Pasos:**
1. Trigger: "Hoja modificada (Sheets)"
2. Action: "Gmail - Enviar Email"
3. Output: "Fin"

**Configuración:**
- **Para**: admin@empresa.com
- **Asunto**: "Nuevo registro: {nombre}"
- **Cuerpo**: "Se agregó un nuevo registro con datos: {datos}"

---

## 7. Workflow Complejo: Pipeline de Datos

### Caso: Email → Validar → Sheets → Calendar → Gmail

```
Email recibido
    ↓
[Script] Extraer datos y validar
    ↓
[Conditional] ¿Datos válidos?
    ├─ NO → Gmail: Notificar error → FIN
    ├─ SÍ → Google Sheets: Agregar fila
         ↓
         [Script] Crear evento desde datos
         ↓
         Google Calendar: Crear evento
         ↓
         Gmail: Confirmar creación → FIN
```

**Nodos necesarios:** 7
**Conexiones:** 8

---

## 8. Sincronizar Múltiples Servicios

### Caso: Un registro en Sheets se replica a Docs y envía email

**Pasos:**
1. Trigger: "Fila agregada a Sheets"
2. Action: "Google Docs - Agregar contenido"
3. Action: "Gmail - Enviar Email"
4. Output: "Fin"

**Archivo generado:**
```javascript
function SincronizarServicios() {
  const trigger = getTriggerData();
  
  // Agregar a Docs
  const docResult = executeGoogleDocsAgregarContenido({
    data: trigger.datos
  });
  
  // Enviar email
  const emailResult = executeGmailEnviarEmail({
    to: trigger.email,
    message: 'Se agregó: ' + trigger.datos
  });
  
  return { status: 'success' };
}
```

---

## Cómo Ejecutar Estos Ejemplos

1. **Abre** http://localhost:5173
2. **Arrastra nodos** según el ejemplo
3. **Conecta** los nodos apropiadamente
4. **Haz clic** en "Validar" para verificar
5. **Haz clic** en "Código" para ver el resultado
6. **Copia el código** a Google Apps Script
7. **Ejecuta** la función principal

---

## Tips Útiles

✅ **Siempre comienza con un Trigger**
✅ **Termina con un Output**
✅ **Usa Condicionales para lógica compleja**
✅ **Los Scripts permiten código personalizado**
✅ **Las conexiones siempre van de arriba a abajo**
✅ **Valida antes de generar código**

---

## Próximas Características (Roadmap)

- [ ] Templates de workflows pregenerados
- [ ] Biblioteca de scripts reutilizables
- [ ] Ejecución en tiempo real dentro del editor
- [ ] Debugging y logs en vivo
- [ ] Integración con APIs externas (Stripe, Slack, etc.)
- [ ] Versioning de workflows
- [ ] Compartir workflows con el equipo

