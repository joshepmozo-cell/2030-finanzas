# Hooks — 2030 Finanzas

La aplicación usa hooks de React tanto nativos (`useState`, `useEffect`, `useMemo`, `useCallback`) como hooks personalizados que encapsulan lógica reutilizable.

---

## Hooks nativos de React

### `useState`

Gestiona estado local dentro de un componente o hook. Se usa para:

- Guardar el sueldo mensual introducido por el usuario
- Controlar si un modal está abierto o cerrado
- Almacenar la lista de transacciones y metas
- Gestionar los estados de red: `loading`, `error` y `data`

```tsx
const [isOpen, setIsOpen] = useState(false)
const [salary, setSalary] = useState(0)
const [loading, setLoading] = useState(false)
```

---

### `useEffect`

Ejecuta efectos secundarios después del render. En esta app se usa principalmente para:

- Cargar datos de la API cuando un componente se monta
- Volver a cargar datos cuando cambia un parámetro (por ejemplo, la categoría)
- Registrar y limpiar event listeners (como el listener del teclado en el Modal)

```tsx
useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await getTransactions(category)
      setTransactions(data)
    } catch {
      setError('Error al cargar datos.')
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [category]) // Se re-ejecuta solo si cambia category
```

El array de dependencias es clave: si está vacío `[]` el efecto solo se ejecuta al montar. Si incluye variables, se re-ejecuta cada vez que alguna de ellas cambia.

---

### `useMemo`

Memoriza el resultado de un cálculo para no repetirlo en cada render. Se usa cuando el cálculo es costoso o cuando se quiere garantizar estabilidad referencial.

En esta app se usa para:

- Calcular la distribución del sueldo (evita recalcular si el sueldo no ha cambiado)
- Calcular el total de transacciones
- Calcular los totales agrupados por categoría

```tsx
const allocation = useMemo(() => ({
  essentials: (salary * percentages.essentials) / 100,
  personal:   (salary * percentages.personal)   / 100,
  savings:    (salary * percentages.savings)     / 100,
}), [salary, percentages]) // Solo recalcula si salary o percentages cambian
```

---

### `useCallback`

Memoriza una función para que no se recree en cada render. Especialmente útil cuando la función se pasa como prop a un componente hijo o aparece en el array de dependencias de otro hook.

```tsx
const addTransaction = useCallback(async (data: NewTransaction) => {
  const created = await createTransaction(data)
  setTransactions(prev => [created, ...prev])
}, []) // La función nunca cambia porque no depende de ningún estado externo
```

Sin `useCallback`, cada render crearía una nueva referencia de la función, lo que provocaría renders innecesarios en los componentes hijos que la reciben como prop.

---

## Custom hooks

### `useBudget`

**Archivo:** `src/hooks/useBudget.ts`

Gestiona el sueldo mensual y calcula automáticamente cuánto dinero corresponde a cada categoría según la regla de distribución activa.

**Qué encapsula:**
- Estado del sueldo (`salary`)
- Regla activa (`rule`: `'50/30/20'`, `'70/20/10'` o `'custom'`)
- Porcentajes personalizados cuando la regla es `'custom'`
- Cálculo memorizado de los importes por categoría (`allocation`)
- Funciones estables para actualizar cada valor

**Retorna:**

| Valor | Tipo | Descripción |
|---|---|---|
| `salary` | `number` | Sueldo mensual actual |
| `rule` | `Rule` | Regla de distribución activa |
| `allocation` | `BudgetAllocation` | Importes calculados por categoría |
| `percentages` | `BudgetAllocation` | Porcentajes activos |
| `updateSalary` | `(n: number) => void` | Actualiza el sueldo |
| `updateRule` | `(r: Rule) => void` | Cambia la regla |
| `updateCustomPercentages` | `(v) => void` | Actualiza porcentajes custom |

**Ejemplo de uso:**
```tsx
const { salary, allocation, updateSalary, updateRule } = useBudget()

// En un formulario:
<input
  type="number"
  onChange={e => updateSalary(Number(e.target.value))}
/>

// En una tarjeta de presupuesto:
<BudgetCard
  category="essentials"
  assigned={allocation.essentials}
  spent={totalsByCategory.essentials}
/>
```

**Por qué es un custom hook:** Centraliza una lógica de cálculo que se necesita en múltiples páginas (Dashboard, Esenciales, Personal, Ahorros). Sin este hook, habría que duplicar los mismos `useState` y `useMemo` en cada página.

---

### `useTransactions`

**Archivo:** `src/hooks/useTransactions.ts`

Gestiona la lista de movimientos: los carga de la API, permite añadir y eliminar, y calcula totales.

**Parámetro opcional:**
- `category?: 'essentials' | 'personal' | 'savings'` — si se pasa, filtra los movimientos por categoría

**Retorna:**

| Valor | Tipo | Descripción |
|---|---|---|
| `transactions` | `Transaction[]` | Lista de movimientos cargados |
| `loading` | `boolean` | `true` mientras se carga |
| `error` | `string \| null` | Mensaje de error si falla la petición |
| `total` | `number` | Suma total de los movimientos |
| `totalsByCategory` | `Record<Category, number>` | Totales agrupados por categoría |
| `addTransaction` | `(data) => Promise<void>` | Crea un movimiento nuevo |
| `removeTransaction` | `(id) => Promise<void>` | Elimina un movimiento |

**Ejemplo de uso:**
```tsx
// En la página de gastos esenciales (filtrado por categoría)
const { transactions, loading, error, total, addTransaction, removeTransaction } =
  useTransactions('essentials')

// En el Dashboard (todos los movimientos, con totales por categoría)
const { totalsByCategory } = useTransactions()
```

**Por qué es un custom hook:** Encapsula los tres estados de red (loading, data, error) y la lógica de actualización optimista del estado local tras cada operación. Cualquier página puede reutilizarlo sin duplicar el `useEffect` de carga ni las llamadas a la API.