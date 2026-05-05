# Context API — 2030 Finanzas

## ¿Qué es Context API?

Context API es una forma de React para compartir estado entre muchos componentes sin tener que pasar props a través de cada nivel del árbol. Evita el problema del **prop drilling**: cuando un valor necesita pasar por componentes intermedios que no lo usan.

En 2030 Finanzas, el sueldo y la regla de distribución se necesitan en múltiples páginas (Dashboard, Esenciales, Personal, Ahorros). Con Context API, en lugar de pasar el sueldo como prop desde la App raíz hasta cada página, cada página accede directamente al contexto.

---

## ¿Cuándo usar Context API?

Context es útil para estado que:

- **Se comparte entre muchos componentes** — sueldo, preferencias, autenticación, tema
- **Raramente cambia** — o cambia por acciones del usuario, no por cada render
- **No es temporal** — no es estado de un modal o input de un formulario

Context **no es** para:

- Estado local de un componente (usar `useState`)
- Datos que cambian muy frecuentemente (causan renders innecesarios)
- Lógica compleja que precisa de reducers (usar Context + useReducer o Redux)

---

## BudgetContext

### Estructura

El contexto contiene:

```tsx
interface BudgetContextType {
  // Estado
  salary: number                              // Sueldo mensual actual
  rule: '50/30/20' | '70/20/10' | 'custom'   // Regla de distribución
  allocation: BudgetAllocation                // Importes calculados
  percentages: BudgetAllocation               // Porcentajes activos

  // Acciones
  updateSalary: (amount: number) => void
  updateRule: (newRule: Rule) => void
  updateCustomPercentages: (values: BudgetAllocation) => void
}
```

### BudgetProvider

El Provider es el componente que envuelve la app y proporciona el contexto a todos sus hijos.

```tsx
import { BudgetProvider } from './context/BudgetContext'

function App() {
  return (
    <BudgetProvider initialSalary={2500}>
      {/* Todas las páginas aquí pueden acceder al contexto */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/essentials" element={<EssentialsPage />} />
          {/* ... más rutas */}
        </Routes>
      </Router>
    </BudgetProvider>
  )
}
```

El `initialSalary` es opcional (por defecto 0). Se pasa al hook `useBudget` que está dentro del Provider.

---

## Consumir el contexto

### Hook personalizado: `useBudgetContext`

En lugar de usar directamente `useContext`, usamos un hook personalizado `useBudgetContext` que incluye:

1. **Acceso automático** — no necesitas pasar el contexto como parámetro
2. **Error checking** — si lo uses fuera de un Provider, lanza un error claro

```tsx
import { useBudgetContext } from '../context/BudgetContext'

function DashboardPage() {
  const { salary, allocation, updateSalary } = useBudgetContext()

  return (
    <div>
      <h1>Sueldo: {salary} €</h1>
      <p>Esenciales: {allocation.essentials} €</p>
      <input
        type="number"
        onChange={e => updateSalary(Number(e.target.value))}
      />
    </div>
  )
}
```

Si intentas usar `useBudgetContext` fuera del Provider:

```
Error: useBudgetContext debe usarse dentro de un BudgetProvider
```

---

## Ejemplo completo: mostrar el sueldo en múltiples páginas

Sin Context API:

```tsx
// App.tsx
function App() {
  const [salary, setSalary] = useState(0)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage salary={salary} setSalary={setSalary} />} />
        <Route path="/essentials" element={<EssentialsPage salary={salary} />} />
        <Route path="/personal" element={<PersonalPage salary={salary} />} />
        {/* ... more routes */}
      </Routes>
    </Router>
  )
}

// DashboardPage.tsx
function DashboardPage({ salary, setSalary }) {
  return <input onChange={e => setSalary(Number(e.target.value))} />
}

// EssentialsPage.tsx
function EssentialsPage({ salary }) {
  return <p>Presupuesto: {salary * 0.5}</p>
}
```

Con Context API:

```tsx
// App.tsx
function App() {
  return (
    <BudgetProvider initialSalary={0}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/essentials" element={<EssentialsPage />} />
          <Route path="/personal" element={<PersonalPage />} />
          {/* ... más rutas */}
        </Routes>
      </Router>
    </BudgetProvider>
  )
}

// DashboardPage.tsx
function DashboardPage() {
  const { salary, updateSalary } = useBudgetContext()
  return <input onChange={e => updateSalary(Number(e.target.value))} />
}

// EssentialsPage.tsx
function EssentialsPage() {
  const { allocation } = useBudgetContext()
  return <p>Presupuesto: {allocation.essentials}</p>
}
```

**Ventajas:**
- No hay "prop drilling" — no pasar props a través de componentes intermedios
- Cada página accede directamente lo que necesita
- Si añades una nueva página, no necesitas tocar el componente App
- El código es más limpio y escalable

---

## Casos de uso en la aplicación

### Dashboard — mostrar estado general

```tsx
function DashboardPage() {
  const { salary, allocation, percentages } = useBudgetContext()
  
  return (
    <div>
      <SalaryForm />
      <div className="grid grid-cols-3 gap-4">
        <BudgetCard category="essentials" assigned={allocation.essentials} spent={...} />
        <BudgetCard category="personal" assigned={allocation.personal} spent={...} />
        <BudgetCard category="savings" assigned={allocation.savings} spent={...} />
      </div>
    </div>
  )
}
```

### SalaryForm — actualizar el sueldo desde cualquier página

```tsx
function SalaryForm() {
  const { salary, rule, updateSalary, updateRule } = useBudgetContext()

  return (
    <form>
      <input
        type="number"
        value={salary}
        onChange={e => updateSalary(Number(e.target.value))}
        placeholder="Introduce tu sueldo"
      />
      <select value={rule} onChange={e => updateRule(e.target.value as Rule)}>
        <option>50/30/20</option>
        <option>70/20/10</option>
        <option>Custom</option>
      </select>
    </form>
  )
}
```

### Página de Ahorros — validar límite de la categoría

```tsx
function SavingsPage() {
  const { allocation } = useBudgetContext()
  const { transactions } = useTransactions('savings')
  const spent = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <div>
      <p>Objetivo mensual: {allocation.savings} €</p>
      <p>Ahorrado: {spent} €</p>
      <ProgressBar value={spent} max={allocation.savings} color="green" />
    </div>
  )
}
```

---

## Ventajas y desventajas

### Ventajas

✅ Evita prop drilling — no pasar props a través de componentes intermedios  
✅ Componentes independientes — cada página accede lo que necesita  
✅ Fácil de actualizar — cambiar el estado desde cualquier lugar  
✅ TypeScript — el contexto está tipado, autocomplete en el IDE  

### Desventajas

❌ Renders innecesarios — si el contexto es grande, todos los consumidores se re-renderizan aunque solo use parte del estado  
❌ Debugging — puede ser difícil seguir de dónde viene un valor  
❌ Overkill para estado simple — si solo una página usa un valor, use `useState`

Para proyectos donde la lógica crece mucho, se considera usar reducers (`useReducer`) o librerías como Redux o Zustand.