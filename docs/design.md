# Arquitectura de la aplicación — 2030 Finanzas

## Estructura de componentes

La aplicación se organiza en páginas y componentes. Cada página corresponde a una ruta y está compuesta por componentes más pequeños y reutilizables.

```
src/
├── pages/
│   ├── DashboardPage.tsx       # Panel resumen del mes
│   ├── EssentialsPage.tsx      # Gastos esenciales (50%)
│   ├── PersonalPage.tsx        # Gastos personales (30%)
│   ├── SavingsPage.tsx         # Ahorros (20%)
│   ├── GoalsPage.tsx           # Metas de ahorro
│   └── NotFoundPage.tsx        # Página 404
│
└── components/
    ├── layout/
    │   ├── Navbar.tsx           # Navegación principal
    │   └── Layout.tsx           # Wrapper con navbar + contenido
    ├── budget/
    │   ├── SalaryForm.tsx       # Formulario para introducir el sueldo
    │   ├── BudgetCard.tsx       # Tarjeta de categoría (asignado / gastado / restante)
    │   └── BudgetDonut.tsx      # Gráfico circular 50/30/20
    ├── transactions/
    │   ├── TransactionList.tsx  # Lista de movimientos
    │   ├── TransactionItem.tsx  # Fila individual de un movimiento
    │   └── TransactionForm.tsx  # Formulario para añadir movimiento
    ├── goals/
    │   ├── GoalCard.tsx         # Tarjeta de meta con barra de progreso
    │   └── GoalForm.tsx         # Formulario para crear/editar una meta
    └── ui/
        ├── ProgressBar.tsx      # Barra de progreso reutilizable
        ├── Badge.tsx            # Etiqueta de categoría
        ├── Modal.tsx            # Modal genérico
        └── EmptyState.tsx       # Estado vacío reutilizable
```

---

## Componentes reutilizables

Los siguientes componentes están diseñados para usarse en múltiples partes de la aplicación:

| Componente | Dónde se reutiliza |
|---|---|
| `BudgetCard` | Dashboard, páginas de cada categoría |
| `ProgressBar` | BudgetCard, GoalCard, SavingsPage |
| `TransactionList` / `TransactionItem` | Esenciales, Personal, Ahorros |
| `TransactionForm` | Todas las páginas de categoría |
| `Modal` | Formularios de creación en cualquier página |
| `EmptyState` | Cualquier lista sin datos |
| `Badge` | TransactionItem, GoalCard |

---

## Gestión del estado

El estado de la aplicación se divide en dos niveles:

### Estado global — Context API

Se usa un `BudgetContext` para compartir entre todas las páginas:

- El sueldo mensual actual
- La regla de distribución activa (50/30/20 u otra)
- Los montos calculados por categoría
- El mes activo seleccionado

### Estado local — useState

Cada componente gestiona su propio estado cuando los datos no son necesarios fuera de él:

- Estado de apertura/cierre de modales
- Valores de los inputs en formularios
- Estado de carga de peticiones a la API

### Datos remotos — API

Los movimientos y las metas se obtienen del backend mediante el cliente de API tipado (`src/api/client.ts`). El frontend no duplica estos datos en LocalStorage; la API es la única fuente de verdad para ellos.

---

## Diseño del backend — API REST

Base URL: `/api/v1`

### Sueldo mensual

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/salary` | Obtiene el sueldo del mes actual |
| `POST` | `/salary` | Registra o actualiza el sueldo del mes |

**Ejemplo POST `/salary`**
```json
// Request
{ "amount": 2500, "month": "2025-05" }

// Response 201
{ "id": "1", "amount": 2500, "month": "2025-05", "createdAt": "..." }
```

### Movimientos

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/transactions` | Lista todos los movimientos del mes |
| `GET` | `/transactions/:id` | Obtiene un movimiento por ID |
| `POST` | `/transactions` | Crea un nuevo movimiento |
| `PATCH` | `/transactions/:id` | Actualiza un movimiento |
| `DELETE` | `/transactions/:id` | Elimina un movimiento |

