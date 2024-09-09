<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// Controlador de Unidad de Medida Tienda Cel@g

require_once '../models/iva.model.php';
error_reporting(1);

$iva = new Iva();

switch ($_GET["op"]) {
    case 'activos':
        $datos = array();
        $datos = $iva->activos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos':
        $datos = array();
        $datos = $iva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);

        break;

    case 'uno':
        if (!isset($_POST['idIVA'])) {
            echo json_encode(["error: " => "Valor de IVA no especificado"]);
            exit();
        }
        $datos = array();
        $datos = $iva->uno('idIVA');
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

        // case 'insertIva':
        //     $iva->insertar();
        //     break;

        // case 'updateIva':
        //     $iva->actualizar();
        //     break;

        // case 'deleteIva':
        //     $iva->eliminar();
        //     break;

    default:
        echo json_encode(["error: " => "Operación no válida"]);
}
