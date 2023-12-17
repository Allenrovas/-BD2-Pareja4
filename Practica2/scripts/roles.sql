CREATE ROLE Asistente;
GRANT SELECT ON bd2_practica2.habitacion TO Asistente;
GRANT SELECT, UPDATE ON bd2_practica2.paciente TO Asistente;

CREATE ROLE Doctor;
GRANT SELECT ON bd2_practica2.paciente TO Doctor;

CREATE ROLE Soporte;
GRANT SELECT, INSERT, UPDATE ON bd2_practica2.log_actividad TO Soporte;
GRANT SELECT, INSERT, UPDATE ON bd2_practica2.log_habitacion TO Soporte;

CREATE ROLE Administrador;
GRANT ALL PRIVILEGES ON bd2_practica2.* TO Administrador;

FLUSH PRIVILEGES;
