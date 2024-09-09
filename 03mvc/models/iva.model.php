<?php
// Modelo de UnidadDeMedida
require_once('../config/conexion.php');

class IVA
{
    public function todos()
    {
        //Obtener todas los valores del IVA
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $sql = "SELECT * FROM IVA";
        $datos = mysqli_query($con, $sql);
        return $datos;
    }

    public function uno($idIVA)
    {
        //Obtener un valor de IVA por ID
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $sql = "SELECT * FROM IVA WHERE idIVA = $idIVA";
        $datos = mysqli_query($con, $sql);
        return $datos;
    }
}
