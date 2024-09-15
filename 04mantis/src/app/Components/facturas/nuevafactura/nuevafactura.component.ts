import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, Event } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFacturas } from 'src/app/Interfaces/ifacturas';
import { IClientes } from 'src/app/Interfaces/iclientes';
import { ClientesService } from 'src/app/Services/clientes.service';
import { FacturasService } from 'src/app/Services/facturas.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { start } from 'repl';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-nuevafactura',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './nuevafactura.component.html',
  styleUrl: './nuevafactura.component.scss'
})
export class NuevafacturaComponent implements OnInit {
  //variables o constantes
  titulo = 'Nueva Factura';
  cliente: string;
  listaClientes: IClientes[] = [];
  listaClientesFiltrada: IClientes[] = [];
  totalapagar: number = 0;
  valor_iva: number = 0;
  iva: number = 0.15;
  num_autorizacion: string = '1209202401171573007100120011000000000444185710217';
  total_pago: number;
  today: Date = new Date();
  pipe: DatePipe = new DatePipe('en-US');
  today_format: string = this.pipe.transform(this.today, 'yyyy-MM-dd HH:mm:ss') as string;
  today_format_input: string = this.pipe.transform(this.today, 'dd/MM/yyyy') as string;
  //formgroup
  frm_factura: FormGroup;
  productoelejido: any[] = [
    {
      Descripcion: 'Producto 1',
      Cantidad: 2,
      Precio: 1000,
      Subtotal: 1000,
      IVA: 12,
      Total: 1000
    },
    {
      Descripcion: 'Producto 2',
      Cantidad: 2,
      Precio: 1000,
      Subtotal: 2000,
      IVA: 12,
      Total: 2000
    },
    {
      Descripcion: 'Producto 3',
      Cantidad: 2,
      Precio: 1000,
      Subtotal: 3000,
      IVA: 12,
      Total: 3000
    }
  ];

  ///////
  constructor(
    private ClientesServicio: ClientesService,
    private facturaService: FacturasService,
    private navegacion: Router,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    JsBarcode('#num_autorizacion', this.num_autorizacion);
    this.frm_factura = new FormGroup({
      Fecha: new FormControl('', Validators.required),
      Sub_total: new FormControl('', Validators.required),
      Sub_total_iva: new FormControl('', Validators.required),
      Valor_IVA: new FormControl('0.15', Validators.required),
      Clientes_idClientes: new FormControl('', Validators.required)
    });
    this.ClientesServicio.todos().subscribe({
      next: (data) => {
        this.listaClientes = data;
        this.listaClientesFiltrada = data;
      },
      error: (e) => {
        console.log(e);
      }
    });

    // this.uncliente(this.frm_factura.get('Clientes_idClientes').value);
    this.productoelejido.reduce((valor, producto) => {
      this.totalapagar += producto.Total;
    }, 0);
    this.frm_factura.setValue({ Fecha: this.today_format_input });
    // this.frm_factura.get('Fecha')?.value(this.today_format_input);
    let iva = this.frm_factura.get('Valor_IVA')?.value;
    this.frm_factura.get('Sub_total_iva')?.setValue(this.totalapagar * iva);

    this.frm_factura.get('Sub_total')?.setValue(this.totalapagar);
    this.frm_factura.get('total')?.setValue(this.totalapagar + this.totalapagar * iva);
  }

