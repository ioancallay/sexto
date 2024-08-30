<?php

require_once('../config/conexion.php');

class Productos
{

    //TODO: Metodo que trae la lista de todos los Productos
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Productos";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }

    //TODO: Meetodo para traer un solo producto por su Id
    public function uno($idProductos)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Productos WHERE idProductos=$idProductos";
        $resultado = mysqli_query($con, $cadena);
        $con->close();
        return $resultado;
    }

    //TODO: Metodo para insertar un producto
    public function insertar($Codigo_Barras, $Nombre_Producto, $Graba_IVA)
    {

        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO Productos (Codigo_Barras, Nombre_Producto, Graba_IVA) VALUES ('$Codigo_Barras', '$Nombre_Producto', $Graba_IVA)";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $e) {
            return $e->getMessage();
        } finally {
            $con->close();
        }
    }

    //TODO: Metodo para actualizar un producto
    public function actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Graba_IVA)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE Productos SET Codigo_Barras='$Codigo_Barras', Nombre_Producto=$Nombre_Producto, Graba_IVA=$Graba_IVA WHERE idProductos=$idProductos";
            if (mysqli_query($con, $cadena)) {
                return $idProductos;
            } else {
                return $con->error;
            }
        } catch (Exception $e) {
            return $e->getMessage();
        } finally {
            $con->close();
        }
    }

    //TODO: Metodo para eliminar el producto
    public function eliminar($idProductos)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM Productos WHERE idProductos=$idProductos";
            if (mysqli_query($con, $cadena)) {
                return $idProductos;
            } else {
                return $con->error;
            }
        } catch (Exception $e) {
            return $e->getMessage();
        } finally {
            $con->close();
        }
    }
}
