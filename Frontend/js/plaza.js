$(document).ready(function () {

  cargarPlazas();

        $.ajax({
          url: "http://localhost:5085/api/vehiculo",
          type: "GET",
          contentType: "application/json",
          success: function (data) {
            $("#matricula").html("");
            data.forEach(function (vehiculo) {
              $("#matricula").append("<option value='"+vehiculo.cod_vehiculo+"'>"+vehiculo.cod_vehiculo+"</option>")
            });
          },
          error: function (xhr, status, error) {
            console.error("Error al obtener vehiculos:", error);
          }
        });

        $.ajax({
          url: "http://localhost:5085/api/cliente",
          type: "GET",
          contentType: "application/json",
          success: function (data) {
            $("#propietario").html("");
            data.forEach(function (cliente) {
              $("#propietario").append("<option value='"+cliente.dni_cliente+"'>"+cliente.nom_cliente+" "+cliente.ape_cliente+"</option>")
            });
          },
          error: function (xhr, status, error) {
            console.error("Error al obtener clientes:", error);
          }
        });

        $.ajax({
          url: "http://localhost:5085/api/autorizacion",
          type: "GET",
          contentType: "application/json",
          success: function (data) {
            $("#codigo").html("");
            data.forEach(function (autorizacion) {
              $("#codigo").append("<option value='"+autorizacion.cod_autorizacion+"'>"+autorizacion.cod_autorizacion+"</option>")
            });
          },
          error: function (xhr, status, error) {
            console.error("Error al obtener Autorizaciones:", error);
          }
        });

  function cargarPlazas(){
      $.ajax({
        url: "http://localhost:5085/api/plaza",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          let tbody = $("#plazasTable tbody");
          tbody.html("");
          data.forEach(function (plaza) {
            mostrarCampos(plaza, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener plazas:", error);
        }
      });
  }

      $("#btn-filtrar").click(function(){
        const filtro = $("#filtrar").val();

        $.ajax({
        url: "http://localhost:5085/api/plaza/"+filtro,
        type: "GET",
        contentType: "application/json",
        success: function (plaza) {
          let tbody = $("#plazasTable tbody");
          tbody.html("");
          if(plaza.num_plaza !== undefined) mostrarCampos(plaza, tbody);
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener plaza:", error);
        }
      });
      });

      function mostrarCampos(plaza, tbody){         
        let row = `
          <tr>
          <td>${plaza.num_plaza}</td>
          <td>${plaza.dni_cliente}</td>
          <td>${plaza.cod_vehiculo}</td>
          <td>${plaza.cod_autorizacion}</td>
          <td><a id="mod${plaza.num_plaza}" class="btn btn-success">Modificar</a></td>
          <td><a id="eli${plaza.num_plaza}" class="btn btn-danger">Eliminar</a></td>
          </tr>
          `;
        tbody.append(row);

        $("#mod"+plaza.num_plaza).click(function(){
          modificar(plaza);
        });

        $("#eli"+plaza.num_plaza).click(function(){
          eliminar(plaza.num_plaza);
        });
      }

      $("#btn-registrar").click(function(){
        $('#modo').val('nuevo');
        $('#tituloModal').text('Registrar Plaza');
        $('#modal').show();
      });

      function modificar(plaza){
        $('#modo').val('editar');
        $('#tituloModal').text('Modificar Plaza');
        $('#modal').show();

        $('#numero').val(plaza.num_plaza);
        $('#propietario').val(plaza.dni_cliente);
        $('#matricula').val(plaza.cod_vehiculo);
        $('#codigo').val(plaza.cod_autorizacion);
      }

      function eliminar(id){
        $.ajax({
        url: "http://localhost:5085/api/plaza/"+id,
        type: "DELETE",
        contentType: "application/json",
        success: function () {
          cargarPlazas();
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener plaza:", error);
        }
      });
      }

      $('#cerrarModal').click(function() {
        $('#modal').hide();
      });

      $('#formPlaza').submit(function(e) {
        e.preventDefault();

        const modo = $('#modo').val();
        const plaza = {
          num_plaza : $('#numero').val(),
          dni_cliente: $('#propietario').val(),
          cod_vehiculo: $('#matricula').val(),
          cod_autorizacion: $('#codigo').val() ? $('#codigo').val() : 0
        };

        $.ajax({
          url: modo === 'nuevo' ? 'http://localhost:5085/api/plaza' : 'http://localhost:5085/api/plaza/' + plaza.num_plaza,
          method: modo === 'nuevo' ? 'POST' : 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(plaza),
          success: function(res) {
            console.log('Plaza guardada correctamente');
            $('#formPlaza')[0].reset();
            $('#modal').hide();
            cargarPlazas();
          },
          error: function(err) {
            console.log('Error al guardar plaza: ' + err);
            cargarPlazas();
          }
        });

        console.log("plaza " + (modo === "nuevo" ? "registrada" : "modificada") + " con éxito");
        $('#modal').hide();
      });
    });

