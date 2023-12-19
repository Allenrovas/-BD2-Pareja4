use bd2_practica2;

DROP TRIGGER IF EXISTS insertUsuario;

DELIMITER $$
CREATE TRIGGER insertUsuario AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla usuarios');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS insertPaciente;
DELIMITER $$
CREATE TRIGGER insertPaciente AFTER INSERT ON paciente
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla paciente');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS insertHabitacion;
DELIMITER $$
CREATE TRIGGER insertHabitacion AFTER INSERT ON habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla habitacion');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS insertLogHabitacion;
DELIMITER $$
CREATE TRIGGER insertLogHabitacion AFTER INSERT ON log_habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla log_habitacion');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS insertLogActividad;
DELIMITER $$
CREATE TRIGGER insertLogActividad AFTER INSERT ON log_actividad
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla log_actividad');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS insertBackups;
DELIMITER $$
CREATE TRIGGER insertBackups AFTER INSERT ON backups
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Inserto un nuevo registro en la tabla backups');
END;
$$
DELIMITER ;


DROP TRIGGER IF EXISTS updateUsuario;
DELIMITER $$
CREATE TRIGGER updateUsuario AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla usuarios');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS updatePaciente;
DELIMITER $$
CREATE TRIGGER updatePaciente AFTER UPDATE ON paciente
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla paciente');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS updateHabitacion;
DELIMITER $$
CREATE TRIGGER updateHabitacion AFTER UPDATE ON habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla habitacion');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS updateLogHabitacion;
DELIMITER $$
CREATE TRIGGER updateLogHabitacion AFTER UPDATE ON log_habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla log_habitacion');
END;
$$
DELIMITER ;


DROP TRIGGER IF EXISTS updateLogActividad;
DELIMITER $$
CREATE TRIGGER updateLogActividad AFTER UPDATE ON log_actividad
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla log_actividad');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS updateBackups;
DELIMITER $$
CREATE TRIGGER updateBackups AFTER UPDATE ON backups
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd (usuario, accion) VALUES (usr, 'Actualizo un registro en la tabla backups');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deleteUsuario;
DELIMITER $$
CREATE TRIGGER deleteUsuario AFTER DELETE ON usuarios
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla usuarios');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deletePaciente;
DELIMITER $$
CREATE TRIGGER deletePaciente AFTER DELETE ON paciente
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla paciente');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deleteHabitacion;
DELIMITER $$
CREATE TRIGGER deleteHabitacion AFTER DELETE ON habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla habitacion');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deleteLogHabitacion;
DELIMITER $$
CREATE TRIGGER deleteLogHabitacion AFTER DELETE ON log_habitacion
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla log_habitacion');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deleteLogActividad;
DELIMITER $$
CREATE TRIGGER deleteLogActividad AFTER DELETE ON log_actividad
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla log_actividad');
END;
$$
DELIMITER ;

DROP TRIGGER IF EXISTS deleteBackups;
DELIMITER $$
CREATE TRIGGER deleteBackups AFTER DELETE ON backups
FOR EACH ROW
BEGIN
    DECLARE usr VARCHAR(50);
    SET usr = SUBSTRING_INDEX(USER(), '@', 1);
    INSERT INTO bd2_practica2.log_operaciones_bd(usuario, accion) VALUES (usr, 'Elimino un registro en la tabla backups');
END;
$$
DELIMITER ;