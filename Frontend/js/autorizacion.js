$(document).ready(function () {

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

  cargarAutorizaciones();

  function cargarAutorizaciones(){
      $.ajax({
        url: "http://localhost:5085/api/autorizacion",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          let tbody = $("#autorizacionesTable tbody");
          tbody.html("");
          data.forEach(function (autorizacion) {
            mostrarCampos(autorizacion, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener autorizaciones:", error);
        }
      });
  }

      $("#btn-filtrar").click(function(){
        const filtro = $("#filtrar").val();

        $.ajax({
        url: "http://localhost:5085/api/autorizacion/"+filtro,
        type: "GET",
        contentType: "application/json",
        success: function (autorizacion) {
          let tbody = $("#autorizacionesTable tbody");
          tbody.html("");
          if(autorizacion.cod_autorizacion !== undefined) mostrarCampos(autorizacion, tbody);
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener autorizacion:", error);
        }
      });
      });

      function mostrarCampos(autorizacion, tbody){         
        let row = `
          <tr>
          <td>${autorizacion.cod_autorizacion}</td>
          <td>${autorizacion.dni_autorizado}</td>
          <td>${autorizacion.nom_autorizado}</td>
          <td>${autorizacion.ape_autorizado}</td>
          <td>${autorizacion.cod_vehiculo}</td>
          <td>${autorizacion.dni_cliente}</td>
          <td><a id="mod${autorizacion.cod_autorizacion}" class="btn btn-success">Modificar</a></td>
          <td><a id="eli${autorizacion.cod_autorizacion}" class="btn btn-danger">Eliminar</a></td>
          </tr>
          `;
        tbody.append(row);

        $("#mod"+autorizacion.cod_autorizacion).click(function(){
          modificar(autorizacion);
        });

        $("#eli"+autorizacion.cod_autorizacion).click(function(){
          eliminar(autorizacion.cod_autorizacion);
        });
      }

      $("#btn-registrar").click(function(){
        $('#modo').val('nuevo');
        $('#tituloModal').text('Registrar Autorización');
        $('#modal').show();

        const codigo = Math.floor(Math.random() * 900000) + 100000;
        $('#codigo').val(codigo);
      });

      function modificar(autorizacion){
        $('#modo').val('editar');
        $('#tituloModal').text('Modificar Autorización');
        $('#modal').show();

        $('#codigo').val(autorizacion.cod_autorizacion);
        $('#dni').val(autorizacion.dni_autorizado);
        $('#nombre').val(autorizacion.nom_autorizado);
        $('#apellido').val(autorizacion.ape_autorizado);
        $('#matricula').val(autorizacion.cod_vehiculo);
        $('#propietario').val(autorizacion.dni_cliente);
      }

      function eliminar(id){
        $.ajax({
        url: "http://localhost:5085/api/autorizacion/"+id,
        type: "DELETE",
        contentType: "application/json",
        success: function () {
          cargarAutorizaciones();
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener autorizacion:", error);
        }
      });
      }

      $('#cerrarModal').click(function() {
        $('#modal').hide();
      });

      $('#formAutorizacion').submit(function(e) {
        e.preventDefault();

        const modo = $('#modo').val();
        const autorizacion = {
          cod_autorizacion : $('#codigo').val(),
          dni_autorizado: $('#dni').val(),
          nom_autorizado: $('#nombre').val(),
          ape_autorizado: $('#apellido').val(),
          cod_vehiculo: $('#matricula').val(),
          dni_cliente: $('#propietario').val()
        };

        $.ajax({
          url: modo === 'nuevo' ? 'http://localhost:5085/api/autorizacion' : 'http://localhost:5085/api/autorizacion/' + autorizacion.cod_autorizacion,
          method: modo === 'nuevo' ? 'POST' : 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(autorizacion),
          success: function(res) {
            console.log('Autorizacion guardada correctamente');
            $('#formAutorizacion')[0].reset();
            $('#modal').hide();
            cargarAutorizaciones();
          },
          error: function(err) {
            console.log('Error al guardar autorizacion: ' + err);
            cargarAutorizaciones();
          }
        });

        console.log("Autorizacion " + (modo === "nuevo" ? "registrada" : "modificada") + " con éxito");
        $('#modal').hide();
      });
    });

