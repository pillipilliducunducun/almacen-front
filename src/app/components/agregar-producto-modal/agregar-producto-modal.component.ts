import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-agregar-producto-modal',
  templateUrl: './agregar-producto-modal.component.html',
  styleUrls: ['./agregar-producto-modal.component.css']
})
export class AgregarProductoModalComponent {
  @Output() refrescarProductos = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<void>();
  @Input() set productoActual(value: any) {
    if (value) {
      this.idProducto = value.id;  // Asegúrate de que el producto tiene un campo 'id'
      this.nombreProducto = value.nombre;
      this.codigoBarras = value.codigo_barra;
      this.precioProducto = value.valor;
      this.esModoEdicion = true;
    } else {
      this.resetForm();
      this.esModoEdicion = false;
    }
  }


  nombreProducto: string = '';
  codigoBarras: string = '';
  precioProducto: number | null = null;
  esModoEdicion: boolean = false;
  idProducto: number | null = null;

  

  constructor(private productService: ProductService) { }

  cerrar() {
    this.cerrarModal.emit();
  }

  guardarProducto() {
    if (!this.nombreProducto || !this.codigoBarras || this.precioProducto === null) {
      console.error('Todos los campos son necesarios');
      return;
    }

    const producto = {
      nombre: this.nombreProducto,
      codigo_barra: this.codigoBarras,
      valor: this.precioProducto
    };

    if (this.esModoEdicion) {
      if (this.idProducto === null) {
        console.error('Error: No se proporcionó un ID de producto para la actualización.');
        return;
      }

      this.productService.updateProduct(this.idProducto, producto).subscribe({
        next: (response) => {
          console.log('Producto actualizado', response);
          this.cerrar();
          this.refrescarProductos.emit();
        },
        error: (error) => {
          console.error('Error al actualizar el producto', error);
        }
      });
    } else {
      this.productService.createProduct(producto).subscribe({
        next: (response) => {
          console.log('Producto agregado', response);
          this.cerrar();
          this.refrescarProductos.emit();
        },
        error: (error) => {
          console.error('Error al agregar el producto', error);
        }
      });
    }
  }




  resetForm() {
    this.nombreProducto = '';
    this.codigoBarras = '';
    this.precioProducto = null;
  }
}
