<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos</title>
    <script src="https://code.jquery.com/jquery-3.7.1.js" integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Tienda PHP</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="clientes.php">Clientes</a>
                    <a class="nav-link active" href="productos.php">Productos</a>
                    <a class="nav-link" href="proveedores.php">Proveedores</a>
                </div>
            </div>
        </div>
    </nav>
    <div class="container mt-2">
        <div class="row">
            <div class="col-md-2">
                <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modal">Nuevo producto</button>
            </div>
        </div>
    </div>
    <table id="datable-responsive" class="table table-bordered table-responsive table-striped mt-2">
        <thead>
            <tr>
                <th>#</th>
                <th>Codigo Barras</th>
                <th>Nombre producto</th>
                <th>Grava IVA</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="dataProductos" name="dataProductos"></tbody>
    </table>

    <div class="modal fade" id="modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Productos</h5>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form action="" id="frm_productos">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="Codigo_Barras">Codigo Barras:</label>
                            <input type="text" class="form-control" name="Codigo_Barras" id="Codigo_Barras">
                        </div>
                        <div class="form-group">
                            <label for="Nombre_Producto">Nombre producto:</label>
                            <input type="text" class="form-control" name="Nombre_Producto" id="Nombre_Producto">
                        </div>
                        <div class="form-group">
                            <label for="Graba_IVA">Grava IVA:</label>
                            <select name="Graba_IVA" id="Graba_IVA" class="form-control">
                                <option value="0">NO</option>
                                <option value="1">SI</option>
                            </select>
                            <!-- <input type="text" name="Graba_IVA" id="Graba_IVA" class="form-control"> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                        <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</body>
<script src="./productos.js"></script>

</html>