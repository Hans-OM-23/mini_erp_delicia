import { Carrito } from "../domain/Carrito.js";

export class Tienda {
    constructor(nombre, catalogo) {
        this.nombre = nombre;
        this.catalogo = catalogo;
        this.carrito = new Carrito();
        this.ventas = [];
    }

    agregarProducto(prod) {
        this.catalogo.productos.push(prod);
    }

    agregarAlCarritoPorId(id, cantidad) {
        const producto = this.catalogo.buscarPorId(id);
        this.carrito.agregar(producto, cantidad);
    }

    finalizarCompra(cliente) {
        this.carrito.items.forEach(i => cliente.agregarCompra(i));
        this.ventas.push(...this.carrito.items);
        this.carrito.vaciar();
    }
}
