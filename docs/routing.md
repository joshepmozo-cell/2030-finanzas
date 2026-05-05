# Rutas y navegación — 2030 Finanzas

## Configuración de React Router

La navegación de la app está configurada con **React Router v6** en el archivo `src/App.tsx`:

```tsx
<BrowserRouter as Router>
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/essentials" element={<EssentialsPage />} />
    <Route path="/personal" element={<PersonalPage />} />
    <Route path="/savings" element={<SavingsPage />} />
    <Route path="/goals" element={<GoalsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</Router>
```

---

## Estructura de rutas

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `DashboardPage` | Panel resumen del mes actual |
| `/essentials` | `EssentialsPage` | Seguimiento de gastos esenciales (50%) |
| `/personal` | `PersonalPage` | Seguimiento de gastos personales (30%) |
| `/savings` | `SavingsPage` | Seguimiento de ahorros (20%) |
| `/goals` | `GoalsPage` | Gestión de metas de ahorro |
| `*` (cualquier otra) | `NotFoundPage` | Página 404 |

---

## Páginas

### DashboardPage — `/`

**Propósito:** Panel resumen general de la aplicación.

**Funcionalidades:**
- Entrada del sueldo mensual
- Selector de regla de distribución (50/30/20, 70/20/10, personalizada)
- Tres tarjetas BudgetCard mostrando estado de cada categoría
- Lista de últimos movimientos registrados
- Botón para añadir movimiento rápido

**Hooks que usa:**
- `useBudgetContext()` — para leer y actualizar sueldo y regla
- `useTransactions()` — para obtener todos los movimientos del mes

---

### EssentialsPage — `/essentials`

**Propósito:** Gestión de gastos esenciales (alquiler, comida, transporte, etc.)

**Funcionalidades:**
- Tarjeta BudgetCard de esenciales
- Lista de todos los movimientos en esta categoría
- Botón para añadir nuevo gasto esencial
- Botón de eliminar para cada movimiento

**Hooks que usa:**
- `useBudgetContext()` — para leer el presupuesto asignado (50%)
- `useTransactions('essentials')` — filtra solo movimientos de esenciales

**Diferencia con Dashboard:** Esta página solo muestra movimientos de una categoría. El usuario puede estar más enfocado en gestionar sus gastos de necesidades.

---

### PersonalPage — `/personal`

**Propósito:** Gestión de gastos personales (ocio, ropa, suscripciones, etc.)

**Funcionalidades:**
- Tarjeta BudgetCard de personal
- Lista de movimientos en esta categoría
- Botón para añadir nuevo gasto personal
- Botón de eliminar para cada movimiento

**Hooks que usa:**
- `useBudgetContext()` — presupuesto asignado (30%)
- `useTransactions('personal')` — filtra movimientos de personal

---

### SavingsPage — `/savings`

**Propósito:** Seguimiento del ahorro acumulado y comparación con el objetivo.

**Funcionalidades:**
- Tres tarjetas de resumen: saldo actual, objetivo mensual, progreso
- Barra de progreso visual hacia el objetivo
- Historial de registros de ahorro
- Botón para registrar nuevo ingreso/retiro de ahorros

**Hooks que usa:**
- `useBudgetContext()` — presupuesto asignado (20%)
- `useTransactions('savings')` — todos los movimientos de ahorros

**Nota:** A diferencia de Essentials y Personal (que son gastos negativos), en Savings los movimientos son ingresos positivos (ahorros).

---

### GoalsPage — `/goals`

**Propósito:** Crear y gestionar metas de ahorro a largo plazo.

**Funcionalidades:**
- Grid de tarjetas GoalCard mostrando cada meta
- Barra de progreso para cada meta
- Estimación de meses para alcanzar la meta
- Botón para crear nueva meta
- Botón para eliminar meta

**Estado:**
- Actualmente usa datos mock (hardcodeados)
- En el paso 12 se conectará a la API real

**Ejemplo de metas:**
- Bicicleta — €600 (60% guardado)
- Vacaciones — €1.500 (30% guardado)
- Fondo de emergencia — €5.000 (80% guardado)

---

### NotFoundPage — `*`

**Propósito:** Mostrar página amigable cuando el usuario accede a una ruta inexistente.

**Contenido:**
- Mensaje "404 — Página no encontrada"
- Enlace para volver al Dashboard

---

## Navegación

### Navbar — Barra de navegación

El componente `Navbar` está presente en todas las páginas (dentro de `Layout`) y proporciona links a todas las rutas principales.

```tsx
<Navbar />
```

**Enlaces:**
- Resumen → `/`
- Esenciales → `/essentials`
- Personal → `/personal`
- Ahorros → `/savings`
- Metas → `/goals`

El componente usa `NavLink` de React Router, que aplica automáticamente una clase `active` al enlace de la página actual.

```tsx
<NavLink
  to="/essentials"
  className={({ isActive }) =>
    isActive ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
  }
>
  Esenciales
</NavLink>
```

---

## Estructura de carpetas

```
src/
├── App.tsx                    # Configuración de rutas
├── pages/
│   ├── DashboardPage.tsx
│   ├── EssentialsPage.tsx
│   ├── PersonalPage.tsx
│   ├── SavingsPage.tsx
│   ├── GoalsPage.tsx
│   └── NotFoundPage.tsx
├── components/
│   └── layout/
│       ├── Navbar.tsx
│       └── Layout.tsx
```

---

## Navegación programática

Para navegar desde un componente sin usar un enlace, se usa el hook `useNavigate` de React Router:

```tsx
import { useNavigate } from 'react-router-dom'

function SomeComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    // Realizar alguna acción...
    navigate('/essentials')  // Ir a la página de esenciales
  }

  return <button onClick={handleClick}>Ir a esenciales</button>
}
```

---

## Flujo de navegación típico

```
Dashboard (/)
    ↓
Usuario introduce sueldo
    ↓
Usuario ve resumen de 3 categorías
    ↓
Usuario elige una: Essentials → /essentials
    ↓
EssentialsPage
    ↓
Usuario añade gasto → Modal
    ↓
Vuelta a EssentialsPage con nuevo movimiento listado
```

---

## Layout y estructura de páginas

Todas las páginas siguen el mismo patrón:

1. **Navbar** — navegación principal (automática en Layout)
2. **Contenido principal:**
   - Título de la página (`<h1>`)
   - Tarjetas de resumen o presupuesto
   - Listas de movimientos
   - Botones de acción
3. **Modales** — para formularios de nuevo movimiento/meta

Ejemplo genérico:

```tsx
export default function SomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Título</h1>
      
      {/* Tarjetas de resumen */}
      <BudgetCard ... />
      
      {/* Listado */}
      <TransactionList ... />
      
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="...">
        <TransactionForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}
```