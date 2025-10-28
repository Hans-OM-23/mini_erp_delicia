export class Producto {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    precioFormateado() {
        return this.precio.toFixed(2);
    }

    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            precio: this.precio,
            categoria: this.categoria
        };
    }
}
