import chalk from "chalk";

export class TicketService {
    static renderTicket(tienda, cliente) {
        const carrito = tienda.carrito;
        if (carrito.items.length === 0) {
            console.log(chalk.red("No hay productos en el carrito."));
            return;
        }

        console.log(chalk.blue("\n====== RESUMEN DE COMPRA ======"));
        console.log("Producto\tCant.\tPrecio\tSubtotal");
        console.log("--------------------------------");

        carrito.items.forEach(i => {
            console.log(
                `${i.producto.nombre}\t${i.cantidad}\t${i.producto.precio.toFixed(2)}\t${i.subtotal().toFixed(2)}`
            );
        });

        console.log("--------------------------------");
        console.log(chalk.yellow(`Subtotal: S/${carrito.subtotal().toFixed(2)}`));
        console.log(chalk.yellow(`Descuento: S/${carrito.descuentoEscalonado().toFixed(2)}`));
        console.log(chalk.yellow(`IGV (18%): S/${carrito.igv().toFixed(2)}`));
        console.log(chalk.green(`TOTAL FINAL: S/${carrito.total().toFixed(2)}`));
        console.log(chalk.cyan(`¡Gracias por su compra, ${cliente.nombre}!`));
    }
}
