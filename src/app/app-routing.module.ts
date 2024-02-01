import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CajaSupermercadoComponent } from './components/caja-supermercado/caja-supermercado.component'; // Asegúrate de importar tu nuevo componente

const routes: Routes = [
    { path: '', redirectTo: '/caja-supermercado', pathMatch: 'full' },
    {
        path: 'productos',
        component: ListaProductosComponent,
    },    
    {
        path: 'caja-supermercado', // Define la nueva URL
        component: CajaSupermercadoComponent, // Asocia la nueva URL con tu nuevo componente
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
