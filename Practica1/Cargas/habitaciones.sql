USE bd2_practica2;

LOAD DATA INFILE "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\EntradaPrac1\\Habitaciones.csv"
INTO TABLE habitacion 
CHARACTER SET 'latin1'
FIELDS TERMINATED BY ';'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(idHabitacion,habitacion);