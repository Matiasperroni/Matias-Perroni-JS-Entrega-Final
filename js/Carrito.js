// div que se va a mostrar en el boton del carrito
const listaProductos = document.getElementById("carritoItems");
//table que va a tener el dropdown carrito
const listaProductosTb = document.querySelector("#lista-carrito tbody");

class Carrito {
    //agregar un producto al carrito
    agregarCarrito(e) {
        e.preventDefault();
        if (e.target.classList.contains("agregar-carrito")) {
            const productoCarrito =
                e.target.parentElement.parentElement.parentElement
                    .parentElement;
            this.leerDatosProducto(productoCarrito);
        }
    }
    leerDatosProducto(productoCarrito) {
        const infoProducto = {
            imagen: productoCarrito.querySelector(".imgPro").src,
            titulo: productoCarrito.querySelector(".tituloPro").textContent,
            precio: productoCarrito.querySelector(".precioPro").textContent,
            id: productoCarrito
                .querySelector(".tituloPro")
                .getAttribute("data-id"),
            cantidad: 1,
        };
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function (productoLS) {
            if (productoLS.id === infoProducto.id) {
                productosLS = productoLS.id;
            }
        });
        if (productosLS === infoProducto.id) {
            Swal.fire({
                icon: "error",
                title: "Oooops...",
                text: "El producto ya esta agregado.",
                timer: 2000,
                showConfirmButton: false,
            });
        } else {
            this.insertarCarrito(infoProducto);
        }
    }
    insertarCarrito(productoCarrito) {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
                <img src="${productoCarrito.imagen}" width=100>
            </td>
            <td>${productoCarrito.titulo}</td>
            <td>${productoCarrito.precio}</td>
            <td>
                <i class="borrar-producto fas fa-times-circle" data-id="${productoCarrito.id}"></i>
            </td>
        `;
        listaProductosTb.appendChild(row);
        this.guardarProductoLS(productoCarrito);
    }
    eliminarProducto(e) {
        e.preventDefault();
        let producto, productoId;
        if (e.target.classList.contains("borrar-producto")) {
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoId = producto
                .querySelector(".borrar-producto")
                .getAttribute("data-id");
        }
        this.eliminarProductoLS(productoId);
        this.calcularTotal();
    }
    vaciarCarrito(e) {
        e.preventDefault();
        while (listaProductosTb.firstChild) {
            listaProductosTb.removeChild(listaProductosTb.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }
    guardarProductoLS(productoCarrito) {
        let productos;
        productos = this.obtenerProductoLocalStorage();
        productos.push(productoCarrito);
        localStorage.setItem("productos", JSON.stringify(productos));
    }
    obtenerProductoLocalStorage() {
        let productoLS;
        if (localStorage.getItem("productos") === null) {
            productoLS = [];
        } else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }
    eliminarProductoLS(productoId) {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === productoId) {
                productosLS.splice(index, 1);
            }
        });
        localStorage.setItem("productos", JSON.stringify(productosLS));
    }
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function (productoCarrito) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>
                    <img src="${productoCarrito.imagen}" width=100>
                </td>
                <td>${productoCarrito.titulo}</td>
                <td>${productoCarrito.precio}</td>
                <td>
                    <i class="borrar-producto fas fa-times-circle" data-id="${productoCarrito.id}"></i>
                </td>
            `;
            listaProductosTb.appendChild(row);
        });
    }
    leerLocalStorageCompra() {
        let productosLS;
        productosLS = this.obtenerProductoLocalStorage();
        productosLS.forEach(function (productoCarrito) {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>
                    <img src="${productoCarrito.imagen}" width=100>
                </td>
                <td>${productoCarrito.titulo}</td>
                <td>${productoCarrito.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value="${
                        productoCarrito.cantidad
                    }">
                </td>
                <td id="subtotales">${
                    productoCarrito.precio * productoCarrito.cantidad
                }</td>
                <td>
                    <a class="borrar-producto fas fa-times-circle" data-id="${
                        productoCarrito.id
                    }"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }
    vaciarLocalStorage() {
        localStorage.clear();
    }
    procesarPedido(e) {
        e.preventDefault();
        if (this.obtenerProductoLocalStorage().length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oooops...",
                text: "El carrito esta vacio, debes agregar productos para procesar la compra.",
                timer: 2000,
                showConfirmButton: false,
            });
        } else {
            location.href = "carrito.html";
        }
    }
    calcularTotal() {
        let productosLS;
        let total = 0,
            iva = 0,
            subtotal = 0;
        productosLS = this.obtenerProductoLocalStorage();
        for (let i = 0; i < productosLS.length; i++) {
            let element = Number(
                productosLS[i].precio * productosLS[i].cantidad
            );
            total = total + element;
        }

        iva = parseFloat(total * 0.21).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById("subtotal").innerHTML = "$ " + subtotal;
        document.getElementById("iva").innerHTML = "$ " + iva;
        document.getElementById("total").value = "$ " + total.toFixed(2);
    }
    obtenerEvento(e) {
        e.preventDefault();
        let id, cantidad, producto, productosLS;
        if (e.target.classList.contains("cantidad")) {
            producto = e.target.parentElement.parentElement;
            id = producto.querySelector("a").getAttribute("data-id");
            cantidad = producto.querySelector("input").value;
            let actualizarMontos = document.querySelectorAll("#subtotales");
            productosLS = this.obtenerProductoLocalStorage();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    actualizarMontos[index].innerHTML = Number(
                        cantidad * productosLS[index].precio
                    );
                }
            });
            localStorage.setItem("productos", JSON.stringify(productosLS));
        } else {
            console.log("click afuera");
        }
    }
}
