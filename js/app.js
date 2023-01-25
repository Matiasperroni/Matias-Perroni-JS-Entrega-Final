/* Alumno: Matias Perroni
Lo que hice fue crear un archivo .json para guardar los productos, luego los busco usando fetch y los imprimo en la pagina. Cree un carrito para poder agregar productos y sumar el realizar una compra.
Tambien en la pagina pokemon.html hice un fetch a una api para imprimir algunos pokemon.
Las cosas que deberian ver seria las paginas hombre y mujer que tienen los productos guardado, testear que se puedan agregar al carrito, si agregas el mismo dos veces te tira un mensaje de alerta del sweet alert, si refrescas la pagina se deberian guardar los productos porque los guarda y luego trae del local storage, si envias el carrito vacio tira otro mensaje de error del sweet alert y los botones de eliminar cada producto o vaciar carrito, en realizar compra te lleva a la pagina del carrito donde aparecen los productos y se van sumando sus precios, calcula el iva y el total, tambien si subis o bajas la cantidad de cada producto se sigue calculando el precio y tambien hay otra opcion de eliminar productos.
*/

// agarro el contenedor de las cards de los productos

let contenedorDeProductos = document.getElementById(
    "contenedor-productos-nuevo"
);

//fetcheo la data del json y con un foreach creo un nuevo div para cada producto insertandole el innerhtml
//de cada card que tenia creada antes (era cada card codeada una por una y aca solo copio el codigo una vez)
//para que por cada producto que me devuelva el json cree una card
fetch("./data/data.json")
    .then((resp) => resp.json())
    .then((data) => {
        const ventana = window.location.pathname;
        data.forEach((producto) => {
            const creadorCarta = `
<div class="carta-contenedor-carta">
    <div class="carta-contenedor-carta-imgBox">
        <img class="imgPro" src="${producto.imagen}"/>
                <ul class="carta-action">
                  <li>
                    <i class="fa-solid fa-heart"></i>
                    <span>Agregar a favoritos</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-cart-shopping agregarBtn agregar-carrito"></i>
                    <span>Agregar al carrito</span>
                  </li>
                  <li>
                    <i class="fa-solid fa-eye"></i>
                    <span>Ver mas detalles</span>
                  </li>
                </ul>
              </div>
              <div class="carta-contenedor-carta-contenido">
                <div class="carta-contenedor-carta-nombre-producto">
                  <h3 data-id="${producto.id}" class="tituloPro">${producto.nombre} ${producto.marca}</h3>
                </div>
                <div class="carta-contenedor-carta-precio-producto">
                  <h2 class="precioPro">${producto.precio}</h2>
    </div>
</div>`;
            if (ventana === "/hombres.html" && producto.sexo === "h") {
                const divCreado = document.createElement("div");
                divCreado.classList.add("carta-contenedor");
                contenedorDeProductos.append(divCreado);
                divCreado.innerHTML = creadorCarta;
            } else if (ventana === "/mujeres.html" && producto.sexo === "m") {
                const divCreado = document.createElement("div");
                divCreado.classList.add("carta-contenedor");
                contenedorDeProductos.append(divCreado);
                divCreado.innerHTML = creadorCarta;
            }
        });
        //aca empiezo el codigo del carrito
        const carro = new Carrito();

        const agregarBtn = document.querySelectorAll(".agregarBtn");
        //boton vaciar carrito
        const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
        //boton para procesar compra
        const procesarPedidoBtn = document.getElementById("realizar-pedido");

        function cargarEventos() {
            agregarBtn.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    carro.agregarCarrito(e);
                });
            });
            listaProductos.addEventListener("click", (e) => {
                carro.eliminarProducto(e);
            });
        }
        vaciarCarritoBtn.addEventListener("click", (e) => {
            carro.vaciarCarrito(e);
        });

        document.addEventListener("DOMContentLoaded", carro.leerLocalStorage());

        procesarPedidoBtn.addEventListener("click", (e) => {
            carro.procesarPedido(e);
        });

        cargarEventos();
    });
