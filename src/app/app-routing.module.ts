import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';

const routes: Routes = [
    { path: '', redirectTo: '/productos', pathMatch: 'full' },
    {
        path: 'productos',
        component: ListaProductosComponent,
    },
    {
        path: 'productos/:id',
        component: DetalleProductoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
