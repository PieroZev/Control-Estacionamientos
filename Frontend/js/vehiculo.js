$(document).ready(function () {

  cargarVehiculos();

  function cargarVehiculos(){
      $.ajax({
        url: "http://localhost:5085/api/vehiculo",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          let tbody = $("#vehiculosTable tbody");
          tbody.html("");
          data.forEach(function (vehiculo) {
            mostrarCampos(vehiculo, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener vehiculos:", error);
        }
      });
  }

      $("#btn-filtrar").click(function(){
        const filtro = $("#filtrar").val();

        $.ajax({
        url: "http://localhost:5085/api/vehiculo/"+filtro,
        type: "GET",
        contentType: "application/json",
        success: function (vehiculo) {
          let tbody = $("#vehiculosTable tbody");
          tbody.html("");
          if(vehiculo.cod_vehiculo !== undefined) mostrarCampos(vehiculo, tbody);
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener vehículo:", error);
        }
      });
      });

      function mostrarCampos(vehiculo, tbody){         
        let row = `
          <tr>
          <td>${vehiculo.cod_vehiculo}</td>
          <td>${vehiculo.tipo_vehiculo}</td>
          <td>${vehiculo.marca}</td>
          <td>${vehiculo.modelo}</td>
          <td>${vehiculo.color}</td>
          <td>${vehiculo.altura}</td>
          <td>${vehiculo.ancho}</td>
          <td>${vehiculo.dni_cliente}</td>
          <td><a id="mod${vehiculo.cod_vehiculo}" class="btn btn-success">Modificar</a></td>
          <td><a id="eli${vehiculo.cod_vehiculo}" class="btn btn-danger">Eliminar</a></td>
          </tr>
          `;
        tbody.append(row);

        $("#mod"+vehiculo.cod_vehiculo).click(function(){
          modificar(vehiculo);
        });

        $("#eli"+vehiculo.cod_vehiculo).click(function(){
          eliminar(vehiculo.cod_vehiculo);
        });
      }

      $("#btn-registrar").click(function(){
        $('#modo').val('nuevo');
        $('#tituloModal').text('Registrar Vehículo');
        $('#modal').show();
      });

      function modificar(vehiculo){
        $('#modo').val('editar');
        $('#tituloModal').text('Modificar Vehículo');
        $('#modal').show();

        $('#matricula').val(vehiculo.cod_vehiculo);
        $('#tipo').val(vehiculo.tipo_vehiculo);
        $('#marca').val(vehiculo.marca);
        $('#modelo').val(vehiculo.modelo);
        $('#color').val(vehiculo.color);
        $('#altura').val(vehiculo.altura);
        $('#ancho').val(vehiculo.ancho);
        $('#propietario').val(vehiculo.dni_cliente);
      }

      function eliminar(id){
        $.ajax({
        url: "http://localhost:5085/api/vehiculo/"+id,
        type: "DELETE",
        contentType: "application/json",
        success: function () {
          cargarvehiculos();
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener vehículo:", error);
        }
      });
      }

      $('#cerrarModal').click(function() {
        $('#modal').hide();
      });

      $('#formVehiculo').submit(function(e) {
        e.preventDefault();

        const modo = $('#modo').val();
        const vehiculo = {
          cod_vehiculo : $('#matricula').val(),
          tipo_vehiculo: $('#tipo').val(),
          marca: $('#marca').val(),
          modelo: $('#modelo').val(),
          color: $('#color').val(),
          altura: $('#altura').val(),
          ancho: $('#ancho').val(),
          dni_cliente: $('#propietario').val()
        };

        $.ajax({
          url: modo === 'nuevo' ? 'http://localhost:5085/api/vehiculo' : 'http://localhost:5085/api/vehiculo/' + vehiculo.cod_vehiculo,
          method: modo === 'nuevo' ? 'POST' : 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(vehiculo),
          success: function(res) {
            console.log('Vehículo guardado correctamente');
            $('#formVehiculo')[0].reset();
            $('#modal').hide();
            cargarvehiculos();
          },
          error: function(err) {
            console.log('Error al guardar vehiculo: ' + err);
            cargarvehiculos();
          }
        });

        console.log("vehiculo " + (modo === "nuevo" ? "registrado" : "modificado") + " con éxito");
        $('#modal').hide();
      });
    });

