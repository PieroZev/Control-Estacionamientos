# Control-Estacionamientos
Ejercicio de control de estacionamientos

BD:
- Consta de 4 tablas (cliente, vehiculo, plaza, autorizacion)
- Agregué la tabla Autorización para darle más versatilidad al caso.
- El cliente puede autorizar a personas externas a ocupar su estacionamiento.

Backend:
- ASP.NET Core Web API con 4 controladores (1 por tabla)
- Modelo de acuerdo a la base de datos (Entity Framework) con seguridad integrada
- El modelo propuesto es MVC con la vista en un frontend externo en el lado del cliente (Navegador Web)

Frontend:
- Se desarrolló en JavaScript vanilla con Jquery y llamadas Ajax a las APIs
