import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agregar-producto-modal',
  templateUrl: './agregar-producto-modal.component.html',
  styleUrls: ['./agregar-producto-modal.component.css']
})
export class AgregarProductoModalComponent {
  // EventEmitter para notificar al componente padre que el modal debe cerrarse
  @Output() cerrarModal = new EventEmitter<void>();

  constructor() { }

  // Método para cerrar el modal, emite el evento para notificar al componente padre
  cerrar() {
    this.cerrarModal.emit();
  }

  // Aquí puedes agregar más lógica, como la función para agregar un nuevo producto, validaciones, etc.
}
