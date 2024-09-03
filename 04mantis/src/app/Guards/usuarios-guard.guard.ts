import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from '../Services/usuarios.service';
import { map, Observable } from 'rxjs';

// export const usuariosGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({
  providedIn: 'root'
})
export class UsuariosGuardGuard implements CanActivate {
  constructor(
    private ServicioUsuarios: UsuariosService,
    private navegacion: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.ServicioUsuarios.isLoggedIn().pipe(
      map((loggedIn: boolean) => {
        if (!loggedIn) {
          this.navegacion.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}
