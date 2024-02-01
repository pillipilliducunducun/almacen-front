import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8085/almacen-back-php/public/products'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un producto por ID
  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<any>(url);
  }

  // Crear un nuevo producto
  createProduct(productData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  // Actualizar un producto por ID
  updateProduct(productId: number, productData: any): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put<any>(url, productData);
  }

  // Eliminar un producto por ID
  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url);
  }

  // En product.service.ts

  // Obtener un producto por código de barras
  getProductByCode(barcode: string): Observable<any> {
    const url = `${this.apiUrl}/byCode/${barcode}`;
    return this.http.get<any>(url);
  }

}
