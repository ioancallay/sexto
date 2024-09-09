import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IIva } from 'src/app/Interfaces/iiva';
import { IvaService } from 'src/app/Services/iva.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-iva',
  standalone: true,
  imports: [SharedModule, RouterLink, CommonModule],
  templateUrl: './iva.component.html',
  styleUrl: './iva.component.scss'
})
export class IvaComponent implements OnInit {
  listaIva: IIva[] = [];

  title: string = 'Lista de valores IVA';

  constructor(private ServicioIva: IvaService) {}

  ngOnInit(): void {
    this.cargarIva();
    // console.log(this.listaIva);
  }

  cargarIva() {
    this.ServicioIva.todos().subscribe((iva) => (this.listaIva = iva));
  }
  grabar() {}

  eliminar(idIVA: number) {}
}
