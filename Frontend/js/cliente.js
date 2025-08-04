$(document).ready(function () {

  cargarClientes();

  function cargarClientes(){
      $.ajax({
        url: "http://localhost:5085/api/cliente",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
          let tbody = $("#clientesTable tbody");
          tbody.html("");
          data.forEach(function (cliente) {
            mostrarCampos(cliente, tbody);
          });
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener clientes:", error);
        }
      });
  }

      $("#btn-filtrar").click(function(){
        const filtro = $("#filtrar").val();

        $.ajax({
        url: "http://localhost:5085/api/cliente/"+filtro,
        type: "GET",
        contentType: "application/json",
        success: function (cliente) {
          let tbody = $("#clientesTable tbody");
          tbody.html("");
          if(cliente.dni_cliente !== undefined) mostrarCampos(cliente, tbody);
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener cliente:", error);
        }
      });
      });

      function mostrarCampos(cliente, tbody){         
        let row = `
          <tr>
          <td>${cliente.dni_cliente}</td>
          <td>${cliente.nom_cliente}</td>
          <td>${cliente.ape_cliente}</td>
          <td>${cliente.dir_cliente}</td>
          <td>${cliente.cod_postal}</td>
          <td>${cliente.tel_cliente}</td>
          <td>${cliente.mail_cliente}</td>
          <td><a id="mod${cliente.dni_cliente}" class="btn btn-success">Modificar</a></td>
          <td><a id="eli${cliente.dni_cliente}" class="btn btn-danger">Eliminar</a></td>
          </tr>
          `;
        tbody.append(row);

        $("#mod"+cliente.dni_cliente).click(function(){
          modificar(cliente);
        });

        $("#eli"+cliente.dni_cliente).click(function(){
          eliminar(cliente.dni_cliente);
        });
      }

      $("#btn-registrar").click(function(){
        $('#modo').val('nuevo');
        $('#tituloModal').text('Registrar Cliente');
        $('#modal').show();
      });

      function modificar(cliente){
        $('#modo').val('editar');
        $('#tituloModal').text('Modificar Cliente');
        $('#modal').show();

        $('#dni').val(cliente.dni_cliente);
        $('#nombre').val(cliente.nom_cliente);
        $('#apellido').val(cliente.ape_cliente);
        $('#direccion').val(cliente.dir_cliente);
        $('#postal').val(cliente.cod_postal);
        $('#telefono').val(cliente.tel_cliente);
        $('#email').val(cliente.mail_cliente);
      }

      function eliminar(id){
        $.ajax({
        url: "http://localhost:5085/api/cliente/"+id,
        type: "DELETE",
        contentType: "application/json",
        success: function () {
          cargarClientes();
        },
        error: function (xhr, status, error) {
          console.error("Error al obtener cliente:", error);
        }
      });
      }

      $('#cerrarModal').click(function() {
        $('#modal').hide();
      });

      $('#formCliente').submit(function(e) {
        e.preventDefault();

        const modo = $('#modo').val();
        const cliente = {
          dni_cliente: $('#dni').val(),
          nom_cliente: $('#nombre').val(),
          ape_cliente: $('#apellido').val(),
          dir_cliente: $('#direccion').val(),
          cod_postal: $('#postal').val(),
          tel_cliente: $('#telefono').val(),
          mail_cliente: $('#email').val()
        };

        $.ajax({
          url: modo === 'nuevo' ? 'http://localhost:5085/api/cliente' : 'http://localhost:5085/api/cliente/' + cliente.dni_cliente,
          method: modo === 'nuevo' ? 'POST' : 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(cliente),
          success: function(res) {
            console.log('Cliente guardado correctamente');
            $('#formCliente')[0].reset();
            $('#modal').hide();
            cargarClientes();
          },
          error: function(err) {
            console.log('Error al guardar cliente: ' + err);
            cargarClientes();
          }
        });

        console.log("Cliente " + (modo === "nuevo" ? "registrado" : "modificado") + " con éxito");
        $('#modal').hide();
      });
    });
