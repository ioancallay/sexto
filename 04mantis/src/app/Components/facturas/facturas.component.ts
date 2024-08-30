import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FacturasService } from 'src/app/Services/facturas.service';
import { IFacturas } from './../../Interfaces/ifacturas';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IClientes } from 'src/app/Interfaces/iclientes';
import { ClientesService } from 'src/app/Services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [SharedModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.scss'
})
export class FacturasComponent implements OnInit {
  listaFacturas: IFacturas[] = [];
  titulo: string = 'Facturas';
  frm_factura: FormGroup;
  totalapagar: number = 0;
  listaClientes: IClientes[] = [];

  constructor(
    private FacturaServicio: FacturasService,
    private ClienteServicio: ClientesService
  ) {}
  ngOnInit(): void {
    this.cargarClientes();
    // this.FacturaServicio.todos().subscribe((data: IFactura[]) => {
    //   this.listaFacturas = data;
    // });
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.FacturaServicio.todos().subscribe((facturas: IFacturas[]) => {
      this.listaFacturas = facturas;
    });
  }

  cargarClientes() {
    this.ClienteServicio.todos().subscribe((data) => (this.listaClientes = data));
  }

  eliminar(idFactura: number) {
    Swal.fire({
      title: 'Clientes',
      text: 'Esta seguro que desea eliminar la factura!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Emliminar factura'
    }).then((result) => {
      if (result.isConfirmed) {
        this.FacturaServicio.eliminar(idFactura).subscribe((data) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se ha completado el trabajo',
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarFacturas();
        });
      }
    });
  }

  calculos() {
    let sub_total = this.frm_factura.get('Sub_total')?.value;
    let iva = this.frm_factura.get('Valor_IVA')?.value;
    let sub_total_iva = sub_total * iva;
    this.frm_factura.get('Sub_total_iva')?.setValue(sub_total_iva);
    this.totalapagar = parseInt(sub_total) + sub_total_iva;
  }

  cambio() {}
}
