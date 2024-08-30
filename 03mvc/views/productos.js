var init = () => {
  $("#frm_productos").on("submit", (e) => {
    crear_editar(e);
  });
};

$().ready(() => {
  cargarProductos();
});

var cargarProductos = () => {
  $.get(
    "../controllers/productos.controller.php?op=getProductos",
    (listProductos) => {
      var html = "";
      console.log(listProductos);
      listProductos = JSON.parse(listProductos);
      console.log(listProductos);
      $.each(listProductos, (index, producto) => {
        html += `<tr>
            <td>${index + 1}</td>
            <td>${producto.Codigo_Barras}</td>
            <td>${producto.Nombre_Producto}</td>
            <td>${producto.Graba_IVA}</td>
            <td><button class="btn btn-primary">Editar</button> <button class="btn btn-danger">Eliminar</button></td>
            </tr>
            `;
      });
      $("#dataProductos").html(html);
    }
  );
};

var crear_editar = (e) => {
  e.preventDefault();
  var idGrabaIva = $("#Graba_IVA").val();
  var formData = new FormData($("#frm_productos")[0]);
  formData.append("Grava_IVA", idGrabaIva);
  console.log(formData);
  $.ajax({
    url: "../controllers/productos.controller.php?op=insertProducto",
    type: "POST",
    data: formData,
    contentType: false,
    processData: false,
    success: function (datos) {
      console.log(datos);
      $("#frm_productos")[0].reset();
      $("#modal").modal("hide");
      cargarProductos();
    },
  });
};

init();
