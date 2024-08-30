<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

require_once('../models/productos.model.php');
error_reporting(0);
$productos = new Productos();

switch ($_GET["op"]) {

    case 'todos':
        $datos = array();
        $datos = $productos->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno':
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Missing 'idProductos' parameter."]);
            return;
        }
        $idProductos = $_POST["idProductos"];
        $datos = array();
        $datos = $productos->uno($idProductos);
        $resultado = mysqli_fetch_assoc($datos);
        echo json_encode($resultado);
        break;

    case 'insertar':
        if (!isset($_POST["Codigo_Barras"]) || !isset($_POST["Nombre_Producto"]) || !isset($_POST["Grava_IVA"])) {
            echo json_encode(["error" => "Missing required fields."]);;
            return;
        }
        $Codigo_Barras = $_POST["Codigo_Barras"];
        $Nombre_Producto = $_POST["Nombre_Producto"];
        $Grava_IVA = $_POST["Grava_IVA"];
        $datos = array();
        $datos = $productos->insertar($Codigo_Barras, $Nombre_Producto, $Grava_IVA);
        echo json_encode($datos);
        break;

    case 'actualizar':
        if (!isset($_POST["idProductos"]) || !isset($_POST["Codigo_Barras"]) || !isset($_POST["Nombre_Producto"]) || !isset($_POST["Grava_IVA"])) {
            echo json_encode(["error" => "Missing required fields."]);;
            return;
        }
        $id = $_POST["idProductos"];
        $Codigo_Barras = $_POST["Codigo_Barras"];
        $Nombre_Producto = $_POST["Nombre_Producto"];
        $Grava_IVA = $_POST["Grava_IVA"];
        $datos = array();
        $datos = $productos->actualizar($idProductos, $Codigo_Barras, $Nombre_Producto, $Grava_IVA);
        echo json_encode($datos);
        break;

    case 'eliminar':
        if (!isset($_POST["idProductos"])) {
            echo json_encode(["error" => "Missing 'idProductos' parameter."]);
            return;
        }
        $idProductos = $_POST["idProductos"];
        $datos = array();
        $datos = $productos->eliminar($idProductos);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
