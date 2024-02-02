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
    // Verificar que todos los campos requeridos estén presentes
    if (!this.nombreProducto || !this.codigoBarras || this.precioProducto === null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son necesarios!',
      });
      return;
    }

    // Mostrar el diálogo de confirmación
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
        // El usuario confirmó, proceder con agregar o actualizar
        const producto = {
          nombre: this.nombreProducto,
          codigo_barra: this.codigoBarras,
          valor: this.precioProducto
        };

        if (this.esModoEdicion) {
          if (this.idProducto === null) {
            Swal.fire('Error', 'No se proporcionó un ID de producto para la actualización.', 'error');
            return;
          }
          this.productService.updateProduct(this.idProducto, producto).subscribe({
            next: (response) => {
              Swal.fire('Actualizado', 'El producto ha sido actualizado.', 'success');
              this.cerrar();
              this.refrescarProductos.emit();
            },
            error: (error) => {
              Swal.fire('Error', 'Error al actualizar el producto.', 'error');
            }
          });
        } else {
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
        }
      }
    });
  }



  resetForm() {
    this.nombreProducto = '';
    this.codigoBarras = '';
    this.precioProducto = null;
  }
}
