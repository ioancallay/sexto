import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnidadmedida } from '../Interfaces/iunidadmedida';

@Injectable({
  providedIn: 'root'
})
export class UnidadmedidaService {
  apiurl = 'http://localhost/sexto/03MVC/controllers/unidadmedida.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IUnidadmedida[]> {
    return this.lector.get<IUnidadmedida[]>(this.apiurl + 'todos');
  }

  uno(idUnidad_Medida: number): Observable<IUnidadmedida> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', idUnidad_Medida.toString());
    return this.lector.post<IUnidadmedida>(this.apiurl + 'uno', formData);
  }

  eliminar(idUnidad_Medida: number): Observable<number> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', idUnidad_Medida.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(unidad: IUnidadmedida): Observable<string> {
    const formData = new FormData();
    formData.append('Detalle', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(unidad: IUnidadmedida): Observable<string> {
    const formData = new FormData();
    formData.append('idUnidad_Medida', unidad.idUnidad_Medida.toString());
    formData.append('Detalle', unidad.Detalle);
    formData.append('Tipo', unidad.Tipo.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}