# Testing — 2030 Finanzas

## Metodología

Las pruebas realizadas son **pruebas manuales** — se verificó el comportamiento de cada funcionalidad directamente en el navegador y en la terminal, comprobando que los resultados son los esperados.

---

## Pruebas del backend (API)

Se verificaron todos los endpoints usando el navegador y la terminal.

### Health check
| Prueba | Resultado |
|---|---|
| `GET /api/health` devuelve `{ status: 'ok' }` | ✅ |

### Sueldo
| Prueba | Resultado |
|---|---|
| `GET /api/v1/salary` sin datos devuelve 404 | ✅ |
| `POST /api/v1/salary` con `{ amount: 2500, month: "2025-05" }` devuelve 201 | ✅ |
| `POST /api/v1/salary` con amount negativo devuelve 400 | ✅ |
| `POST /api/v1/salary` con mes en formato incorrecto devuelve 400 | ✅ |

### Movimientos
| Prueba | Resultado |
|---|---|
| `GET /api/v1/transactions` devuelve array vacío inicialmente | ✅ |
| `POST /api/v1/transactions` crea movimiento y devuelve 201 | ✅ |
| `GET /api/v1/transactions?category=essentials` filtra correctamente | ✅ |
| `DELETE /api/v1/transactions/:id` elimina y devuelve 200 | ✅ |
| `DELETE /api/v1/transactions/id-inexistente` devuelve 404 | ✅ |
| `POST` sin description devuelve 400 con mensaje de error | ✅ |
| `POST` con amount negativo devuelve 400 | ✅ |

### Metas
| Prueba | Resultado |
|---|---|
| `GET /api/v1/goals` devuelve array vacío inicialmente | ✅ |
| `POST /api/v1/goals` con `{ name: "Bici", targetAmount: 600 }` devuelve 201 | ✅ |
| `PATCH /api/v1/goals/:id` actualiza savedAmount correctamente | ✅ |
| `DELETE /api/v1/goals/:id` elimina la meta | ✅ |
| `POST` con nombre de 1 carácter devuelve 400 | ✅ |

---

## Pruebas del frontend

### Navegación
| Prueba | Resultado |
|---|---|
| Navegar a `/` muestra el Dashboard | ✅ |
| Navegar a `/essentials` muestra la página de esenciales | ✅ |
| Navegar a `/personal` muestra la página de personal | ✅ |
| Navegar a `/savings` muestra la página de ahorros | ✅ |
| Navegar a `/goals` muestra la página de metas | ✅ |
| Navegar a `/ruta-inexistente` muestra la página 404 | ✅ |
| El enlace activo en la Navbar se resalta correctamente | ✅ |

### Formulario de movimientos
| Prueba | Resultado |
|---|---|
| Enviar formulario vacío muestra errores en todos los campos | ✅ |
| Descripción menor de 2 caracteres muestra error | ✅ |
| Importe negativo o cero muestra error | ✅ |
| Al corregir un campo el error desaparece | ✅ |
| Envío correcto muestra mensaje de confirmación verde | ✅ |
| El formulario se resetea tras envío exitoso | ✅ |
| El botón se deshabilita durante el envío | ✅ |

### Formulario de metas
| Prueba | Resultado |
|---|---|
| Nombre vacío muestra error | ✅ |
| Monto objetivo negativo muestra error | ✅ |
| Al escribir el monto aparece estimación de meses | ✅ |
| Meta creada correctamente aparece en la lista | ✅ |

### BudgetCard
| Prueba | Resultado |
|---|---|
| Con sueldo 2500 y regla 50/30/20 muestra 1250/750/500 | ✅ |
| Cambiar a regla 70/20/10 actualiza los valores | ✅ |
| Cuando spent > assigned el texto cambia a "Excedido" en rojo | ✅ |
| La barra de progreso se actualiza correctamente | ✅ |

### ProgressBar
| Prueba | Resultado |
|---|---|
| Con value=0 y max=100 muestra barra vacía | ✅ |
| Con value=50 y max=100 muestra barra al 50% | ✅ |
| Con value>max la barra se vuelve roja | ✅ |
| showLabel=true muestra el valor y porcentaje | ✅ |

### Modal
| Prueba | Resultado |
|---|---|
| Click en overlay cierra el modal | ✅ |
| Tecla Escape cierra el modal | ✅ |
| Click dentro del contenido no cierra el modal | ✅ |

---

## Pruebas de diseño responsive

| Dispositivo | Resultado |
|---|---|
| Desktop (1440px) — layout correcto | ✅ |
| Tablet (768px) — grid se adapta | ✅ |
| Móvil (375px) — navegación y formularios usables | ✅ |

---

## Errores encontrados y corregidos

| Error | Causa | Solución |
|---|---|---|
| El servidor no arrancaba con `Router.use() requires middleware` | Los archivos de rutas tenían caracteres invisibles por el copy-paste | Se recrearon los archivos manualmente |
| Los controllers exportaban `default` en lugar de exports nombrados | Problema al copiar los archivos | Se reescribieron los archivos directamente en VS Code |
| Errores rojos en VS Code en archivos del servidor | `tsconfig.app.json` incluía `server/src/index.ts` | Se eliminó esa línea del `include` |
| `import.meta.env` no reconocido | Faltaba `/// <reference types="vite/client" />` | Se verificó `vite-env.d.ts` |

---

## Errores de consola

Se revisó la consola del navegador (`F12 → Console`) durante las pruebas. No hay errores en tiempo de ejecución en las funcionalidades implementadas.

---

## Notas

- Las pruebas de integración completa (frontend conectado al backend) se realizarán tras el despliegue en Vercel
- El backend usa datos en memoria — al reiniciar el servidor los datos se pierden, lo cual es el comportamiento esperado en esta versión