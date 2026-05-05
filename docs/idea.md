# Idea del Proyecto — 2030 Finanzas

## ¿Qué problema resuelve?

La mayoría de las personas no sabe exactamente a dónde va su dinero cada mes. Ganan un sueldo, pagan sus gastos y al final del mes se preguntan por qué no les queda nada ahorrado. El problema no es cuánto ganan, sino que no tienen un sistema claro para distribuir su dinero desde el primer día.

**2030 Finanzas** resuelve esto aplicando automáticamente la regla financiera 50/30/20 en cuanto el usuario ingresa su sueldo mensual:

- **50%** → Gastos esenciales (alquiler, comida, transporte, facturas)
- **30%** → Gastos personales (ocio, ropa, salidas, suscripciones)
- **20%** → Ahorros (fondo de emergencia, metas personales)

En lugar de que el usuario tenga que hacer cálculos manualmente, la app los hace por él y le muestra en todo momento cuánto le queda disponible en cada categoría.

---

## Usuario objetivo

Cualquier persona que recibe un sueldo mensual y quiere tener control real sobre sus finanzas personales sin necesidad de conocimientos financieros avanzados. Especialmente útil para jóvenes que empiezan a trabajar y no tienen el hábito de gestionar su dinero.

---

## Funcionalidades principales

1. **Registro del sueldo mensual** — El usuario introduce su sueldo neto del mes y la app calcula automáticamente cuánto corresponde a cada categoría según la regla 50/30/20.

2. **Seguimiento de gastos esenciales** — El usuario puede registrar cada gasto esencial (alquiler, supermercado, transporte) y ver en tiempo real cuánto lleva gastado y cuánto le queda del 50% asignado.

3. **Seguimiento de gastos personales** — Igual que los esenciales pero para el 30% destinado a ocio y gastos no esenciales.

4. **Seguimiento de ahorros** — El usuario registra cada ingreso a su cuenta de ahorros y la app suma el total acumulado, mostrando cuánto lleva del 20% objetivo del mes.

5. **Metas de ahorro** — El usuario puede crear metas con nombre y monto objetivo (por ejemplo "Bicicleta — 300€"). Cada mes puede abonar dinero a esa meta y la app muestra el progreso hasta alcanzarla.

6. **Panel resumen** — Vista general con el estado de las tres categorías del mes actual: lo asignado, lo gastado/ahorrado y lo que queda disponible en cada una.

---

## Funcionalidades opcionales

- Historial de meses anteriores para ver la evolución financiera
- Gráfico visual del reparto 50/30/20 con barras de progreso
- Alertas cuando el usuario se acerca al límite de una categoría
- Posibilidad de personalizar los porcentajes (por ejemplo 60/20/20)
- Exportar el resumen mensual en PDF

---

## Mejoras futuras

- Conectar con APIs bancarias para importar movimientos automáticamente
- Añadir categorías personalizadas dentro de cada bloque
- Versión móvil nativa con React Native
- Sistema de notificaciones para recordar registrar gastos
- Modo pareja para gestionar finanzas compartidas

---

## Stack tecnológico

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express
- **Persistencia:** LocalStorage para preferencias, API para los datos financieros
- **Despliegue:** Vercel
