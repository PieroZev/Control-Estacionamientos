--Se deberá crear el siguiente usuario con permisos a la base de datos Estacionamiento creada en SQL Server.

CREATE LOGIN Piero WITH PASSWORD = 'PieroZev12345!';

USE Estacionamiento;

CREATE USER Piero FOR LOGIN Piero;

ALTER ROLE db_owner ADD MEMBER Piero;
