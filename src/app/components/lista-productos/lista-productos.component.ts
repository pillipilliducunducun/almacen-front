import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AgregarProductoModalComponent } from '../agregar-producto-modal/agregar-producto-modal.component';


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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.productos = data;
    });
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

  agregarProducto() {
  // Aquí puedes abrir un modal para agregar un producto o redirigir a un formulario
  // Por ejemplo:
  // this.abrirModalAgregarProducto();
  // o
  // this.router.navigate(['/ruta-para-agregar-producto']);
  }
  
  onProductoAgregado(producto: any) {
    // Aquí puedes agregar el producto a la lista o realizar otras acciones necesarias
    this.productos.push(producto);
  }


}
