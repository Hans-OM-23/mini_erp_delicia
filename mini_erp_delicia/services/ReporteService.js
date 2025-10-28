import chalk from "chalk";

export class ReporteService {
    static topMasCaros(catalogo, n = 3) {
        console.log(chalk.yellow("\nTop productos más caros:"));
        catalogo.topMasCaros(n).forEach(p =>
            console.log(`- ${p.nombre}: S/${p.precio.toFixed(2)}`)
        );
    }

    static masVendidos(ventas) {
        if (ventas.length === 0) return console.log(chalk.red("Sin ventas aún."));
        console.log(chalk.yellow("\nProductos más vendidos:"));
        ventas
            .sort((a, b) => b.cantidad - a.cantidad)
            .forEach(v => console.log(`${v.producto.nombre}: ${v.cantidad} unidades`));
    }

    static resumenCarrito(carrito) {
        const totalItems = carrito.items.reduce((s, i) => s + i.cantidad, 0);
        const monto = carrito.subtotal();
        console.log(
            chalk.yellow(`\nResumen carrito: ${totalItems} ítems, S/${monto.toFixed(2)}`)
        );
    }
}
