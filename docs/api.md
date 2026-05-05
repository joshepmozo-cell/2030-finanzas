# API — 2030 Finanzas

Base URL: `http://localhost:3000/api/v1`

El backend está construido con **Node.js + Express + TypeScript** y sigue una arquitectura de tres capas: routes → controllers → services.

---

## Arquitectura por capas

```
src/
├── index.ts              # Punto de entrada, configuración Express
├── config/
│   └── db.ts             # Tipos globales y almacén en memoria
├── routes/
│   ├── transactions.ts   # Define los endpoints de movimientos
│   ├── goals.ts          # Define los endpoints de metas
│   └── salary.ts         # Define los endpoints de sueldo
├── controllers/
│   ├── transactionController.ts  # Maneja HTTP, valida entrada
│   ├── goalController.ts
│   └── salaryController.ts
└── services/
    ├── transactionService.ts     # Lógica de negocio pura
    ├── goalService.ts
    └── salaryService.ts
```

**Routes** — definen qué URL responde a qué función del controller. No contienen lógica.

**Controllers** — reciben la `Request`, validan los datos de entrada y devuelven la `Response` con el código HTTP correcto. Delegan la lógica al servicio.

**Services** — contienen la lógica de negocio pura. No saben nada de HTTP. Son la única capa que toca los datos.

---

## Endpoints

### Health check

```
GET /api/health
```

Respuesta `200`:
```json
{ "status": "ok", "timestamp": "2025-05-01T10:00:00.000Z" }
```

---

### Sueldo — `/api/v1/salary`

#### GET `/api/v1/salary`
Obtiene el sueldo del mes actual.

Respuesta `200`:
```json
{
  "id": "uuid",
  "amount": 2500,
  "month": "2025-05",
  "createdAt": "2025-05-01T10:00:00.000Z"
}
```

Respuesta `404` si no hay sueldo registrado para el mes actual:
```json
{ "error": "No hay sueldo registrado para el mes actual." }
```

#### POST `/api/v1/salary`
Registra o actualiza el sueldo de un mes. Si ya existe uno para ese mes, lo sobreescribe.

Request body:
```json
{ "amount": 2500, "month": "2025-05" }
```

Respuesta `201`:
```json
{
  "id": "uuid",
  "amount": 2500,
  "month": "2025-05",
  "createdAt": "2025-05-01T10:00:00.000Z"
}
```

Respuesta `400` si los datos son inválidos:
```json
{ "error": "El mes debe tener el formato YYYY-MM (ej: 2025-05)." }
```

---

### Movimientos — `/api/v1/transactions`

#### GET `/api/v1/transactions`
Lista todos los movimientos ordenados por fecha descendente.

Query params opcionales:
- `?category=essentials` — filtra por categoría (`essentials`, `personal`, `savings`)

Respuesta `200`:
```json
[
  {
    "id": "uuid",
    "description": "Alquiler",
    "amount": 700,
    "category": "essentials",
    "date": "2025-05-01",
    "createdAt": "2025-05-01T10:00:00.000Z"
  }
]
```

#### GET `/api/v1/transactions/:id`
Obtiene un movimiento por ID.

Respuesta `200`: objeto Transaction

Respuesta `404`:
```json
{ "error": "Movimiento no encontrado." }
```

#### POST `/api/v1/transactions`
Crea un nuevo movimiento.

Request body:
```json
{
  "description": "Supermercado",
  "amount": 85,
  "category": "essentials",
  "date": "2025-05-03"
}
```

Respuesta `201`: objeto Transaction creado

Respuesta `400` si faltan campos o son inválidos:
```json
{ "error": "El importe debe ser un número mayor que 0." }
```

#### PATCH `/api/v1/transactions/:id`
Actualiza campos de un movimiento existente.

Request body (todos los campos son opcionales):
```json
{ "description": "Mercadona", "amount": 90 }
```

Respuesta `200`: objeto Transaction actualizado

Respuesta `404`:
```json
{ "error": "Movimiento no encontrado." }
```

#### DELETE `/api/v1/transactions/:id`
Elimina un movimiento.

Respuesta `200`:
```json
{ "message": "Movimiento eliminado correctamente." }
```

Respuesta `404`:
```json
{ "error": "Movimiento no encontrado." }
```

---

### Metas — `/api/v1/goals`

#### GET `/api/v1/goals`
Lista todas las metas ordenadas por fecha de creación descendente.

Respuesta `200`:
```json
[
  {
    "id": "uuid",
    "name": "Bicicleta",
    "targetAmount": 600,
    "savedAmount": 360,
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
]
```

#### GET `/api/v1/goals/:id`
Obtiene una meta por ID.

#### POST `/api/v1/goals`
Crea una nueva meta. El `savedAmount` comienza en 0 automáticamente.

Request body:
```json
{ "name": "Bicicleta", "targetAmount": 600 }
```

Respuesta `201`:
```json
{
  "id": "uuid",
  "name": "Bicicleta",
  "targetAmount": 600,
  "savedAmount": 0,
  "createdAt": "2025-05-01T10:00:00.000Z"
}
```

#### PATCH `/api/v1/goals/:id`
Actualiza el progreso de ahorro de una meta.

Request body:
```json
{ "savedAmount": 420 }
```

Respuesta `200`: objeto Goal actualizado

#### DELETE `/api/v1/goals/:id`
Elimina una meta.

Respuesta `200`:
```json
{ "message": "Meta eliminada correctamente." }
```

---

## Códigos HTTP utilizados

| Código | Significado | Cuándo se usa |
|---|---|---|
| `200` | OK | GET exitoso, DELETE exitoso, PATCH exitoso |
| `201` | Created | POST exitoso — recurso creado |
| `400` | Bad Request | Datos de entrada inválidos o incompletos |
| `404` | Not Found | El recurso solicitado no existe |
| `500` | Internal Server Error | Error inesperado del servidor |

---

## Instalar y ejecutar el servidor

```bash
cd server
npm install
npm run dev
```

El servidor arranca en `http://localhost:3000`