  // uncliente(Clientes_idClientes: number) {
  //   let cliente_id: any = {
  //     Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
  //   };
  //   this.ClientesServicio.uno(cliente_id.Clientes_idClientes).subscribe((uncliente) => {
  //     this.cliente = uncliente.Nombres;
  //     console.log(this.cliente);
  //   });
  // }
  grabar() {
    //pdf copn html2canva
    /*
    const DATA: any = document.getElementById('impresion');
    html2canvas(DATA).then((html) => {
      const anchoorignal = html.width;
      const altooriginal = html.height;

      const imgAncho = (anchoorignal * 1 * 200) / anchoorignal;
      const imgAlto = (altooriginal * 1 * 200) / altooriginal;

      const constenido = html.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const posicion = 0;
      pdf.addImage(constenido, 'PNG', 0, posicion, imgAncho, imgAlto);
      pdf.save('factura.pdf');
    });
    */

    // pdf con jspdf

    let factura: IFacturas = {
      Fecha: this.frm_factura.get('Fecha')?.value,
      Sub_total: this.frm_factura.get('Sub_total')?.value,
      Sub_total_iva: this.frm_factura.get('Sub_total_iva')?.value,
      Valor_IVA: this.frm_factura.get('Valor_IVA')?.value,
      Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
    };

    const doc = new jsPDF('p', 'mm', 'A4');

    //agregar imagen
    var img_factura = new Image();
    img_factura.src = 'assets/images/1.png';
    doc.addImage(img_factura, 'PNG', 0, 0, 90, 30);

    //inicio panel izquierdo datos de factura
    doc.setFontSize(16);
    doc.text('R.U.C: 1234567890001', 110, 10);
    doc.text('FACTURA', 110, 20);
    doc.setFontSize(8);
    doc.text('No. 001-001-000000001', 110, 25);
    doc.text('NÚMERO DE AUTORIZACIÓN', 110, 30);
    doc.text('1209202401171573007100120011000000000444185710217', 110, 35);
    doc.text('FECHA DE AUTORIZACIÓN:', 110, 40);
    doc.text(this.today_format, 150, 40);
    doc.text('AMBIENTE:', 110, 45);
    doc.text('PRODUCCION', 150, 45);
    doc.text('EMISIÓN:', 110, 50);
    doc.text('NORMAL', 150, 50);
    doc.text('CLAVE DE ACCESO', 110, 55);
    // const img = document.querySelector('img');
    // console.log(img);
    // if (code_bar) {
    //   doc.addImage(code_bar, 110, 65, 80, 80);
    // }
    const img = document.querySelector('#num_autorizacion') as HTMLImageElement;

    if (img) {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = canvas.toDataURL('image/png'); // Convierte la imagen a base64
        doc.addImage(imgData, 'PNG', 108, 56, 90, 10);
      }
    }
    doc.text('1209202401171573007100120011000000000444185710217', 110, 70);

    //fin panel izquierdo datos de factura
    doc.text('NOMBRE: IVAN ANCALLAY REA', 10, 35);
    doc.text('IOASYSTEM', 10, 40);
    doc.text('Dirección Matriz: Calle Falsa 123, Quito, Ecuador', 10, 45, { align: 'justify', lineHeightFactor: 1, maxWidth: 90 });
    doc.text('Dirección Sucursal: Calle Falsa 123, Quito, Ecuador', 10, 55, { align: 'justify', lineHeightFactor: 1, maxWidth: 90 });
    doc.text('OBLIGADO A LLEVAR CONTABILIDAD', 10, 65);
    doc.text('NO', 80, 65);
    doc.text('CONTRIBUYENTE NEGOCIO POPULAR - RÉGIMEN RIMPE', 10, 70);

    doc.line(10, 75, 200, 75);

    //inicio panel datos del cliente
    doc.setFontSize(8);
    doc.text('Razón Social / Nombres y Apellidos: ' + this.cliente, 10, 80);
    doc.text('Identificación: 1234567890', 10, 85);
    doc.text('Fecha: ' + this.today_format, 10, 90);
    doc.text('Dirección: Calle Ejemplo 456, Guayaquil, Ecuador', 10, 95);
    doc.text('Teléfono: +593 987 654 321', 10, 100);
    //fin panel datos del cliente

    //inicio creacion de la tabla de productos
    doc.setFontSize(10);
    doc.line(10, 105, 200, 105);
    doc.setFontSize(8);
    const columnas = ['Descripcion', 'Cantidad', 'Precio', 'Subtotal', 'IVA', 'Total'];
    const filas: any[] = [];
    this.productoelejido.forEach((producto) => {
      const fila = [producto.Descripcion, producto.Cantidad, producto.Precio, producto.Subtotal, producto.IVA, producto.Total];
      filas.push(fila);
    });

