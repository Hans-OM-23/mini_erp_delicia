import { Producto } from "./Producto.js";
import { productosBase } from "../data/productos.js";

export class Catalogo {
    constructor() {
        this.productos = productosBase.map(
            p => new Producto(p.id, p.nombre, p.precio, p.categoria)
        );
    }

    listar() {
        console.table(this.productos.map(p => p.toJSON()));
    }

    buscarPorId(id) {
        return this.productos.find(p => p.id == id);
    }

    buscarPorNombre(nombre) {
        return this.productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    }

    topMasCaros(n = 3) {
        return [...this.productos].sort((a, b) => b.precio - a.precio).slice(0, n);
    }
}
