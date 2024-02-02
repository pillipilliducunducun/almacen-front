import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-caja-supermercado',
  templateUrl: './caja-supermercado.component.html',
  styleUrls: ['./caja-supermercado.component.css']
})
export class CajaSupermercadoComponent {
  codigoBarras: string = '';
  productosAgregados: any[] = [];
  totalCompra: number = 0;
  

  respuestaProductos: any[] = [];

  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.respuestaProductos = data; // Asigna la respuesta JSON a la variable
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  agregarProductoPorCodigo() {
    if (this.codigoBarras) {
      // Realiza la búsqueda del producto por código de barras en la respuesta JSON
      const producto = this.respuestaProductos.find((p) => p.codigo_barra === this.codigoBarras);

      if (producto) {
        // Agrega el producto a la lista de productos agregados
        this.productosAgregados.push(producto);

        // Incrementa el total de la compra
        this.totalCompra += producto.valor;

        // Limpia el campo de texto después de agregar el producto
        this.codigoBarras = '';

        
      } else {
        // Muestra un mensaje de error si el código de barras no corresponde a un producto válido.
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El código de barras no corresponde a un producto válido.',
        });
      }
    } else {
      // Muestra un mensaje de error si el campo de código de barras está vacío.
      Swal.fire({
        icon: 'error',
        title: 'Campo Vacío',
        text: 'Por favor, ingresa un código de barras antes de agregar un producto.',
      });
    }
  }


  quitarProducto(indice: number) {
    const producto = this.productosAgregados[indice];
    if (producto) {
      // Restar el precio del producto del total de la compra
      this.totalCompra -= producto.precio;
      // Quitar el producto de la lista de productos agregados
      this.productosAgregados.splice(indice, 1);
    }

    // Verificar si la lista de productos está vacía y establecer el total en 0 si es así
    if (this.productosAgregados.length === 0) {
      this.totalCompra = 0;
    }
  }

  limpiarCarrito() {
    this.productosAgregados = [];
    this.totalCompra = 0;
  }

}
