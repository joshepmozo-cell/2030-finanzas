# Cliente de API — 2030 Finanzas

## Descripción

El cliente de API (`src/api/client.ts`) es la capa de red del frontend. Es la única parte de la aplicación que hace peticiones HTTP al backend. Todos los datos que vienen del servidor pasan por aquí antes de llegar a los componentes.

---

## Arquitectura

```
Componente / Hook
      ↓
  client.ts        ← única fuente de verdad para llamadas HTTP
      ↓
  Backend API      ← http://localhost:3000/api/v1
```

Ningún componente ni hook llama a `fetch` directamente — siempre usan las funciones del cliente. Esto centraliza el manejo de errores y los tipos en un solo lugar.

---

## Configuración

La URL base se configura mediante una variable de entorno:

```ts
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'
```

En desarrollo usa `http://localhost:3000/api/v1` automáticamente. En producción (Vercel) se configura la variable `VITE_API_URL` con la URL del servidor desplegado.

---

## Función base `request<T>`

Todas las funciones del cliente usan una función base genérica que:

1. Construye la URL completa
2. Añade el header `Content-Type: application/json`
3. Lanza un error si la respuesta no es `ok` (status >= 400)
4. Devuelve los datos tipados con el genérico `T`

```ts
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error en la petición')
  }

  return response.json() as Promise<T>
}
```

---

## Tipos — `src/types/api.ts`

Todos los tipos están definidos en `src/types/api.ts` y son los mismos que usa el backend, garantizando que frontend y backend hablan el mismo lenguaje:

```ts
export interface Transaction {
  id: string
  description: string
  amount: number
  category: Category
  date: string
  createdAt: string
}

export interface NewTransaction {
  description: string
  amount: number
  category: Category
  date: string
}

export interface Goal {
  id: string
  name: string
  targetAmount: number
  savedAmount: number
  createdAt: string
}

export interface Salary {
  id: string
  amount: number
  month: string
  createdAt: string
}
```

---

## Funciones disponibles

### Movimientos

| Función | Método | Endpoint | Retorna |
|---|---|---|---|
| `getTransactions(category?)` | GET | `/transactions` | `Transaction[]` |
| `getTransactionById(id)` | GET | `/transactions/:id` | `Transaction` |
| `createTransaction(data)` | POST | `/transactions` | `Transaction` |
| `updateTransaction(id, data)` | PATCH | `/transactions/:id` | `Transaction` |
| `deleteTransaction(id)` | DELETE | `/transactions/:id` | `{ message }` |

### Metas

| Función | Método | Endpoint | Retorna |
|---|---|---|---|
| `getGoals()` | GET | `/goals` | `Goal[]` |
| `getGoalById(id)` | GET | `/goals/:id` | `Goal` |
| `createGoal(data)` | POST | `/goals` | `Goal` |
| `updateGoalProgress(id, amount)` | PATCH | `/goals/:id` | `Goal` |
| `deleteGoal(id)` | DELETE | `/goals/:id` | `{ message }` |

### Sueldo

| Función | Método | Endpoint | Retorna |
|---|---|---|---|
| `getCurrentSalary()` | GET | `/salary` | `Salary` |
| `upsertSalary(data)` | POST | `/salary` | `Salary` |

---

## Los tres estados de red

El cliente lanza errores cuando algo falla. Los hooks (`useTransactions`) capturan esos errores y exponen tres estados que los componentes consumen:

```tsx
const { transactions, loading, error } = useTransactions()

// En el componente:
if (loading) return <p>Cargando...</p>
if (error)   return <p>Error: {error}</p>
return <TransactionList transactions={transactions} />
```

| Estado | Tipo | Descripción |
|---|---|---|
| `loading` | `boolean` | `true` mientras se espera la respuesta |
| `data` | `T \| null` | Los datos cuando la petición ha ido bien |
| `error` | `string \| null` | El mensaje de error si algo ha fallado |

---

## Ejemplo de uso completo

```tsx
// En un hook
import { getTransactions, createTransaction, deleteTransaction } from '../api/client'
import type { Transaction, NewTransaction, Category } from '../types/api'

export function useTransactions(category?: Category) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    getTransactions(category)
      .then(data => setTransactions(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category])

  const addTransaction = async (data: NewTransaction) => {
    const created = await createTransaction(data)
    setTransactions(prev => [created, ...prev])
  }

  const removeTransaction = async (id: string) => {
    await deleteTransaction(id)
    setTransactions(prev => prev.filter(tx => tx.id !== id))
  }

  return { transactions, loading, error, addTransaction, removeTransaction }
}
```

---

## Variable de entorno

Crea un archivo `.env` en la raíz del proyecto frontend con:

```
VITE_API_URL=http://localhost:3000/api/v1
```

En producción en Vercel, añade la variable `VITE_API_URL` con la URL del servidor desplegado.