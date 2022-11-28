import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'administrador',
        loadChildren: () => import('../administrador/administrador.module').then(m => m.AdministradorPageModule),
      },
      {
        path: 'alumno/:rut',
        loadChildren: () => import('../alumno/alumno.module').then(m => m.AlumnoPageModule),
      },
      {
        path: 'profesor/:rut',
        loadChildren: () => import('../profesor/profesor.module').then(m => m.ProfesorPageModule),
      },
      {
        path: 'perfil/:rut',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule),
      },
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapPageModule),
      },
      {
        path: 'clases',
        loadChildren: () => import('../clases/clases.module').then( m => m.ClasesPageModule)
      },
      {
        path: 'bienvenido',
        loadChildren: () => import('../bienvenido/bienvenido.module').then( m => m.BienvenidoPageModule)
      },
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