**Ejemplo POST `/transactions`**
```json
// Request
{
  "description": "Alquiler",
  "amount": 700,
  "category": "essentials",
  "date": "2025-05-01"
}

// Response 201
{
  "id": "abc123",
  "description": "Alquiler",
  "amount": 700,
  "category": "essentials",
  "date": "2025-05-01",
  "createdAt": "..."
}
```

### Metas de ahorro

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/goals` | Lista todas las metas |
| `POST` | `/goals` | Crea una nueva meta |
| `PATCH` | `/goals/:id` | Actualiza el progreso de una meta |
| `DELETE` | `/goals/:id` | Elimina una meta |

**Ejemplo POST `/goals`**
```json
// Request
{ "name": "Bicicleta", "targetAmount": 600 }

// Response 201
{ "id": "g1", "name": "Bicicleta", "targetAmount": 600, "savedAmount": 0 }
```

---

## Datos en servidor vs datos en cliente

| Datos | Dónde viven | Por qué |
|---|---|---|
| Movimientos (gastos y ahorros) | Servidor (API) | Son el núcleo de la app, deben persistir |
| Metas de ahorro | Servidor (API) | Tienen progreso acumulado entre meses |
| Sueldo mensual | Servidor (API) | Necesario para calcular los límites |
| Regla de distribución activa | LocalStorage | Preferencia de UI, no crítica |
| Preferencia de moneda | LocalStorage | Preferencia de UI, no crítica |
| Estado de modales abiertos | Estado local (useState) | Solo afecta a la UI momentáneamente |

---

## Diagrama de flujo de datos

```
┌─────────────────────────────────────────────────────┐
│                     FRONTEND                        │
│                                                     │
│  ┌──────────┐    ┌──────────────┐    ┌───────────┐ │
│  │  Pages   │◄──►│ BudgetContext│◄──►│API Client │ │
│  │          │    │  (global     │    │(src/api/  │ │
│  │Dashboard │    │   state)     │    │client.ts) │ │
│  │Essentials│    └──────────────┘    └─────┬─────┘ │
│  │Personal  │                              │        │
│  │Savings   │    ┌──────────────┐          │        │
│  │Goals     │◄──►│  Components  │          │        │
│  └──────────┘    │  (useState)  │          │        │
│                  └──────────────┘          │        │
└────────────────────────────────────────────┼────────┘
                                             │ HTTP
                                             │ fetch
┌────────────────────────────────────────────┼────────┐
│                   BACKEND                  │        │
│                                            ▼        │
│  ┌──────────┐    ┌─────────────┐    ┌───────────┐  │
│  │  Routes  │───►│ Controllers │───►│ Services  │  │
│  │/api/v1/  │    │(lógica HTTP)│    │(lógica de │  │
│  │transactions    └─────────────┘    │ negocio)  │  │
│  │goals     │                        └─────┬─────┘  │
│  │salary    │                              │        │
│  └──────────┘                        ┌─────▼─────┐  │
│                                      │   Datos   │  │
│                                      │(en memoria│  │
│                                      │ o JSON)   │  │
│                                      └───────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Arquitectura por capas del backend

El servidor sigue una arquitectura de tres capas:

- **Routes** (`server/src/routes/`): Definen los endpoints y delegan en los controllers. No contienen lógica.
- **Controllers** (`server/src/controllers/`): Reciben la request HTTP, validan los datos de entrada y llaman al servicio correspondiente. Devuelven la response con el código HTTP correcto.
- **Services** (`server/src/services/`): Contienen la lógica de negocio pura. No saben nada de HTTP. Son los responsables de calcular, filtrar y transformar los datos.

Esta separación permite testear cada capa de forma independiente y mantener el código organizado a medida que crece.