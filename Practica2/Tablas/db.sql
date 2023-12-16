CREATE DATABASE bd2_practica2;
USE bd2_practica2;

CREATE TABLE habitacion (
    idHabitacion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    habitacion VARCHAR(50) NOT NULL
);

CREATE TABLE paciente (
    idPaciente INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    edad INT NOT NULL,
    genero VARCHAR(20),
    diagnotico VARCHAR(50)
);

CREATE TABLE log_actividad (
	id_log_actividad INT AUTO_INCREMENT PRIMARY KEY,
	timestampx TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    accion VARCHAR(255) NOT NULL,
    usuario_logueado VARCHAR(255) NOT NULL,
    idHabitacion INT,
    idPaciente INT,
    FOREIGN KEY (idhabitacion) REFERENCES habitacion(idHabitacion),
    FOREIGN KEY (idPaciente) REFERENCES paciente(idPaciente)
);

CREATE TABLE log_habitacion (
	timestampx TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    usuario_logueado VARCHAR(255) NOT NULL,
    accion VARCHAR(255) NOT NULL,
    statusx VARCHAR(45) NOT NULL,
    idHabitacion INT AUTO_INCREMENT,
    PRIMARY KEY (timestampx, idHabitacion),
    FOREIGN KEY (idhabitacion) REFERENCES habitacion(idHabitacion)
);