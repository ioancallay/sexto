<?php
require_once('../config/conexion.php');

class UsuariosModel
{
    public function todos()
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT u.Nombre_Usuario, u.Estado, r.Detalle FROM Usuarios u JOIN Roles r ON u.Roles_idRoles = r.idRoles";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function uno($idUsuarios)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Usuarios WHERE idUsuarios = $idUsuarios";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function insertar($Nombre_Usuario, $Contrasenia, $Estado, $Roles_idRoles)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "INSERT INTO Usuarios (Nombre_Usuario, Contrasenia, Estado, Roles_idRoles) VALUES ('$Nombre_Usuario', '" . md5($Contrasenia) . "', $Estado, $Roles_idRoles)";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function actualizar($idUsuarios, $Nombre_Usuario, $Contrasenia, $Estado, $Roles_idRoles)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "UPDATE Usuarios SET Nombre_Usuario = '$Nombre_Usuario', Contrasenia = '" . md5($Contrasenia) . "', Estado = $Estado, Roles_idRoles = $Roles_idRoles WHERE idUsuarios = $idUsuarios";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function eliminar($idUsuarios)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "DELETE FROM Usuarios WHERE idUsuarios = $idUsuarios";
        $datos = mysqli_query($con, $cadena);
        return $datos;
        $con->close();
    }
    public function login($Nombre_Usuario, $Contrasenia)
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoConectar();
        $cadena = "SELECT * FROM Usuarios WHERE Nombre_Usuario = '$Nombre_Usuario' and estado = 1"; // ' or 1=1 -- 
        $datos = mysqli_query($con, $cadena);
        if ($datos && mysqli_num_rows($datos) > 0) {
            $usuario = mysqli_fetch_assoc($datos);
            // if (password_verify(md5($Contrasenia), $usuario['Contrasenia'])) {
            if (md5($Contrasenia) == $usuario['Contrasenia']) {
                return $usuario;
            } else {
                return false;
            }
        }
    }
}
