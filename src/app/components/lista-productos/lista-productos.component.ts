import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  codigoBarras: string = ''; // Propiedad para el código de barras
  nombreProducto: string = ''; // Propiedad para el nombre del producto
  productos: any[] = [ /* Aquí debes tener una lista de productos */];
  productosFiltrados: any[] = []; // Propiedad para los productos filtrados
  precioProducto: number | null = null;
  mostrarModal: boolean = false;
  productoActualParaEditar: any = null;



  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.refrescarListaProductos();
  }
  // Función para buscar por código de barras
  buscarPorCodigo(event?: any) {
    const codigo = event ? event.target.value : this.codigoBarras;
    // Implementa la lógica de búsqueda por código de barras aquí
    // Filtra los productos y actualiza productosFiltrados
  }

  // Función para buscar por nombre de producto
  buscarPorNombre(event?: any) {
    const nombre = event ? event.target.value : this.nombreProducto;
    // Implementa la lógica de búsqueda por nombre aquí
    // Filtra los productos y actualiza productosFiltrados
  }

  eliminarProducto(productId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(() => {
          Swal.fire(
            '¡Eliminado!',
            'El producto ha sido eliminado.',
            'success'
          );
          this.refrescarListaProductos();
          // Aquí deberías actualizar tu lista de productos, tal vez volviendo a cargarlos
        });
      }
    });
  }

  // In ListaProductosComponent class

  editarProducto(producto: any) {
    this.productoActualParaEditar = producto;  // Asegúrate de que 'producto' incluya el 'id'
    this.mostrarModal = true;
  }

  agregarProducto() {
    this.productoActualParaEditar = null;  // Ensure no product is set for editing
    this.mostrarModal = true;
  }

  refrescarListaProductos() {
    this.productService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
  }



}
