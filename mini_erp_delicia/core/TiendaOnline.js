import { Tienda } from "./Tienda.js";

export class TiendaOnline extends Tienda {
    calcularEnvio() {
        return this.carrito.subtotal() > 50 ? 0 : 5;
    }

    finalizarCompra(cliente) {
        const envio = this.calcularEnvio();
        super.finalizarCompra(cliente);
        console.log(`Costo de envío: S/${envio.toFixed(2)}`);
    }
}
