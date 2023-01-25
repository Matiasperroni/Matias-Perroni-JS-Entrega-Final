const compra = new Carrito();
//table de la pagina carrito
const listaCompra = document.querySelector("#lista-compra tbody");

//div que contiene cada producto en la pagina carrito
const carrito = document.getElementById("carrito");

function cargarEventos() {
    document.addEventListener(
        "DOMContentLoaded",
        compra.leerLocalStorageCompra()
    );
    carrito.addEventListener("click", (e) => {
        compra.eliminarProducto(e);
    });

    compra.calcularTotal();

    carrito.addEventListener("change", (e) => {
        compra.obtenerEvento(e);
    });
    carrito.addEventListener("keyup", (e) => {
        compra.obtenerEvento(e);
    });
}
cargarEventos();
