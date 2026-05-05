# Componentes — 2030 Finanzas

Todos los componentes están escritos en TypeScript con props tipadas mediante interfaces. Se organizan en cuatro carpetas según su responsabilidad: `ui/`, `budget/`, `transactions/`, `goals/` y `layout/`.

---

## Componentes UI — `src/components/ui/`

Son los componentes más genéricos y reutilizables. No conocen el dominio de la aplicación.

---

### `ProgressBar`

Barra de progreso visual que cambia de color automáticamente a rojo cuando el valor supera el máximo.

**Props**

| Prop | Tipo | Requerida | Por defecto | Descripción |
|---|---|---|---|---|
| `value` | `number` | ✅ | — | Valor actual |
| `max` | `number` | ✅ | — | Valor máximo |
| `color` | `'blue' \| 'amber' \| 'green' \| 'red'` | ❌ | `'blue'` | Color de la barra |
| `showLabel` | `boolean` | ❌ | `false` | Muestra valor y porcentaje encima |

**Ejemplo de uso**
```tsx
<ProgressBar value={350} max={500} color="green" showLabel />
```

**Notas:** Si `value > max` la barra se muestra en rojo independientemente del color configurado. Incluye atributos ARIA para accesibilidad.

---

### `Badge`

Etiqueta de categoría con color semántico. Se usa junto a cada movimiento para identificar visualmente a qué categoría pertenece.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `category` | `'essentials' \| 'personal' \| 'savings'` | ✅ | Categoría del movimiento |

**Ejemplo de uso**
```tsx
<Badge category="essentials" />   // → "Esenciales" en azul
<Badge category="personal" />     // → "Personal" en ámbar
<Badge category="savings" />      // → "Ahorros" en verde
```

---

### `EmptyState`

Componente para mostrar cuando una lista no tiene datos. Opcionalmente muestra un botón de acción.

**Props**

| Prop | Tipo | Requerida | Por defecto | Descripción |
|---|---|---|---|---|
| `message` | `string` | ❌ | `'No hay datos todavía.'` | Texto a mostrar |
| `action.label` | `string` | ❌ | — | Texto del botón |
| `action.onClick` | `() => void` | ❌ | — | Función al pulsar el botón |

**Ejemplo de uso**
```tsx
<EmptyState
  message="No hay movimientos registrados todavía."
  action={{ label: '+ Añadir el primero', onClick: handleOpen }}
/>
```

---

### `Modal`

Modal genérico con overlay, cierre al pulsar fuera y cierre con la tecla Escape.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `isOpen` | `boolean` | ✅ | Controla si el modal está visible |
| `onClose` | `() => void` | ✅ | Función para cerrar el modal |
| `title` | `string` | ✅ | Título que aparece en la cabecera |
| `children` | `ReactNode` | ✅ | Contenido del modal |

**Ejemplo de uso**
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Nuevo gasto">
  <TransactionForm onSubmit={handleSubmit} />
</Modal>
```

**Notas:** Usa `useEffect` para registrar y limpiar el listener del teclado. El click en el overlay cierra el modal pero el click dentro del contenido no se propaga gracias a `stopPropagation`.

---

## Componentes de presupuesto — `src/components/budget/`

---

### `BudgetCard`

Tarjeta que muestra el estado de una categoría: cuánto está asignado, cuánto se ha gastado y cuánto resta. Incluye la `ProgressBar` internamente.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `category` | `'essentials' \| 'personal' \| 'savings'` | ✅ | Categoría a mostrar |
| `assigned` | `number` | ✅ | Importe asignado (calculado del sueldo) |
| `spent` | `number` | ✅ | Importe gastado hasta ahora |

**Ejemplo de uso**
```tsx
<BudgetCard category="essentials" assigned={1250} spent={870} />
```

**Notas:** Si `spent > assigned` el texto "Restante" cambia a "Excedido" en rojo. El porcentaje (50%, 30%, 20%) se infiere automáticamente de la categoría.

---

## Componentes de movimientos — `src/components/transactions/`

---

### `TransactionItem`

Fila individual de un movimiento. Muestra descripción, fecha, categoría con Badge y botón de eliminar opcional.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `transaction` | `Transaction` | ✅ | Objeto con los datos del movimiento |
| `onDelete` | `(id: string) => void` | ❌ | Función para eliminar el movimiento |

**Tipo `Transaction`**
```ts
interface Transaction {
  id: string
  description: string
  amount: number
  category: 'essentials' | 'personal' | 'savings'
  date: string
}
```

---

### `TransactionList`

Lista de movimientos. Si está vacía, muestra el componente `EmptyState`.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `transactions` | `Transaction[]` | ✅ | Array de movimientos |
| `onDelete` | `(id: string) => void` | ❌ | Propaga el delete a cada item |
| `onAdd` | `() => void` | ❌ | Acción del botón en el EmptyState |

**Composición:** Este componente compone `TransactionItem` y `EmptyState`, demostrando el patrón de composición de React.

---

## Componentes de metas — `src/components/goals/`

---

### `GoalCard`

Tarjeta de una meta de ahorro con barra de progreso y estimación de meses restantes.

**Props**

| Prop | Tipo | Requerida | Descripción |
|---|---|---|---|
| `goal` | `Goal` | ✅ | Objeto con los datos de la meta |
| `onDelete` | `(id: string) => void` | ❌ | Eliminar la meta |

**Tipo `Goal`**
```ts
interface Goal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
}
```

**Notas:** Cuando `savedAmount >= targetAmount` muestra "¡Meta alcanzada!" en verde en lugar de la estimación de meses.

---

## Componentes de layout — `src/components/layout/`

---

### `Navbar`

Barra de navegación principal con enlaces a todas las páginas. Usa `NavLink` de React Router para aplicar estilos al enlace activo automáticamente.

**Sin props** — obtiene las rutas de una constante interna.

**Rutas que incluye:** Resumen `/`, Esenciales `/essentials`, Personal `/personal`, Ahorros `/savings`, Metas `/goals`.