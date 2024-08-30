import { IFacturas } from './../Interfaces/ifacturas';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  apiurl = 'http://localhost/sexto/03mvc/controllers/facturas.controller.php?op=';

  constructor(private lector: HttpClient) {}

  todos(): Observable<IFacturas[]> {
    return this.lector.get<IFacturas[]>(this.apiurl + 'todos');
  }

  uno(idFactura: number): Observable<IFacturas> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<IFacturas>(this.apiurl + 'uno', formData);
  }

  eliminar(idFactura: number): Observable<number> {
    const formData = new FormData();
    formData.append('idFactura', idFactura.toString());
    return this.lector.post<number>(this.apiurl + 'eliminar', formData);
  }

  insertar(factura: IFacturas): Observable<string> {
    const formData = new FormData();
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_total', factura.Sub_total.toString());
    formData.append('Sub_total_iva', factura.Sub_total_iva.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Clientes_idClientes', factura.Clientes_idClientes.toString());
    return this.lector.post<string>(this.apiurl + 'insertar', formData);
  }

  actualizar(factura: IFacturas): Observable<string> {
    const formData = new FormData();
    formData.append('idFactura', factura.idFactura.toString());
    formData.append('Fecha', factura.Fecha);
    formData.append('Sub_total', factura.Sub_total.toString());
    formData.append('Sub_total_iva', factura.Sub_total_iva.toString());
    formData.append('Valor_IVA', factura.Valor_IVA.toString());
    formData.append('Clientes_idClientes', factura.Clientes_idClientes.toString());
    return this.lector.post<string>(this.apiurl + 'actualizar', formData);
  }
}
