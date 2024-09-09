import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IIva } from 'src/app/Interfaces/iiva';
import { IProductos } from 'src/app/Interfaces/iproductos';
import { IProveedores } from 'src/app/Interfaces/iproveedores';
import { IvaService } from 'src/app/Services/iva.service';
import { ProductoService } from 'src/app/Services/productos.service';
import { ProveedoresService } from 'src/app/Services/proveedores.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { IUnidadmedida } from 'src/app/Interfaces/iunidadmedida';
import { UnidadmedidaService } from 'src/app/Services/unidadmedida.service';

@Component({
  selector: 'app-nuevoproducto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './nuevoproducto.component.html',
  styleUrl: './nuevoproducto.component.scss'
})
export class NuevoproductoComponent implements OnInit {
  listaUnidadMedida: IUnidadmedida[] = [];
  listaProductos: IProductos[] = [];
  listaProveedores: IProveedores[] = [];
  listaIva: IIva[] = [];
  title = 'Lista de productos';
  idProducto = 0;
  btn_save: string;
  btn_confirm: string;
  mensaje: string;
  titulo: string;

  frm_Producto: FormGroup;
  constructor(
    private ServicioUnidadMedida: UnidadmedidaService,
    private fb: FormBuilder,
    private ServicioProveedor: ProveedoresService,
    private ServicioIva: IvaService,
    private ServicioProducto: ProductoService,
    private rutas: ActivatedRoute,
    private navegacion: Router
  ) {}
  ngOnInit(): void {
    this.btn_save = 'Crear producto';
    this.btn_confirm = 'Crear producto!';
    this.mensaje = 'Desea crear el producto ';
    this.ServicioUnidadMedida.todos().subscribe((data) => (this.listaUnidadMedida = data));
    this.ServicioProveedor.todos().subscribe((data) => (this.listaProveedores = data));
    this.ServicioIva.activos().subscribe((data) => (this.listaIva = data));

    this.crearFormulario();
    this.cargarProductos();

    /*
1.- Modelo => Solo el procedieminto para realizar un select
2.- Controador => Solo el procedieminto para realizar un select
3.- Servicio => Solo el procedieminto para realizar un select
4.-  realizar el insertar y actualizar

*/
  }

  cargarProductos(){
    this.ServicioProducto.todos().subscribe((data) => (this.listaProductos = data));
  }

  crearFormulario() {
    /* this.frm_Producto = this.fb.group({
      Codigo_Barras: ['', Validators.required],
      Nombre_Producto: ['', Validators.required],
      Graba_IVA: ['', Validators.required],
      Unidad_Medida_idUnidad_Medida: ['', Validators.required],
      IVA_idIVA: ['', Validators.required],
      Cantidad: ['', [Validators.required, Validators.min(1)]],
      Valor_Compra: ['', [Validators.required, Validators.min(0)]],
      Valor_Venta: ['', [Validators.required, Validators.min(0)]],
      Proveedores_idProveedores: ['', Validators.required]
    });*/
    this.frm_Producto = new FormGroup({
      Codigo_Barras: new FormControl('', Validators.required),
      Nombre_Producto: new FormControl('', Validators.required),
      Graba_IVA: new FormControl('', Validators.required),
      Unidad_Medida_idUnidad_Medida: new FormControl('', Validators.required),
      IVA_idIVA: new FormControl('', Validators.required),
      Cantidad: new FormControl('', [Validators.required, Validators.min(1)]),
      Valor_Compra: new FormControl('', [Validators.required, Validators.min(0)]),
      Valor_Venta: new FormControl('', [Validators.required, Validators.min(0)]),
      Proveedores_idProveedores: new FormControl('', Validators.required)
    });
  }

  grabar() {
    let producto: IProductos = {
      Codigo_Barras: this.frm_Producto.value.Codigo_Barras,
      Nombre_Producto: this.frm_Producto.value.Nombre_Producto,
      Graba_IVA: this.frm_Producto.value.Graba_IVA,
      Unidad_Medida_idUnidad_Medida: this.frm_Producto.value.Unidad_Medida_idUnidad_Medida,
      IVA_idIVA: this.frm_Producto.value.IVA_idIVA,
      Cantidad: this.frm_Producto.value.Cantidad,
      Valor_Compra: this.frm_Producto.value.Valor_Compra,
      Valor_Venta: this.frm_Producto.value.Valor_Venta,
      Proveedores_idProveedores: this.frm_Producto.value.Proveedores_idProveedores
    };

    console.log(producto);

    Swal.fire({
      title: 'Unidad de Medida',
      text: this.mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: '#3085d6',
      confirmButtonText: this.btn_confirm
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.idProducto > 0) {
          producto.idProductos = this.idProducto;
          this.ServicioProducto.actualizar(producto).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/productos']);
          });
        } else {
          this.ServicioProducto.insertar(producto).subscribe((data) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Proceso completado',
              showConfirmButton: false,
              timer: 2000
            });
            this.navegacion.navigate(['/productos']);
          });
        }
      }
    });

    // if (this.idProducto == 0) {
    //   this.ServicioProducto.insertar(producto).subscribe((x) => {
    //     Swal.fire('Exito', 'La unidad de medida se grabo con exito', 'success');
    //     this.navegacion.navigate(['/producto']);
    //   });
    // } else {
    //   producto.idUnidad_Medida = this.idProducto;
    //   this.ServicioProducto.actualizar(producto).subscribe((x) => {
    //     Swal.fire('Exito', 'La unidad de medida se modifico con exito', 'success');
    //     this.navegacion.navigate(['/producto']);
    //   });
    // }
  }
}
