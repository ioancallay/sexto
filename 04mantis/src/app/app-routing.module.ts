import { UsuariosGuardGuard } from './Guards/usuarios-guard.guard';
// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component'),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'proveedores',
        loadComponent: () => import('./Components/proveedores/proveedores.component').then((c) => c.ProveedoresComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'nuevoproveedor',
        loadComponent: () =>
          import('./Components/proveedores/nuevoproveedor/nuevoproveedor.component').then((c) => c.NuevoproveedorComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'editarproveedor/:idProveedores',
        loadComponent: () =>
          import('./Components/proveedores/nuevoproveedor/nuevoproveedor.component').then((c) => c.NuevoproveedorComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'productos',
        loadComponent: () => import('./Components/productos/productos.component').then((c) => c.ProductosComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'clientes',
        loadComponent: () => import('./Components/clientes/clientes.component').then((c) => c.ClientesComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'nuevocliente',
        loadComponent: () => import('./Components/clientes/nuevocliente/nuevocliente.component').then((c) => c.NuevoclienteComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'editarcliente/:idClientes',
        loadComponent: () => import('./Components/clientes/nuevocliente/nuevocliente.component').then((c) => c.NuevoclienteComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'editarfactura/:idFactura',
        loadComponent: () => import('./Components/facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'nuevafactura',
        loadComponent: () => import('./Components/facturas/nuevafactura/nuevafactura.component').then((m) => m.NuevafacturaComponent),
        canActivate: [UsuariosGuardGuard]
      },
      {
        path: 'facturas',
        loadComponent: () => import('./Components/facturas/facturas.component').then((m) => m.FacturasComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
