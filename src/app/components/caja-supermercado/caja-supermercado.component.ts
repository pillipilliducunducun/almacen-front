import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caja-supermercado',
  templateUrl: './caja-supermercado.component.html',
  styleUrls: ['./caja-supermercado.component.css']
})
export class CajaSupermercadoComponent {
  codigoBarras: string = '';
  productosAgregados: any[] = [];
  totalCompra: number = 0;

  agregarProductoPorCodigo() {
    if (this.codigoBarras) {
      // Realiza la lógica para buscar y agregar el producto aquí

      // Simulación de agregar un producto
      const producto = this.buscarProductoPorCodigo(this.codigoBarras);
      if (producto) {
        this.productosAgregados.push(producto);
        this.totalCompra += producto.precio;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El código de barras no corresponde a un producto válido.',
        });
      }

      this.codigoBarras = ''; // Limpiar el campo de texto
    }
  }

  // Simulación de búsqueda de producto por código
  private buscarProductoPorCodigo(codigo: string): any {
    // Aquí debes implementar la lógica para buscar el producto real en tu base de datos o servicio.
    // Por ahora, simplemente simularemos la búsqueda y devolveremos un producto ficticio.
    const productos = [
      { codigo: '12345', nombre: 'Producto 1', precio: 10 },
      { codigo: '67890', nombre: 'Producto 2', precio: 15 },
    ];

    return productos.find(producto => producto.codigo === codigo);
  }

  quitarProducto(indice: number) {
    const producto = this.productosAgregados[indice];
    if (producto) {
      // Restar el precio del producto del total de la compra
      this.totalCompra -= producto.precio;
      // Quitar el producto de la lista de productos agregados
      this.productosAgregados.splice(indice, 1);
    }
  }


  

}
