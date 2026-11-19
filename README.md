# Inventario de Repuestos de Motocicletas

**Trabajo práctico:** Aplicación web CRUD desarrollada con IA
**Seminario:** Gestión de Software Ágil asistido por Inteligencia Artificial
**Autor:** [Tu nombre]

## Tabla de contenido

1. [Descripción](#descripción)
2. [Funcionalidades](#funcionalidades)
3. [Tecnologías utilizadas](#tecnologías-utilizadas)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Instrucciones para ejecutar](#instrucciones-para-ejecutar)
6. [Capturas de pantalla](#capturas-de-pantalla)
7. [Prompts utilizados](#prompts-utilizados)
8. [Explicación del CRUD](#explicación-del-crud)
9. [Video explicativo](#video-explicativo)
10. [Uso responsable de la IA](#uso-responsable-de-la-ia)

## Descripción

Aplicación web para gestionar el inventario de repuestos de un taller de motocicletas. Permite registrar, consultar, editar y eliminar repuestos desde el navegador, sin servidor ni base de datos: los datos se guardan en `localStorage`.

## Funcionalidades

| Acción | Qué hace |
|---|---|
| **Create** | Agrega un repuesto validando campos vacíos, cantidades negativas y nombres duplicados. Genera un ID con `Date.now()`. |
| **Read** | Muestra los repuestos en una tabla responsiva, con búsqueda en tiempo real, filtro por categoría y contador total. |
| **Update** | Carga el registro en el formulario, cambia el botón a "Actualizar Registro" y conserva el ID original. |
| **Delete** | Pide confirmación antes de borrar. |
| **Extras** | Exportar a JSON, notificaciones Toast (sin `alert()`), estado vacío y 3 registros de ejemplo en la primera carga. |

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la página y formulario con validación |
| Tailwind CSS (CDN) | Estilos y diseño responsivo |
| JavaScript (ES6+) | Lógica del CRUD |
| localStorage | Persistencia de los datos |
| Claude | Herramienta de IA usada para generar y mejorar el código |

## Estructura del proyecto

```
├── index.html     # Estructura y estilos
├── app.js         # Lógica del CRUD
├── capturas/      # Capturas de pantalla
└── README.md
```

## Instrucciones para ejecutar

1. Clona o descarga el repositorio:
   ```
   git clone https://github.com/[usuario]/[repositorio].git
   ```
2. Abre `index.html` en el navegador (doble clic). No requiere instalar nada.
3. Se necesita internet solo para cargar Tailwind desde el CDN.

Para volver a los datos de ejemplo, ejecuta `localStorage.removeItem('repuestos')` en la consola del navegador y recarga.

## Capturas de pantalla

| Vista | Captura |
|---|---|
| Pantalla principal con datos | ![Principal](capturas/principal.png) |
| Crear un repuesto | ![Crear](capturas/crear.png) |
| Modo edición | ![Editar](capturas/editar.png) |
| Confirmación al eliminar | ![Eliminar](capturas/eliminar.png) |
| Búsqueda en tiempo real | ![Buscar](capturas/buscar.png) |
| Filtro por categoría | ![Filtro](capturas/filtro.png) |
| Notificación Toast | ![Toast](capturas/toast.png) |

## Prompts utilizados

### Prompt 1: Construcción inicial del CRUD

**Qué pedí:** actuar como desarrollador frontend senior y crear un CRUD sobre inventario de repuestos de motocicletas con HTML5, Tailwind por CDN y JavaScript vanilla, en `index.html`, `app.js` y `README.md`. Pedí encabezado con contador y botón "Exportar JSON", formulario con validación (nombre, categoría, cantidad, estado) y botón "Cancelar" oculto hasta editar, buscador en tiempo real, tabla con "Editar" y "Eliminar", persistencia en `localStorage` con 3 registros de ejemplo, validación de duplicados, confirmación al eliminar y notificaciones Toast sin `alert()`.

**Para qué:** obtener la base completa de la aplicación con el CRUD funcionando y el código organizado en funciones pequeñas y comentado.

### Prompt 2: Filtro por categoría y botón "Limpiar filtros"

**Qué pedí:**

> Tengo una aplicación CRUD de inventario de repuestos de motocicletas hecha con HTML5, Tailwind CSS (CDN) y JavaScript vanilla, con persistencia en localStorage. Te pego abajo mi index.html y mi app.js.
>
> Quiero agregar esta mejora: un select de filtro por categoría junto al buscador, que funcione combinado con la búsqueda en tiempo real, y un botón "Limpiar filtros" que reinicie ambos.
>
> Reglas:
> - No cambies lo que ya funciona (CRUD, validaciones, localStorage, toasts, exportar JSON).
> - Mantén funciones pequeñas con nombres descriptivos y comentarios en español.
> - No uses librerías nuevas.
> - Devuélveme solo las partes modificadas de index.html y app.js, indicando en qué parte del archivo va cada cambio.

**Para qué:** que el usuario pueda encontrar repuestos más rápido cuando el inventario crece, combinando el texto de búsqueda con una categoría específica (por ejemplo, solo "Frenos" que contengan "pastillas").

**Resultado:** [Describe qué te devolvió la IA y qué ajustaste tú]

## Explicación del CRUD

| Función en `app.js` | Parte del CRUD | Qué hace |
|---|---|---|
| `crearRepuesto` | Create | Agrega el registro con ID único, guarda y limpia el formulario |
| `renderizar` | Read | Filtra según el buscador y la categoría, dibuja la tabla y actualiza el contador |
| `editarRepuesto` / `actualizarRepuesto` | Update | Carga los datos en el formulario y luego sobrescribe el registro conservando su ID |
| `eliminarRepuesto` | Delete | Pide confirmación, borra y actualiza la tabla |
| `validar` | Validaciones | Revisa campos vacíos, negativos y duplicados |
| `limpiarFiltros` | UX | Reinicia el buscador y el filtro de categoría |
| `mostrarToast` | UX | Muestra la notificación temporal |
| `guardarDatos` / `cargarDatos` | Persistencia | Leen y escriben en `localStorage` |

## Video explicativo

[Enlace al video]

## Uso responsable de la IA

La IA generó la base del código, pero lo revisé, lo probé y puedo explicar cada parte. Personalicé el proyecto con los siguientes cambios propios:

- [Cambio 1, por ejemplo: categorías o colores que ajusté]
- [Cambio 2]
