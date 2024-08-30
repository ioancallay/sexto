<?php

require_once('../config/conexion.php');

class Proveedores
{

    //TODO: Implementar los metodos de la clase Proveedores
    public function todos() //TODO: Implementar el metodo getProveedores
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $statement = "SELECT * FROM Proveedores";
        $datos = mysqli_query($con, $statement);
        $con->close();
        return $datos;
    }

    //TODO: 
    public function uno($idProveedores) //TODO: Implementar el metodo getProveedorPorID
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Proveedores WHERE idProveedores=$idProveedores";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto) //TODO: Implementar el metodo insertProveedor
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $statement = "INSERT INTO Proveedores (Nombre_Empresa, Direccion, Telefono, Contacto_Empresa, Telefono_Contacto) VALUES ('$Nombre_Empresa', '$Direccion', '$Telefono', '$Contacto_Empresa', '$Telefono_Contacto')";
            if (mysqli_query($con, $statement)) {
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

    public function actualizar($idProveedores, $Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto) //TODO: Implementar el metodo updateProveedor
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $statement = "UPDATE Proveedores SET Nombre_Empresa = '$Nombre_Empresa', Direccion = '$Direccion', Telefono = '$Telefono', Contacto_Empresa = '$Contacto_Empresa', Telefono_Contacto = '$Telefono_Contacto' WHERE idProveedores = $idProveedores";
            if (mysqli_query($con, $statement)) {
                return $idProveedores;
            } else {
                return $con->error;
            }
        } catch (Exception $e) {
            return $e->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idProveedores) //TODO: Implementar el metodo deleteProveedor
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoConectar();
            $statement = "DELETE FROM Proveedores WHERE idProveedores = $idProveedores";
            if (mysqli_query($con, $statement)) {
                return $idProveedores;
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
