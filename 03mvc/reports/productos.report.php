<?php
require('fpdf/fpdf.php');
require_once '../models/productos.model.php';
$productos = new Productos();

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);
$pdf->Text(40, 10, '¡Hola, Mundo!');


$pdf->SetFont('Arial', '', 12);
$texto = "Hola, mundo! Este es un ejemplo de texto en un archivo PDF generado con FPDF.";
$pdf->MultiCell(0, 5, iconv('UTF-8', 'windows-1252', $texto), 0, 'J');

$listaProductos = $productos->todos();
$x = 10;
$y = 30;

$pdf->Cell(10, 10, "#", 1);
$pdf->Cell(40, 10, "Codigo de Barras", 1);
$pdf->Cell(55, 10, "Nombre", 1);
$pdf->Cell(40, 10, "IVA", 1);

$index = 1;
$pdf->Ln();
$pdf->SetFont('Arial', '', 12);
// (`Codigo_Barras`, `Nombre_Producto`, `Graba_IVA`)
foreach ($listaProductos as $producto) {
    $pdf->Cell(10, 10, $index, 1);
    $pdf->Cell(40, 10, $producto['Codigo_Barras'], 1);
    $pdf->Cell(55, 10, $producto['Nombre_Producto'], 1);
    $pdf->Cell(40, 10, $producto['Graba_IVA'], 1);
    $pdf->Ln();
    $index++;
}

$pdf->Image('https://www.uniandes.edu.ec/wp-content/uploads/2024/07/2-headerweb-home-2.png', 0, 282, 15, 0, 'PNG');

$pdf->Cell(0, 10, 'Page ' . $pdf->PageNo(), 0, 0, 'C');
$pdf->Output();
