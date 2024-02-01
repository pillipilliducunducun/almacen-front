import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'; // Asegúrate de importar AppRoutingModule
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CajaSupermercadoComponent } from './components/caja-supermercado/caja-supermercado.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AgregarProductoModalComponent } from './components/agregar-producto-modal/agregar-producto-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    CajaSupermercadoComponent,
    NavBarComponent,
    AgregarProductoModalComponent
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