    (doc as any).autoTable({
      head: [columnas],
      body: filas,
      startY: 110,
      theme: 'grid',
      columnStyles: { first_name: { fillColor: [255, 255, 255], textColor: 255, fontStyle: 'bold' } },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontSize: 8,
        padding: 0
      },
      styles: {
        fontSize: 8,
        font: 'helvetica',
        cellPadding: 2,
        minCellHeight: 2
      }
    });
    //fin tabla productos

    //inicio panel información adicional
    const finalY = (doc as any).autoTable.previous.finalY;
    doc.line(10, finalY + 5, 100, finalY + 5);
    doc.text('Información Adicional: ', 10, finalY + 10);
    doc.text('Email:', 10, finalY + 15);
    doc.text('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 30, finalY + 15);

    doc.line(10, finalY + 20, 100, finalY + 20);

    doc.text('Forma de pago: ', 10, finalY + 25, null, { align: 'center' });
    doc.text('Valor: ', 80, finalY + 25, null, { align: 'center' });
    doc.text('01 - SIN UTILIZACION DEL SISTEMA FINANCIERO', 10, finalY + 30);
    doc.text('25.00', 80, finalY + 30);
    doc.line(10, finalY + 35, 100, finalY + 35);
    //fin panel información adicional

    //inicio panel totales
    this.total_pago = factura.Sub_total + factura.Sub_total_iva;
    this.total_pago = Math.round(this.total_pago * 100) / 100;
    doc.text('Subtotal: ', 155, finalY + 5);
    doc.text('' + factura.Sub_total, 195, finalY + 5, { align: 'right' });
    doc.text('Sub Total IVA:', 155, finalY + 10);
    doc.text('' + factura.Sub_total_iva, 195, finalY + 10, { align: 'right' });
    doc.text('IVA: ', 155, finalY + 15);
    doc.text('' + factura.Valor_IVA, 195, finalY + 15, { align: 'right' });
    doc.text('Total a Pagar: ', 155, finalY + 20);
    doc.text('' + this.total_pago, 195, finalY + 20, { align: 'right' });
    //fin panel totales

    //inicio numeración pie de página
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text('Página ' + String(i) + ' de ' + String(pageCount), 10, 290);
    }
    //fin numeración pie de página

    doc.setPage(1);
    doc.save('factura.pdf');
    // let factura: IFactura = {
    //   Fecha: this.frm_factura.get('Fecha')?.value,
    //   Sub_total: this.frm_factura.get('Sub_total')?.value,
    //   Sub_total_iva: this.frm_factura.get('Sub_total_iva')?.value,
    //   Valor_IVA: this.frm_factura.get('Valor_IVA')?.value,
    //   Clientes_idClientes: this.frm_factura.get('Clientes_idClientes')?.value
    // };

    this.facturaService.insertar(factura).subscribe((respuesta) => {
      if (parseInt(respuesta) > 0) {
        alert('Factura grabada');
        this.navegacion.navigate(['/facturas']);
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

  cambio(objetoSleect: any) {
    let idCliente = objetoSleect.target.value;
    this.frm_factura.get('Clientes_idClientes')?.setValue(idCliente);
  }
  productosLista(evnto) {
    alert('lista de prductos cargandp');
    //servicio de prodcuto para cargar los productos
  }
  cargaModal(valoresModal: any) {
    //productoelejido

    const nuevoProducto: any = {
      Descripcion: 'prodcuto 4',
      Cantidad: 15,
      Precio: 12.23,
      Subtotal: 15.2,
      IVA: 15,
      Total: 185.9
    };
    this.productoelejido.push(nuevoProducto);
    this.modal.dismissAll();

    this.productoelejido.reduce((valor, producto) => {
      this.totalapagar += producto.Total;
      this.totalapagar = Math.round(this.totalapagar * 100) / 100;
    }, 0);

    this.frm_factura.get('Sub_total')?.setValue(this.totalapagar);
    this.frm_factura.get('Sub_total_iva')?.setValue(this.totalapagar * this.iva);
  }
}
