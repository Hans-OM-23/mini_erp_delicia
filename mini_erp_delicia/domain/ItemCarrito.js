export class ItemCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    subtotal() {
        return this.producto.precio * this.cantidad;
    }
}
