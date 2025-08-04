create database Estacionamiento;

use Estacionamiento;

create table Cliente(
dni_cliente char(8) primary key,
nom_cliente nvarchar(30) not null,
ape_cliente nvarchar(30) not null,
dir_cliente nvarchar(50),
cod_postal nvarchar(15),
tel_cliente nvarchar(15) not null,
mail_cliente nvarchar(100) not null
);

create table Vehiculo(
cod_vehiculo nvarchar(10) primary key,
tipo_vehiculo nvarchar(20),
marca nvarchar(20),
modelo nvarchar(20),
color nvarchar(20),
altura float,
ancho float,
dni_cliente char(8) not null
);

create table Autorizacion(
cod_autorizacion int primary key,
dni_cliente char(8) not null,
cod_vehiculo nvarchar(10) not null,
dni_autorizado char(8) not null,
nom_autorizado nvarchar(30) not null,
ape_autorizado nvarchar(30) not null,
);

alter table Autorizacion add foreign key (dni_cliente) references Cliente (dni_cliente);
alter table Autorizacion add foreign key (cod_vehiculo) references Vehiculo (cod_vehiculo);

create table Plaza(
num_plaza int primary key,
dni_cliente char(8),
cod_vehiculo nvarchar(10),
cod_autorizacion int
);

insert into plaza (num_plaza) values
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10);

create table Registro(
num_plaza int not null,
dni_conductor char(8) not null,
cod_vehiculo nvarchar(10) not null,
ios char(1) not null,
fec_hora datetime not null,
);

alter table Registro add primary key (num_plaza, dni_conductor, cod_vehiculo, fec_hora);