CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT Administrador TO 'admin'@'localhost';

FLUSH PRIVILEGES;

# SET ROLE Administrador;