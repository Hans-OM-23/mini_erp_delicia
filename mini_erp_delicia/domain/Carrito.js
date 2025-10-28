import chalk from "chalk";
import { ItemCarrito } from "./ItemCarrito.js";

export class Carrito {
    constructor() {
        this.items = [];
    }

    agregar(producto, cantidad) {
        if (!producto) {
            console.log(chalk.red("Producto no encontrado"));
            return;
        }
        if (isNaN(cantidad) || cantidad <= 0) {
            console.log(chalk.red("Cantidad inválida"));
            return;
        }

        const existente = this.items.find(i => i.producto.id === producto.id);
        if (existente) existente.cantidad += cantidad;
        else this.items.push(new ItemCarrito(producto, cantidad));

        console.log(chalk.green(` ${producto.nombre} agregado (${cantidad} x S/${producto.precio})`));
    }

    eliminarPorId(id) {
        const index = this.items.findIndex(i => i.producto.id == id);
        if (index !== -1) {
            const eliminado = this.items.splice(index, 1)[0];
            console.log(chalk.green(`${eliminado.producto.nombre} eliminado`));
        } else {
            console.log(chalk.red("Producto no encontrado en el carrito"));
        }
    }

    vaciar() {
        this.items = [];
        console.log(chalk.green("Carrito vaciado."));
    }

    itemsList() {
        return this.items;
    }

    subtotal() {
        return this.items.reduce((s, i) => s + i.subtotal(), 0);
    }

    descuentoEscalonado() {
        const s = this.subtotal();
        if (s >= 100) return s * 0.15;
        if (s >= 50) return s * 0.1;
        if (s >= 20) return s * 0.05;
        return 0;
    }

    igv() {
        return (this.subtotal() - this.descuentoEscalonado()) * 0.18;
    }

    total() {
        return this.subtotal() - this.descuentoEscalonado() + this.igv();
    }
}
