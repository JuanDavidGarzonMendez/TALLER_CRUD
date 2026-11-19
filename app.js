const CLAVE = 'repuestos';
const colores = {
  'Disponible': 'bg-green-100 text-green-700',
  'Bajo stock': 'bg-yellow-100 text-yellow-700',
  'Agotado': 'bg-red-100 text-red-700'
};

const formulario = document.getElementById('formulario');
const nombre = document.getElementById('nombre');
const categoria = document.getElementById('categoria');
const cantidad = document.getElementById('cantidad');
const estado = document.getElementById('estado');
const btnGuardar = document.getElementById('btnGuardar');
const btnCancelar = document.getElementById('btnCancelar');
const tituloForm = document.getElementById('tituloForm');
const buscador = document.getElementById('buscador');
const filtroCategoria = document.getElementById('filtroCategoria');
const btnLimpiar = document.getElementById('btnLimpiar');
const tabla = document.getElementById('tabla');
const vacio = document.getElementById('vacio');
const contador = document.getElementById('contador');

let idEditando = null;

// ---------- PERSISTENCIA ----------

// Carga los datos de localStorage; si es la primera vez, precarga 3 ejemplos
function cargarDatos() {
  const guardados = localStorage.getItem(CLAVE);
  if (guardados) return JSON.parse(guardados);
  const ejemplos = [
    { id: 1, nombre: 'Pastillas de freno delanteras', categoria: 'Frenos', cantidad: 25, estado: 'Disponible' },
    { id: 2, nombre: 'Kit de arrastre 428H', categoria: 'Transmisión', cantidad: 4, estado: 'Bajo stock' },
    { id: 3, nombre: 'Bujía NGK CR7HSA', categoria: 'Motor', cantidad: 0, estado: 'Agotado' }
  ];
  localStorage.setItem(CLAVE, JSON.stringify(ejemplos));
  return ejemplos;
}

let repuestos = cargarDatos();

// Guarda el arreglo actual en localStorage
function guardarDatos() {
  localStorage.setItem(CLAVE, JSON.stringify(repuestos));
}

// ---------- UTILIDADES ----------

