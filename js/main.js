// Función para obtener el carrito de localStorage
function obtenerCarrito() {
    try {
      let carrito = localStorage.getItem('carrito');
      return carrito ? JSON.parse(carrito) : [];
    } catch (error) {
      console.error("Error al obtener el carrito de localStorage:", error);
      return [];
    }
  }
  
  // Función para guardar el carrito en localStorage
  function guardarCarrito(carrito) {
    try {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }
  
  // Función para agregar un producto al carrito
  function agregarAlCarrito(producto) {
    let carrito = obtenerCarrito();
    
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === producto.id);
  
    if (productoExistente) {
      // Si existe, aumentar la cantidad
      productoExistente.cantidad++;
    } else {
      // Si no existe, agregarlo con cantidad 1
      producto.cantidad = 1;
      carrito.push(producto);
    }
  
    guardarCarrito(carrito);
    actualizarCarritoUI();
  }
  
  // Función para eliminar un producto del carrito
  function eliminarDelCarrito(productoId) {
    let carrito = obtenerCarrito();
    carrito = carrito.filter(item => item.id !== productoId);
    guardarCarrito(carrito);
    actualizarCarritoUI();
  }
  
  // Función para editar la cantidad de un producto en el carrito
  function editarCantidad(productoId, nuevaCantidad) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === productoId);
  
    if (producto) {
      producto.cantidad = nuevaCantidad;
      guardarCarrito(carrito);
      actualizarCarritoUI();
    }
  }
  
 
// Función para actualizar la UI del carrito
function actualizarCarritoUI() {
    const carritoLista = document.getElementById('carrito-lista');
    const carritoCount = document.getElementById('carrito-count');
    const carritoTotal = document.getElementById('carrito-total');
  
    let carrito = obtenerCarrito();
    let total = 0;
  
    carritoLista.innerHTML = ''; // Limpiar la lista
  
    if (carrito.length === 0) {
      // Si el carrito está vacío, agregar el mensaje
      const li = document.createElement("li");
      li.classList.add("carrito-vacio"); 
      li.textContent = "Tu carrito está vacío.";
      carritoLista.appendChild(li);
    } else {
      // Si hay productos, mostrarlos
      carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="carrito-item"> 
            <img class="carrito-item__imagen" src="./img/${producto.id}.jpg" alt="${producto.nombre}">
            <div class="carrito-item__detalles">
            <p class="carrito-item__nombre">${producto.nombre}</p>
            <p class="carrito-item__cantidad">Cantidad: ${producto.cantidad}</p>
            <p class="carrito-item__precio">Precio unitario: $${producto.precio.toLocaleString()}</p>
            <p class="carrito-item__subtotal">Subtotal: $${(producto.precio * producto.cantidad).toLocaleString()}</p>
        </div>
        <div class="carrito-item__botones">
            <button class="carrito-sumar" data-id="${producto.id}">+</button>
            <button class="carrito-restar" data-id="${producto.id}">-</button>
            </div>
        </div>
`;
console.log(producto.id)
        carritoLista.appendChild(li);
  
        // Event listeners para los botones "+" y "-"
        const botonSumar = li.querySelector('.carrito-sumar');
        botonSumar.addEventListener('click', () => {
          aumentarCantidad(producto.id);
        });
  
        const botonRestar = li.querySelector('.carrito-restar');
        botonRestar.addEventListener('click', () => {
          disminuirCantidad(producto.id);
        });
  
        total += producto.precio * producto.cantidad;
      });
    }
  
    carritoCount.textContent = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    carritoTotal.textContent = `$${total.toLocaleString()}`;
  }
  
  // Funciones para aumentar/disminuir cantidad
  function aumentarCantidad(productoId) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
      producto.cantidad++;
      guardarCarrito(carrito);
      actualizarCarritoUI();
    }
  }
  
  function disminuirCantidad(productoId) {
    let carrito = obtenerCarrito();
    const producto = carrito.find(item => item.id === productoId);
    if (producto) {
      if (producto.cantidad === 1) {
        eliminarDelCarrito(productoId);
      } else {
        producto.cantidad--;
        guardarCarrito(carrito);
        actualizarCarritoUI();
      }
    }
  }
  
  
  // Event listeners para los botones "Agregar al carrito"
  const botonesAgregar = document.querySelectorAll('.producto__btn-agregar');
  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const botonClickeado = e.target;
      const productoId = botonClickeado.getAttribute('data-id');
      const precioElemento = document.getElementById(`precio-${productoId}`);
      const precioTexto = precioElemento ? precioElemento.textContent : "0";
      const precioLimpio = parseFloat(precioTexto.replace('$', '').replace(',', ''));
      const nombreElemento = botonClickeado.parentElement.querySelector('.producto__nombre');
      const nombre = nombreElemento ? nombreElemento.textContent : "Producto sin nombre";
  
      const productoSeleccionado = {
        id: productoId,
        nombre: nombre,
        precio: precioLimpio
      };
  
      agregarAlCarrito(productoSeleccionado); 
    });
  });
  
  // Mostrar el carrito al cargar la página
  document.addEventListener("DOMContentLoaded", () => {
    actualizarCarritoUI();
  });

  // Event listener para el botón "Vaciar Carrito"
const botonVaciarCarrito = document.getElementById('carrito-vaciar');

botonVaciarCarrito.addEventListener('click', () => {
  vaciarCarrito();
});
function vaciarCarrito() {
    try {
      // Eliminar el carrito de localStorage
      localStorage.removeItem('carrito');
  
      // Actualizar la UI del carrito
      actualizarCarritoUI();
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  }