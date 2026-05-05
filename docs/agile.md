# Metodologías de desarrollo — Agile, Scrum y Kanban

## ¿Qué es Agile?

Agile es una filosofía de desarrollo de software que nació como respuesta a los problemas del modelo en cascada tradicional, donde todo el proyecto se planificaba al detalle antes de escribir una sola línea de código. El resultado de ese modelo era que, meses después, el cliente recibía un producto que ya no correspondía a lo que necesitaba.

El objetivo de Agile es construir software de forma iterativa y colaborativa: en lugar de entregar todo al final, se trabaja en ciclos cortos y se entrega valor constantemente. Esto permite detectar problemas antes, incorporar cambios sin que sean un desastre y mantener al cliente involucrado durante todo el proceso.

Los cuatro valores principales del Manifiesto Ágil (2001) son:

- Las personas y sus interacciones, por encima de los procesos y las herramientas
- El software funcionando, por encima de la documentación exhaustiva
- La colaboración con el cliente, por encima de la negociación de contratos
- Responder al cambio, por encima de seguir un plan rígido

Agile no es una metodología en sí misma, sino un paraguas bajo el que conviven varios marcos de trabajo. Los más usados son Scrum y Kanban.

---

## ¿Qué es Scrum?

Scrum es el marco de trabajo ágil más extendido en la industria. Define roles, eventos y artefactos concretos que estructuran cómo un equipo organiza y entrega su trabajo.

### Roles

- **Product Owner (PO):** Es el responsable del producto. Define qué hay que construir, prioriza las funcionalidades y representa los intereses del cliente o del negocio.
- **Scrum Master:** Es el facilitador del equipo. No es un jefe, sino la persona que elimina bloqueos, protege al equipo de interrupciones y se asegura de que se respetan las reglas de Scrum.
- **Development Team:** El equipo técnico que construye el producto. Son autoorganizados y responsables de decidir cómo implementar lo que el PO ha priorizado.

### Sprints

Un sprint es un ciclo de trabajo de duración fija, normalmente entre 1 y 4 semanas. Al inicio de cada sprint el equipo selecciona un conjunto de tareas del backlog, trabaja en ellas durante el sprint y al final entrega un incremento funcional del producto.

### Backlog

El Product Backlog es la lista ordenada de todo lo que se quiere construir. Es responsabilidad del PO mantenerla priorizada. Al inicio de cada sprint, el equipo toma los elementos más prioritarios y los pasa al Sprint Backlog, que es la lista de tareas del sprint actual.

### Eventos principales

- **Sprint Planning:** Reunión al inicio del sprint donde el equipo decide qué va a construir y cómo.
- **Daily Scrum:** Reunión diaria de 15 minutos donde cada miembro del equipo responde: ¿qué hice ayer?, ¿qué haré hoy?, ¿hay algo que me bloquea?
- **Sprint Review:** Al final del sprint, el equipo muestra lo construido al Product Owner y otros interesados para recibir feedback.
- **Sprint Retrospective:** El equipo reflexiona sobre su forma de trabajar y acuerda mejoras para el siguiente sprint.

---

## ¿Qué es Kanban?

Kanban es un método de gestión del flujo de trabajo que se basa en visualizar el trabajo en curso y limitar la cantidad de tareas que se pueden hacer al mismo tiempo. Tiene su origen en los sistemas de producción de Toyota y fue adaptado al desarrollo de software por David Anderson.

La herramienta central de Kanban es el tablero, que se divide en columnas que representan los estados por los que pasa una tarea. El ejemplo más básico es: **Pendiente → En progreso → Hecho**. Cada tarea es una tarjeta que se mueve de izquierda a derecha según avanza.

El concepto más importante de Kanban es el **WIP Limit** (Work In Progress): cada columna tiene un límite máximo de tarjetas simultáneas. Esto obliga al equipo a terminar tareas antes de empezar nuevas, evitando el problema de tener demasiadas cosas a medias.

A diferencia de Scrum, Kanban no tiene sprints ni roles fijos. El trabajo fluye de forma continua y las nuevas tareas se incorporan según la capacidad del equipo.

---

## Diferencias entre Scrum y Kanban

| Aspecto | Scrum | Kanban |
|---|---|---|
| Estructura temporal | Ciclos fijos (sprints) | Flujo continuo, sin iteraciones |
| Roles definidos | Sí (PO, Scrum Master, Dev Team) | No obligatorios |
| Planificación | Al inicio de cada sprint | Continua, según capacidad |
| Cambios durante el trabajo | No se recomienda cambiar el sprint en curso | Se pueden incorporar en cualquier momento |
| Métricas clave | Velocidad del equipo por sprint | Tiempo de ciclo, throughput |
| Mejor para | Proyectos con entregas definidas | Flujos de trabajo continuos o soporte |

---

## ¿Cuándo usar cada metodología?

**Scrum encaja mejor cuando:**
- El proyecto tiene un objetivo claro y funcionalidades definibles de antemano
- El equipo es estable y trabaja a tiempo completo en el proyecto
- Se necesita entregar incrementos regulares al cliente para recoger feedback
- Hay un Product Owner disponible para priorizar continuamente

**Kanban encaja mejor cuando:**
- El trabajo es continuo y varía constantemente (soporte, mantenimiento, bugs)
- El equipo recibe tareas de distintas fuentes sin un ritmo fijo
- No hay un cliente externo esperando entregas periódicas
- Se quiere mejorar el flujo de trabajo actual sin cambiar la estructura del equipo

En la práctica, muchos equipos combinan ambos métodos: usan sprints de Scrum para organizar el desarrollo pero incorporan el tablero visual de Kanban para gestionar las tareas del día a día. A esta combinación se la llama a veces **Scrumban**.
