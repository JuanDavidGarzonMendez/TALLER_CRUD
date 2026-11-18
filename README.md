# Inventario de Repuestos de Motocicletas

Aplicación web CRUD para gestionar el inventario de repuestos de un taller. Funciona 100% en el navegador y guarda los datos en `localStorage`.

## Funcionalidades

- **Crear** repuestos con validación (sin campos vacíos, sin cantidades negativas, sin nombres duplicados).
- **Leer** el listado en una tabla responsiva con búsqueda en tiempo real y contador de registros.
- **Actualizar** un repuesto existente conservando su ID.
- **Eliminar** con confirmación previa.
- **Exportar** los datos actuales a un archivo `repuestos.json`.
- Notificaciones tipo Toast en lugar de `alert()`.
- Precarga de 3 registros de ejemplo la primera vez que se abre.

## Tecnologías

- HTML5 semántico
- Tailwind CSS (vía CDN)
- JavaScript Vanilla (ES6+)
- `localStorage` para la persistencia

## Estructura

```
├── index.html   # Estructura y estilos
├── app.js       # Lógica del CRUD
└── README.md
```

## Ejecución

1. Descarga los tres archivos en la misma carpeta.
2. Abre `index.html` en el navegador (doble clic). No requiere servidor ni instalación.
3. Se necesita conexión a internet solo para cargar Tailwind desde el CDN.

## Notas

Para borrar los datos guardados y volver a los ejemplos, ejecuta `localStorage.removeItem('repuestos')` en la consola del navegador y recarga la página.
