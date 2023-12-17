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


