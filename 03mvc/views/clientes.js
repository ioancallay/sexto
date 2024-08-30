var init = () => {
  $("#frm_clientes").on("submit", (e) => {
    crear_editar(e);
  });
};

$().ready(() => {
  cargarTabla();
});

//TODO: Cargar la tabla de clientes
var cargarTabla = () => {
  $.get(
    "../controllers/clientes.controller.php?op=getClientes",
    (listClientes) => {
      var html = "";
      console.log(listClientes);
      listClientes = JSON.parse(listClientes);
      $.each(listClientes, (index, cliente) => {
        html += `<tr>
                            <td>${index + 1}</td>
                            <td>${cliente.Nombres}</td>
                            <td>${cliente.Direccion}</td>
                            <td>${cliente.Telefono}</td>
                            <td>${cliente.Cedula}</td>
                            <td>${cliente.Correo}</td>
                            <td><button class="btn btn-sm btn-primary">Editar</button>
                            <button class="btn btn-sm btn-danger">Eliminar</button></td>
                        </tr>`;
      });
      $("#tableClientes").html(html);
    }
  );
};

var crear_editar = (e) => {
  e.preventDefault();
  console.log("Crear o editar");
  var datos = new FormData($("#frm_clientes")[0]);
  console.log(datos);
  $.ajax({
    url: "../controllers/clientes.controller.php?op=insertCliente",
    type: "POST",
    data: datos,
    processData: false,
    contentType: false,
    success: function (datos) {
      console.log(datos);
      $("#frm_clientes")[0].reset();
      $("#modal").modal("hide");
      cargarTabla();
    },
  });
};

init();
