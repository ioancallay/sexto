var init = () => {
  $("#frm_proveedores").on("submit", (e) => {
    crear_editar(e);
  });
};

$().ready(() => {
  cargarProveedores();
});

var cargarProveedores = () => {
  $.get(
    "../controllers/proveedores.controller.php?op=getProveedores",
    (listProveedores) => {
      var html = "";
      console.log(listProveedores);
      listProveedores = JSON.parse(listProveedores);
      console.log(listProveedores);
      $.each(listProveedores, (index, proveedor) => {
        html += `<tr>
                  <td>${index + 1}</td>
                  <td>${proveedor.Nombre_Empresa}</td>
                  <td>${proveedor.Direccion}</td>
                  <td>${proveedor.Telefono}</td>
                  <td><button class="btn btn-sm btn-primary">Editar</button>
                  <button class="btn btn-sm btn-danger">Eliminar</button></td>
                  </tr>
                  `;
      });
      $("#tableProveedores").html(html);
    }
  );
};

var crear_editar = (e) => {
  e.preventDefault();
  console.log("proveedores");
  var formData = new FormData($("#frm_proveedores")[0]);
  console.log(formData);
  $.ajax({
    url: "../controllers/proveedores.controller.php?op=insertProveedor",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (datos) {
      console.log(datos);
      $("#frm_proveedores")[0].reset();
      $("#modal").modal("hide");
      cargarProveedores();
    },
  });
};

init();
