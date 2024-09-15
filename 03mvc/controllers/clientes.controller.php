<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/clientes.model.php');
error_reporting(1);
$clientes = new Clientes();

switch ($_GET["op"]) {
    case 'todos':
        $datos = array();
        $datos = $clientes->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        if (!isset($_POST["idClientes"])) {
            echo json_encode(["error" => "Missing 'idClientes' parameter."]);
            exit();
        }
        $idClientes = $_POST["idClientes"];
        $datos = array();
        $datos = $clientes->uno($idClientes);
        $resultado = mysqli_fetch_assoc($datos);
        echo json_encode($resultado);
        break;

    case 'insertar':
        if (!isset($_POST["Nombres"]) || !isset($_POST["Direccion"]) || !isset($_POST["Telefono"]) || !isset($_POST["Cedula"]) || !isset($_POST["Correo"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }
        $Nombres = $_POST["Nombres"];
        $Direccion = $_POST["Direccion"];
        $Telefono = $_POST["Telefono"];
        $Cedula = $_POST["Cedula"];
        $Correo = $_POST["Correo"];
        $datos = array();
        $datos = $clientes->insertar($Nombres, $Direccion, $Telefono, $Cedula, $Correo);
        echo json_encode($datos);
        break;
    case 'actualizar':
        if (!isset($_POST["idClientes"]) || !isset($_POST["Nombres"]) || !isset($_POST["Direccion"]) || !isset($_POST["Telefono"]) || !isset($_POST["Cedula"]) || !isset($_POST["Correo"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }
        $idClientes = $_POST["idClientes"];
        $Nombres = $_POST["Nombres"];
        $Direccion = $_POST["Direccion"];
        $Telefono = $_POST["Telefono"];
        $Cedula = $_POST["Cedula"];
        $Correo = $_POST["Correo"];
        $datos = array();
        $datos = $clientes->actualizar($idClientes, $Nombres, $Direccion, $Telefono, $Cedula, $Correo);
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST["idClientes"])) {
            echo json_encode(["error" => "Missing 'idClientes' parameter."]);
            exit();
        }
        $idClientes = $_POST["idClientes"];
        $datos = array();
        $datos = $clientes->eliminar($idClientes);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
