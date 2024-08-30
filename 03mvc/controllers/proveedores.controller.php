<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/proveedores.model.php');
error_reporting(0);
$proveedores = new Proveedores();

switch ($_GET['op']) {

    case "todos":
        $datos = array();
        $datos = $proveedores->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case "uno":
        if (!isset($_POST['idProveedores'])) {
            echo json_encode(["error" => "Missing 'idProveedores' parameter."]);
            break;
        }
        $idProveedores  = $_POST['idProveedores'];
        $datos = array();
        $datos = $proveedores->uno($idProveedores);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case "insertar":
        if (!isset($_POST['Nombre_Empresa']) || !isset($_POST['Direccion']) || !isset($_POST['Telefono']) || !isset($_POST['Contacto_Empresa']) || !isset($_POST['Telefono_Contacto'])) {
            echo json_encode(["error" => "Missing required parameters."]);
            break;
        }
        $Nombre_Empresa = $_POST['Nombre_Empresa'];
        $Direccion = $_POST['Direccion'];
        $Telefono = $_POST['Telefono'];
        $Contacto_Empresa = $_POST['Contacto_Empresa'];
        $Telefono_Contacto = $_POST['Telefono_Contacto'];
        $datos = array();
        $datos = $proveedores->insertar($Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto);
        echo json_encode($datos);
        break;

    case "actualizar":
        if (!isset($_POST['idProveedores']) || !isset($_POST['Nombre_Empresa']) || !isset($_POST['Direccion']) || !isset($_POST['Telefono']) || !isset($_POST['Contacto_Empresa']) || !isset($_POST['Telefono_Contacto'])) {
            echo json_encode(["error" => "Missing required parameters."]);
            break;
        }
        $idProveedores = $_POST['idProveedores'];
        $Nombre_Empresa = $_POST['Nombre_Empresa'];
        $Direccion = $_POST['Direccion'];
        $Telefono = $_POST['Telefono'];
        $Contacto_Empresa = $_POST['Contacto_Empresa'];
        $Telefono_Contacto = $_POST['Telefono_Contacto'];
        $datos = array();
        $datos = $proveedores->actualizar($idProveedores, $Nombre_Empresa, $Direccion, $Telefono, $Contacto_Empresa, $Telefono_Contacto);
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST['idProveedores'])) {
            echo json_encode(["error" => "Missing 'idProveedores' parameter."]);
            break;
        }
        $idProveedores = $_POST['idProveedores'];
        $datos = array();
        $datos = $proveedores->eliminar($idProveedores);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
