import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agregar-producto-modal',
  templateUrl: './agregar-producto-modal.component.html',
  styleUrls: ['./agregar-producto-modal.component.css']
})
export class AgregarProductoModalComponent {
  producto = {
    nombre: '',
    codigo_barra: '',
    valor: 0
  };

  @Output() productoAgregado = new EventEmitter<any>();

  agregarProducto() {
    // Aquí podrías realizar una validación o incluso guardar en una base de datos
    this.productoAgregado.emit(this.producto);
    this.producto = { nombre: '', codigo_barra: '', valor: 0 }; // Resetear el objeto producto
    // Cerrar el modal con JavaScript puro, aunque lo ideal sería usar una librería de modales como ng-bootstrap o Angular Material
    document.getElementById('agregarProductoModal')?.classList.remove('show');
    document.querySelector('.modal-backdrop')?.remove();
    document.body.classList.remove('modal-open');
    document.body.style.overflow = 'auto';
  }
}
