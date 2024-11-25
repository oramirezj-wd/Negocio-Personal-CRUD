//Verificamos que se cargue correctamente la página
console.log("Hola mundo");

// Seleccionamos todos los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.producto__btn-agregar');

// Agregamos un evento click a cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Obtenemos el botón que fue clickeado
        const botonClickeado = e.target;

        // Usamos el atributo data-id para identificar el producto
        const productoId = botonClickeado.getAttribute('data-id');

        // Obtenemos el precio del producto usando su ID
        const precioElemento = document.getElementById(`precio-${productoId}`);
        const precioTexto = precioElemento ? precioElemento.textContent : "0";

        // Limpiamos el formato del precio
        const precioLimpio = parseFloat(precioTexto.replace('$', '').replace(',', ''));

        // Obtenemos el nombre del producto
        const nombreElemento = botonClickeado.parentElement.querySelector('.producto__nombre');
        const nombre = nombreElemento ? nombreElemento.textContent : "Producto sin nombre";

        // Creamos un objeto con los datos del producto
        const productoSeleccionado = {
            id: productoId,
            nombre: nombre,
            precio: precioLimpio // Precio ya convertido a número
        };

        // Mostramos los datos en la consola (o en el futuro, los añadimos al carrito)
        console.log("Producto seleccionado:", productoSeleccionado);
        console.log(precioTexto); // "$4,500"
        console.log(precioLimpio); // 4500 (número)
    });
});


