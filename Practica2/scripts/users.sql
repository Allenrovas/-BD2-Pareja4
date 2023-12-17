CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT Administrador TO 'admin'@'localhost';
ALTER USER 'admin'@'localhost' DEFAULT ROLE ALL;

CREATE USER 'botLog'@'localhost' IDENTIFIED BY 'botLog';
GRANT INSERT ON bd2_practica2.log_operaciones_bd TO 'botLog'@'localhost';

FLUSH PRIVILEGES;

# SET ROLE Administrador;