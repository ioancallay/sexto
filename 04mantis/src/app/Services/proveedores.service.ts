import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProveedores } from '../Interfaces/iproveedores';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  apiurl = 'http://localhost/sexto/03mvc/controllers/proveedores.controller.php?op=';

  constructor(private http: HttpClient) {}

  //TODO: Método para mostrar todos los proveedores
  todos(): Observable<IProveedores[]> {
    return this.http.get<IProveedores[]>(this.apiurl + 'todos');
  }

  //TODO: Método para mostrar un proveedor
  uno(idProveedores: number): Observable<IProveedores> {
    const formData = new FormData();
    formData.append('idProveedores', idProveedores.toString());
    return this.http.post<IProveedores>(this.apiurl + 'uno', formData);
  }

  //TODO: Método para insertar un proveedor
  insertar(proveedores: IProveedores): Observable<string> {
    const formData = new FormData();
    formData.append('Nombre_Empresa', proveedores.Nombre_Empresa);
    formData.append('Direccion', proveedores.Direccion);
    formData.append('Telefono', proveedores.Telefono);
    formData.append('Contacto_Empresa', proveedores.Contacto_Empresa);
    formData.append('Telefono_Contacto', proveedores.Telefono_Contacto);
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }

  //TODO: Método para actualizar un proveedor
  actualizar(proveedores: IProveedores): Observable<string> {
    const formData = new FormData();
    formData.append('idProveedores', proveedores.idProveedores.toString());
    formData.append('Nombre_Empresa', proveedores.Nombre_Empresa);
    formData.append('Direccion', proveedores.Direccion);
    formData.append('Telefono', proveedores.Telefono);
    formData.append('Contacto_Empresa', proveedores.Contacto_Empresa);
    formData.append('Telefono_Contacto', proveedores.Telefono_Contacto);
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  //TODO: Método para eliminar un proveedor
  eliminar(idProveedores: number): Observable<number> {
    const formData = new FormData();
    formData.append('idProveedores', idProveedores.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
}
