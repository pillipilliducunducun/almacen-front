import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; // Asegúrate de importar AppRoutingModule
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CajaSupermercadoComponent } from './components/caja-supermercado/caja-supermercado.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    DetalleProductoComponent,
    CajaSupermercadoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule // Importa AppRoutingModule aquí en lugar de RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
