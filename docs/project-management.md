# Gestión del proyecto — 2030 Finanzas

## Herramienta utilizada

Para organizar el desarrollo de este proyecto he usado **Trello**, una herramienta de gestión de tareas basada en tableros Kanban. Es gratuita, visual y permite mover tarjetas entre columnas según el estado de cada tarea, lo que facilita ver de un vistazo en qué punto está el proyecto.

Enlace al tablero: [https://trello.com/b/sUrdjF9Z/2030-finanzas](https://trello.com/b/sUrdjF9Z/2030-finanzas)

---

## Estructura del tablero

El tablero está dividido en cinco columnas que representan el ciclo de vida de cada tarea:

| Columna | Descripción |
|---|---|
| **Backlog** | Todas las funcionalidades e ideas pendientes de planificar |
| **Por hacer** | Tareas seleccionadas para el sprint o semana actual |
| **En progreso** | Tareas que están siendo desarrolladas en este momento |
| **En revisión** | Tareas terminadas que necesitan revisión o prueba antes de cerrarse |
| **Hecho** | Tareas completamente terminadas y verificadas |

---

## Tarjetas principales

Cada funcionalidad del proyecto tiene su propia tarjeta en el tablero. Las tarjetas actuales son:

**Configuración inicial**
- Configurar proyecto Vite + React + TypeScript ✅
- Instalar y configurar Tailwind CSS
- Crear estructura de carpetas

**Funcionalidades principales**
- Registro de sueldo mensual
- Cálculo automático 50/30/20
- Seguimiento gastos esenciales
- Seguimiento gastos personales
- Seguimiento de ahorros
- Metas de ahorro
- Panel resumen

Cada tarjeta puede dividirse en subtareas técnicas usando la checklist interna de Trello: por ejemplo, la tarjeta "Registro de sueldo mensual" incluye subtareas como crear el componente de formulario, definir el tipo TypeScript, conectar con el contexto global y escribir la función de cálculo.

---

## Cómo estoy organizando el trabajo

Trabajo de forma iterativa, similar a mini-sprints de una semana:

1. Al inicio de cada semana muevo tarjetas del **Backlog** a **Por hacer**, priorizando las funcionalidades que desbloquean otras.
2. Cuando empiezo a trabajar en una tarea la muevo a **En progreso**. Solo tengo una o dos tarjetas ahí a la vez para evitar dispersión.
3. Al terminar el desarrollo la muevo a **En revisión**, donde la pruebo manualmente en el navegador.
4. Si todo funciona correctamente, pasa a **Hecho**.

Este flujo me ayuda a no perder el hilo del proyecto y a tener siempre claro cuál es la siguiente tarea a abordar.

---

## Relación con metodologías ágiles

La organización del tablero sigue los principios de **Kanban**: visualización del trabajo, limitación de tareas en curso y flujo continuo. Sin embargo, también incorporo elementos de **Scrum** al planificar por semanas y revisar el progreso al final de cada una.

Esta combinación (a veces llamada Scrumban) se adapta bien al desarrollo individual porque mantiene la estructura sin añadir una burocracia excesiva para un equipo de una sola persona.