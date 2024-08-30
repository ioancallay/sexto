export interface IFacturas {
  idFactura?: number;
  Fecha: string;
  Sub_total: number;
  Sub_total_iva: number;
  Valor_IVA: number;
  Clientes_idClientes: number;
  Nombres?: string;
  Cedula?: string;
  total?: number;
}
