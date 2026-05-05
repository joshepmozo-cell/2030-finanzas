# Formularios — 2030 Finanzas

La aplicación usa **formularios controlados** de React: cada campo tiene su valor vinculado a un estado (`useState`) y se actualiza mediante el evento `onChange`. Esto permite controlar en todo momento el valor de cada input, aplicar validaciones en tiempo real y mostrar mensajes de error.

---

## Formularios controlados

Un formulario controlado es aquel donde React es la única fuente de verdad del valor de cada campo. El input no guarda su propio valor — lo recibe de un estado de React:

```tsx
// ❌ No controlado — el DOM guarda el valor
<input type="text" />

// ✅ Controlado — React guarda el valor
const [description, setDescription] = useState('')
<input
  type="text"
  value={description}
  onChange={e => setDescription(e.target.value)}
/>
```

---

## TransactionForm

**Archivo:** `src/components/transactions/TransactionForm.tsx`

Formulario para registrar un nuevo movimiento (gasto o ahorro).

### Campos

| Campo | Tipo | Validaciones |
|---|---|---|
| Descripción | `text` | Obligatorio, mínimo 2 caracteres |
| Importe | `number` | Obligatorio, mayor que 0, máximo 100.000 € |
| Categoría | `select` | Obligatorio (esenciales, personal, ahorros) |
| Fecha | `date` | Obligatorio |

### Estado interno

```tsx
const [description, setDescription] = useState('')
const [amount, setAmount]           = useState('')
const [category, setCategory]       = useState<Category>(defaultCategory)
const [date, setDate]               = useState(today)
const [errors, setErrors]           = useState<FormErrors>({})
const [loading, setLoading]         = useState(false)
const [success, setSuccess]         = useState(false)
```

### Validación

La validación se ejecuta al intentar enviar el formulario mediante una función pura `validate()` que recibe los valores de los campos y devuelve un objeto con los mensajes de error:

```tsx
interface FormErrors {
  description?: string
  amount?: string
  date?: string
}

function validate(fields): FormErrors {
  const errors: FormErrors = {}

  if (!fields.description.trim())
    errors.description = 'La descripción es obligatoria.'
  else if (fields.description.trim().length < 2)
    errors.description = 'Mínimo 2 caracteres.'

  if (!fields.amount)
    errors.amount = 'El importe es obligatorio.'
  else if (Number(fields.amount) <= 0)
    errors.amount = 'Debe ser un número mayor que 0.'

  if (!fields.date)
    errors.date = 'La fecha es obligatoria.'

  return errors
}
```

Si el objeto tiene alguna clave, la validación ha fallado y se cancela el envío:

```tsx
const validationErrors = validate({ description, amount, date })
if (Object.keys(validationErrors).length > 0) {
  setErrors(validationErrors)
  return // No se envía el formulario
}
```

### Limpieza de errores en tiempo real

Los errores desaparecen en cuanto el usuario empieza a corregir el campo, sin esperar a reenviar:

```tsx
onChange={e => {
  setDescription(e.target.value)
  if (errors.description) setErrors(p => ({ ...p, description: undefined }))
}}
```

### Mensajes de confirmación y error

- **Éxito:** banner verde "✅ Movimiento guardado correctamente." que aparece al completar el envío
- **Error de servidor:** se muestra en el campo descripción si la llamada a la API falla
- **Loading:** el botón cambia a "Guardando..." y se deshabilita mientras se envía

### Estilos dinámicos según estado del campo

El borde del input cambia de color según si hay error o no:

```tsx
const fieldClass = (hasError?: string) =>
  `w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:ring-red-300'   // error → rojo
      : 'border-gray-200 focus:ring-blue-300'  // ok → azul
  }`
```

---

## GoalForm

**Archivo:** `src/components/goals/GoalForm.tsx`

Formulario para crear una nueva meta de ahorro.

### Campos

| Campo | Tipo | Validaciones |
|---|---|---|
| Nombre | `text` | Obligatorio, mínimo 2 caracteres |
| Monto objetivo | `number` | Obligatorio, mayor que 0, máximo 1.000.000 € |

### Ayuda dinámica

Mientras el usuario escribe el monto objetivo, aparece automáticamente una estimación de cuántos meses tardará en alcanzarlo ahorrando 100 €/mes:

```tsx
{targetAmount && Number(targetAmount) > 0 && (
  <p className="text-gray-400 text-xs mt-1">
    Ahorrando 100 €/mes lo conseguirías en ~{Math.ceil(Number(targetAmount) / 100)} meses
  </p>
)}
```

---

## Flujo completo de un formulario

```
Usuario rellena campos
        ↓
Usuario pulsa "Guardar"
        ↓
handleSubmit() se ejecuta
        ↓
validate() comprueba todos los campos
        ↓
    ¿Hay errores?
   /           \
 Sí            No
  ↓             ↓
setErrors()   setLoading(true)
muestra       llama a onSubmit()
mensajes           ↓
                ¿API ok?
               /        \
             Sí          No
              ↓           ↓
          resetForm()  setErrors()
          setSuccess() mensaje error
```

---

## Buenas prácticas aplicadas

**`noValidate` en el form** — desactiva la validación nativa del navegador para usar solo la de React, que permite mensajes personalizados y control total del flujo:

```tsx
<form onSubmit={handleSubmit} noValidate>
```

**Función de validación separada** — la lógica de validación está en una función pura independiente del componente. Esto la hace testeable y reutilizable:

```tsx
// Fácil de testear:
const errors = validate({ description: '', amount: '0', date: '' })
// → { description: 'obligatorio', amount: 'mayor que 0' }
```

**Props tipadas con TypeScript** — las interfaces garantizan que los datos que salen del formulario son siempre del tipo correcto antes de llegar a la API:

```tsx
interface TransactionFormData {
  description: string
  amount: number     // number, no string
  category: Category
  date: string
}
```

**Reset automático** — el formulario se limpia después de enviarse con éxito, listo para el siguiente movimiento sin recargar la página.