CREATE ROLE Asistente;
GRANT SELECT ON bd2_practica2.habitacion TO Asistente;
GRANT SELECT, UPDATE ON bd2_practica2.paciente TO Asistente;

CREATE ROLE Doctor;
GRANT SELECT ON bd2_practica2.paciente TO Doctor;

CREATE ROLE Soporte;
GRANT SELECT, INSERT, UPDATE ON bd2_practica2.log_actividad TO Soporte;
GRANT SELECT, INSERT, UPDATE ON bd2_practica2.log_habitacion TO Soporte;

CREATE ROLE Administrador;
GRANT SELECT, INSERT, UPDATE, DELETE ON bd2_practica2.* TO Administrador;
GRANT LOCK TABLES, SHOW VIEW ON bd2_practica2.* TO Administrador;
GRANT RELOAD, SUPER, REPLICATION CLIENT, CREATE USER, PROCESS, GRANT OPTION ON *.* TO Administrador;

FLUSH PRIVILEGES;

SHOW GRANTS FOR 'admin'@'localhost';
