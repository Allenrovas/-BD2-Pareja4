CREATE DATABASE bd2_practica1;
DROP DATABASE bd2_practica1;

USE bd2_practica1;

CREATE TABLE habitacion (
	idHabitacion INT PRIMARY KEY,
    habitacion VARCHAR(50)
);


CREATE TABLE paciente (
	idPaciente INT PRIMARY KEY,
    edad INT,
    genero VARCHAR(20)
);

CREATE TABLE log_actividad (
	id_log_actividad INT AUTO_INCREMENT PRIMARY KEY,
	timestampx VARCHAR(100),
    actividad VARCHAR(500),
    idHabitacion INT,
    idPaciente INT,
    FOREIGN KEY (idhabitacion) REFERENCES habitacion(idHabitacion),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente)
);

CREATE TABLE log_habitacion (
	timestampx VARCHAR(100),
    statusx VARCHAR(45) NOT NULL,
    idHabitacion INT,
    PRIMARY KEY (timestampx, idHabitacion),
    FOREIGN KEY (idhabitacion) REFERENCES habitacion(idHabitacion)
);