DROP DATABASE IF EXISTS bd2_practica2;
CREATE DATABASE bd2_practica2;

USE bd2_practica2;

CREATE TABLE habitacion (
	idHabitacion INT AUTO_INCREMENT PRIMARY KEY,
    habitacion VARCHAR(50)
);


CREATE TABLE paciente (
	idPaciente INT AUTO_INCREMENT PRIMARY KEY,
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

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100),
    contrasena VARCHAR(100),
    rol VARCHAR(50)
);

CREATE TABLE log_operaciones_bd (
    id_log INT PRIMARY KEY AUTO_INCREMENT,
    usuario VARCHAR(100),
    accion VARCHAR(255),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (usuario, contrasena, rol) VALUES ('admin', '$2b$04$BNiW2r2bofECNzp4HFCtfej5JlqXrqD.Afrc/oVa4hP/ZdykAaLcS', 'Administrador');