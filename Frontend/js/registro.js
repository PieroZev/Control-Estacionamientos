$(document).ready(function () {

  $.ajax({
        url: "http://localhost:5085/api/plaza",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          $("#filtroNumPlaza").html("");
          $("#numero").html("");
          data.forEach(function (plaza) {
            $("#filtroNumPlaza").append("<option value="+plaza.num_plaza+">"+plaza.num_plaza+"</option>");
            $("#numero").append("<option value="+plaza.num_plaza+">"+plaza.num_plaza+"</option>");
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener plazas:", error);
        }
      });

  cargarRegistros();

  function cargarRegistros(){
      $.ajax({
        url: "http://localhost:5085/api/registro",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          let tbody = $("#registrosTable tbody");
          tbody.html("");
          data.forEach(function (registro) {
            mostrarCampos(registro, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener registros:", error);
        }
      });
  }

      $("#btn-filtrar").click(function(){
        const registro = {
          num_plaza: parseInt($("#filtroNumPlaza").val()) || 0,
          dni_conductor: $("#filtroConductor").val(),
          cod_vehiculo: $("#filtroMatricula").val(),
          ios: $("#filtroIoS").val(),
          fec_hora: $("#filtroFecHora").val() ? $("#filtroFecHora").val() : new Date().toISOString().replace("Z","").substring(0,19)
        };

        $.ajax({
        url: "http://localhost:5085/api/registro/buscar",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(registro),
        success: function (data) {
          let tbody = $("#registrosTable tbody");
          tbody.html("");
          data.forEach(function(registro){
            if(registro.dni_conductor !== undefined) mostrarCampos(registro, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.log("No se encontró el registro.");
          let tbody = $("#registrosTable tbody");
          tbody.html("");
        }
      });
      });

      function mostrarCampos(registro, tbody){         
        let row = `
          <tr>
          <td>${registro.num_plaza}</td>
          <td>${registro.ios}</td>
          <td>${registro.fec_hora}</td>
          <td>${registro.dni_conductor}</td>
          <td>${registro.cod_vehiculo}</td>
          </tr>
          `;
        tbody.append(row);
      }

      $("#btn-registrar").click(function(){
        $('#tituloModal').text('Guardar Registro');
        $('#modal').show();
      });

      $('#cerrarModal').click(function() {
        $('#modal').hide();
      });

      $('#formRegistro').submit(function(e) {
        e.preventDefault();

        const registro = {
          num_plaza : $('#numero').val(),
          dni_conductor: $('#conductor').val(),
          cod_vehiculo: $('#matricula').val(),
          ios: $('#ios').val(),
          fec_hora: $('#fechora').val()
        };

        $.ajax({
          url: 'http://localhost:5085/api/registro',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(registro),
          success: function(res) {
            console.log('Registro guardado correctamente');
            $('#formRegistro')[0].reset();
            $('#modal').hide();
            cargarRegistros();
          },
          error: function(err) {
            console.log('Error al guardar registro: ' + err);
            cargarRegistros();
          }
        });

        console.log("Registro guardado con éxito");
        $('#modal').hide();
      });
    });

