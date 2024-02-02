import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

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
      this.idProducto = value.id;
      this.nombreProducto = value.nombre;
      this.codigoBarras = value.codigo_barra;
      this.precioProducto = value.valor;
      this.esModoEdicion = true;
    } else {
      this.resetForm();
      this.esModoEdicion = false;
    }
    this.formularioModificado = false;  // Initialize as false since the form has not been modified yet
  }

  nombreProducto: string = '';
  codigoBarras: string = '';
  precioProducto: number | null = null;
  esModoEdicion: boolean = false;
  idProducto: number | null = null;
  formularioModificado: boolean = false;  // To track if the form has been modified

  constructor(private productService: ProductService) { }

  cerrar() {
    this.cerrarModal.emit();
  }

  onModelChange() {
    this.formularioModificado = true;  // Set to true on any model change
  }

  guardarProducto() {
    if (!this.nombreProducto || !this.codigoBarras || this.precioProducto === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son necesarios!',
      });
      return;
    }

    Swal.fire({
      title: this.esModoEdicion ? '¿Actualizar Producto?' : '¿Agregar Producto?',
      text: this.esModoEdicion ? "¡Los cambios se guardarán!" : "¡Se agregará un nuevo producto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.esModoEdicion ? 'Sí, actualizar!' : 'Sí, agregar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const producto = {
          nombre: this.nombreProducto,
          codigo_barra: this.codigoBarras,
          valor: this.precioProducto
        };

        if (this.esModoEdicion && this.idProducto !== null) { // Ensure idProducto is not null
          this.productService.updateProduct(this.idProducto, producto).subscribe({
            next: (response) => {
              Swal.fire('Actualizado', 'El producto ha sido actualizado.', 'success');
              this.cerrar();
              this.refrescarProductos.emit();
            },
            error: (error) => {
              Swal.fire('Error', 'Error al actualizar el producto.', 'error');
              this.cerrar();
            }
          });
        } else if (!this.esModoEdicion) {
          this.productService.createProduct(producto).subscribe({
            next: (response) => {
              Swal.fire('Agregado', 'El producto ha sido agregado.', 'success');
              this.cerrar();
              this.refrescarProductos.emit();
            },
            error: (error) => {
              Swal.fire('Error', 'Error al agregar el producto.', 'error');
            }
          });
        } else {
          // Handle the case where idProducto is null in edit mode
          Swal.fire('Error', 'ID de producto no válido para la actualización.', 'error');
        }

        this.formularioModificado = false;  // Reset the form modification tracker
      }
    });
  }


  resetForm() {
    this.nombreProducto = '';
    this.codigoBarras = '';
    this.precioProducto = null;
    this.formularioModificado = false;  // Also reset the form modification tracker here
  }
}
