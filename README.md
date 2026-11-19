
# Inventario de Repuestos de Motocicletas

**Trabajo práctico:** Aplicación web CRUD desarrollada con IA
**Seminario:** Gestión de Software Ágil asistido por Inteligencia Artificial
# Inventario de Repuestos de Motocicletas

**Trabajo práctico:** Aplicación web CRUD desarrollada con IA
**Seminario:** Gestión de Software Ágil asistido por Inteligencia Artificial
**Autor:** JUAN DAVID GARZON MENDEZ 

## Tabla de contenido

1. [Descripción](#descripción)
2. [Funcionalidades](#funcionalidades)
3. [Modelo de datos](#modelo-de-datos)
4. [Validaciones](#validaciones)
5. [Tecnologías utilizadas](#tecnologías-utilizadas)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Instrucciones para ejecutar](#instrucciones-para-ejecutar)
8. [Casos de prueba](#casos-de-prueba)
9. [Capturas de pantalla](#capturas-de-pantalla)
10. [Prompts utilizados](#prompts-utilizados)
11. [Explicación del CRUD](#explicación-del-crud)
12. [Video explicativo](#video-explicativo)
13. [Uso responsable de la IA](#uso-responsable-de-la-ia)

## Descripción

Este proyecto es una aplicación web de **inventario de repuestos de motocicletas**, pensada para un taller que necesita llevar el control de lo que tiene en bodega: qué repuestos hay, de qué categoría son, cuántas unidades quedan y en qué estado se encuentran (Disponible, Bajo stock o Agotado).

La aplicación implementa un **CRUD completo** (Create, Read, Update, Delete) que se ejecuta íntegramente en el navegador. No necesita servidor ni base de datos: la información se guarda en el `localStorage` del navegador, por lo que los datos siguen ahí aunque se recargue la página o se cierre el navegador.

Fue desarrollada como trabajo práctico del seminario **Gestión de Software Ágil asistido por Inteligencia Artificial**, usando prompts de IA para generar el código base y luego mejorarlo con nuevas funcionalidades. El código está dividido en dos archivos: `index.html` (estructura e interfaz) y `app.js` (toda la lógica), organizado en funciones pequeñas con nombres descriptivos y comentarios en español.

### Diseño de la interfaz

- Estilo de dashboard minimalista, limpio y 100% responsivo (se adapta a celular, tableta y computador) construido con Tailwind CSS.
- **Encabezado** con el título, un contador dinámico de repuestos registrados y el botón "Exportar JSON".
- **Formulario** para registrar y editar repuestos, con validación HTML5. El botón "Cancelar" permanece oculto hasta que se entra en modo edición.
- **Listado** con barra de búsqueda en tiempo real, filtro por categoría, botón "Limpiar filtros" y una tabla con los botones "Editar" y "Eliminar" por cada fila.
- **Estado vacío** amigable cuando no hay repuestos para mostrar.
- **Notificaciones Toast** flotantes en la esquina inferior derecha para confirmar cada acción o avisar de un error, sin usar `alert()` nativos.
- Etiquetas de color según el estado: verde (Disponible), amarillo (Bajo stock) y rojo (Agotado).

## Funcionalidades

| Acción | Qué hace |
|---|---|
| **Create** | Agrega un repuesto validando campos vacíos, cantidades negativas y nombres duplicados. Genera un ID único con `Date.now()`, guarda el registro y limpia el formulario. |
| **Read** | Muestra los repuestos en una tabla responsiva, con búsqueda en tiempo real, filtro por categoría y contador total. |
| **Update** | Carga el registro en el formulario, cambia el botón a "Actualizar Registro", muestra "Cancelar" y sobrescribe los datos conservando el ID original. |
| **Delete** | Pide confirmación antes de borrar el repuesto y actualiza la tabla. |
| **Buscar y filtrar** | La búsqueda por texto (nombre, categoría o estado) y el filtro por categoría funcionan juntos. "Limpiar filtros" reinicia ambos. |
| **Exportar** | Descarga los datos actuales en un archivo `repuestos.json`. |
| **Persistencia** | Todos los cambios se guardan automáticamente en `localStorage`. La primera vez que se abre, se precargan 3 repuestos de ejemplo. |

## Modelo de datos

Cada repuesto es un objeto con esta estructura:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | Número | Identificador único generado con `Date.now()` |
| `nombre` | Texto | Nombre o código del repuesto (no se puede repetir) |
| `categoria` | Texto | Frenos, Motor, Transmisión, Eléctrico, Suspensión o Llantas |
| `cantidad` | Número | Unidades en inventario (entero, mayor o igual a 0) |
| `estado` | Texto | Disponible, Bajo stock o Agotado |

Ejemplo de un registro guardado:

```json
{
  "id": 1,
  "nombre": "Pastillas de freno delanteras",
  "categoria": "Frenos",
  "cantidad": 25,
  "estado": "Disponible"
}
```

Los registros se almacenan como un arreglo en `localStorage` bajo la clave `repuestos`.

## Validaciones

- Ningún campo puede quedar vacío.
- La cantidad no puede ser negativa.
- No se permiten nombres repetidos (sin distinguir mayúsculas de minúsculas). Al editar, el registro puede conservar su propio nombre.
- Los textos se escapan antes de mostrarse en la tabla, para evitar que se inserte HTML no deseado.
- Cada error se informa con un Toast rojo; cada acción exitosa, con un Toast verde.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de la página y formulario con validación |
| Tailwind CSS (CDN) | Estilos y diseño responsivo |
| JavaScript (ES6+) | Lógica del CRUD, filtros, validaciones y exportación |
| localStorage | Persistencia de los datos en el navegador |
| Claude | Herramienta de IA usada para generar y mejorar el código |

## Estructura del proyecto

```
├── index.html     # Estructura y estilos
├── app.js         # Lógica del CRUD
├── capturas/      # Capturas de pantalla
└── README.md
```

## Instrucciones para ejecutar

1. Descarga el repositorio desde GitHub (botón **Code → Download ZIP**) o clónalo con `git clone` usando la URL del repositorio.
2. Asegúrate de que `index.html` y `app.js` estén en la misma carpeta.
3. Abre `index.html` en el navegador (doble clic). No requiere instalar nada ni levantar un servidor.
4. Se necesita conexión a internet solo para cargar Tailwind CSS desde el CDN.

Para borrar los datos guardados y volver a los registros de ejemplo, ejecuta `localStorage.removeItem('repuestos')` en la consola del navegador (F12) y recarga la página.

## Casos de prueba

| Prueba | Resultado esperado |
|---|---|
| Abrir la app por primera vez | Aparecen 3 repuestos de ejemplo y el contador muestra 3 |
| Crear un repuesto válido | Se agrega a la tabla, el contador sube y aparece un Toast verde |
| Guardar con campos vacíos | Toast rojo "Completa todos los campos" |
| Crear con cantidad negativa | Toast rojo "La cantidad no puede ser negativa" |
| Crear un nombre que ya existe | Toast rojo "Ya existe un repuesto con ese nombre" |
| Pulsar "Editar" | El formulario se llena, el botón cambia a "Actualizar Registro" y aparece "Cancelar" |
| Actualizar un repuesto | Los cambios se reflejan en la tabla manteniendo el mismo ID |
| Pulsar "Eliminar" | Pide confirmación; al aceptar, el repuesto desaparece y el contador baja |
| Escribir en el buscador | La tabla se filtra mientras se escribe |
| Elegir una categoría | Solo se muestran los repuestos de esa categoría |
| Usar búsqueda y categoría juntas | Se aplican ambos filtros a la vez |
| Pulsar "Limpiar filtros" | Se vacían el buscador y la categoría, y vuelve la lista completa |
| Filtrar algo que no existe | Aparece el estado vacío |
| Recargar la página | Los datos se conservan |
| Pulsar "Exportar JSON" | Se descarga `repuestos.json` con los datos actuales |

## Capturas de pantalla

| Vista | Captura |
|---|---|
# IMAGEN 4 ELIMINAR REPUESTOS<img width="1917" height="540" alt="CAPTURA 4 " src="https://github.com/user-attachments/assets/9b6551a4-97bb-40fe-a77c-b87f9f109447" />





#IMAGEN 3 EDITAR REPUESTOS
<img width="1871" height="771" alt="CAPTURA 3" src="https://github.com/user-attachments/assets/8aad5115-3746-4e8d-9ed4-db6f1d97095e" />





#IMAGEN 2 CREAR REPUESTOS
<img width="1902" height="995" alt="CAPTURA 2" src="https://github.com/user-attachments/assets/ee7f97a7-1c0e-4e80-bc9f-95ffccd9812c" />




#IMAGEN 1 PRINCIPAL

<img width="1857" height="940" alt="CAPTURA 1" src="https://github.com/user-attachments/assets/1430c112-6f27-4d54-9aa6-b1b0110b058d" />


## Prompts utilizados

### Prompt 1: Construcción inicial del CRUD

**Qué pedí:** actuar como desarrollador frontend senior y crear un CRUD sobre inventario de repuestos de motocicletas con HTML5, Tailwind por CDN y JavaScript vanilla, en `index.html`, `app.js` y `README.md`. Pedí encabezado con contador y botón "Exportar JSON", formulario con validación (nombre, categoría, cantidad, estado) y botón "Cancelar" oculto hasta editar, buscador en tiempo real, tabla con "Editar" y "Eliminar", persistencia en `localStorage` con 3 registros de ejemplo, validación de duplicados, confirmación al eliminar y notificaciones Toast sin `alert()`.

**Para qué:** obtener la base completa de la aplicación con el CRUD funcionando y el código organizado en funciones pequeñas y comentado.

**Resultado:** la IA entregó `index.html`, `app.js` y un `README.md` con el CRUD completo, las validaciones, la persistencia en `localStorage`, la exportación a JSON y los Toast. Revisé el código, lo probé en el navegador y lo subí al repositorio.

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

**Resultado:** la IA devolvió solo las partes modificadas: una barra de filtros nueva en `index.html` (buscador, select de categoría y botón "Limpiar filtros"), dos constantes nuevas en `app.js`, un cambio en la función `renderizar` para que filtre por texto y categoría a la vez, la función `limpiarFiltros` y dos eventos nuevos. Apliqué los cambios manualmente en mis archivos y comprobé que el filtro y la búsqueda funcionan combinados.

### Prompt 3: Ubicar los cambios con número de línea

**Qué pedí:** que me indicara el número de línea exacto de `index.html` y `app.js` donde debía pegar cada cambio del Prompt 2, porque no lograba encontrar los lugares en mis archivos.

**Para qué:** aplicar la mejora sin dañar el código que ya funcionaba. La IA indicó las líneas y recomendó hacer los cambios de abajo hacia arriba para que la numeración no se corriera mientras editaba.

### Prompt 4: Entender la exportación a JSON

**Qué pedí:** que me explicara qué significa que el botón "Exportar JSON" descargue un archivo con el código en formato JSON.

**Para qué:** entender qué hace la función `exportarJSON` para poder explicarla en el video con mis propias palabras. Aprendí que convierte los repuestos guardados en `localStorage` en un archivo de texto `repuestos.json` que sirve como copia de seguridad.

## Explicación del CRUD

| Función en `app.js` | Parte del CRUD | Qué hace |
|---|---|---|
| `crearRepuesto` | Create | Agrega el registro con ID único, guarda y limpia el formulario |
| `renderizar` | Read | Filtra según el buscador y la categoría, dibuja la tabla y actualiza el contador |
| `editarRepuesto` / `actualizarRepuesto` | Update | Carga los datos en el formulario y luego sobrescribe el registro conservando su ID |
| `salirModoEdicion` | Update | Devuelve el formulario al modo de crear y oculta "Cancelar" |
| `eliminarRepuesto` | Delete | Pide confirmación, borra y actualiza la tabla |
| `validar` | Validaciones | Revisa campos vacíos, negativos y duplicados |
| `limpiarFiltros` | Filtros | Reinicia el buscador y el filtro de categoría |
| `exportarJSON` | Exportar | Descarga los datos actuales como `repuestos.json` |
| `mostrarToast` | UX | Muestra la notificación temporal |
| `guardarDatos` / `cargarDatos` | Persistencia | Leen y escriben en `localStorage` |

## Video explicativo

[Enlace al video]

## Uso responsable de la IA

La IA generó la base del código y propuso las mejoras, pero yo fui responsable del resultado final:

- Revisé y probé el código en el navegador antes de subirlo.
- Apliqué manualmente en mis archivos los cambios del filtro por categoría, ubicándolos línea por línea.
- Pedí explicaciones sobre las partes que no entendía (como la exportación a JSON) para poder explicar cada función con mis propias palabras.
- Comprobé que las mejoras no rompieran lo que ya funcionaba: crear, editar, eliminar, validaciones, persistencia y exportación.
