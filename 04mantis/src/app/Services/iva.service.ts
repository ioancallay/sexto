import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IIva } from '../Interfaces/iiva';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IvaService implements OnInit {
  apiurl = 'http://localhost/sexto/03mvc/controllers/iva.controller.php?op=';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  todos(): Observable<IIva[]> {
    return this.http.get<IIva[]>(this.apiurl + 'todos');
  }
}
