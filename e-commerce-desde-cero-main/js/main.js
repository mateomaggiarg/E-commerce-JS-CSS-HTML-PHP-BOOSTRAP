let productos = [];

// Carga de datos de productos desde un archivo JSON
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        // Llama a la función para cargar los productos en la página
        cargarProductos(productos);
    })

// Selección de elementos del HTML
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Event listener para los botones de categoría que cierra el menú lateral al hacer clic en ellos
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

// Función para cargar los productos en el contenedor de productos
function cargarProductos(productosElegidos) { 

    contenedorProductos.innerHTML = ""; // Limpia el contenedor de productos

    productosElegidos.forEach(producto => {

// Crea un elemento de div para cada producto y lo agrega al contenedor


        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar(); // Actualiza los event listeners de los botones de agregar al carrito
}

// Event listener para los botones de categoría que carga los productos correspondientes al hacer clic en ellos
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") { // Filtra los productos por categoría y los muestra
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else { // Muestra todos los productos si se hace clic en "Todos los productos"
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

// Función para actualizar los botones de agregar al carrito con event listeners actualizados
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


// Inicialización de la variable de productos en el carrito
let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


// Verifica si hay productos en el carrito guardados en el almacenamiento local y los carga
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


// Función para agregar un producto al carrito
function agregarAlCarrito(e) {


// Muestra una notificación de que el producto fue agregado
    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "linear-gradient(to right, #4b33a8, #785ce9)",
        borderRadius: "2rem",
        textTransform: "uppercase",
        fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', 
            y: '1.5rem' 
        },
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);


    // Verifica si el producto ya está en el carrito y lo actualiza, o lo agrega si no está
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito(); // Actualiza el número de productos en el carrito


    // Guarda los productos en el carrito en el almacenamiento local
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); 
}


// Función para actualizar el número de productos en el carrito
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}