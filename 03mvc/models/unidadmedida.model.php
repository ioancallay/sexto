<?php
// Modelo de UnidadDeMedida
require_once('../config/conexion.php');

class UnidadDeMedida
{
    public function todos() // select * from Unidad_Medida
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Unidad_Medida";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idUnidad_Medida) // select * from Unidad_Medida where id = $idUnidad_Medida
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Unidad_Medida WHERE idUnidad_Medida = $idUnidad_Medida";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Detalle, $Tipo) // insert into Unidad_Medida (...) values (...)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "INSERT INTO Unidad_Medida(Detalle, Tipo) VALUES ('$Detalle', '$Tipo')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Retorna el ID insertado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idUnidad_Medida, $Detalle, $Descripcion, $Tipo) // update Unidad_Medida set ... where id = $idUnidad_Medida
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "UPDATE Unidad_Medida SET Detalle='$Detalle', Tipo='$Tipo' WHERE idUnidad_Medida = $idUnidad_Medida";
            if (mysqli_query($con, $cadena)) {
                return $idUnidad_Medida; // Retorna el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idUnidad_Medida) // delete from Unidad_Medida where id = $idUnidad_Medida
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $cadena = "DELETE FROM Unidad_Medida WHERE idUnidad_Medida= $idUnidad_Medida";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
