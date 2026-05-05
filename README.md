# 2030 Finanzas

Aplicación web fullstack para gestionar tus finanzas personales aplicando automáticamente la regla 50/30/20. Introduce tu sueldo mensual y la app distribuye tu dinero en gastos esenciales, gastos personales y ahorros, permitiéndote registrar movimientos y crear metas de ahorro.

---

## Demo

> URL del frontend desplegado en Vercel: *(se añadirá al completar el despliegue)*

---

## Tablero de gestión

Seguimiento del proyecto en Trello:
[https://trello.com/b/sUrdjF9Z/2030-finanzas](https://trello.com/b/sUrdjF9Z/2030-finanzas)

---

## Funcionalidades

- Registro del sueldo mensual con cálculo automático 50/30/20
- Seguimiento de gastos esenciales, personales y ahorros
- Metas de ahorro con progreso visual
- Panel resumen del mes actual
- Reglas de distribución personalizables

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS |
| Routing | React Router v6 |
| Backend | Node.js + Express |
| Bundler | Vite |
| Despliegue | Vercel |

---

## Instalación y uso local

### Requisitos

- Node.js 18 o superior
- npm 9 o superior

### Frontend

```bash
# Instalar dependencias
npm install

# Iniciar en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:5173`

### Backend

```bash
# Entrar a la carpeta del servidor
cd server

# Instalar dependencias
npm install

# Iniciar el servidor
npm run dev
```

La API estará disponible en `http://localhost:3000`

---

## Estructura del proyecto

```
2030-finanzas/
├── docs/                    # Documentación del proyecto
│   ├── agile.md             # Metodologías Agile, Scrum y Kanban
│   ├── idea.md              # Idea, usuario objetivo y funcionalidades
│   ├── project-management.md# Organización con Trello
│   ├── design.md            # Arquitectura y decisiones técnicas
│   ├── components.md        # Componentes React documentados
│   ├── hooks.md             # Custom hooks
│   ├── context.md           # Context API y estado global
│   ├── routing.md           # Estructura de rutas
│   ├── forms.md             # Formularios controlados
│   ├── api.md               # Endpoints del backend
│   ├── api-client.md        # Cliente de API tipado
│   ├── testing.md           # Pruebas manuales
│   └── deployment.md        # Proceso de despliegue
├── src/                     # Código fuente del frontend
│   ├── api/                 # Cliente HTTP tipado
│   ├── components/          # Componentes reutilizables
│   ├── context/             # Context API
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Páginas de la app
│   ├── types/               # Tipos e interfaces TypeScript
│   └── utils/               # Funciones de utilidad
├── server/                  # Código fuente del backend
│   └── src/
│       ├── routes/          # Definición de rutas
│       ├── controllers/     # Lógica de cada endpoint
│       ├── services/        # Lógica de negocio
│       └── config/          # Configuración del servidor
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## Documentación

Toda la documentación del proyecto está en la carpeta [`docs/`](./docs).
