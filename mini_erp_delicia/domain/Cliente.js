export class Cliente {
    constructor(nombre) {
        this.nombre = nombre;
        this.historial = [];
    }

    agregarCompra(item) {
        this.historial.push(item);
    }

    totalGastado() {
        return this.historial.reduce((s, i) => s + i.subtotal(), 0);
    }
}
