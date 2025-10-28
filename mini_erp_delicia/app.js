import promptSync from "prompt-sync";
import chalk from "chalk";
import { Catalogo } from "./domain/Catalogo.js";
import { Cliente } from "./domain/Cliente.js";
import { TiendaOnline } from "./core/TiendaOnline.js";
import { TicketService } from "./services/TicketService.js";
import { ReporteService } from "./services/ReporteService.js";

const prompt = promptSync();
const catalogo = new Catalogo();
const tienda = new TiendaOnline("Delicia", catalogo);
const cliente = new Cliente("Cliente General");

function mostrarMenu() {
    console.log(`
===== MENÚ PRINCIPAL =====
1. Registrar venta
2. Listar productos
3. Buscar producto
4. Ver carrito
5. Calcular total
6. Generar ticket
7. Reportes
8. Salir
`);
}

function main() {
    console.log(chalk.cyan("Bienvenido al sistema Delicia "));
    let salir = false;

    while (!salir) {
        mostrarMenu();
        const op = prompt("Seleccione una opción: ");

        switch (op) {
            case "1": {
                const id = prompt("Ingrese ID o nombre del producto: ");
                const cantidad = Number(prompt("Cantidad: "));
                const producto =
                    isNaN(id) ? catalogo.buscarPorNombre(id) : catalogo.buscarPorId(id);
                tienda.carrito.agregar(producto, cantidad);
                break;
            }
            case "2":
                catalogo.listar();
                break;
            case "3": {
                const nombre = prompt("Ingrese nombre: ");
                const p = catalogo.buscarPorNombre(nombre);
                if (p)
                    console.log(`Producto: ${p.nombre}, Precio: S/${p.precio}, Categoría: ${p.categoria}`);
                else console.log(chalk.red("Producto no encontrado."));
                break;
            }
            case "4":
                tienda.carrito.itemsList().length
                    ? tienda.carrito.itemsList().forEach(i =>
                        console.log(`${i.producto.nombre} x${i.cantidad} = S/${i.subtotal().toFixed(2)}`)
                    )
                    : console.log(chalk.yellow("Carrito vacío."));
                break;
            case "5":
                console.log(
                    chalk.yellow(
                        `Subtotal: S/${tienda.carrito.subtotal().toFixed(2)} | Total: S/${tienda.carrito.total().toFixed(2)}`
                    )
                );
                break;
            case "6":
                TicketService.renderTicket(tienda, cliente);
                tienda.finalizarCompra(cliente);
                break;
            case "7":
                ReporteService.topMasCaros(catalogo);
                ReporteService.masVendidos(tienda.ventas);
                ReporteService.resumenCarrito(tienda.carrito);
                break;
            case "8":
                console.log(chalk.green("¡Hasta luego!"));
                salir = true;
                break;
            default:
                console.log(chalk.red("Opción no válida, intente nuevamente."));
        }
    }
}

main();
