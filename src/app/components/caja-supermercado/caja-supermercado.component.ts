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
  dineroRecibido: string = '';
  vuelto: number = 0;
  mostrarVistaDetalle: boolean = false;
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
      const producto = this.respuestaProductos.find((p) => p.codigo_barra === this.codigoBarras);
      if (producto) {
        this.productosAgregados.push(producto);
        this.totalCompra += producto.valor;
        this.codigoBarras = '';

        // Verifica si ya se ingresó un monto en dineroRecibido antes de calcular el vuelto
        if (this.dineroRecibido) {
          this.calcularVuelto();
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El código de barras no corresponde a un producto válido.',
        });
        this.codigoBarras = '';
      }
    } else {
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
      const precioProducto = Number(producto.valor);
      if (!isNaN(precioProducto)) {
        this.totalCompra -= precioProducto;
        this.productosAgregados.splice(indice, 1);

        // Verifica si ya se ingresó un monto en dineroRecibido antes de calcular el vuelto
        if (this.dineroRecibido) {
          this.calcularVuelto();
        }
      } else {
        console.error('El valor del producto no es un número');
      }
    }

    if (this.productosAgregados.length === 0) {
      this.totalCompra = 0;
    }
  }

  limpiarCarrito() {
    this.productosAgregados = [];
    this.totalCompra = 0;
  }

  realizarPago() {
    this.dineroRecibido = ''; // Establece dineroRecibido en 0
    this.mostrarVistaDetalle = true; // Mostrar la vista nueva
  }

  calcularVuelto() {
    // Convierte dineroRecibido a número
    const dineroRecibidoNumero = parseFloat(this.dineroRecibido);

    if (isNaN(dineroRecibidoNumero)) {
      // Manejo de error si la entrada no es un número válido
      Swal.fire({
        icon: 'error',
        title: 'Dinero Inválido',
        text: 'Por favor, ingrese un número válido para el dinero recibido.',
      });
      this.vuelto = 0;
    } else if (dineroRecibidoNumero >= this.totalCompra) {
      this.vuelto = dineroRecibidoNumero - this.totalCompra;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Dinero Insuficiente',
        text: 'El dinero recibido es insuficiente para pagar la compra.',
      });
      this.vuelto = 0;
      this.dineroRecibido = '';
    }
  }

  finalizarCompra() {
    // Restablecer todas las variables
    this.productosAgregados = [];
    this.totalCompra = 0;
    this.dineroRecibido = '';
    this.vuelto = 0;
    this.mostrarVistaDetalle = false;
    // Aquí puedes agregar cualquier otra lógica necesaria para finalizar la compra
  }
}
