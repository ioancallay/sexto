import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IClientes } from '../Interfaces/iclientes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  apiurl = 'http://localhost/sexto/03mvc/controllers/clientes.controller.php?op=';

  constructor(private http: HttpClient) {}

  //TODO: Método para mostrar todos los cliente
  todos(): Observable<IClientes[]> {
    return this.http.get<IClientes[]>(this.apiurl + 'todos');
  }

  //TODO: Método para mostrar un cliente por id
  uno(idClientes: number): Observable<IClientes> {
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.http.post<IClientes>(this.apiurl + 'uno', formData);
  }

  //TODO: Método para insertar un cliente
  insertar(cliente: IClientes): Observable<IClientes> {
    const formData = new FormData();
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.http.post<IClientes>(this.apiurl + 'insertar', formData);
  }

  //TODO: Método para actualizar un cliente por id
  actualizar(cliente: IClientes): Observable<string> {
    const formData = new FormData();
    formData.append('idClientes', cliente.idClientes.toString());
    formData.append('Nombres', cliente.Nombres);
    formData.append('Direccion', cliente.Direccion);
    formData.append('Telefono', cliente.Telefono);
    formData.append('Cedula', cliente.Cedula);
    formData.append('Correo', cliente.Correo);
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

  //TODO: Método para eliminar un cliente por id
  eliminar(idClientes: number): Observable<number> {
    const formData = new FormData();
    formData.append('idClientes', idClientes.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
}