// Escapa texto para evitar inyectar HTML en la tabla
function limpiar(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// Muestra una notificación temporal en la esquina inferior derecha
function mostrarToast(mensaje, tipo = 'ok') {
  const toast = document.createElement('div');
  const color = tipo === 'ok' ? 'bg-green-600' : 'bg-red-600';
  toast.className = `${color} text-white px-4 py-3 rounded-lg shadow-lg text-sm`;
  toast.textContent = mensaje;
  document.getElementById('toasts').appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Lee los valores del formulario
function leerFormulario() {
  return {
    nombre: nombre.value.trim(),
    categoria: categoria.value,
    cantidad: Number(cantidad.value),
    estado: estado.value
  };
}

// Devuelve un mensaje de error, o '' si todo está bien
function validar(datos) {
  if (!datos.nombre || !datos.categoria || !datos.estado || cantidad.value === '') return 'Completa todos los campos';
  if (datos.cantidad < 0) return 'La cantidad no puede ser negativa';
  const repetido = repuestos.some(r => r.nombre.toLowerCase() === datos.nombre.toLowerCase() && r.id !== idEditando);
  if (repetido) return 'Ya existe un repuesto con ese nombre';
  return '';
}

// ---------- CREATE ----------

// Crea un registro nuevo con ID único
function crearRepuesto(datos) {
  repuestos.push({ id: Date.now(), ...datos });
  guardarDatos();
  formulario.reset();
  mostrarToast('Repuesto creado');
}

// ---------- READ ----------

// Dibuja la tabla aplicando el filtro de búsqueda y actualiza el contador
function renderizar() {
   const texto = buscador.value.toLowerCase();
  const categoriaElegida = filtroCategoria.value;
  const lista = repuestos.filter(r => `${r.nombre} ${r.categoria} ${r.estado}`.toLowerCase().includes(texto) && (categoriaElegida === '' || r.categoria === categoriaElegida));
  tabla.innerHTML = lista.map(r => `
    <tr>
      <td class="px-3 py-2 font-medium">${limpiar(r.nombre)}</td>
      <td class="px-3 py-2">${limpiar(r.categoria)}</td>
      <td class="px-3 py-2">${r.cantidad}</td>
      <td class="px-3 py-2"><span class="px-2 py-1 rounded-full text-xs ${colores[r.estado]}">${r.estado}</span></td>
      <td class="px-3 py-2 text-right whitespace-nowrap">
        <button data-accion="editar" data-id="${r.id}" class="text-indigo-600 hover:underline mr-3">Editar</button>
        <button data-accion="eliminar" data-id="${r.id}" class="text-red-600 hover:underline">Eliminar</button>
      </td>
    </tr>`).join('');

  vacio.classList.toggle('hidden', lista.length > 0);
  contador.textContent = repuestos.length;
}

// ---------- UPDATE ----------

// Carga el registro en el formulario y activa el modo edición
function editarRepuesto(id) {
  const r = repuestos.find(x => x.id === id);
  idEditando = id;
  nombre.value = r.nombre;
  categoria.value = r.categoria;
  cantidad.value = r.cantidad;
  estado.value = r.estado;
  btnGuardar.textContent = 'Actualizar Registro';
  tituloForm.textContent = 'Editando repuesto';
  btnCancelar.classList.remove('hidden');
  nombre.focus();
}

// Sobrescribe los datos manteniendo el ID original
function actualizarRepuesto(datos) {
  const i = repuestos.findIndex(r => r.id === idEditando);
  repuestos[i] = { id: idEditando, ...datos };
  guardarDatos();
  salirModoEdicion();
  mostrarToast('Repuesto actualizado');
}

// Vuelve el formulario a modo "crear"
function salirModoEdicion() {
  idEditando = null;
  formulario.reset();
  btnGuardar.textContent = 'Guardar Registro';
  tituloForm.textContent = 'Nuevo repuesto';
  btnCancelar.classList.add('hidden');
}

// ---------- DELETE ----------

// Pide confirmación y elimina el registro
function eliminarRepuesto(id) {
  if (!confirm('¿Seguro que deseas eliminar este repuesto?')) return;
  repuestos = repuestos.filter(r => r.id !== id);
  guardarDatos();
  if (idEditando === id) salirModoEdicion();
  mostrarToast('Repuesto eliminado');
  renderizar();
}

// ---------- EXPORTAR ----------

// Descarga los datos actuales como archivo JSON
function exportarJSON() {
  const blob = new Blob([JSON.stringify(repuestos, null, 2)], { type: 'application/json' });
  const enlace = document.createElement('a');
  enlace.href = URL.createObjectURL(blob);
  enlace.download = 'repuestos.json';
  enlace.click();
  URL.revokeObjectURL(enlace.href);
}
function limpiarFiltros() {
  buscador.value = '';
  filtroCategoria.value = '';
  renderizar();
}
// ---------- EVENTOS ----------

formulario.addEventListener('submit', e => {
  e.preventDefault();
  const datos = leerFormulario();
  const error = validar(datos);
  if (error) return mostrarToast(error, 'error');
  idEditando ? actualizarRepuesto(datos) : crearRepuesto(datos);
  renderizar();
});

btnCancelar.addEventListener('click', salirModoEdicion);
buscador.addEventListener('input', renderizar);
filtroCategoria.addEventListener('change', renderizar);
btnLimpiar.addEventListener('click', limpiarFiltros);
document.getElementById('btnExportar').addEventListener('click', exportarJSON);

// Un solo listener para los botones Editar / Eliminar de la tabla
tabla.addEventListener('click', e => {
  const boton = e.target.closest('button');
  if (!boton) return;
  const id = Number(boton.dataset.id);
  if (boton.dataset.accion === 'editar') editarRepuesto(id);
  if (boton.dataset.accion === 'eliminar') eliminarRepuesto(id);
});

renderizar();
